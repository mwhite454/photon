#!/usr/bin/env python3
"""
Analyze broken links report and identify fix patterns.
Part of T021 implementation for MkDocs Warning Remediation.
"""
import json
import re
from collections import defaultdict, Counter
from pathlib import Path


def analyze_broken_links_report():
    """Analyze the broken links report and identify patterns for fixing."""
    
    # Load the link validation report
    report_file = Path('reports/tests/link-validation.json')
    if not report_file.exists():
        print("❌ Link validation report not found. Run validate-links.py first.")
        return
    
    with open(report_file, 'r') as f:
        links = json.load(f)
    
    # Filter broken links
    broken_links = [link for link in links if not link['is_valid']]
    valid_links = [link for link in links if link['is_valid']]
    
    print("🔍 BROKEN LINKS ANALYSIS REPORT")
    print("=" * 50)
    print(f"Total links analyzed: {len(links)}")
    print(f"Valid links: {len(valid_links)} ({len(valid_links)/len(links)*100:.1f}%)")
    print(f"Broken links: {len(broken_links)} ({len(broken_links)/len(links)*100:.1f}%)")
    
    # 1. Error Type Analysis
    print(f"\n📊 ERROR TYPE BREAKDOWN")
    print("-" * 30)
    
    error_types = defaultdict(list)
    for link in broken_links:
        error_msg = link.get('validation_error', 'Unknown error')
        if 'Target not found' in error_msg:
            error_types['missing_files'].append(link)
        elif 'Anchor not found' in error_msg:
            error_types['missing_anchors'].append(link)
        else:
            error_types['other_errors'].append(link)
    
    for error_type, links_list in error_types.items():
        print(f"  {error_type}: {len(links_list)} links")
    
    # 2. Most Problematic Files
    print(f"\n📂 FILES WITH MOST BROKEN LINKS")
    print("-" * 35)
    
    files_with_issues = Counter()
    for link in broken_links:
        files_with_issues[link['source_file']] += 1
    
    for file_path, count in files_with_issues.most_common(10):
        short_path = file_path.replace('docs/docs/', '')
        print(f"  {count:3d} broken links: {short_path}")
    
    # 3. Link Target Pattern Analysis
    print(f"\n🎯 BROKEN LINK TARGET PATTERNS")
    print("-" * 35)
    
    target_patterns = Counter()
    for link in broken_links:
        target = link['link_target']
        
        if target.startswith('../api/') and target.endswith('.html'):
            target_patterns['old_html_api_links'] += 1
        elif target.startswith('../converted/api/'):
            target_patterns['converted_api_links'] += 1
        elif '/docs/' in target and target.startswith('/'):
            target_patterns['absolute_docs_paths'] += 1
        elif 'playground' in target:
            target_patterns['playground_references'] += 1
        elif target.startswith('/docs/api/'):
            target_patterns['old_docs_api_paths'] += 1
        elif '#' in target and target.count('/') == 0:
            target_patterns['self_anchor_links'] += 1
        else:
            target_patterns['other_broken_patterns'] += 1
    
    for pattern, count in target_patterns.most_common():
        print(f"  {count:3d} links: {pattern}")
    
    # 4. Missing Anchor Analysis
    print(f"\n⚓ MISSING ANCHOR PATTERNS")
    print("-" * 30)
    
    anchor_patterns = Counter()
    anchor_details = []
    
    for link in broken_links:
        if 'Anchor not found' in link.get('validation_error', ''):
            target = link['link_target']
            if '#' in target:
                file_part, anchor = target.split('#', 1)
                anchor_details.append({
                    'source': link['source_file'],
                    'target_file': file_part,
                    'anchor': anchor,
                    'full_target': target
                })
                
                if anchor.startswith('optional'):
                    anchor_patterns['optional_property_anchors'] += 1
                elif anchor in ['content', 'constructor']:
                    anchor_patterns['standard_page_anchors'] += 1
                elif re.match(r'^[a-z]+$', anchor.lower()):
                    anchor_patterns['simple_function_anchors'] += 1
                else:
                    anchor_patterns['complex_anchors'] += 1
    
    for pattern, count in anchor_patterns.most_common():
        print(f"  {count:3d} anchors: {pattern}")
    
    # 5. Generate Fix Recommendations
    print(f"\n🔧 RECOMMENDED FIX PATTERNS")
    print("-" * 32)
    
    print("1. API Documentation Links (HTML → Markdown):")
    html_api_count = target_patterns.get('old_html_api_links', 0)
    if html_api_count > 0:
        print(f"   - {html_api_count} links need conversion from ../api/*.html to ../converted/api/*.md")
        print("   - Pattern: ../api/modules/core_model.html → ../converted/api/modules/core_model.md")
    
    print("\n2. Missing Anchor Fixes:")
    if anchor_patterns.get('optional_property_anchors', 0) > 0:
        print(f"   - {anchor_patterns['optional_property_anchors']} links need 'optional' prefix anchor correction")
        print("   - Pattern: #units → #optionalunits")
    
    print("\n3. Absolute Path Corrections:")
    abs_path_count = target_patterns.get('absolute_docs_paths', 0)
    if abs_path_count > 0:
        print(f"   - {abs_path_count} links need conversion from absolute to relative paths")
        print("   - Pattern: /docs/getting-started/ → ../getting-started/")
    
    print("\n4. Playground Link Updates:")
    playground_count = target_patterns.get('playground_references', 0) 
    if playground_count > 0:
        print(f"   - {playground_count} playground links may need path corrections")
        print("   - Review playground deployment structure")
    
    # 6. Save detailed analysis for further processing
    analysis_output = {
        'summary': {
            'total_links': len(links),
            'valid_links': len(valid_links),
            'broken_links': len(broken_links),
            'success_rate': len(valid_links)/len(links)*100
        },
        'error_types': {k: len(v) for k, v in error_types.items()},
        'target_patterns': dict(target_patterns),
        'anchor_patterns': dict(anchor_patterns),
        'most_problematic_files': dict(files_with_issues.most_common(20)),
        'missing_anchor_details': anchor_details[:100]  # Top 100 for analysis
    }
    
    output_file = Path('reports/docs-warnings/broken-links-analysis.json')
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_file, 'w') as f:
        json.dump(analysis_output, f, indent=2)
    
    print(f"\n💾 Detailed analysis saved to: {output_file}")
    print(f"\n✅ T021 COMPLETE: Broken links patterns identified and documented")
    

if __name__ == '__main__':
    analyze_broken_links_report()