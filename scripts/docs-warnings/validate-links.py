#!/usr/bin/env python3
"""
Validate all internal links in documentation.
"""
import re
import json
from pathlib import Path
from datetime import datetime

def find_all_links(docs_dir):
    """Find all markdown links in documentation."""
    links = []
    link_id = 1
    
    for md_file in Path(docs_dir).rglob('*.md'):
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
            lines = content.split('\n')
            
            for line_num, line in enumerate(lines, 1):
                # Find markdown links [text](path)
                for match in re.finditer(r'\[([^\]]+)\]\(([^\)]+)\)', line):
                    link_text = match.group(1)
                    link_target = match.group(2)
                    
                    # Skip external links
                    if link_target.startswith(('http://', 'https://', 'mailto:')):
                        continue
                    
                    # Determine link type
                    if '#' in link_target:
                        link_type = 'anchor'
                    else:
                        link_type = 'internal'
                    
                    links.append({
                        'link_id': f"link-{link_id:03d}",
                        'source_file': str(md_file),
                        'source_line': line_num,
                        'link_text': link_text,
                        'link_target': link_target,
                        'link_type': link_type,
                        'is_valid': None,  # To be validated
                        'status': 'pending'
                    })
                    link_id += 1
    
    return links

def validate_link(link, docs_dir):
    """Validate a single link."""
    source_file = Path(link['source_file'])
    target = link['link_target']
    
    # Resolve relative path
    if target.startswith('/'):
        resolved = (Path(docs_dir) / target[1:]).resolve()
    elif target.startswith('../'):
        # Go up from source file
        resolved = (source_file.parent / target).resolve()
    elif target.startswith('./'):
        resolved = (source_file.parent / target[2:]).resolve()
    else:
        resolved = (source_file.parent / target).resolve()
    
    # Check if file exists
    if '#' in str(resolved):
        file_path, anchor = str(resolved).split('#', 1)
        file_exists = Path(file_path).exists()
        # TODO: Validate anchor exists in target file
        anchor_exists = True  # Simplified for now
        is_valid = file_exists and anchor_exists
    else:
        is_valid = resolved.exists()
    
    link['is_valid'] = is_valid
    link['status'] = 'valid' if is_valid else 'broken'
    
    if not is_valid:
        link['validation_error'] = f"Target not found: {resolved}"
        # TODO: Suggest fix based on similar files
    
    return link

def main():
    print("🔗 Finding all links in documentation...")
    links = find_all_links('docs/docs')
    
    print(f"📊 Found {len(links)} internal links")
    
    print("✅ Validating links...")
    for link in links:
        validate_link(link, 'docs/docs')
    
    broken_links = [l for l in links if not l['is_valid']]
    print(f"❌ Found {len(broken_links)} broken links")
    
    # Save results
    output_path = Path('reports/tests/link-validation.json')
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w') as f:
        json.dump(links, f, indent=2)
    
    print(f"✅ Link validation saved to {output_path}")

if __name__ == '__main__':
    main()
