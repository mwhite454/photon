#!/usr/bin/env python3
"""
Validate all internal links in documentation.
"""
import json
import re
from collections import Counter
from pathlib import Path
from typing import Dict, Iterable, Set
from urllib.parse import unquote


DOCS_DIR = Path('docs/docs')
SITE_ROOT = DOCS_DIR.parent
ANCHOR_CACHE: Dict[Path, Set[str]] = {}


def find_all_links(docs_dir: Path):
    """Find all markdown links in documentation."""
    links = []
    link_id = 1

    for md_file in Path(docs_dir).rglob('*.md'):
        with open(md_file, 'r', encoding='utf-8') as handle:
            lines = handle.read().split('\n')

        for line_num, line in enumerate(lines, 1):
            for match in re.finditer(r'\[([^\]]+)\]\(([^\)]+)\)', line):
                link_text = match.group(1).strip()
                link_target = match.group(2).strip()

                if link_target.startswith(('http://', 'https://', 'mailto:', 'tel:')):
                    continue

                if link_target.startswith('#'):
                    link_type = 'self-anchor'
                elif '#' in link_target:
                    link_type = 'anchor'
                else:
                    link_type = 'internal'

                links.append({
                    'link_id': f'link-{link_id:05d}',
                    'source_file': str(md_file),
                    'source_line': line_num,
                    'link_text': link_text,
                    'link_target': link_target,
                    'link_type': link_type,
                    'raw_target': link_target,
                    'is_valid': None,
                    'status': 'pending'
                })
                link_id += 1

    return links


def slugify(text):
    value = re.sub(r'[\s]+', '-', text.strip().lower())
    value = re.sub(r'[^a-z0-9\-_:]+', '', value)
    return value


def anchor_variants(anchor: str) -> Set[str]:
    decoded = unquote(anchor)
    candidates = {
        anchor,
        anchor.lower(),
        decoded,
        decoded.lower(),
    }

    for raw in list(candidates):
        if not raw:
            continue
        candidates.add(raw.replace(' ', '-'))
        candidates.add(raw.replace(' ', '-').lower())
        candidates.add(slugify(raw))

    return {candidate for candidate in candidates if candidate}


def extract_anchors(md_path: Path) -> Set[str]:
    if md_path in ANCHOR_CACHE:
        return ANCHOR_CACHE[md_path]

    anchors: Set[str] = set()

    if not md_path.is_file():
        ANCHOR_CACHE[md_path] = anchors
        return anchors
    try:
        content = md_path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        content = md_path.read_text(encoding='latin-1')

    anchors.update(re.findall(r'id="([^"]+)"', content))
    anchors.update(re.findall(r'name="([^"]+)"', content))
    anchors.update(re.findall(r'\{#([^}]+)\}', content))

    for heading in re.finditer(r'^(#+)\s+(.+)$', content, re.MULTILINE):
        anchors.add(slugify(heading.group(2)))

    anchors_lower = {a.lower() for a in anchors}
    anchors.update(anchors_lower)

    ANCHOR_CACHE[md_path] = anchors
    return anchors


def resolve_target(source_file: Path, raw_target: str):
    anchor = None
    target = raw_target

    if target.startswith('#'):
        anchor = target[1:]
        return source_file, anchor

    if '#' in target:
        target, anchor = target.split('#', 1)

    if target.startswith('/'):
        candidate = SITE_ROOT / target.lstrip('/')
    elif target.startswith('../') or target.startswith('./'):
        candidate = (source_file.parent / target).resolve()
    else:
        candidate = (source_file.parent / target).resolve()

    return candidate, anchor


def validate_link(link):
    source_file = Path(link['source_file'])
    target = link['link_target']

    resolved_path, anchor = resolve_target(source_file, target)

    if anchor is None:
        is_valid = resolved_path.exists()
    else:
        file_exists = resolved_path.exists()
        anchor_exists = False
        normalized_variants = anchor_variants(anchor)
        if file_exists:
            anchor_set = extract_anchors(resolved_path)
            anchor_exists = any(variant in anchor_set for variant in normalized_variants)
        is_valid = file_exists and anchor_exists
        if file_exists and not anchor_exists:
            display_anchor = next(iter(normalized_variants), anchor)
            link['validation_error'] = f"Anchor not found: {display_anchor} in {resolved_path}"

    if not resolved_path.exists() and anchor is None:
        link['validation_error'] = f"Target not found: {resolved_path}"

    link['resolved_path'] = str(resolved_path)
    link['is_valid'] = is_valid
    link['status'] = 'valid' if is_valid else 'broken'
    return link


def summarize(links):
    broken = [link for link in links if not link['is_valid']]
    summary = {
        'total_links': len(links),
        'broken_links': len(broken),
        'broken_by_file': Counter(link['source_file'] for link in broken),
        'broken_targets': Counter(link['link_target'] for link in broken),
    }
    return summary


def main():
    print('🔗 Finding all links in documentation...')
    links = find_all_links(DOCS_DIR)
    print(f'📊 Found {len(links)} internal links')

    print('✅ Validating links...')
    for link in links:
        validate_link(link)

    summary = summarize(links)
    broken_links = [l for l in links if not l['is_valid']]
    print(f"❌ Found {summary['broken_links']} broken links")

    if broken_links:
        worst_files = summary['broken_by_file'].most_common(10)
        print('📂 Top files with broken links:')
        for file_path, count in worst_files:
            print(f'  - {file_path}: {count}')

    output_path = Path('reports/tests/link-validation.json')
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as handle:
        json.dump(links, handle, indent=2)

    print(f'✅ Link validation saved to {output_path}')

if __name__ == '__main__':
    main()
