# AI-Friendly Documentation Patterns

Guidance for structuring Photon docs to be discoverable and consumable by AI systems and search engines.

## Goals

- Improve retrieval with consistent metadata and headings
- Make examples self-contained and copy-paste friendly
- Provide stable anchors and canonical link targets

## Frontmatter Conventions

Add these keys to each page:

```yaml
ai_summary: Short, factual summary of the page (<= 160 chars)
primary_topic: One main concept (e.g., "fillets", "exporting-svg")
keywords: ["photon", "2D CAD", "SVG", "paths", "models", "fillet"]
``` 

## Section Signposting

Use standardized sections (when applicable):

- Prerequisites
- Quick Start
- Examples
- API Reference
- Related Topics

These are added automatically by `scripts/migration/signpost_adder.py` and should be preserved during edits.

## Example Patterns

- Prefer minimal, runnable snippets
- Use named imports from `@7syllable/photon-core`
- Show direct SVG rendering for visual output

```ts
import { exporter, path, paths } from "@7syllable/photon-core";
const model = { paths: { a: new paths.Line([0,0],[20,0]), b: new paths.Line([20,0],[20,20]) } };
const arc = path.fillet?.(model.paths.a, model.paths.b, 2) ?? null;
if (arc) model.paths.arc = arc;
document.write(exporter.toSVG(model));
```

## Stable Links & Anchors

- Link to TypeDoc modules/functions using generated paths (e.g., `api/modules/core_fillet-path.html#pathfillet`)
- Avoid relative anchors that may change after regeneration
- Use human-readable link labels

## Structured Data

Templates in `docs/overrides/` provide JSON-LD for:
- SoftwareApplication
- TechArticle

Keep titles, descriptions, and headings concise to improve schema quality.

## Linting & Consistency

- One H1 per page (matches sidebar title)
- Headings use sentence case
- Surround lists and fenced code with blank lines
- Specify language for code fences (ts, js)

## Accessibility

- Provide alt text for images
- Ensure code samples don’t rely on color alone
- Keep line length readable in code blocks

## Validation Checklist

- [ ] Frontmatter present with `ai_summary`, `primary_topic`, `keywords`
- [ ] Contains standardized sections
- [ ] All code blocks have a language
- [ ] API links resolve to TypeDoc targets
- [ ] Page builds with no MkDocs warnings

## References

- `scripts/migration/enhance_frontmatter.py`
- `scripts/migration/signpost_adder.py`
- `docs/docs/migration/ai-friendly-patterns.md` (background)
