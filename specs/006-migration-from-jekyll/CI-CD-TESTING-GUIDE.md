# CI/CD Pipeline Testing Guide

**Created**: 2025-10-15  
**Purpose**: Testing documentation for MkDocs deployment workflow  
**Related Task**: T096

## Overview

The new `docs-deploy.yml` workflow handles:
1. **Building** MkDocs site from `/docs` directory
2. **Deploying** to GitHub Pages
3. **Testing** internal documentation links

## Prerequisites

Before the workflow can run successfully, ensure:

### 1. GitHub Pages Configuration

**In GitHub Repository Settings**:
1. Navigate to `Settings` → `Pages`
2. **Source**: Set to "GitHub Actions"
3. **Branch**: (Not applicable when using GitHub Actions)

### 2. Repository Permissions

The workflow uses `GITHUB_TOKEN` with these permissions:
- `contents: read` - Read repository files
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - OIDC token for deployment

These are automatically granted to GitHub Actions.

### 3. Python Dependencies

Ensure `requirements.txt` exists at repository root with:
```
mkdocs>=1.5.0
mkdocs-shadcn>=0.9.5
pymdown-extensions>=10.0
mkdocs-awesome-pages-plugin>=2.9.2
mkdocs-git-revision-date-localized-plugin>=1.2.4
mkdocs-minify-plugin>=0.7.2
beautifulsoup4>=4.12.0
```

## Testing Steps

### Step 1: Local Build Test

Before pushing, test the build locally:

```bash
# Navigate to docs directory
cd docs

# Build the site
mkdocs build --strict

# Expected output:
# INFO    -  Cleaning site directory
# INFO    -  Building documentation to directory: /path/to/docs/site
# INFO    -  Documentation built in X.XX seconds

# Verify site directory created
ls -la site/

# Serve locally
mkdocs serve

# Visit http://localhost:8000/docs/
```

**Expected Results**:
- Build completes in <30 seconds
- No errors or warnings
- `site/` directory contains HTML files
- Local server accessible at http://localhost:8000

### Step 2: Trigger Workflow (Option A - Push to main)

```bash
# Commit and push docs changes
git add .github/workflows/docs-deploy.yml
git add docs/
git commit -m "feat: add MkDocs deployment workflow"
git push origin main
```

**Trigger Conditions**:
- Push to `main` branch
- Changes in `docs/**` or `.github/workflows/docs-deploy.yml`

### Step 3: Trigger Workflow (Option B - Manual Dispatch)

**Via GitHub UI**:
1. Go to `Actions` tab
2. Select "Deploy Documentation" workflow
3. Click "Run workflow"
4. Select branch: `main`
5. Click "Run workflow" button

### Step 4: Monitor Workflow Execution

**In GitHub Actions tab**:

1. **Build Job**:
   - ✅ Checkout code
   - ✅ Setup Python 3.11
   - ✅ Install dependencies
   - ✅ Build MkDocs site
   - ✅ Verify build output
   - ✅ Upload site artifact

2. **Deploy Job**:
   - ✅ Deploy to GitHub Pages
   - ✅ Verify deployment

3. **Test Links Job**:
   - ✅ Build site for testing
   - ⚠️ Check internal links (non-blocking)

**Expected Duration**: 2-5 minutes total

### Step 5: Verify Deployment

**Check deployment URL**:

```bash
# URL pattern:
https://<username>.github.io/<repo>/docs/

# For this repo:
https://mwhite454.github.io/photon/docs/
```

**Verification Checklist**:
- [ ] Homepage loads (index.html)
- [ ] Navigation menu works
- [ ] Search functionality works
- [ ] API reference pages load
- [ ] Code examples render correctly
- [ ] Images and assets load
- [ ] Theme applies correctly (shadcn)
- [ ] Mobile responsive

### Step 6: Verify Subsequent Builds

**Make a test change**:

```bash
# Edit a doc file
echo "Test update" >> docs/docs/index.md

# Commit and push
git add docs/docs/index.md
git commit -m "test: verify docs auto-deploy"
git push origin main
```

**Expected**:
- Workflow triggers automatically
- New build completes
- Changes appear on GitHub Pages within 5 minutes

## Troubleshooting

### Build Fails: "Module not found"

**Error**: `ModuleNotFoundError: No module named 'mkdocs'`

**Solution**:
```bash
# Verify requirements.txt exists at repo root
cat requirements.txt

# If missing, create it with dependencies listed above
```

### Build Fails: "Theme not found"

**Error**: `Config value 'theme': Unrecognised theme name: 'shadcn'`

**Solution**:
```bash
# Install theme manually
pip install mkdocs-shadcn>=0.9.5

# Or update requirements.txt
echo "mkdocs-shadcn>=0.9.5" >> requirements.txt
```

### Deployment Fails: "Permission denied"

**Error**: `Error: HttpError: Resource not accessible by integration`

**Solution**:
1. Check repository Settings → Actions → General
2. Verify "Workflow permissions" = "Read and write permissions"
3. Enable "Allow GitHub Actions to create and approve pull requests"

### Pages Not Loading

**Symptoms**: 404 error on https://username.github.io/repo/

**Solutions**:

1. **Check Pages source**:
   - Settings → Pages
   - Source should be "GitHub Actions"

2. **Check deployment status**:
   - Actions tab → Latest deployment
   - Should show green checkmark

3. **Wait for propagation**:
   - Initial deployment can take 5-10 minutes
   - Subsequent updates: 1-3 minutes

### Link Checker Warnings

**Warning**: `Found X broken links`

**Note**: Link checker job is **non-blocking** (won't fail deployment)

**Action**:
1. Review workflow logs
2. Fix broken links in documentation
3. Re-run workflow

## Validation Checklist

Mark each item after successful verification:

### Pre-Deployment
- [ ] Local build succeeds (`mkdocs build --strict`)
- [ ] Local serve works (`mkdocs serve`)
- [ ] No build warnings or errors
- [ ] requirements.txt is complete

### Workflow Execution
- [ ] Workflow triggers on push to main
- [ ] Build job completes successfully
- [ ] Deploy job completes successfully
- [ ] Test links job runs (warnings OK)
- [ ] Workflow completes in <5 minutes

### Post-Deployment
- [ ] GitHub Pages shows deployment
- [ ] Site accessible at production URL
- [ ] Homepage renders correctly
- [ ] Navigation works
- [ ] Search works
- [ ] API docs load
- [ ] Code examples render
- [ ] Theme applies correctly

### Regression
- [ ] Subsequent changes trigger auto-deploy
- [ ] Updates appear on site within 5 minutes
- [ ] No broken links introduced

## Success Criteria

✅ **T096 is complete when**:

1. Workflow runs successfully end-to-end
2. Documentation deploys to GitHub Pages
3. Site is accessible at production URL
4. All validation checklist items pass
5. Auto-deployment works for subsequent changes

## References

- Workflow file: `.github/workflows/docs-deploy.yml`
- MkDocs config: `docs/mkdocs.yml`
- GitHub Pages: https://docs.github.com/en/pages
- GitHub Actions: https://docs.github.com/en/actions
- MkDocs documentation: https://www.mkdocs.org/

## Next Steps

After T096 completion:
1. Mark task as complete in tasks.md
2. Update Phase 10 completion status
3. Proceed to Phase 11: Documentation & Finalization

---

**Status**: Ready for testing  
**Last Updated**: 2025-10-15  
**Tester**: [Your Name]
