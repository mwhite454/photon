#!/usr/bin/env python3
"""
Capture and categorize MkDocs build warnings.
"""
import subprocess
import re
import json
import hashlib
from datetime import datetime
from pathlib import Path

# Warning patterns
PATTERNS = {
    'broken_link': r"contains a link.*but the target.*is not found",
    'missing_reference': r'reference target not found',
    'syntax_error': r'markdown syntax|Invalid',
    'plugin_warning': r'plugin',
    'config_warning': r'configuration|deprecated',
    'file_conflict': r'Excluding.*from the site because it conflicts with'
}

def capture_warnings():
    """Run MkDocs build and capture warnings."""
    result = subprocess.run(
        ['mkdocs', 'build', '--strict'],
        cwd='docs',
        capture_output=True,
        text=True
    )
    
    warnings = []
    for line in result.stderr.split('\n'):
        if 'WARNING' in line:
            warning = parse_warning(line)
            if warning:
                warnings.append(warning)
    
    return warnings

def parse_warning(line):
    """Parse a warning line into structured data."""
    # Extract file path and line number
    file_match = re.search(r"Doc file '([^']*)'", line)
    if not file_match:
        file_match = re.search(r"Excluding '([^']*)'", line)

    line_match = re.search(r'line (\d+)', line)
    
    file_path = file_match.group(1) if file_match else 'unknown'
    line_number = int(line_match.group(1)) if line_match else None
    
    # Categorize warning
    category = 'other'
    for cat, pattern in PATTERNS.items():
        if re.search(pattern, line, re.IGNORECASE):
            category = cat
            break
    
    # Generate unique ID
    warning_id = hashlib.md5(
        f"{file_path}:{line_number}:{line}".encode()
    ).hexdigest()[:8]
    
    return {
        'id': warning_id,
        'timestamp': datetime.utcnow().isoformat() + 'Z',
        'file_path': file_path,
        'line_number': line_number,
        'category': category,
        'severity': 'warning',
        'message': line.strip(),
        'raw_output': line,
        'status': 'pending'
    }

def generate_baseline_report(warnings):
    """Generate baseline report."""
    # Category summary
    category_summary = {}
    for warning in warnings:
        cat = warning['category']
        if cat not in category_summary:
            category_summary[cat] = {
                'count': 0,
                'percentage': 0.0,
                'fixed': 0,
                'pending': 0
            }
        category_summary[cat]['count'] += 1
        category_summary[cat]['pending'] += 1
    
    # Calculate percentages
    total = len(warnings)
    for cat in category_summary:
        category_summary[cat]['percentage'] = round(
            (category_summary[cat]['count'] / total) * 100, 1
        )
    
    # File summary
    file_summary = {}
    for warning in warnings:
        file_path = warning['file_path']
        if file_path not in file_summary:
            file_summary[file_path] = {
                'warning_count': 0,
                'categories': {},
                'status': {'pending': 0}
            }
        file_summary[file_path]['warning_count'] += 1
        
        cat = warning['category']
        if cat not in file_summary[file_path]['categories']:
            file_summary[file_path]['categories'][cat] = 0
        file_summary[file_path]['categories'][cat] += 1
        file_summary[file_path]['status']['pending'] += 1
    
    # Generate report
    report = {
        'report_id': f"baseline-{datetime.utcnow().strftime('%Y-%m-%d')}",
        'report_type': 'baseline',
        'timestamp': datetime.utcnow().isoformat() + 'Z',
        'total_warnings': total,
        'target_warnings': 150,  # 70% reduction target
        'reduction_percentage': 0.0,
        'warnings': warnings,
        'category_summary': category_summary,
        'file_summary': file_summary,
        'remediation_summary': {
            'fixed': 0,
            'pending': total,
            'accepted': 0,
            'deferred': 0,
            'in_progress': 0
        }
    }
    
    return report

def main():
    print("🔍 Capturing MkDocs warnings...")
    warnings = capture_warnings()
    
    print(f"📊 Found {len(warnings)} warnings")
    
    print("📝 Generating baseline report...")
    report = generate_baseline_report(warnings)
    
    # Save report
    output_path = Path('reports/baselines/warning-baseline.json')
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"✅ Baseline report saved to {output_path}")
    print(f"\nSummary:")
    print(f"  Total warnings: {report['total_warnings']}")
    print(f"  Target: {report['target_warnings']} (70% reduction)")
    print(f"\nTop categories:")
    for cat, data in sorted(
        report['category_summary'].items(),
        key=lambda x: x[1]['count'],
        reverse=True
    ):
        print(f"  - {cat}: {data['count']} ({data['percentage']}%)")

if __name__ == '__main__':
    main()
