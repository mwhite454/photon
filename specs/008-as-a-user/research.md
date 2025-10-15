# Research: Publish and Verify Latest Photon Docs on GitHub Pages

## Decisions

- **Publication mechanism**
  - Decision: Use GitHub Pages with GitHub Actions as the source.
  - Rationale: `.github/workflows/docs-deploy.yml` already builds MkDocs and deploys via `actions/deploy-pages@v4` with proper `pages` and `id-token` permissions.
  - Alternatives considered: Manual `gh-pages` branch push (adds complexity, less secure); external hosting (Netlify/Vercel) not required.

- **Docs framework & theme**
  - Decision: MkDocs with `shadcn` theme as configured in `docs/mkdocs.yml`.
  - Rationale: Config present with theme `name: shadcn`, plugins (`awesome-pages`, `git-revision-date-localized`, `minify`, `search`), and `pymdownx` extensions.
  - Alternatives considered: mkdocs-material (popular, but current styling intent is shadcn per spec requirements).

- **Source directory and config**
  - Decision: Use `docs/docs/` as the content root and `docs/mkdocs.yml` as configuration.
  - Rationale: Matches spec FR-007 and repository layout.
  - Alternatives considered: top-level `mkdocs.yml` with `docs/` content; not aligned with current repo.

- **Verification approach**
  - Decision: Use Playwright to validate that the published site shows modern theme and recency markers.
  - Rationale: Playwright already set up (`playwright.config.js`, `tests/docs-migration/*`). We will add assertions for:
    - Header title "Photon"
    - Top navigation contains "Getting Started"
    - Search input visible
    - Repository link text "mwhite454/photon"
    - Build date/version marker present
  - Alternatives considered: Link checker only (insufficient for theme/visual markers), Lighthouse (useful but not required for acceptance).

- **Triggering builds**
  - Decision: Trigger deploy workflow on `push` to `main` and changes in `docs/**`.
  - Rationale: Already configured in `docs-deploy.yml`. This aligns with FR-002.
  - Alternatives considered: Deploy on tags or releases; not necessary for docs freshness.

## Needed Clarifications

## Resolved Clarifications

- **Production site URL**
  - Confirmed: `site_url` is set to the GitHub Pages production URL (to be reflected in `docs/mkdocs.yml` during release).

- **GitHub Pages settings**
  - Confirmed: Pages should serve from the `gh-pages` branch.

- **Default branch**
  - Confirmed: `main` remains the default branch for code.

## Risks & Mitigations

- **Cache delays**: Pages may cache assets. Mitigation: Use `--strict` builds and include version/date markers (`git-revision-date-localized`) to verify recency.
- **Broken links**: Link check job is present (`pytest-check-links`) as non-blocking; can be tightened later.
- **Theme regressions**: Add Playwright assertions for shadcn-specific markers (classes/DOM structure) where stable.

## Follow-ups

- Update `docs/mkdocs.yml` `site_url` for production when enabling Pages.
- Add/adjust Playwright spec to target the live Pages URL and assert FR-008 markers.
- Ensure repo Settings → Pages is configured to GitHub Actions.
