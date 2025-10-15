#!/usr/bin/env python3
"""
Asset Migrator for MkDocs Migration

Copies static assets from the legacy Jekyll `docs/` directory into the MkDocs
project. By default, targets the MkDocs docs root (e.g., `docs-new/docs`) to
preserve relative references inside markdown. You can override the target.

Behaviors:
- Copies selected top-level asset directories (images, stylesheets, fonts, external, demos, playground)
- Preserves directory structure
- Skips files that are identical (hash match) to avoid unnecessary writes
- Writes a JSON report with counts and any missing sources

Usage:
  python scripts/migration/asset_migrator.py \
    --source docs \
    --target docs-new/docs \
    --report docs-new/migration-assets.json
"""

import argparse
import json
import shutil
from pathlib import Path
from typing import Dict, List

from utils import MigrationUtils


DEFAULT_DIRS = [
    'images',
    'stylesheets',
    'fonts',
    'external',
    'demos',
    'playground',
]


def files_equal(src: Path, dst: Path) -> bool:
    if not src.exists() or not dst.exists():
        return False
    try:
        return MigrationUtils.calculate_file_hash(src) == MigrationUtils.calculate_file_hash(dst)
    except Exception:
        return False


def copy_tree(src_dir: Path, dst_dir: Path) -> Dict:
    copied = 0
    skipped = 0
    bytes_copied = 0

    for src_path in src_dir.rglob('*'):
        rel = src_path.relative_to(src_dir)
        dst_path = dst_dir / rel
        if src_path.is_dir():
            MigrationUtils.ensure_directory(dst_path)
            continue
        # Skip binary detection? Assets are likely binary; still copy.
        MigrationUtils.ensure_directory(dst_path.parent)
        if files_equal(src_path, dst_path):
            skipped += 1
            continue
        try:
            shutil.copy2(src_path, dst_path)
            copied += 1
            bytes_copied += MigrationUtils.get_file_size(dst_path)
        except Exception:
            # Continue best-effort
            continue

    return {
        'copied': copied,
        'skipped': skipped,
        'bytes_copied': bytes_copied,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', '-s', default='docs', help='Legacy Jekyll docs root')
    parser.add_argument('--target', '-t', default='docs-new/docs', help='MkDocs docs root or assets dir')
    parser.add_argument('--dirs', '-d', nargs='*', default=DEFAULT_DIRS, help='Top-level asset directories to migrate')
    parser.add_argument('--report', '-r', default='docs-new/migration-assets.json', help='JSON report output path')
    args = parser.parse_args()

    src_root = Path(args.source).resolve()
    dst_root = Path(args.target).resolve()
    report_path = Path(args.report).resolve()

    results: List[Dict] = []
    missing: List[str] = []
    total_copied = 0
    total_skipped = 0
    total_bytes = 0

    for name in args.dirs:
        src_dir = src_root / name
        dst_dir = dst_root / name
        if not src_dir.exists():
            missing.append(str(src_dir))
            continue
        res = copy_tree(src_dir, dst_dir)
        res['dir'] = name
        results.append(res)
        total_copied += res['copied']
        total_skipped += res['skipped']
        total_bytes += res['bytes_copied']

    summary = {
        'source_root': str(src_root),
        'target_root': str(dst_root),
        'dirs': args.dirs,
        'results': results,
        'missing_sources': missing,
        'totals': {
            'files_copied': total_copied,
            'files_skipped': total_skipped,
            'bytes_copied': total_bytes,
        }
    }

    MigrationUtils.write_file_content(report_path, json.dumps(summary, indent=2))
    print(f"Asset migration report written to: {report_path}")


if __name__ == '__main__':
    main()
