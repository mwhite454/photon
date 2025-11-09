#!/usr/bin/env python3
import os
import re
from pathlib import Path

ROOT = Path('docs/docs').resolve()
CONVERTED = ROOT / 'converted' / 'api'

HEADING_RE = re.compile(r'^###\s+`Optional`\s*([^\n]+)$', re.MULTILINE)
LINK_RE = re.compile(r'\(#optional([a-z0-9_-]+)\)')
HIERARCHY_RE = re.compile(r'\((\.\./hierarchy\.md)#[^)]+\)')


def slugify(text: str) -> str:
    s = text.strip().lower()
    s = re.sub(r'\s+', '-', s)
    s = re.sub(r'[^a-z0-9\-_:]+', '', s)
    return s


def collect_expected_anchors(md_text: str) -> set[str]:
    anchors = set()
    for m in HEADING_RE.finditer(md_text):
        prop = m.group(1).strip()
        # Expected anchor is slug of 'Optional ' + prop
        anchors.add(slugify(f'Optional {prop}'))
    return anchors


def fix_file(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    expected = collect_expected_anchors(text)

    changed = False

    # Fix hierarchy anchors by dropping fragment
    def repl_hierarchy(m: re.Match) -> str:
        nonlocal changed
        changed = True
        return f'({m.group(1)})'

    text2 = HIERARCHY_RE.sub(repl_hierarchy, text)

    # Fix optional anchors without dash when dashed exists
    def repl_link(m: re.Match) -> str:
        nonlocal changed
        raw = m.group(1)  # e.g., 'extrude' or 'classname'
        dashed = f'optional-{raw}'
        nodash = f'optional{raw}'
        if dashed in expected and nodash not in expected:
            changed = True
            return f'(#optional-{raw})'
        return m.group(0)

    text3 = LINK_RE.sub(repl_link, text2)

    if changed:
        path.write_text(text3, encoding='utf-8')
    return changed


def main():
    if not CONVERTED.exists():
        print(f"❌ Converted API dir not found: {CONVERTED}")
        return 1
    files = list(CONVERTED.rglob('*.md'))
    updated = 0
    for p in files:
        if fix_file(p):
            updated += 1
    print(f"✅ Updated {updated} converted API files with anchor fixes.")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
