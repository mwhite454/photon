#!/usr/bin/env python3
"""
Link Updater for MkDocs Migration

Scans markdown files under the docs root and updates internal links to match the
MkDocs structure. Adjustments include:
- Convert `.html` links to `.md`
- Map directory links (`/path/`) to `path/index.md`
- Resolve extensionless paths to either `path.md` or `path/index.md`
- Preserve external links (http/https/mailto) and anchors (#)

Produces a JSON report with per-file change details.

Usage:
  python scripts/migration/link_updater.py \
    --source docs-new/docs \
    --report docs-new/link-updates.json \
    [--dry-run]
"""

import argparse
import json
import re
from pathlib import Path
from typing import Dict, List, Tuple

from utils import MigrationUtils


INTERNAL_SCHEMES = ("http://", "https://", "mailto:")


def is_internal(url: str) -> bool:
    url = url.strip()
    if not url or url.startswith('#'):
        return False
    return not any(url.startswith(s) for s in INTERNAL_SCHEMES)


def resolve_target_path(root: Path, current_dir: Path, url: str) -> Tuple[str, str]:
    """
    Return (old, new) URL pair. The `new` may equal `old` if no change determined.
    Handles absolute (/foo/bar) and relative (foo/bar) URLs.
    """
    original = url

    # Normalize remove leading ./
    url = re.sub(r"^\./", "", url)

    # Absolute from site root
    is_absolute = url.startswith('/')
    if is_absolute:
        candidate = url[1:]
        base = root
    else:
        candidate = url
        base = current_dir

    # Separate fragment and query to preserve later
    fragment = ''
    query = ''
    if '#' in candidate:
        candidate, fragment = candidate.split('#', 1)
    if '?' in candidate:
        candidate, query = candidate.split('?', 1)

    # Already pointing to an asset (image/css/js/fonts) - leave alone
    if re.search(r"\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?|ttf|otf|eot)$", candidate, re.IGNORECASE):
        return original, original

    # .html -> .md
    if candidate.endswith('/index.html'):
        candidate = candidate[:-11] + '/index.md'
    elif candidate.endswith('.html'):
        candidate = candidate[:-5] + '.md'

    # If ends with slash, assume directory index
    if candidate.endswith('/'):
        candidate = candidate + 'index.md'

    # If no extension, try .md or /index.md
    if candidate and '.' not in Path(candidate).name:
        md_path = base / (candidate + '.md')
        idx_path = base / candidate / 'index.md'
        if md_path.exists():
            candidate = str(Path(candidate).with_suffix('.md'))
        elif idx_path.exists():
            candidate = str(Path(candidate) / 'index.md')
        else:
            # Best-effort: prefer .md
            candidate = str(Path(candidate).with_suffix('.md'))

    # Rebuild with proper relative/absolute prefix and re-attach query/fragment
    new_url = candidate.replace('\\', '/')
    if is_absolute:
        new_url = '/' + new_url
    if query:
        new_url = f"{new_url}?{query}"
    if fragment:
        new_url = f"{new_url}#{fragment}"

    return original, new_url


def update_links_in_markdown(root: Path, file_path: Path) -> Dict:
    content = MigrationUtils.read_file_content(file_path)
    current_dir = file_path.parent

    pattern = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")

    changes: List[Dict] = []

    def replacer(match):
        text = match.group(1)
        url = match.group(2)
        if not is_internal(url):
            return match.group(0)
        old, new = resolve_target_path(root, current_dir, url)
        if new != old:
            changes.append({
                'text': text,
                'from': old,
                'to': new,
            })
            return f"[{text}]({new})"
        return match.group(0)

    new_content = pattern.sub(replacer, content)

    return {
        'path': str(file_path.relative_to(root)),
        'changed': len(changes) > 0,
        'changes': changes,
        'new_content': new_content,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', '-s', default='docs-new/docs', help='Docs root directory')
    parser.add_argument('--report', '-r', default='docs-new/link-updates.json', help='JSON report output path')
    parser.add_argument('--dry-run', action='store_true', help='Only report, do not modify files')
    args = parser.parse_args()

    root = Path(args.source).resolve()
    report_path = Path(args.report).resolve()

    md_files = MigrationUtils.find_files_by_extension(root, ['.md'])

    results: List[Dict] = []
    total_changes = 0

    for md in md_files:
        result = update_links_in_markdown(root, md)
        results.append({
            'path': result['path'],
            'changed': result['changed'],
            'changes': result['changes'],
        })
        if result['changed'] and not args.dry_run:
            MigrationUtils.create_backup(md)
            MigrationUtils.write_file_content(md, result['new_content'])
            total_changes += len(result['changes'])

    summary = {
        'root': str(root),
        'files': len(md_files),
        'files_changed': sum(1 for r in results if r['changed']),
        'total_link_updates': total_changes,
        'results': results,
    }

    MigrationUtils.write_file_content(report_path, json.dumps(summary, indent=2))
    print(f"Link update report written to: {report_path}")


if __name__ == '__main__':
    main()
