#!/usr/bin/env python3
"""
Validation script for T022-T024 completion.
Verifies that the specified files have no broken links.
"""
import json
from pathlib import Path


def validate_task_completion():
    """Validate that T022-T024 tasks are complete by checking specific files."""
    
    # Load the link validation report
    report_file = Path('reports/tests/link-validation.json')
    with open(report_file, 'r') as f:
        links = json.load(f)
    
    # Define target files for each task
    task_files = {
        'T022': ['docs/docs/snippets/models.md'],
        'T023': ['docs/docs/snippets/path-independence.md'],
        'T024': ['docs/docs/basic-drawing/index.md']  # Main file in basic-drawing
    }
    
    print("🔍 VALIDATING T022-T024 COMPLETION")
    print("=" * 40)
    
    all_tasks_complete = True
    
    for task_id, file_paths in task_files.items():
        print(f"\n{task_id}: Checking {len(file_paths)} file(s)")
        
        task_broken_links = []
        for file_path in file_paths:
            file_broken_links = [
                link for link in links 
                if not link['is_valid'] and link['source_file'].endswith(file_path.replace('docs/docs/', ''))
            ]
            task_broken_links.extend(file_broken_links)
        
        if task_broken_links:
            print(f"  ❌ {len(task_broken_links)} broken links found")
            for link in task_broken_links[:3]:  # Show first 3
                print(f"     Line {link['source_line']}: {link['link_target']}")
            if len(task_broken_links) > 3:
                print(f"     ... and {len(task_broken_links) - 3} more")
            all_tasks_complete = False
        else:
            print(f"  ✅ No broken links found - Task complete")
    
    print(f"\n📊 SUMMARY")
    print("-" * 20)
    if all_tasks_complete:
        print("✅ All tasks T022-T024 are COMPLETE")
        print("   The specified files have no broken links.")
    else:
        print("❌ Some tasks still have broken links")
    
    return all_tasks_complete


if __name__ == '__main__':
    validate_task_completion()