#!/usr/bin/env python3
import os
import re
import sys
from pathlib import Path
from typing import Dict, Tuple

DOCS_ROOT = Path('docs/docs').resolve()
CONVERTED_API = DOCS_ROOT / 'converted' / 'api'
FUNCTIONS_DIR = CONVERTED_API / 'functions'
MODULES_DIR = CONVERTED_API / 'modules'

# Build a case-insensitive index of available function docs: (module, func) -> filename
# Example filename: core_point.add.md
FUNC_INDEX: Dict[Tuple[str, str], str] = {}
if FUNCTIONS_DIR.exists():
    for f in FUNCTIONS_DIR.glob('*.md'):
        base = f.name[:-3]  # strip .md
        if '.' not in base:
            continue
        module, func = base.split('.', 1)
        FUNC_INDEX[(module.lower(), func.lower())] = f.name

# Regex to find legacy module links
# Matches: ](../api/modules/<module>.html#<anchor>) or ](../api/modules/<module>.html)
LEGACY_PATTERN = re.compile(r"\]\((?P<prefix>(?:\./|\.\./)*)api/modules/(?P<module>[A-Za-z0-9_\-\/]+)\.html(?:#(?P<anchor>[A-Za-z0-9._\-]+))?\)")


def map_legacy_link(md_path: Path, module: str, anchor: str | None) -> str | None:
    """
    Compute new relative link target for a legacy module link found in md_path.
    - If anchor == 'content' or no anchor: point to modules/<module>.md
    - If anchor present: try to map to functions/<module>.<Anchor>.md (case-insensitive)
      Fallback to modules/<module>.md if function not found.
    Returns a relative path from md_path to the target, or None if cannot map.
    """
    # Relative prefix from current md file to converted/api
    try:
        rel_api = Path(os.path.relpath(CONVERTED_API, start=md_path.parent))
    except Exception:
        rel_api = Path('converted/api')

    # Normalize module id: legacy may contain slashes already matching converted structure
    module_id = module

    if not anchor or anchor.lower() == 'content':
        target = rel_api / 'modules' / f"{module_id}.md"
        return str(target)

    # Attempt function match
    func_key = (module_id.lower(), anchor.lower())
    filename = FUNC_INDEX.get(func_key)

    if not filename:
        # Try a few normalizations of anchor: keep as is (camel), lower, strip non-alnum
        anchor_norm = re.sub(r"[^a-z0-9]", "", anchor.lower())
        for (mod, func), name in FUNC_INDEX.items():
            if mod == module_id.lower() and re.sub(r"[^a-z0-9]", "", func) == anchor_norm:
                filename = name
                break

    if filename:
        target = rel_api / 'functions' / filename
        return str(target)

    # Fallback: module page
    target = rel_api / 'modules' / f"{module_id}.md"
    return str(target)


def process_file(md_path: Path) -> int:
    original = md_path.read_text(encoding='utf-8')
    changed = original

    def _repl(m: re.Match) -> str:
        prefix = m.group('prefix') or ''
        module = m.group('module')
        anchor = m.group('anchor')
        new_target = map_legacy_link(md_path, module, anchor)
        if not new_target:
            return m.group(0)  # no change
        # Preserve markdown link text and replace only the URL inside ()
        return m.group(0).replace(m.group(0)[m.group(0).find('(')+1:m.group(0).rfind(')')], new_target)

    changed = LEGACY_PATTERN.sub(_repl, changed)

    if changed != original:
        md_path.write_text(changed, encoding='utf-8')
        return 1
    return 0


def main() -> int:
    if not DOCS_ROOT.exists():
        print(f"❌ Docs root not found: {DOCS_ROOT}")
        return 1

    total_files = 0
    changed_files = 0

    for md_path in DOCS_ROOT.rglob('*.md'):
        total_files += 1
        changed_files += process_file(md_path)

    print(f"✅ Processed {total_files} markdown files. Updated {changed_files} files.")
    print("Converted legacy '../api/modules/*.html(#anchor)' links to '../converted/api/*' structure.")
    return 0


if __name__ == '__main__':
    sys.exit(main())
