#!/usr/bin/env python3
"""
Title Deduper for Markdown files

- Merges multiple frontmatter blocks at the top into a single block.
- Keeps the first frontmatter's values by default; fills missing keys from later blocks.
- Removes a redundant top-level H1 heading ("# Title") if it matches the frontmatter title.
- Preserves other content and code blocks.

Usage:
  python scripts/migration/title_deduper.py \
    --source docs-new/docs \
    --report docs-new/title-dedupe.report.json \
    --dry-run

Then apply changes by running without --dry-run.
"""

import argparse
import json
import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

from utils import MigrationUtils


def normalize_title(s: str) -> str:
    s = s or ""
    s = s.strip()
    s = re.sub(r"\s+", " ", s)
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", " ", s).strip()
    return s


def parse_frontmatter_blocks_at_top(content: str) -> Tuple[List[Dict], str]:
    """Parse consecutive frontmatter blocks at the very top of the file.
    Returns (list_of_frontmatters, remainder_content).
    """
    pos = 0
    fms: List[Dict] = []
    text = content.lstrip('\ufeff')  # strip potential BOM
    # Consume consecutive frontmatter blocks that start at the beginning
    while text.startswith('---'):
        # Find the closing '---' after the starting line
        m = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", text, re.DOTALL)
        if not m:
            break
        fm_text = m.group(1)
        rest = m.group(2)
        try:
            fm = MigrationUtils.parse_simple_yaml(fm_text)
        except Exception:
            fm = {}
        fms.append(fm)
        # Strip leading blank lines so another frontmatter block right after
        # (even with whitespace in between) is detected
        text = re.sub(r"^[\s\r\n]+", "", rest)
    return fms, text


def merge_frontmatters(fms: List[Dict]) -> Dict:
    merged: Dict = {}
    for fm in fms:
        for k, v in fm.items():
            # Keep first occurrence; fill in missing keys only
            if k not in merged:
                merged[k] = v
    return merged


def build_frontmatter_block(fm: Dict) -> str:
    if not fm:
        return ""
    # Ensure title comes first for readability if present
    lines: List[str] = []
    if 'title' in fm:
        lines.append(f"title: {fm['title']}")
    for k, v in fm.items():
        if k == 'title':
            continue
        lines.append(f"{k}: {v}")
    return "---\n" + "\n".join(lines) + "\n---\n\n"


def remove_redundant_h1(body: str, title: str) -> Tuple[str, bool]:
    """Remove a leading H1 or <h1> whose text matches the title (case/space-insensitive)."""
    if not title:
        return body, False
    norm_title = normalize_title(title)
    # Match a leading H1 markdown heading
    m = re.match(r"^(# +)(.+?)\s*\n(.*)$", body, re.DOTALL)
    if m:
        h1_text = m.group(2).strip()
        if normalize_title(h1_text) == norm_title:
            new_body = m.group(3)
            # Remove a single leading blank line
            new_body = re.sub(r"^\n+", "", new_body, count=1)
            return new_body, True
    # Match a leading HTML <h1>Title</h1>
    m2 = re.match(r"^<h1[^>]*>(.*?)</h1>\s*\n(.*)$", body, re.DOTALL | re.IGNORECASE)
    if m2:
        h1_text = re.sub(r"<[^>]+>", "", m2.group(1)).strip()
        if normalize_title(h1_text) == norm_title:
            new_body = m2.group(2)
            new_body = re.sub(r"^\n+", "", new_body, count=1)
            return new_body, True
    return body, False


def process_markdown(md_path: Path, dry_run: bool) -> Dict:
    original = MigrationUtils.read_file_content(md_path)
    fms, body = parse_frontmatter_blocks_at_top(original)

    merged_fm = merge_frontmatters(fms)
    fm_merged_count = max(0, len(fms) - 1) if fms else 0

    # If no frontmatter but body starts with H1, we won't inject a title; only dedupe.
    removed_h1 = False
    if 'title' in merged_fm:
        body, removed_h1 = remove_redundant_h1(body, merged_fm['title'])

    new_content = build_frontmatter_block(merged_fm) + body

    changed = new_content != original
    if changed and not dry_run:
        MigrationUtils.create_backup(md_path)
        MigrationUtils.write_file_content(md_path, new_content)

    return {
        'path': str(md_path),
        'changed': changed,
        'frontmatter_blocks_found': len(fms),
        'frontmatter_blocks_merged': fm_merged_count,
        'h1_removed': removed_h1,
    }


def run(source: Path, report: Path, dry_run: bool) -> Dict:
    md_files = MigrationUtils.find_files_by_extension(source, ['.md'])
    results: List[Dict] = []
    files_changed = 0
    total_h1_removed = 0
    total_fm_merged = 0

    for p in md_files:
        r = process_markdown(p, dry_run)
        results.append({
            'path': str(Path(p).relative_to(source)),
            'changed': r['changed'],
            'frontmatter_blocks_found': r['frontmatter_blocks_found'],
            'frontmatter_blocks_merged': r['frontmatter_blocks_merged'],
            'h1_removed': r['h1_removed'],
        })
        if r['changed']:
            files_changed += 1
        total_h1_removed += 1 if r['h1_removed'] else 0
        total_fm_merged += r['frontmatter_blocks_merged']

    summary = {
        'root': str(source),
        'files': len(md_files),
        'files_changed': files_changed,
        'total_h1_removed': total_h1_removed,
        'total_frontmatter_blocks_merged': total_fm_merged,
        'results': results,
    }

    MigrationUtils.ensure_directory(report.parent)
    with open(report, 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2)

    return summary


def main():
    parser = argparse.ArgumentParser(description='Deduplicate titles in Markdown files')
    parser.add_argument('--source', required=True, help='Root directory of Markdown docs')
    parser.add_argument('--report', required=True, help='Path to write JSON report')
    parser.add_argument('--dry-run', action='store_true', help='Do not modify files, only report changes')
    args = parser.parse_args()

    source = Path(args.source)
    report = Path(args.report)

    summary = run(source, report, args.dry_run)
    print(f"Title dedupe report written to: {report}")
    print(json.dumps({k: summary[k] for k in ['files','files_changed','total_h1_removed','total_frontmatter_blocks_merged']}, indent=2))


if __name__ == '__main__':
    main()
