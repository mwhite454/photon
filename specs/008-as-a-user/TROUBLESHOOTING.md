# Troubleshooting: GitHub Pages Deployment

## Issue: Workflow runs but site doesn't update

### Symptoms
- GitHub Actions workflow completes successfully
- Old documentation still visible at https://mwhite454.github.io/photon/
- No errors in workflow logs

### Root Causes & Solutions

#### 1. GitHub Pages Not Enabled

**Check:**
1. Go to https://github.com/mwhite454/photon/settings/pages
2. Verify "Source" is set to **"GitHub Actions"** (not "Deploy from a branch")

**Fix:**
```
Repository Settings → Pages → Source → Select "GitHub Actions"
```

#### 2. Environment Not Configured

**Check:**
1. Go to https://github.com/mwhite454/photon/settings/environments
2. Verify `github-pages` environment exists
3. Check deployment protection rules aren't blocking

**Fix:**
- The environment should be auto-created on first deployment
- If it exists but has protection rules, they may need approval

#### 3. Workflow Permissions Issue

**Check:**
1. Go to https://github.com/mwhite454/photon/settings/actions
2. Verify "Workflow permissions" is set to "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests" is enabled

**Fix:**
```
Repository Settings → Actions → General → Workflow permissions
→ Select "Read and write permissions"
```

#### 4. First Deployment Requires Manual Approval

**Check:**
1. Go to https://github.com/mwhite454/photon/actions
2. Look for deployments waiting for approval
3. Check the "Environments" section in workflow run

**Fix:**
- First deployment to `github-pages` environment may require manual approval
- Click "Review deployments" and approve

### Verification Steps

After fixing configuration:

1. **Trigger a new deployment:**
   ```bash
   # Make a small change to docs
   echo "Test $(date)" >> docs/docs/index.md
   git add docs/docs/index.md
   git commit -m "Test deployment trigger"
   git push origin main
   ```

2. **Monitor the workflow:**
   - Visit https://github.com/mwhite454/photon/actions
   - Watch for "Deploy Documentation" workflow
   - Check for any approval requests

3. **Verify deployment:**
   - Wait 2-3 minutes after workflow completes
   - Visit https://mwhite454.github.io/photon/
   - Check for updated content
   - Clear browser cache if needed (Cmd+Shift+R)

### Common Issues

**Issue: "Resource not accessible by integration"**
- **Cause:** Insufficient workflow permissions
- **Fix:** Enable "Read and write permissions" in Actions settings

**Issue: "Deployment waiting for approval"**
- **Cause:** First deployment to protected environment
- **Fix:** Approve the deployment in Actions tab

**Issue: "404 - There isn't a GitHub Pages site here"**
- **Cause:** GitHub Pages not enabled or wrong source
- **Fix:** Set source to "GitHub Actions" in Pages settings

**Issue: Site shows old content**
- **Cause:** Browser cache or CDN cache
- **Fix:** Hard refresh (Cmd+Shift+R) or wait 5-10 minutes

### Manual Deployment Test

To manually trigger a deployment:

1. Go to https://github.com/mwhite454/photon/actions/workflows/docs-deploy.yml
2. Click "Run workflow"
3. Select branch: `main`
4. Click "Run workflow"
5. Monitor the run and check for errors

### Expected Workflow Behavior

**Successful deployment should show:**
1. ✅ Build MkDocs Site (1-2 minutes)
2. ✅ Deploy to GitHub Pages (30 seconds)
3. 🌐 Site accessible at https://mwhite454.github.io/photon/

**Timeline:**
- Workflow starts: Immediate (on push to main with docs/** changes)
- Build completes: 1-2 minutes
- Deploy completes: 30 seconds
- Site updates: 1-5 minutes (CDN propagation)
- **Total: 2-8 minutes from push to live**

### Debug Commands

```bash
# Check recent workflow runs
git log --oneline -5

# Verify docs changes are in main
git log --oneline --all --graph -10

# Check if workflow file is valid
cat .github/workflows/docs-deploy.yml

# Test local build
cd docs && mkdocs build && cd ..

# Check if site was built
ls -la docs/site/
```

### Contact Points

If deployment still fails after trying all fixes:
1. Check workflow logs for specific error messages
2. Verify all prerequisites in tasks.md Phase 2 are complete
3. Review GitHub Pages documentation: https://docs.github.com/en/pages
