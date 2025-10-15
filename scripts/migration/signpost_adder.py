#!/usr/bin/env python3
"""
Signpost Adder Script for AI-Friendly Documentation

Adds standardized section markers (Prerequisites, Examples, Related Topics)
to improve AI agent navigation and comprehension.

Usage:
    python3 signpost_adder.py <docs_dir> [--output report.json] [--dry-run]
"""

import argparse
import json
import os
import re
from pathlib import Path
from typing import Dict, List, Tuple, Any


class SignpostAdder:
    """Adds standardized signpost sections to markdown documentation."""
    
    def __init__(self, docs_dir: str, dry_run: bool = False):
        self.docs_dir = Path(docs_dir)
        self.dry_run = dry_run
        self.errors = []
        
    def extract_frontmatter(self, content: str) -> Tuple[str, str]:
        """Extract frontmatter and body from markdown content."""
        pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)'
        match = re.match(pattern, content, re.DOTALL)
        return (match.group(1), match.group(2)) if match else ('', content)
    
    def parse_yaml_list(self, frontmatter: str, key: str) -> List[str]:
        """Parse a list from YAML frontmatter."""
        import yaml
        try:
            data = yaml.safe_load(frontmatter)
            if data and key in data and isinstance(data[key], list):
                return data[key]
        except:
            pass
        return []
    
    def has_section(self, content: str, marker: str) -> bool:
        """Check if content has a section marker."""
        return marker in content
    
    def add_prerequisites_section(self, content: str, prereqs: List[str]) -> Tuple[str, bool]:
        """Add Prerequisites section after main heading."""
        if not prereqs or self.has_section(content, '## Prerequisites'):
            return content, False
        
        items = '\n'.join([f'- [{p}](../index.md)' for p in prereqs])
        section = f'\n## Prerequisites\n\nBefore working with this feature, you should be familiar with:\n\n{items}\n'
        
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if line.startswith('#') and not line.startswith('##'):
                lines.insert(i + 1, section)
                return '\n'.join(lines), True
        
        return content, False
    
    def add_examples_section(self, content: str) -> Tuple[str, bool]:
        """Add Examples section before first code block if multiple examples exist."""
        if self.has_section(content, '## Example'):
            return content, False
        
        code_blocks = re.findall(r'```\w+\n', content)
        if len(code_blocks) < 2:
            return content, False
        
        first_block = re.search(r'```\w+\n', content)
        if first_block:
            before = content[:first_block.start()].rstrip()
            if before.endswith('#'):
                return content, False
            
            insert_pos = first_block.start()
            new_content = content[:insert_pos] + '\n## Examples\n\n' + content[insert_pos:]
            return new_content, True
        
        return content, False
    
    def add_related_section(self, content: str, related: List[str]) -> Tuple[str, bool]:
        """Add Related Topics section at end."""
        if not related or self.has_section(content, '## Related Topics'):
            return content, False
        
        items = '\n'.join([f'- [{r}](../index.md)' for r in related])
        section = f'\n\n## Related Topics\n\n{items}\n'
        
        return content.rstrip() + section, True
    
    def add_signposts(self, file_path: Path) -> Dict[str, Any]:
        """Add signposts to a single file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original = f.read()
            
            frontmatter, body = self.extract_frontmatter(original)
            enhanced = body
            added = []
            
            # Add signposts
            prereqs = self.parse_yaml_list(frontmatter, 'prerequisites')
            if prereqs:
                enhanced, modified = self.add_prerequisites_section(enhanced, prereqs)
                if modified:
                    added.append('prerequisites')
            
            enhanced, modified = self.add_examples_section(enhanced)
            if modified:
                added.append('examples')
            
            related = self.parse_yaml_list(frontmatter, 'related')
            if related:
                enhanced, modified = self.add_related_section(enhanced, related)
                if modified:
                    added.append('related_topics')
            
            # Write if changed
            if added and not self.dry_run:
                new_content = f"---\n{frontmatter}\n---\n{enhanced}" if frontmatter else enhanced
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
            
            return {
                'file': str(file_path.relative_to(self.docs_dir)),
                'signposts_added': added,
                'count': len(added),
                'modified': len(added) > 0
            }
        except Exception as e:
            self.errors.append({'file': str(file_path), 'error': str(e)})
            return None
    
    def process_directory(self) -> Dict[str, Any]:
        """Process all markdown files."""
        files = list(self.docs_dir.rglob('*.md'))
        print(f"Found {len(files)} files. Mode: {'DRY RUN' if self.dry_run else 'WRITE'}")
        
        results = []
        modified_count = 0
        signpost_count = 0
        
        for i, path in enumerate(files, 1):
            print(f"[{i}/{len(files)}] {path.relative_to(self.docs_dir)}")
            result = self.add_signposts(path)
            if result:
                results.append(result)
                if result['modified']:
                    modified_count += 1
                    signpost_count += result['count']
                    print(f"  ✓ Added: {', '.join(result['signposts_added'])}")
        
        return {
            'summary': {
                'total': len(files),
                'modified': modified_count,
                'signposts': signpost_count,
                'errors': len(self.errors),
                'mode': 'dry_run' if self.dry_run else 'write'
            },
            'results': results,
            'errors': self.errors
        }


def main():
    parser = argparse.ArgumentParser(description='Add signposts to documentation')
    parser.add_argument('docs_dir', help='Documentation directory')
    parser.add_argument('--output', default='signpost-report.json', help='Output report')
    parser.add_argument('--dry-run', action='store_true', help='Preview only')
    args = parser.parse_args()
    
    if not os.path.isdir(args.docs_dir):
        print(f"Error: Directory not found: {args.docs_dir}")
        return 1
    
    adder = SignpostAdder(args.docs_dir, dry_run=args.dry_run)
    results = adder.process_directory()
    
    with open(args.output, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)
    
    print("\n" + "="*60)
    print("SIGNPOST SUMMARY")
    print("="*60)
    print(f"Files processed: {results['summary']['total']}")
    print(f"Files modified: {results['summary']['modified']}")
    print(f"Signposts added: {results['summary']['signposts']}")
    print(f"Errors: {results['summary']['errors']}")
    print(f"\nReport: {args.output}")
    print("\n✓ Complete!")
    
    return 1 if results['errors'] else 0


if __name__ == '__main__':
    exit(main())
