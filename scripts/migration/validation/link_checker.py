#!/usr/bin/env python3
"""
Link Checker for MkDocs Documentation

This module checks all links in the migrated MkDocs documentation to ensure:
1. Internal links resolve correctly
2. External links are valid (with rate limiting)
3. Asset references work properly
4. No broken links exist

Usage:
    python link_checker.py <docs-dir> [--output link-check-report.json] [--check-external]
"""

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple
from datetime import datetime
from urllib.parse import urljoin, urlparse
import urllib.request
import urllib.error


class LinkChecker:
    """Checks all links in markdown documentation."""

    def __init__(self, docs_dir: str, check_external: bool = False):
        """
        Initialize the link checker.
        
        Args:
            docs_dir: Documentation directory to scan
            check_external: Whether to check external links (slower)
        """
        self.docs_dir = Path(docs_dir)
        self.check_external = check_external
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'docs_directory': str(docs_dir),
            'total_files': 0,
            'total_links': 0,
            'internal_links': 0,
            'external_links': 0,
            'asset_links': 0,
            'broken_internal': 0,
            'broken_external': 0,
            'broken_assets': 0,
            'issues': []
        }
        self.checked_external: Dict[str, bool] = {}  # Cache for external link checks

    def find_markdown_files(self) -> List[Path]:
        """Find all markdown files in the documentation directory."""
        md_files = list(self.docs_dir.rglob('*.md'))
        self.results['total_files'] = len(md_files)
        return md_files

    def extract_links(self, content: str, file_path: Path) -> List[Dict]:
        """
        Extract all links from markdown content.
        
        Args:
            content: Markdown content
            file_path: Path to the file being processed
        
        Returns:
            List of link dictionaries with type and target
        """
        links = []

        # Extract markdown links: [text](url)
        markdown_link_pattern = r'\[([^\]]+)\]\(([^)]+)\)'
        for match in re.finditer(markdown_link_pattern, content):
            link_text = match.group(1)
            link_url = match.group(2)
            
            # Skip anchor-only links
            if link_url.startswith('#'):
                continue
            
            # Determine link type
            if link_url.startswith(('http://', 'https://', 'ftp://')):
                link_type = 'external'
            elif link_url.startswith('/'):
                link_type = 'absolute'
            elif any(link_url.endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico']):
                link_type = 'asset'
            else:
                link_type = 'internal'
            
            links.append({
                'text': link_text,
                'url': link_url,
                'type': link_type,
                'line': content[:match.start()].count('\n') + 1
            })

        # Extract image references: ![alt](url)
        image_pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
        for match in re.finditer(image_pattern, content):
            alt_text = match.group(1)
            image_url = match.group(2)
            
            links.append({
                'text': f"Image: {alt_text or 'no alt'}",
                'url': image_url,
                'type': 'asset',
                'line': content[:match.start()].count('\n') + 1
            })

        # Extract HTML links: <a href="url">
        html_link_pattern = r'<a\s+[^>]*href=["\']([^"\']+)["\'][^>]*>'
        for match in re.finditer(html_link_pattern, content):
            link_url = match.group(1)
            
            if link_url.startswith('#'):
                continue
            
            if link_url.startswith(('http://', 'https://', 'ftp://')):
                link_type = 'external'
            else:
                link_type = 'internal'
            
            links.append({
                'text': 'HTML link',
                'url': link_url,
                'type': link_type,
                'line': content[:match.start()].count('\n') + 1
            })

        # Extract HTML image references: <img src="url">
        html_img_pattern = r'<img\s+[^>]*src=["\']([^"\']+)["\'][^>]*>'
        for match in re.finditer(html_img_pattern, content):
            image_url = match.group(1)
            
            links.append({
                'text': 'HTML image',
                'url': image_url,
                'type': 'asset',
                'line': content[:match.start()].count('\n') + 1
            })

        return links

    def resolve_internal_link(self, link_url: str, source_file: Path) -> Tuple[bool, str]:
        """
        Resolve an internal link and check if it exists.
        
        Args:
            link_url: Link URL to resolve
            source_file: Source file containing the link
        
        Returns:
            Tuple of (exists, resolved_path)
        """
        # Remove anchor
        link_url = link_url.split('#')[0]
        
        if not link_url:  # Anchor-only link
            return True, str(source_file)

        # Handle absolute paths
        if link_url.startswith('/'):
            target_path = self.docs_dir / link_url.lstrip('/')
        else:
            # Relative path
            target_path = (source_file.parent / link_url).resolve()

        # Check if target exists
        if target_path.exists():
            return True, str(target_path)
        
        # Try adding .md extension
        if not target_path.suffix:
            md_path = target_path.with_suffix('.md')
            if md_path.exists():
                return True, str(md_path)
            
            # Try index.md
            index_path = target_path / 'index.md'
            if index_path.exists():
                return True, str(index_path)

        return False, str(target_path)

    def check_external_link(self, url: str) -> bool:
        """
        Check if an external link is valid.
        
        Args:
            url: External URL to check
        
        Returns:
            True if link is valid
        """
        # Check cache first
        if url in self.checked_external:
            return self.checked_external[url]

        try:
            # Set a reasonable timeout
            req = urllib.request.Request(
                url,
                headers={'User-Agent': 'Mozilla/5.0 (Link Checker)'}
            )
            
            # Rate limit: wait 1 second between requests
            time.sleep(1)
            
            with urllib.request.urlopen(req, timeout=10) as response:
                is_valid = response.status == 200
                self.checked_external[url] = is_valid
                return is_valid
                
        except (urllib.error.URLError, urllib.error.HTTPError, Exception) as e:
            print(f"  ⚠ External link check failed: {url} ({str(e)})")
            self.checked_external[url] = False
            return False

    def check_file(self, file_path: Path) -> List[Dict]:
        """
        Check all links in a single file.
        
        Args:
            file_path: Path to markdown file
        
        Returns:
            List of issues found
        """
        issues = []

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            links = self.extract_links(content, file_path)

            for link in links:
                self.results['total_links'] += 1
                
                link_url = link['url']
                link_type = link['type']
                
                # Count by type
                if link_type == 'external':
                    self.results['external_links'] += 1
                elif link_type == 'asset':
                    self.results['asset_links'] += 1
                else:
                    self.results['internal_links'] += 1

                # Check internal/absolute links
                if link_type in ['internal', 'absolute']:
                    exists, resolved = self.resolve_internal_link(link_url, file_path)
                    
                    if not exists:
                        self.results['broken_internal'] += 1
                        issues.append({
                            'file': str(file_path.relative_to(self.docs_dir)),
                            'line': link['line'],
                            'type': 'broken_internal',
                            'link': link_url,
                            'text': link['text'],
                            'message': f"Internal link not found: {link_url}"
                        })

                # Check asset links
                elif link_type == 'asset':
                    # Handle absolute asset paths
                    if link_url.startswith('/'):
                        # Assume assets are in docs-new/docs/assets/ or similar
                        asset_path = self.docs_dir / link_url.lstrip('/')
                    else:
                        # Relative asset path
                        asset_path = (file_path.parent / link_url).resolve()

                    if not asset_path.exists():
                        self.results['broken_assets'] += 1
                        issues.append({
                            'file': str(file_path.relative_to(self.docs_dir)),
                            'line': link['line'],
                            'type': 'broken_asset',
                            'link': link_url,
                            'text': link['text'],
                            'message': f"Asset not found: {link_url}"
                        })

                # Check external links if enabled
                elif link_type == 'external' and self.check_external:
                    if not self.check_external_link(link_url):
                        self.results['broken_external'] += 1
                        issues.append({
                            'file': str(file_path.relative_to(self.docs_dir)),
                            'line': link['line'],
                            'type': 'broken_external',
                            'link': link_url,
                            'text': link['text'],
                            'message': f"External link failed: {link_url}"
                        })

        except Exception as e:
            issues.append({
                'file': str(file_path.relative_to(self.docs_dir)),
                'line': 0,
                'type': 'error',
                'link': '',
                'text': '',
                'message': f"Error reading file: {str(e)}"
            })

        return issues

    def check_all(self) -> Dict:
        """
        Check all markdown files in the documentation.
        
        Returns:
            Complete results dictionary
        """
        print(f"\n🔍 Scanning for markdown files in {self.docs_dir}...\n")
        
        md_files = self.find_markdown_files()
        
        print(f"Found {len(md_files)} markdown files\n")
        print("📋 Checking links...\n")

        for i, file_path in enumerate(md_files, 1):
            rel_path = file_path.relative_to(self.docs_dir)
            print(f"[{i}/{len(md_files)}] Checking: {rel_path}")

            issues = self.check_file(file_path)
            
            if issues:
                print(f"  ✗ Found {len(issues)} issue(s)")
                self.results['issues'].extend(issues)
            else:
                print(f"  ✓ All links OK")

        return self.results

    def save_report(self, output_path: str) -> bool:
        """
        Save link check report to JSON file.
        
        Args:
            output_path: Output file path
        
        Returns:
            True if successful
        """
        try:
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(self.results, f, indent=2)
            print(f"\n✓ Link check report saved to {output_path}")
            return True
        except Exception as e:
            print(f"\n✗ Error saving report: {e}")
            return False

    def print_summary(self):
        """Print link check summary."""
        print("\n" + "=" * 60)
        print("LINK CHECK SUMMARY")
        print("=" * 60)
        print(f"Files checked:       {self.results['total_files']}")
        print(f"Total links:         {self.results['total_links']}")
        print(f"  Internal links:    {self.results['internal_links']}")
        print(f"  External links:    {self.results['external_links']}")
        print(f"  Asset links:       {self.results['asset_links']}")
        print()
        print(f"Broken internal:     {self.results['broken_internal']}")
        print(f"Broken assets:       {self.results['broken_assets']}")
        
        if self.check_external:
            print(f"Broken external:     {self.results['broken_external']}")
        
        total_broken = (self.results['broken_internal'] + 
                       self.results['broken_assets'] + 
                       self.results['broken_external'])
        
        if total_broken == 0:
            print("\n✅ LINK CHECK PASSED - Zero broken links")
        else:
            print(f"\n❌ LINK CHECK FAILED - {total_broken} broken link(s)")
            
            # Show first 10 issues
            if self.results['issues']:
                print("\nFirst issues found:")
                for issue in self.results['issues'][:10]:
                    print(f"  • {issue['file']}:{issue['line']} - {issue['message']}")
                
                if len(self.results['issues']) > 10:
                    print(f"  ... and {len(self.results['issues']) - 10} more")
        
        print("=" * 60)


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description='Check all links in MkDocs documentation'
    )
    parser.add_argument(
        'docs_dir',
        help='Documentation directory to scan (e.g., docs-new/docs/)'
    )
    parser.add_argument(
        '--output', '-o',
        default='link-check-report.json',
        help='Output path for link check report (default: link-check-report.json)'
    )
    parser.add_argument(
        '--check-external',
        action='store_true',
        help='Check external links (slower, rate-limited)'
    )

    args = parser.parse_args()

    # Validate docs directory
    docs_dir = Path(args.docs_dir)
    if not docs_dir.exists():
        print(f"✗ Error: Documentation directory not found: {docs_dir}")
        sys.exit(1)

    # Create checker
    checker = LinkChecker(args.docs_dir, args.check_external)

    # Run checks
    results = checker.check_all()

    # Save report
    checker.save_report(args.output)

    # Print summary
    checker.print_summary()

    # Exit with appropriate code
    total_broken = (results['broken_internal'] + 
                   results['broken_assets'] + 
                   results['broken_external'])
    sys.exit(0 if total_broken == 0 else 1)


if __name__ == '__main__':
    main()
