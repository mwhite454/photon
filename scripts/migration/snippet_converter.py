import argparse
import json
from pathlib import Path
from typing import Dict, List

from bs4 import BeautifulSoup
from markdownify import markdownify as md


def _extract_title(html: str, fallback: str) -> str:
    try:
        soup = BeautifulSoup(html, "html.parser")
        h1 = soup.find(["h1", "h2"])  # use first heading if present
        if h1 and h1.get_text(strip=True):
            return h1.get_text(strip=True)
    except Exception:
        pass
    return fallback


def _ensure_frontmatter(title: str, source_rel: str) -> str:
    return f"---\ntitle: {title}\nsource: {source_rel}\n---\n\n"


def convert_snippets(input_dir: str, output_dir: str, output_json: str) -> None:
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    converted: List[Dict] = []
    errors: List[Dict] = []

    for html_file in sorted(input_path.glob("*.html")):
        rel_src = str(html_file.relative_to(input_path))
        stem = html_file.stem
        target_md = output_path / f"{stem}.md"
        try:
            html = html_file.read_text(encoding="utf-8")
            title = _extract_title(html, stem.replace("-", " ").title())
            body_md = md(html, heading_style="ATX")

            # Basic cleanup: trim excessive blank lines
            body_md = "\n".join([line.rstrip() for line in body_md.splitlines()]).strip() + "\n"

            frontmatter = _ensure_frontmatter(title, str(html_file))
            target_md.write_text(frontmatter + body_md, encoding="utf-8")

            converted.append(
                {
                    "source": str(html_file),
                    "target": str(target_md),
                    "title": title,
                    "status": "ok",
                }
            )
        except Exception as e:
            errors.append({
                "source": str(html_file),
                "error": repr(e),
            })

    result = {
        "source": str(input_path.resolve()),
        "target": str(output_path.resolve()),
        "converted": converted,
        "errors": errors,
        "summary": {
            "total": len(list(input_path.glob("*.html"))),
            "converted": len(converted),
            "errors": len(errors),
        },
    }

    Path(output_json).parent.mkdir(parents=True, exist_ok=True)
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--result", default="migration-snippets.json")
    args = parser.parse_args()

    convert_snippets(args.input, args.output, args.result)


if __name__ == "__main__":
    main()
