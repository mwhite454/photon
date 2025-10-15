# Quickstart: Photon Documentation

This quickstart gets you productive with the new MkDocs-based docs and photon/core examples.

## Prerequisites

- Node.js 18 or 20
- Python 3.11+

## Install and Build

```bash
# Install JS dependencies
npm ci

# Build all packages
npm run build

# (Optional) Run tests
npm test
```

## Serve Documentation Locally

```bash
cd docs
mkdocs serve
# Open http://localhost:8000/docs/
```

## Key Docs Entry Points

- Getting Started: `docs/docs/getting-started/index.md`
- Snippets (examples): `docs/docs/snippets/`
- API Reference (TypeDoc): `docs/docs/api/index.html`

## Migration Results (Real Stats)

- Snippets migrated: 71
- Files processed: 582
- API links updated: 132
- TypeDoc pages generated: 404 (21 non-critical warnings)
- Node-executable code blocks: 13/225 (browser examples excluded by design)

## Common Troubleshooting

- "Module not found: mkdocs"
  - Ensure Python dependencies installed: `pip install -r requirements.txt`
- "Unrecognised theme: shadcn"
  - Install theme: `pip install mkdocs-shadcn>=0.9.5`
- API link anchor 404
  - Known mapping changes: `path.fillet` → `core_fillet-path#pathFillet`

## Production Deployment

Docs auto-deploy to GitHub Pages on push to `main` (changes under `docs/**`).  
Workflow: `.github/workflows/docs-deploy.yml`

## Next Steps

- Explore examples in `docs/docs/snippets/`
- Browse API reference in `docs/docs/api/`
- Contribute improvements via PRs
