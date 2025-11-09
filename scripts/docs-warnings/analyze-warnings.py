#!/usr/bin/env python3
"""
Analyze MkDocs warnings and generate progress reports.
"""
import json
from pathlib import Path

def main():
    print("📊 Analyzing warning reports...")
    baseline_path = Path('reports/baselines/warning-baseline.json')
    # This script will be expanded later to compare against a progress report
    if not baseline_path.exists():
        print("Baseline report not found. Please run capture-warnings.py first.")
        return

    with open(baseline_path, 'r') as f:
        baseline_report = json.load(f)

    print("Baseline Summary:")
    print(f"  Total warnings: {baseline_report['total_warnings']}")
    print(f"  Target: {baseline_report['target_warnings']} (70% reduction)")
    print("\nTop categories:")
    for cat, data in sorted(
        baseline_report['category_summary'].items(),
        key=lambda x: x[1]['count'],
        reverse=True
    ):
        print(f"  - {cat}: {data['count']} ({data['percentage']}%)")

if __name__ == '__main__':
    main()
