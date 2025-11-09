#!/usr/bin/env python3
"""
Create detailed inventory of broken links to properly scope T026 and create manageable subtasks.
"""
import json
from pathlib import Path
from collections import Counter, defaultdict

def create_broken_links_inventory():
    """Create comprehensive inventory of broken links for task planning."""
    
    report_path = Path('reports/tests/link-validation.json')
    with open(report_path, 'r') as f:
        links = json.load(f)
    
    broken_links = [link for link in links if not link['is_valid']]
    
    print("=" * 80)
    print("BROKEN LINKS INVENTORY FOR TASK PLANNING")
    print("=" * 80)
    print(f"Total broken links: {len(broken_links)}")
    print()
    
    # Group by directory structure
    directory_groups = defaultdict(list)
    for link in broken_links:
        source_file = link['source_file']
        if 'converted/api/' in source_file:
            directory_groups['converted_api'].append(link)
        elif 'snippets/' in source_file:
            directory_groups['snippets'].append(link)
        elif 'basic-drawing/' in source_file:
            directory_groups['basic_drawing'].append(link)
        elif 'advanced-drawing/' in source_file:
            directory_groups['advanced_drawing'].append(link)
        elif 'model-trees/' in source_file:
            directory_groups['model_trees'].append(link)
        elif 'exporting/' in source_file:
            directory_groups['exporting'].append(link)
        elif 'migration/' in source_file:
            directory_groups['migration'].append(link)
        elif 'converted/' in source_file:
            directory_groups['converted_other'].append(link)
        else:
            directory_groups['other'].append(link)
    
    print("📊 Broken Links by Directory:")
    for group, links_list in sorted(directory_groups.items(), key=lambda x: len(x[1]), reverse=True):
        print(f"  {group}: {len(links_list)} links")
    print()
    
    # Analyze the largest problem area (converted/api/)
    api_links = directory_groups.get('converted_api', [])
    print(f"🔍 CONVERTED/API Analysis ({len(api_links)} links):")
    
    if api_links:
        # Group by error type
        api_errors = defaultdict(list)
        for link in api_links:
            error = link.get('validation_error', 'Unknown error')
            if 'Anchor not found' in error:
                api_errors['missing_anchors'].append(link)
            elif 'Target not found' in error:
                api_errors['missing_files'].append(link)
            else:
                api_errors['other_errors'].append(link)
        
        for error_type, error_links in api_errors.items():
            print(f"  {error_type}: {len(error_links)} links")
        
        # Show top problematic files in converted/api/
        api_file_counts = Counter(link['source_file'] for link in api_links)
        print(f"\n  Top 10 problematic files in converted/api/:")
        for file_path, count in api_file_counts.most_common(10):
            short_path = file_path.replace('docs/docs/converted/api/', '')
            print(f"    {short_path}: {count} broken links")
    
    print()
    
    # Analyze snippets directory 
    snippets_links = directory_groups.get('snippets', [])
    print(f"📝 SNIPPETS Analysis ({len(snippets_links)} links):")
    
    if snippets_links:
        snippets_file_counts = Counter(link['source_file'] for link in snippets_links)
        print(f"  Top files with broken links:")
        for file_path, count in snippets_file_counts.most_common(5):
            short_path = file_path.replace('docs/docs/snippets/', '')
            print(f"    {short_path}: {count} broken links")
    
    print()
    
    # Generate task recommendations
    print("🎯 TASK BREAKDOWN RECOMMENDATIONS:")
    print()
    
    task_counter = 26  # Starting from T026
    
    # Break down by manageable chunks
    if len(api_links) > 100:
        print(f"T{task_counter:03d}: Create inventory of converted/api/ broken links ({len(api_links)} links)")
        task_counter += 1
        
        # Break API fixes into smaller chunks
        api_chunks = [api_links[i:i+50] for i in range(0, len(api_links), 50)]
        for i, chunk in enumerate(api_chunks, 1):
            print(f"T{task_counter:03d}: Fix converted/api/ broken links batch {i} (up to 50 links)")
            task_counter += 1
    
    if len(snippets_links) > 10:
        print(f"T{task_counter:03d}: Fix broken links in snippets/ directory ({len(snippets_links)} links)")
        task_counter += 1
    
    # Handle other directories
    for group, links_list in directory_groups.items():
        if group not in ['converted_api', 'snippets'] and len(links_list) > 5:
            clean_name = group.replace('_', '-')
            print(f"T{task_counter:03d}: Fix broken links in {clean_name}/ directory ({len(links_list)} links)")
            task_counter += 1
    
    # Save detailed inventory
    inventory = {
        'summary': {
            'total_broken': len(broken_links),
            'by_directory': {k: len(v) for k, v in directory_groups.items()}
        },
        'detailed_breakdown': {
            'converted_api': {
                'total': len(api_links),
                'by_error_type': {k: len(v) for k, v in (defaultdict(list) if not api_links else 
                    {('missing_anchors' if 'Anchor not found' in link.get('validation_error', '') 
                      else 'missing_files' if 'Target not found' in link.get('validation_error', '')
                      else 'other_errors'): link for link in api_links}.items())},
                'top_files': dict(Counter(link['source_file'] for link in api_links).most_common(20))
            },
            'snippets': {
                'total': len(snippets_links),
                'top_files': dict(Counter(link['source_file'] for link in snippets_links).most_common(10))
            }
        }
    }
    
    output_path = Path('reports/docs-warnings/broken-links-inventory.json')
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(inventory, f, indent=2)
    
    print(f"\n📋 Detailed inventory saved to: {output_path}")
    
    return inventory

if __name__ == '__main__':
    create_broken_links_inventory()