#!/usr/bin/env python3
"""
Navigation Builder for MkDocs

Scans the converted documentation tree and generates a MkDocs `nav` YAML
structure. Titles are derived from (in order of precedence):
- Frontmatter `title`
- First level-1 heading `#`
- Sanitized filename/directory name

Outputs a generated YAML file and a JSON report for traceability.

Usage:
  python scripts/migration/navigation_builder.py \
    --source docs-new/docs \
    --output docs-new/mkdocs.nav.generated.yml \
    --report docs-new/mkdocs.nav.report.json
"""

import argparse
import json
import os
from pathlib import Path
from typing import Dict, List, Tuple, Union

from utils import MigrationUtils


DocPath = Union[str, Path]


def read_title_from_markdown(md_path: Path) -> str:
    try:
        content = MigrationUtils.read_file_content(md_path)
    except Exception:
        return md_path.stem.replace('-', ' ').title()

    # Try frontmatter first
    frontmatter, body = MigrationUtils.extract_frontmatter(content)
    if isinstance(frontmatter, dict) and frontmatter.get('title'):
        return str(frontmatter['title']).strip()

    # Fallback to first H1
    for line in body.splitlines():
        line = line.strip()
        if line.startswith('# '):
            return line[2:].strip()

    # Fallback to filename
    return md_path.stem.replace('-', ' ').title()


def collect_directory_entries(dir_path: Path) -> Tuple[List[Dict], Dict]:
    """Collect nav entries and a flat index for reporting."""
    entries: List[Dict] = []
    index: Dict[str, str] = {}

    # Prioritize index.md for directory title
    index_md = dir_path / 'index.md'
    dir_title = None
    if index_md.exists():
        dir_title = read_title_from_markdown(index_md)

    # Gather child directories and files
    child_dirs = sorted([p for p in dir_path.iterdir() if p.is_dir() and not p.name.startswith('.')])
    child_files = sorted([p for p in dir_path.iterdir() if p.is_file() and p.suffix == '.md' and p.name != 'index.md'])

    # Files at this level
    for f in child_files:
        title = read_title_from_markdown(f)
        rel_path = f.relative_to(SOURCE_DIR)
        entries.append({title: str(rel_path).replace('\\', '/')})
        index[str(rel_path)] = title

    # Recurse into subdirectories
    for subdir in child_dirs:
        sub_entries, sub_index = collect_directory_entries(subdir)
        rel_index_md = (subdir / 'index.md')
        if rel_index_md.exists():
            sub_title = read_title_from_markdown(rel_index_md)
            if sub_entries:
                entries.append({sub_title: sub_entries})
            else:
                # Directory with only index.md
                rel_path = rel_index_md.relative_to(SOURCE_DIR)
                entries.append({sub_title: str(rel_path).replace('\\', '/')})
            index.update(sub_index)
        else:
            # No index.md: flatten children under directory name
            sub_title = subdir.name.replace('-', ' ').title()
            if sub_entries:
                entries.append({sub_title: sub_entries})
            index.update(sub_index)

    return entries, index


def generate_nav_yaml(nav_entries: List[Dict]) -> str:
    """Serialize `nav` list into YAML (without external deps)."""
    def dump_value(value, indent=0):
        spaces = '  ' * indent
        if isinstance(value, list):
            lines = []
            for item in value:
                # item is a dict {Title: value}
                if isinstance(item, dict):
                    [(k, v)] = item.items()
                    if isinstance(v, list):
                        lines.append(f"{spaces}- {k}:")
                        lines.extend(dump_value(v, indent + 1))
                    else:
                        lines.append(f"{spaces}- {k}: {v}")
                else:
                    lines.append(f"{spaces}- {item}")
            return lines
        else:
            return [f"{spaces}{value}"]

    header = [
        "# GENERATED FILE - mkdocs nav structure",
        "# Review and merge into docs-new/mkdocs.yml under the `nav:` section",
        "nav:",
    ]
    body = dump_value(nav_entries, indent=1)
    return "\n".join(header + body) + "\n"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', '-s', type=str, default='docs-new/docs', help='Path to docs root')
    parser.add_argument('--output', '-o', type=str, default='docs-new/mkdocs.nav.generated.yml', help='Output YAML file')
    parser.add_argument('--report', '-r', type=str, default='docs-new/mkdocs.nav.report.json', help='Output JSON report file')
    args = parser.parse_args()

    global SOURCE_DIR
    SOURCE_DIR = Path(args.source).resolve()
    output_path = Path(args.output).resolve()
    report_path = Path(args.report).resolve()

    # Build top-level nav from directories; keep explicit ordering for known sections
    top_order = [
        'getting-started',
        'basic-drawing',
        'advanced-drawing',
        'model-trees',
        'exporting',
        'api',
        'converted',
        'snippets',
    ]

    nav_entries: List[Dict] = []
    index: Dict[str, str] = {}

    # Always include homepage if present
    index_md = SOURCE_DIR / 'index.md'
    if index_md.exists():
        home_title = read_title_from_markdown(index_md)
        rel_path = index_md.relative_to(SOURCE_DIR)
        nav_entries.append({home_title: str(rel_path)})
        index[str(rel_path)] = home_title

    # Add known sections in order if present
    for section in top_order:
        section_dir = SOURCE_DIR / section
        if section_dir.exists() and section_dir.is_dir():
            sub_entries, sub_index = collect_directory_entries(section_dir)
            index_md = section_dir / 'index.md'
            title = read_title_from_markdown(index_md) if index_md.exists() else section.replace('-', ' ').title()
            if sub_entries:
                nav_entries.append({title: sub_entries})
            elif index_md.exists():
                rel_path = index_md.relative_to(SOURCE_DIR)
                nav_entries.append({title: str(rel_path)})
            index.update(sub_index)

    # Add any remaining top-level directories not in top_order
    for p in sorted([p for p in SOURCE_DIR.iterdir() if p.is_dir() and not p.name.startswith('.')]):
        if p.name in top_order:
            continue
        sub_entries, sub_index = collect_directory_entries(p)
        index_md = p / 'index.md'
        title = read_title_from_markdown(index_md) if index_md.exists() else p.name.replace('-', ' ').title()
        if sub_entries:
            nav_entries.append({title: sub_entries})
        elif index_md.exists():
            rel_path = index_md.relative_to(SOURCE_DIR)
            nav_entries.append({title: str(rel_path)})
        index.update(sub_index)

    # Write outputs
    yaml_text = generate_nav_yaml(nav_entries)
    MigrationUtils.write_file_content(output_path, yaml_text)

    report = {
        'source': str(SOURCE_DIR),
        'output': str(output_path),
        'entries': len(nav_entries),
        'index_count': len(index),
    }
    MigrationUtils.write_file_content(report_path, json.dumps(report, indent=2))

    print(f"Generated nav YAML at: {output_path}")
    print(f"Report written to: {report_path}")


if __name__ == '__main__':
    main()
