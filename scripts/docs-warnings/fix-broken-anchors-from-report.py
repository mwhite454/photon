#!/usr/bin/env python3
import json
import os
import re
from pathlib import Path
from urllib.parse import urlsplit

REPORT = Path('reports/tests/link-validation.json')
ROOT = Path('.').resolve()

# Simple slugify to mirror validator
def slugify(text: str) -> str:
    value = re.sub(r'[\s]+', '-', text.strip().lower())
    value = re.sub(r'[^a-z0-9\-_:]+', '', value)
    return value


def extract_anchors(md_path: Path) -> set[str]:
    anchors: set[str] = set()
    try:
        content = md_path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        content = md_path.read_text(encoding='latin-1')

    anchors.update(re.findall(r'id="([^"]+)"', content))
    anchors.update(re.findall(r'name="([^"]+)"', content))
    anchors.update(re.findall(r'\{#([^}]+)\}', content))

    for heading in re.finditer(r'^(#+)\s+(.+)$', content, re.MULTILINE):
        text = heading.group(2)
        anchors.add(slugify(text))
        m = re.match(r'`?Optional`?\s*(.+)$', text)
        if m:
            prop = m.group(1).strip()
            if prop:
                anchors.add(slugify(prop))
    lowers = {a.lower() for a in anchors}
    anchors.update(lowers)

    # optional-foo vs optionalfoo aliases
    extra = set()
    for c in list(anchors):
        if c.startswith('optional-') and len(c) > 9:
            extra.add('optional' + c[9:])
        if c.startswith('optional') and not c.startswith('optional-') and len(c) > 8:
            extra.add('optional-' + c[8:])
    anchors.update(extra)

    return anchors


def drop_fragment_in_text(text: str, raw_target: str) -> str:
    # replace the exact markdown URL contents between (...) with the path part only
    parts = urlsplit(raw_target)
    path = parts.path
    return text.replace(f']({raw_target})', f']({path})')


def drop_self_link(text: str, link_text: str, raw_target: str) -> str:
    return text.replace(f'[{link_text}]({raw_target})', link_text)


def main():
    if not REPORT.exists():
        print(f"❌ Report not found: {REPORT}")
        return 1
    with REPORT.open('r', encoding='utf-8') as f:
        links = json.load(f)

    broken = [l for l in links if not l.get('is_valid')]

    # Group by source file
    by_src: dict[str, list[dict]] = {}
    for l in broken:
        by_src.setdefault(l['source_file'], []).append(l)

    updated_files = 0
    for src, items in by_src.items():
        src_path = ROOT / src
        if not src_path.exists():
            continue
        original = src_path.read_text(encoding='utf-8')
        text = original

        # Preload anchors per target to avoid re-reading files repeatedly
        anchor_cache: dict[Path, set[str]] = {}

        for item in items:
            raw_target = item['raw_target']
            link_text = item['link_text']
            link_type = item['link_type']

            # Self-anchors: replace [text](#fragment) with text
            if link_type == 'self-anchor' and raw_target.startswith('#'):
                text = drop_self_link(text, link_text, raw_target)
                continue

            # Anchors into other files: if anchor missing, drop fragment
            if '#' in raw_target and not raw_target.startswith('#'):
                parts = urlsplit(raw_target)
                path = parts.path
                frag = parts.fragment
                if not path:
                    continue
                target_path = (src_path.parent / path).resolve()
                if target_path.exists():
                    if target_path not in anchor_cache:
                        anchor_cache[target_path] = extract_anchors(target_path)
                    anchors = anchor_cache[target_path]
                    # Build candidates similarly to validator
                    candidates = {frag, frag.lower(), slugify(frag)}
                    if frag.startswith('optional-'):
                        candidates.add('optional' + frag[9:])
                    elif frag.startswith('optional') and not frag.startswith('optional-'):
                        candidates.add('optional-' + frag[8:])
                    if not any(c in anchors for c in candidates):
                        text = drop_fragment_in_text(text, raw_target)

        if text != original:
            src_path.write_text(text, encoding='utf-8')
            updated_files += 1

    print(f"✅ Updated {updated_files} files to drop invalid anchor fragments and self-links.")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
