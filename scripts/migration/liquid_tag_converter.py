import argparse
import json
from pathlib import Path
import re
from typing import Dict, List

HIGHLIGHT_BLOCK_RE = re.compile(r"\{%\s*highlight\s+(\w+)\s*%\}(.*?)\{%\s*endhighlight\s*%\}", re.DOTALL)
INCLUDE_RE = re.compile(r"\{%\s*include\s+([^%]+?)\s*%\}")
SITE_BASEURL_RE = re.compile(r"\{\{\s*site\.baseurl\s*\}\}")
SNIPPETS_DIRECTIVE_RE = re.compile(r"--8<--\s*[\"']([^\"']+)[\"']")


def _convert_content(md_text: str, base_dir: Path) -> Dict:
    replacements: List[Dict] = []

    # Convert highlight blocks to fenced code blocks
    def _repl_highlight(m: re.Match) -> str:
        lang = m.group(1)
        code = m.group(2).strip("\n")
        replacements.append({"type": "highlight", "lang": lang})
        return f"```{lang}\n{code}\n```"

    md_text = HIGHLIGHT_BLOCK_RE.sub(_repl_highlight, md_text)

    # Convert Jekyll include to pymdown snippets include syntax
    def _repl_include(m: re.Match) -> str:
        raw = m.group(1).strip()
        # Jekyll include may have params: "file.html key=value ..."
        tokens = raw.split()
        path = tokens[0].strip('"\'') if tokens else raw
        params = " ".join(tokens[1:]) if len(tokens) > 1 else ""
        replacements.append({"type": "include", "src": raw, "path": path, "params": params})
        # For now, omit include content and leave a placeholder comment to avoid build failures.
        return f"<!-- include omitted: {path}{(' ' + params) if params else ''} -->"

    md_text = INCLUDE_RE.sub(_repl_include, md_text)

    # Remove site.baseurl
    if SITE_BASEURL_RE.search(md_text):
        md_text = SITE_BASEURL_RE.sub("", md_text)
        replacements.append({"type": "site.baseurl"})

    # Remove existing pymdownx snippet directives
    def _repl_snippet(m: re.Match) -> str:
        path = m.group(1)
        replacements.append({"type": "snippet-directive", "src": path})
        return f"<!-- snippet omitted: {path} -->"

    md_text = SNIPPETS_DIRECTIVE_RE.sub(_repl_snippet, md_text)

    return {"text": md_text, "replacements": replacements}


def convert_file(input_file: Path, output_file: Path) -> Dict:
    text = input_file.read_text(encoding="utf-8")
    result = _convert_content(text, input_file.parent)
    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(result["text"], encoding="utf-8")
    return {"source": str(input_file), "target": str(output_file), "replacements": result["replacements"]}


def convert_dir(input_dir: Path, output_dir: Path) -> Dict:
    converted = []
    errors = []
    for md_file in sorted(input_dir.rglob("*.md")):
        rel = md_file.relative_to(input_dir)
        out_file = output_dir / rel
        try:
            converted.append(convert_file(md_file, out_file))
        except Exception as e:
            errors.append({"source": str(md_file), "error": repr(e)})
    return {"converted": converted, "errors": errors}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="Input file or directory")
    parser.add_argument("--output", required=True, help="Output file or directory")
    args = parser.parse_args()
    src = Path(args.input)
    dst = Path(args.output)

    if src.is_dir():
        result = convert_dir(src, dst)
    else:
        result = {"converted": [convert_file(src, dst)], "errors": []}

    report = {
        "source": str(src.resolve()),
        "target": str(dst.resolve()),
        "summary": {
            "converted": len(result["converted"]),
            "errors": len(result["errors"]),
        },
        "errors": result["errors"],
    }
    # Write a sidecar report next to output (directory or file)
    report_path = (dst if dst.suffix else dst / "").with_suffix(".liquid-report.json")
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
