#!/usr/bin/env python3
"""
Audit documentation content to track changes and prevent content loss.
"""
import json
from pathlib import Path
import re

def count_words(text):
    return len(re.findall(r'\w+', text))

def count_headings(text):
    return len(re.findall(r'^#', text, re.MULTILINE))

def count_links(text):
    return len(re.findall(r'\[[^\]]+\]\([^\)]+\)', text))

def main():
    print(" auditing content...")
    docs_dir = Path('docs/docs')
    file_metrics = {}

    for md_file in docs_dir.rglob('*.md'):
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
            file_path = str(md_file.relative_to(Path.cwd()))
            file_metrics[file_path] = {
                'word_count': count_words(content),
                'heading_count': count_headings(content),
                'link_count': count_links(content)
            }

    output_path = Path('reports/tests/content-audit-baseline.json')
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w') as f:
        json.dump(file_metrics, f, indent=2)

    print(f"✅ Content audit baseline saved to {output_path}")

if __name__ == '__main__':
    main()
