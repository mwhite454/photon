#!/usr/bin/env python3
"""
Update API documentation links from old maker.js style to new TypeDoc style.
Performs actual file updates with backup.
"""

import os
import re
import json
import shutil
from pathlib import Path
from collections import defaultdict

# Define the project structure
DOCS_DIR = Path(__file__).parent.parent.parent / "docs" / "docs"
SNIPPETS_DIR = DOCS_DIR / "snippets"

def map_api_url(old_url):
    """
    Map old maker.js API URL to new TypeDoc URL structure.
    
    Examples:
    ../api/modules/angle.md#mirror -> ../api/modules/core_angle.html#mirror
    /docs/api/modules/makerjs.path.md#clone -> ../api/modules/core_path.html#clone
    /docs/api/index.md#_ -> ../api/index.html#_
    /docs/api/interfaces/makerjs.icascademodel.md -> ../api/interfaces/makerjs.icascademodel.html
    """
    # Handle index page links
    if '/api/index.md' in old_url:
        anchor = ''
        if '#' in old_url:
            anchor = old_url[old_url.index('#'):]
        return f'../api/index.html{anchor}'
    
    # Handle interfaces (less common but exist)
    if '/interfaces/' in old_url:
        new_url = old_url.replace('/docs/api/', '../api/').replace('.md', '.html')
        # Interfaces might not exist in new TypeDoc - return as-is for now
        return new_url
    
    # Handle module links
    module_match = re.search(r'/modules/(?:makerjs\.)?([^./#]+)', old_url)
    if not module_match:
        return None
    
    module_name = module_match.group(1)
    
    # Extract anchor if present (convert to lowercase for TypeDoc)
    anchor = ''
    if '#' in old_url:
        anchor_part = old_url[old_url.index('#')+1:]
        # TypeDoc uses lowercase IDs
        anchor = '#' + anchor_part.lower()
    
    # Map module names - most get core_ prefix
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
        'base': 'core_base',
        'collect': 'core_collect',
        'kit': 'core_kit',
        'xml': 'core_xml',
        'dxf': 'core_dxf',
        'svg': 'core_svg-esm',
        'pdf': 'core_pdf-esm',
        'openjscad': 'core_openjscad-esm',
    }
    
    new_module = module_mappings.get(module_name, f'core_{module_name}')
    
    # Determine if we need ../ or /docs/ prefix
    if old_url.startswith('../'):
        prefix = '../api/'
    elif old_url.startswith('/docs/'):
        prefix = '../api/'
    else:
        prefix = '../api/'
    
    new_url = f'{prefix}modules/{new_module}.html{anchor}'
    
    return new_url

def update_api_links_in_file(file_path, dry_run=False):
    """Update all API links in a markdown file."""
    changes = []
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        original_content = content
    
    # Pattern to match markdown links pointing to API docs
    pattern = r'\[([^\]]+)\]\(([^)]*(?:/api/|makerjs\.)[^)]*\.md[^)]*)\)'
    
    def replace_link(match):
        link_text = match.group(1)
        old_url = match.group(2)
        
        new_url = map_api_url(old_url)
        
        if new_url:
            changes.append({
                'text': link_text,
                'old_url': old_url,
                'new_url': new_url
            })
            return f'[{link_text}]({new_url})'
        else:
            # Couldn't map - keep original
            return match.group(0)
    
    content = re.sub(pattern, replace_link, content)
    
    if not dry_run and content != original_content:
        # Create backup
        backup_path = str(file_path) + '.backup-api-links'
        shutil.copy2(file_path, backup_path)
        
        # Write updated content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    
    return changes

def update_all_links(dry_run=False):
    """Update all API links in all documentation files."""
    print("🔄 Updating API documentation links...\n")
    
    all_changes = defaultdict(list)
    total_changes = 0
    
    # Process all markdown files in snippets
    for md_file in SNIPPETS_DIR.glob('**/*.md'):
        if '.backup' in str(md_file):
            continue
        
        changes = update_api_links_in_file(md_file, dry_run=dry_run)
        
        if changes:
            rel_path = md_file.relative_to(DOCS_DIR)
            all_changes[str(rel_path)] = changes
            total_changes += len(changes)
    
    # Generate report
    mode = "DRY RUN" if dry_run else "APPLIED"
    print("=" * 80)
    print(f"API LINKS UPDATE REPORT ({mode})")
    print("=" * 80)
    print(f"\n📊 Summary:")
    print(f"   Files with changes: {len(all_changes)}")
    print(f"   Total links updated: {total_changes}")
    
    if all_changes:
        print(f"\n📝 Changes by file (showing first 10):")
        for i, (file, changes) in enumerate(list(all_changes.items())[:10]):
            print(f"\n   {file} ({len(changes)} changes):")
            for change in changes[:3]:
                print(f"      '{change['text']}'")
                print(f"        {change['old_url']}")
                print(f"      → {change['new_url']}")
            if len(changes) > 3:
                print(f"      ... and {len(changes) - 3} more")
            if i >= 9:
                break
    
    if not dry_run:
        print(f"\n✅ Backup files created with .backup-api-links extension")
        print(f"   To revert: rename .backup-api-links files back to .md")
    else:
        print(f"\n⚠️  DRY RUN - No files were modified")
        print(f"   Run with --apply to apply changes")
    
    # Save detailed report
    report_file = Path(__file__).parent.parent.parent / 'reports' / 'migration' / 'api-links-update-report.json'
    report_file.parent.mkdir(parents=True, exist_ok=True)
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump({
            'mode': mode,
            'summary': {
                'files_changed': len(all_changes),
                'total_changes': total_changes
            },
            'changes': dict(all_changes)
        }, f, indent=2)
    
    print(f"\n📄 Full report saved to: {report_file}\n")
    
    return all_changes

if __name__ == '__main__':
    import sys
    
    # Check for --apply flag
    dry_run = '--apply' not in sys.argv
    
    if dry_run:
        print("Running in DRY RUN mode. Use --apply to actually update files.\n")
    
    update_all_links(dry_run=dry_run)
