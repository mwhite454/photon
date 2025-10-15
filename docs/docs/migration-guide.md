# Photon Migration Guide

A step-by-step guide for migrating documentation and examples from Jekyll + maker.js to MkDocs + photon/core.

## Audience

- Maintainers migrating legacy content
- Contributors updating examples and links

## Prerequisites

- Node.js 18/20 and npm
- Python 3.11+ for MkDocs
- Basic familiarity with TypeScript/TypeDoc

## Steps

### 1. Prepare Repository

1. Create a working branch
2. Ensure root `requirements.txt` contains MkDocs deps
3. Confirm `docs/` contains MkDocs site (or use `docs-new/` and rename later)

### 2. Convert Content to photon/core

1. Replace `maker.js` usage with `@7syllable/photon-core`
2. Convert `var` → `const`, `require` → `import`
3. Prefer named imports over namespaces
4. Update examples to ES6 modules and direct SVG rendering

### 3. Generate TypeDoc API Reference

1. Use existing script in `packages/docs/` to generate TypeDoc
2. Place output at `docs/docs/api/` (modules/, functions/, interfaces/)
3. Verify modules like `core_path`, `core_fillet-path`, `core_fillet-chain`

### 4. Update API Links

1. Run link validator/updater:
   - `scripts/migration/validate_api_links.py`
   - `scripts/migration/update_api_links.py`
2. Ensure special mappings:
   - `path.fillet` → `core_fillet-path.html#pathfillet`
   - `path.dogbone` → `core_fillet-path.html#pathdogbone`
   - `chain.*` fillet/dogbone → `core_fillet-chain.html`
3. Re-run validator to confirm 0 broken internal API links

### 5. Visual Inspection

1. Serve docs locally with `mkdocs serve`
2. Navigate key pages (Expanding/Outlining/Fillets)
3. Confirm missing API warnings are present (expandPaths, outline)
4. Capture screenshots as needed

### 6. Migrate Site Platform

1. Archive Jekyll site (`docs-jekyll-archive/`)
2. Rename `docs-new` → `docs`
3. Update `.gitignore` and README/CONTRIBUTING

### 7. CI/CD Setup

1. Add `.github/workflows/docs-deploy.yml`
2. Configure GitHub Pages → Source: GitHub Actions
3. Verify deployment URL works: `/docs/`

## Validation

- TypeDoc pages load and anchors resolve
- Snippet pages render and cross-links work
- Search (Lunr) initialized
- No console errors in key pages

## Known Exceptions

- Missing APIs: `expandPaths`, `outline` (tracked in issues)
- Some examples require browser environment and are not executed in Node.js validation

## References

- `docs/docs/MIGRATION.md`
- `specs/006-migration-from-jekyll/TYPEDOC-COMPLETION-REPORT.md`
- `specs/006-migration-from-jekyll/VISUAL-INSPECTION-REPORT.md`
- `.github/workflows/docs-deploy.yml`
