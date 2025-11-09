#!/usr/bin/env python3
"""
Analyze broken links report to identify fix patterns for T021.
"""
import json
from pathlib import Path
from collections import Counter, defaultdict
import re

def analyze_broken_links():
    """Analyze broken links report and identify patterns."""
    report_path = Path('reports/tests/link-validation.json')
    
    if not report_path.exists():
        print(f"❌ Report not found: {report_path}")
        return
    
    with open(report_path, 'r', encoding='utf-8') as f:
        links = json.load(f)
    
    # Filter broken links
    broken_links = [link for link in links if not link['is_valid']]
    
    print("=" * 80)
    print("BROKEN LINKS ANALYSIS - T021 Pattern Identification")
    print("=" * 80)
    print(f"Total broken links: {len(broken_links)}")
    print()
    
    # Pattern 1: Analyze by target type
    print("📊 Pattern Analysis by Target Type:")
    target_patterns = defaultdict(list)
    
    for link in broken_links:
        target = link['link_target']
        if '/api/' in target:
            if target.endswith('.html'):
                target_patterns['html_api'].append(link)
            elif target.endswith('.md'):
                target_patterns['md_api'].append(link)
            else:
                target_patterns['other_api'].append(link)
        elif '../../playground/' in target:
            target_patterns['playground'].append(link)
        elif target.startswith('#'):
            target_patterns['self_anchor'].append(link)
        elif target.startswith('../'):
            target_patterns['relative'].append(link)
        elif target.startswith('/'):
            target_patterns['absolute'].append(link)
        else:
            target_patterns['other'].append(link)
    
    for pattern, links_list in sorted(target_patterns.items(), key=lambda x: len(x[1]), reverse=True):
        print(f"  {pattern}: {len(links_list)} links")
    
    print()
    
    # Pattern 2: Analyze by file location
    print("📂 Top Files with Broken Links:")
    file_counts = Counter(link['source_file'] for link in broken_links)
    for file_path, count in file_counts.most_common(10):
        relative_path = file_path.replace('docs/docs/', '')
        print(f"  {relative_path}: {count} broken links")
    print()
    
    # Pattern 3: Common error patterns
    print("🔍 Common Error Patterns:")
    error_patterns = defaultdict(list)
    
    for link in broken_links:
        error = link.get('validation_error', 'No error message')
        target = link['link_target']
        
        if 'Anchor not found' in error:
            error_patterns['missing_anchors'].append(link)
        elif 'Target not found' in error:
            if '/api/' in target:
                error_patterns['missing_api_files'].append(link)
            elif 'playground' in target:
                error_patterns['missing_playground'].append(link)
            else:
                error_patterns['missing_files'].append(link)
        else:
            error_patterns['other_errors'].append(link)
    
    for pattern, links_list in sorted(error_patterns.items(), key=lambda x: len(x[1]), reverse=True):
        print(f"  {pattern}: {len(links_list)} links")
        if pattern == 'missing_anchors' and len(links_list) > 0:
            # Show some anchor examples
            anchor_examples = set()
            for link in links_list[:10]:
                if '#' in link['link_target']:
                    anchor = link['link_target'].split('#')[1]
                    anchor_examples.add(anchor)
            if anchor_examples:
                print(f"    Common missing anchors: {', '.join(list(anchor_examples)[:5])}")
    print()
    
    # Pattern 4: Specific recommendations
    print("🎯 Fix Recommendations by Priority:")
    
    # High priority: API documentation issues
    api_issues = len(target_patterns.get('html_api', [])) + len(target_patterns.get('md_api', []))
    playground_issues = len(target_patterns.get('playground', []))
    anchor_issues = len(error_patterns.get('missing_anchors', []))
    
    print(f"  1. HIGH: Fix API documentation links ({api_issues} links)")
    print(f"     - Update HTML API links to new TypeDoc structure")
    print(f"     - Map old paths to new paths")
    
    print(f"  2. MEDIUM: Fix missing anchors ({anchor_issues} links)")
    print(f"     - Generate missing anchor targets")
    print(f"     - Update anchor fragment formats")
    
    print(f"  3. LOW: Fix playground links ({playground_issues} links)")
    print(f"     - Update playground URL structure")
    print(f"     - Verify playground examples exist")
    
    # Save detailed analysis
    analysis_report = {
        'summary': {
            'total_broken_links': len(broken_links),
            'by_pattern': {k: len(v) for k, v in target_patterns.items()},
            'by_error_type': {k: len(v) for k, v in error_patterns.items()},
            'top_problem_files': dict(file_counts.most_common(10))
        },
        'patterns': {
            'api_links': [link['link_target'] for link in target_patterns.get('html_api', [])[:10]],
            'playground_links': [link['link_target'] for link in target_patterns.get('playground', [])[:10]],
            'missing_anchors': [link['link_target'] for link in error_patterns.get('missing_anchors', [])[:10]]
        }
    }
    
    output_path = Path('reports/docs-warnings/t021-link-patterns.json')
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(analysis_report, f, indent=2)
    
    print(f"\n✅ Detailed analysis saved to: {output_path}")
    return analysis_report

if __name__ == '__main__':
    analyze_broken_links()