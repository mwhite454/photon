#!/usr/bin/env python3
"""
Analyze markdown lint results and categorize issues by type.
"""
import json
from collections import Counter
from pathlib import Path


def analyze_markdown_issues():
    """Analyze markdown lint results and categorize by issue type."""
    results_file = Path('reports/tests/markdown-lint.json')

    if not results_file.exists():
        print("❌ markdown-lint.json not found. Run check-markdown-syntax.py first.")
        return False

    with open(results_file, 'r', encoding='utf-8') as f:
        issues = json.load(f)

    if not issues:
        print("✅ No markdown syntax issues found")
        return True

    # Categorize issues
    rule_counter = Counter()
    file_counter = Counter()
    category_summary = {
        'heading_hierarchy': [],
        'code_blocks': [],
        'tables': [],
        'lists': [],
        'whitespace': [],
        'other': []
    }

    for issue in issues:
        rule_name = issue['ruleNames'][0] if issue['ruleNames'] else 'unknown'
        rule_counter[rule_name] += 1
        file_counter[issue['fileName']] += 1

        # Categorize by type
        if rule_name in ['MD001', 'MD002', 'MD003', 'MD025']:
            category_summary['heading_hierarchy'].append(issue)
        elif rule_name in ['MD046', 'MD040', 'MD048']:
            category_summary['code_blocks'].append(issue)
        elif rule_name in ['MD055', 'MD056', 'MD058']:
            category_summary['tables'].append(issue)
        elif rule_name in ['MD004', 'MD005', 'MD006', 'MD007', 'MD032']:
            category_summary['lists'].append(issue)
        elif rule_name in ['MD009', 'MD010', 'MD012', 'MD047']:
            category_summary['whitespace'].append(issue)
        else:
            category_summary['other'].append(issue)

    # Print summary
    print(f"📊 Markdown Syntax Analysis Summary")
    print(f"Total issues: {len(issues)}")
    print(f"Files affected: {len(file_counter)}")
    print()

    print("🔍 Issues by Rule:")
    for rule, count in sorted(rule_counter.items(), key=lambda x: x[1], reverse=True):
        description = issues[0]['ruleDescription'] if issues else rule
        for i in issues:
            if i['ruleNames'] and i['ruleNames'][0] == rule:
                description = i['ruleDescription']
                break
        print(f"  {rule}: {count} ({description})")

    print()
    print("📂 Issues by Category:")
    for category, issues_list in category_summary.items():
        if issues_list:
            print(f"  {category.replace('_', ' ').title()}: {len(issues_list)} issues")

    print()
    print("📈 Top 10 Most Affected Files:")
    for file_path, count in sorted(file_counter.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"  {file_path}: {count} issues")

    # Save detailed analysis
    analysis_file = Path('reports/docs-warnings/markdown-issues-analysis.json')
    analysis_file.parent.mkdir(parents=True, exist_ok=True)

    analysis = {
        'summary': {
            'total_issues': len(issues),
            'total_files': len(file_counter),
            'issues_by_rule': dict(rule_counter),
            'issues_by_category': {k: len(v) for k, v in category_summary.items()},
            'top_affected_files': dict(sorted(file_counter.items(), key=lambda x: x[1], reverse=True)[:20])
        },
        'categories': category_summary
    }

    with open(analysis_file, 'w', encoding='utf-8') as f:
        json.dump(analysis, f, indent=2, ensure_ascii=False)

    print(f"\n📊 Detailed analysis saved to {analysis_file}")

    return True


if __name__ == '__main__':
    success = analyze_markdown_issues()
    exit(0 if success else 1)
