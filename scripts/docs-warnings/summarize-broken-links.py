#!/usr/bin/env python3
"""
Summarize broken links from the link-validation.json report.
"""
import json
from pathlib import Path
from collections import defaultdict

def main():
    print("📝 Summarizing broken links...")
    report_path = Path('reports/tests/link-validation.json')
    if not report_path.exists():
        print("Link validation report not found. Please run validate-links.py first.")
        return

    with open(report_path, 'r') as f:
        links = json.load(f)

    broken_links = [link for link in links if not link['is_valid']]
    
    if not broken_links:
        print("✅ No broken links found!")
        return

    print(f"❌ Found {len(broken_links)} broken links. Grouping by file:")

    links_by_file = defaultdict(list)
    for link in broken_links:
        links_by_file[link['source_file']].append(link)

    for source_file, file_links in links_by_file.items():
        print(f"\n📄 File: {source_file}")
        for link in file_links:
            print(f"  - Line {link['source_line']}: [{link['link_text']}]({link['link_target']})")

if __name__ == '__main__':
    main()
