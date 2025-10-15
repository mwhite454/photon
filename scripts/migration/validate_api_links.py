#!/usr/bin/env python3
"""
Validate and report on API documentation links in the migrated documentation.
Compares old-style maker.js API links with new TypeDoc-generated structure.
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict

# Define the project structure
DOCS_DIR = Path(__file__).parent.parent.parent / "docs" / "docs"
API_DIR = DOCS_DIR / "api"
SNIPPETS_DIR = DOCS_DIR / "snippets"

def get_typedoc_files():
    """Get all TypeDoc-generated HTML files."""
    typedoc_files = set()
    
    for root, dirs, files in os.walk(API_DIR):
        for file in files:
            if file.endswith('.html'):
                rel_path = os.path.relpath(os.path.join(root, file), API_DIR)
                typedoc_files.add(rel_path)
    
    return typedoc_files

def extract_api_links(file_path):
    """Extract all API documentation links from a markdown file."""
    links = []
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # Pattern to match markdown links pointing to API docs
        # Matches both relative and absolute API links
        pattern = r'\[([^\]]+)\]\(([^)]*(?:api|makerjs\.)[^)]*)\)'
        
        matches = re.finditer(pattern, content, re.IGNORECASE)
        for match in matches:
            link_text = match.group(1)
            link_url = match.group(2)
            line_num = content[:match.start()].count('\n') + 1
            
            links.append({
                'text': link_text,
                'url': link_url,
                'line': line_num,
                'file': str(file_path.relative_to(DOCS_DIR))
            })
    
    return links

def map_old_to_new_api_path(old_url):
    """
    Map old maker.js API URL to new TypeDoc URL structure.
    
    Examples:
    ../api/modules/angle.md#mirror -> ../api/modules/core_angle.html#mirror
    /docs/api/modules/makerjs.path.md#clone -> /docs/api/modules/core_path.html#clone
    """
    # Remove domain and protocol if present
    url = re.sub(r'^https?://[^/]+', '', old_url)
    
    # Extract module name and anchor
    module_match = re.search(r'/modules/(?:makerjs\.)?([^./#]+)', url)
    if not module_match:
        return None
    
    module_name = module_match.group(1)
    
    # Extract anchor if present
    anchor_match = re.search(r'#(.+)$', url)
    anchor = '#' + anchor_match.group(1) if anchor_match else ''
    
    # Map module names to TypeDoc structure
    # Most modules are now prefixed with core_
    module_mappings = {
        'angle': 'core_angle',
        'point': 'core_point',
        'path': 'core_path',
        'model': 'core_model',
        'measure': 'core_measure',
        'chain': 'core_chain',
        'layout': 'core_layout',
        'exporter': 'core_exporter',
        'importer': 'core_importer',
        'units': 'core_units',
        'solvers': 'core_solvers',
        'combine': 'core_combine',
        'expand': 'core_expand',
        'break': 'core_break',
        'simplify': 'core_simplify',
        # Add more mappings as needed
    }
    
    new_module = module_mappings.get(module_name, f'core_{module_name}')
    new_url = f'../api/modules/{new_module}.html{anchor}'
    
    return new_url

def validate_links():
    """Validate all API links in documentation."""
    print("🔍 Validating API documentation links...\n")
    
    # Get all TypeDoc files
    typedoc_files = get_typedoc_files()
    print(f"Found {len(typedoc_files)} TypeDoc HTML files\n")
    
    # Collect all API links from snippets
    all_links = []
    for md_file in SNIPPETS_DIR.glob('**/*.md'):
        if '.backup' not in str(md_file):
            links = extract_api_links(md_file)
            all_links.extend(links)
    
    print(f"Found {len(all_links)} API links in documentation\n")
    
    # Categorize links
    valid_links = []
    broken_links = []
    external_links = []
    
    for link in all_links:
        url = link['url']
        
        # Skip external/absolute URLs (microsoft.github.io, etc.)
        if url.startswith('http'):
            external_links.append(link)
            continue
        
        # Check if it's an old-style API link that needs updating
        if '/api/' in url or 'makerjs.' in url:
            new_url = map_old_to_new_api_path(url)
            
            if new_url:
                # Check if the new URL file exists
                # Remove ../ and convert to file path
                file_check = new_url.replace('../api/', '').replace('#', '').split('#')[0]
                
                if file_check in [f.replace('\\', '/') for f in typedoc_files]:
                    link['new_url'] = new_url
                    link['status'] = 'needs_update'
                    valid_links.append(link)
                else:
                    link['new_url'] = new_url
                    link['status'] = 'broken'
                    broken_links.append(link)
            else:
                link['status'] = 'unmapped'
                broken_links.append(link)
    
    # Generate report
    report = {
        'summary': {
            'total_links': len(all_links),
            'valid_links': len(valid_links),
            'broken_links': len(broken_links),
            'external_links': len(external_links)
        },
        'needs_update': valid_links,
        'broken': broken_links,
        'external': external_links
    }
    
    # Save detailed report
    report_file = Path(__file__).parent.parent.parent / 'reports' / 'migration' / 'api-links-validation-report.json'
    report_file.parent.mkdir(parents=True, exist_ok=True)
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)
    
    print("=" * 80)
    print("API LINKS VALIDATION REPORT")
    print("=" * 80)
    print(f"\n📊 Summary:")
    print(f"   Total API links found: {report['summary']['total_links']}")
    print(f"   ✅ Links that can be updated: {report['summary']['valid_links']}")
    print(f"   ❌ Broken/unmapped links: {report['summary']['broken_links']}")
    print(f"   🌐 External links (skipped): {report['summary']['external_links']}")
    
    if broken_links:
        print(f"\n❌ Broken Links ({len(broken_links)}):")
        by_file = defaultdict(list)
        for link in broken_links[:10]:  # Show first 10
            by_file[link['file']].append(link)
        
        for file, links in list(by_file.items())[:5]:
            print(f"\n   {file}:")
            for link in links[:3]:
                print(f"      Line {link['line']}: {link['url']}")
    
    if valid_links:
        print(f"\n✅ Links that need updating ({len(valid_links)}):")
        by_file = defaultdict(list)
        for link in valid_links[:10]:  # Show first 10
            by_file[link['file']].append(link)
        
        for file, links in list(by_file.items())[:5]:
            print(f"\n   {file}:")
            for link in links[:3]:
                print(f"      Line {link['line']}: {link['url']} -> {link['new_url']}")
    
    print(f"\n📄 Full report saved to: {report_file}")
    
    return report

if __name__ == '__main__':
    validate_links()
