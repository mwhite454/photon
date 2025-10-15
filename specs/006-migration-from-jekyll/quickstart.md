# Quickstart Guide: Jekyll to MkDocs Migration

**Feature**: Documentation Migration from Jekyll to MkDocs  
**Date**: 2025-10-13  
**Status**: Complete

## Overview

This guide provides step-by-step instructions for setting up the MkDocs environment, running the migration scripts, and validating the migration results.

---

## Prerequisites

### Required Software

- **Python 3.8+**: MkDocs and migration scripts
- **pip**: Python package manager
- **Node.js 18+**: Playwright tests
- **npm**: Node package manager
- **Git**: Version control

### Verify Prerequisites

```bash
# Check Python version
python3 --version  # Should be 3.8 or higher

# Check pip
pip3 --version

# Check Node.js
node --version  # Should be 18.x or higher

# Check npm
npm --version

# Check Git
git --version
```

---

## Step 1: Install MkDocs and Theme

### Install MkDocs and Plugins

```bash
# Install MkDocs and mkdocs-material theme
pip3 install mkdocs>=1.5.0
pip3 install mkdocs-material

# Install essential plugins
pip3 install pymdown-extensions
pip3 install mkdocs-awesome-pages-plugin
pip3 install mkdocs-minify-plugin
pip3 install mkdocs-redirects
pip3 install mkdocs-git-revision-date-localized-plugin
pip3 install mkdocs-macros-plugin

# Verify installation
mkdocs --version
```

### Alternative: Install from requirements.txt

```bash
# Create requirements.txt
cat > requirements.txt << EOF
mkdocs>=1.5.0
mkdocs-material>=9.0.0
pymdown-extensions>=10.0
mkdocs-awesome-pages-plugin>=2.9.0
mkdocs-minify-plugin>=0.7.0
mkdocs-redirects>=1.2.0
mkdocs-git-revision-date-localized-plugin>=1.2.0
mkdocs-macros-plugin>=1.0.0
beautifulsoup4>=4.12.0
markdownify>=0.11.0
EOF

# Install all dependencies
pip3 install -r requirements.txt
```

---

## Step 2: Install Migration Script Dependencies

### Python Dependencies

```bash
# HTML parsing and conversion
pip3 install beautifulsoup4
pip3 install markdownify
pip3 install html2text

# Validation and testing
pip3 install pytest
pip3 install linkchecker
```

### Node.js Dependencies (Playwright)

```bash
# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install

# Verify installation
npx playwright --version
```

---

## Step 3: Set Up MkDocs Configuration

### Create Basic mkdocs.yml

```bash
# Navigate to repository root
cd /path/to/photon

# Create docs-new directory
mkdir -p docs-new/docs

# Create mkdocs.yml
cat > docs-new/mkdocs.yml << 'EOF'
site_name: Photon Documentation
site_url: https://photon.js.org
site_description: JavaScript library for creating 2D drawings for CNC and laser cutting

theme:
  name: material
  palette:
    # Light mode
    - scheme: default
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    # Dark mode
    - scheme: slate
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-4
        name: Switch to light mode
  features:
    - navigation.instant
    - navigation.tracking
    - navigation.tabs
    - navigation.sections
    - navigation.expand
    - navigation.top
    - search.suggest
    - search.highlight
    - content.code.copy
    - content.code.annotate

plugins:
  - search:
      lang: en
      separator: '[\s\-\.]+'
  - awesome-pages
  - git-revision-date-localized:
      type: date
      enable_creation_date: true
  - minify:
      minify_html: true
      minify_js: true
      minify_css: true
  - macros

markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
      line_spans: __span
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.details
  - admonition
  - toc:
      permalink: true
  - attr_list
  - md_in_html
  - tables
  - footnotes

extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/photon-project/photon
EOF
```

---

## Step 4: Run Migration Scripts

### Prepare Migration Environment

```bash
# Create migration scripts directory
mkdir -p scripts/migration
mkdir -p scripts/migration/validation

# Set up Python path
export PYTHONPATH="${PYTHONPATH}:$(pwd)/scripts/migration"
```

### Run Snippet Conversion

```bash
# Convert all Jekyll snippets to markdown
python3 scripts/migration/snippet_converter.py \
  --source docs/_snippets \
  --target docs-new/docs \
  --output migration-snippets.json

# Expected output:
# ✓ Converted 71 snippets
# ✓ Generated migration-snippets.json
```

### Run Page Conversion

```bash
# Convert all documentation pages
python3 scripts/migration/page_converter.py \
  --source docs/docs \
  --target docs-new/docs \
  --snippets migration-snippets.json \
  --output migration-pages.json

# Expected output:
# ✓ Converted 70 pages
# ✓ Embedded snippets
# ✓ Generated migration-pages.json
```

### Update Internal Links

```bash
# Fix all internal links
python3 scripts/migration/link_updater.py \
  --docs-dir docs-new/docs \
  --migration-map migration-pages.json \
  --output link-updates.json

# Expected output:
# ✓ Updated 150 internal links
# ✓ Generated link-updates.json
```

### Migrate Assets

```bash
# Copy and organize static assets
python3 scripts/migration/asset_migrator.py \
  --source docs \
  --target docs-new \
  --output migration-assets.json

# Expected output:
# ✓ Migrated 50 assets
# ✓ Generated migration-assets.json
```

---

## Step 5: Validate Migration

### Content Validation

```bash
# Verify content preservation
python3 scripts/migration/validation/content_validator.py \
  --migration-results migration-pages.json \
  --output validation-report.json

# Expected output:
# ✓ Content validation: 100% match
# ✓ Generated validation-report.json
```

### Link Validation

```bash
# Check all links
python3 scripts/migration/validation/link_checker.py \
  --docs-dir docs-new/docs \
  --output link-check-report.json

# Expected output:
# ✓ Internal links: 0 broken
# ✓ External links: 0 broken
# ✓ Generated link-check-report.json
```

---

## Step 6: Start MkDocs Development Server

### Build and Serve

```bash
# Navigate to docs-new directory
cd docs-new

# Build the site
mkdocs build

# Expected output:
# INFO    -  Cleaning site directory
# INFO    -  Building documentation to directory: site
# INFO    -  Documentation built in 5.2 seconds

# Start development server
mkdocs serve

# Expected output:
# INFO    -  Building documentation...
# INFO    -  Cleaning site directory
# INFO    -  Documentation built in 5.1 seconds
# INFO    -  [14:30:00] Watching paths for changes: 'docs', 'mkdocs.yml'
# INFO    -  [14:30:00] Serving on http://127.0.0.1:8000/
```

### Verify in Browser

1. Open browser to `http://localhost:8000`
2. Verify homepage loads with mkdocs-material theme
3. Check navigation structure
4. Test search functionality
5. Verify code examples render correctly
6. Check responsive design (resize browser)

---

## Step 7: Run Playwright Tests

### Configure Playwright

```bash
# Navigate to repository root
cd /path/to/photon

# Create playwright.config.js
cat > playwright.config.js << 'EOF'
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/docs-migration',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:8000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'cd docs-new && mkdocs serve',
    port: 8000,
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});
EOF
```

### Run Tests

```bash
# Run all Playwright tests
npx playwright test

# Expected output:
# Running 15 tests using 3 workers
# ✓ visual-verification.spec.js:5:1 › Homepage loads with theme (2s)
# ✓ navigation.spec.js:5:1 › Navigation structure present (1s)
# ✓ content-rendering.spec.js:5:1 › Code blocks render correctly (1s)
# ...
# 15 passed (15s)

# Run specific test file
npx playwright test visual-verification.spec.js

# Run tests in headed mode (see browser)
npx playwright test --headed

# Generate HTML report
npx playwright show-report
```

---

## Step 8: Compare with Jekyll Site

### Side-by-Side Comparison

```bash
# Start Jekyll site (in separate terminal)
cd docs
bundle exec jekyll serve --port 4000

# Start MkDocs site (in another terminal)
cd docs-new
mkdocs serve --dev-addr 127.0.0.1:8000

# Open both in browser:
# Jekyll: http://localhost:4000
# MkDocs: http://localhost:8000

# Compare:
# - Navigation structure
# - Page content
# - Code examples
# - Styling and layout
# - Search functionality
```

---

## Step 9: Deploy to GitHub Pages (Optional)

### Configure GitHub Pages Deployment

```bash
# Add GitHub Pages workflow
mkdir -p .github/workflows

cat > .github/workflows/docs.yml << 'EOF'
name: Deploy Documentation

on:
  push:
    branches:
      - main
      - 006-migration-from-jekyll

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
      
      - name: Build documentation
        run: |
          cd docs-new
          mkdocs build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs-new/site
EOF
```

### Manual Deployment

```bash
# Build production site
cd docs-new
mkdocs build

# Deploy to gh-pages branch
mkdocs gh-deploy

# Expected output:
# INFO    -  Cleaning site directory
# INFO    -  Building documentation to directory: site
# INFO    -  Documentation built in 5.3 seconds
# INFO    -  Copying 'site' to 'gh-pages' branch and pushing to GitHub
# INFO    -  Your documentation should shortly be available at: https://username.github.io/photon/
```

---

## Troubleshooting

### Common Issues

#### Issue: MkDocs build fails with "Module not found"

**Solution**:
```bash
# Reinstall dependencies
pip3 install -r requirements.txt

# Verify installation
pip3 list | grep mkdocs
```

#### Issue: Playwright tests fail with "Browser not found"

**Solution**:
```bash
# Install browsers
npx playwright install

# Install system dependencies (Linux)
npx playwright install-deps
```

#### Issue: Migration script fails with encoding error

**Solution**:
```bash
# Set UTF-8 encoding
export PYTHONIOENCODING=utf-8

# Re-run migration script
python3 scripts/migration/snippet_converter.py ...
```

#### Issue: Links broken after migration

**Solution**:
```bash
# Re-run link updater
python3 scripts/migration/link_updater.py \
  --docs-dir docs-new/docs \
  --migration-map migration-pages.json \
  --fix-broken-links

# Verify with link checker
python3 scripts/migration/validation/link_checker.py \
  --docs-dir docs-new/docs
```

#### Issue: Search not working in MkDocs

**Solution**:
```bash
# Rebuild search index
cd docs-new
mkdocs build --clean

# Verify search plugin is enabled in mkdocs.yml
grep -A 2 "plugins:" mkdocs.yml
```

#### Issue: Theme not applying correctly

**Solution**:
```bash
# Verify mkdocs-material is installed
pip3 show mkdocs-material

# Check theme configuration in mkdocs.yml
cat mkdocs.yml | grep -A 5 "theme:"

# Clear browser cache and reload
```

---

## Development Workflow

### Typical Development Cycle

```bash
# 1. Make changes to markdown files
vim docs-new/docs/getting-started/index.md

# 2. MkDocs auto-reloads (if serve is running)
# Check browser - changes should appear immediately

# 3. Run validation
python3 scripts/migration/validation/content_validator.py

# 4. Run tests
npx playwright test

# 5. Commit changes
git add docs-new/
git commit -m "Update getting started guide"
```

### Hot Reload

MkDocs development server supports hot reload:

```bash
# Start server with hot reload
cd docs-new
mkdocs serve

# Make changes to any file in docs/ or mkdocs.yml
# Browser automatically refreshes
```

---

## Validation Checklist

Before considering migration complete, verify:

- [ ] All 71 snippets converted to markdown
- [ ] All 70 documentation pages converted
- [ ] All static assets migrated
- [ ] All internal links working
- [ ] All external links working
- [ ] Code examples render correctly
- [ ] Search functionality works
- [ ] Navigation structure matches Jekyll
- [ ] Theme applied correctly
- [ ] Responsive design works
- [ ] Dark mode works
- [ ] Playwright tests pass (100%)
- [ ] Content validation passes (100%)
- [ ] No console errors in browser
- [ ] Build completes in <10 seconds
- [ ] Site accessible on localhost:8000

---

## Next Steps

After completing this quickstart:

1. Review generated migration reports
2. Manually verify sample pages
3. Test all interactive features
4. Get stakeholder approval
5. Plan cutover from Jekyll to MkDocs
6. Archive old Jekyll site
7. Update CI/CD pipelines
8. Deploy to production

---

## Additional Resources

- **MkDocs Documentation**: https://www.mkdocs.org/
- **Material for MkDocs**: https://squidfunk.github.io/mkdocs-material/
- **Playwright Documentation**: https://playwright.dev/
- **Migration Scripts**: `scripts/migration/README.md`
- **Validation Reports**: `migration-*.json` files

---

## Support

For issues or questions:

1. Check troubleshooting section above
2. Review migration reports for errors
3. Check Playwright test results
4. Consult MkDocs documentation
5. Create issue in project repository

**Migration complete!** Your documentation is now running on MkDocs with AI-friendly enhancements.
