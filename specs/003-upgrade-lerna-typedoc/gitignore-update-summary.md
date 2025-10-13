# .gitignore Update Summary

**Date**: 2025-10-12  
**Purpose**: Exclude build outputs from version control  
**Rationale**: Repository should contain source code and build process, not build artifacts

## Changes Made

### Updated .gitignore Structure

Reorganized and expanded `.gitignore` with clear sections:

1. **Dependencies**
   - `node_modules`

2. **Build outputs** (NEW/EXPANDED)
   - `**/dist/` - All dist directories
   - `*.js.map` - Source maps
   - `packages/photon/dist/` - Core library build
   - `packages/fonts/gen.js` - Generated fonts file
   - `packages/playground/dist/` - Playground build
   - `docs/demos/demoify.js` - Compiled demo tool
   - `docs/demos/js/` - Demo JavaScript outputs

3. **Generated documentation** (NEW)
   - `docs/docs/api/` - TypeDoc generated documentation

4. **IDE and OS**
   - Existing entries organized

5. **Debug and logs**
   - Existing entries plus `packages/*/debug/`

6. **Legacy/deprecated**
   - Existing entries

7. **Jekyll**
   - Existing entries

## Rationale

### Why Exclude Build Outputs?

1. **Source of Truth**: Git should track source code, not compiled artifacts
2. **Reproducibility**: Anyone can rebuild from source using `npm run build`
3. **Diff Clarity**: Build outputs create noise in diffs and PRs
4. **Repository Size**: Build artifacts significantly increase repo size
5. **Merge Conflicts**: Build outputs cause unnecessary merge conflicts
6. **CI/CD Best Practice**: Builds should be generated in CI/CD pipelines

### What Gets Excluded?

#### TypeScript Compilation Outputs
- `packages/fonts/gen.js` - Compiled from `gen.ts`
- `docs/demos/demoify.js` - Compiled from `demoify.ts`
- All `*.js.map` source map files

#### Bundled Distributions
- `packages/photon/dist/` - Contains:
  - `photon.es.js`, `photon.iife.js`, `photon.umd.js`
  - Source maps
  - `project.json` (TypeDoc JSON)
  - `docs/` subdirectory (TypeDoc HTML)

#### Generated Documentation
- `docs/docs/api/` - TypeDoc HTML documentation
  - Classes, functions, interfaces, modules
  - Assets, navigation, search

## Currently Tracked Build Artifacts

The following build artifacts are currently tracked in git and will be ignored going forward:

### TypeScript Compiled Files
- `docs/demos/demoify.js`
- `packages/fonts/gen.js`

### Source Maps (*.js.map)
- `docs/playground/js/*.js.map` (11 files)
- `packages/docs/playground/js/*.js.map`
- `packages/photon/debug/**/*.js.map` (60+ files)

### Distribution Directories
- `packages/photon/dist/` (if previously committed)
- `docs/docs/api/` (if previously committed)

## Impact on Workflow

### For Developers

**Before First Build**:
```bash
npm install
npm run build
npm run docs
```

**After Pulling Changes**:
```bash
npm install  # If dependencies changed
npm run build  # Rebuild if source changed
```

### For CI/CD

Build steps remain the same:
```bash
npm install
npm run build
npm run build-tools
npm run docs
npm test
```

### For Documentation

TypeDoc documentation is generated but not committed:
- Developers generate locally: `npm run docs`
- CI/CD generates for deployment
- GitHub Pages or hosting service serves built docs

## Migration Notes

### Existing Tracked Files

Some build artifacts are currently tracked in git. After this change:

1. **They will remain in git history** (not removed)
2. **Future changes will be ignored** (not tracked)
3. **Local modifications won't show in `git status`**

### To Remove from Git (Optional)

If you want to remove build artifacts from git tracking entirely:

```bash
# Remove from git but keep locally
git rm --cached docs/demos/demoify.js
git rm --cached packages/fonts/gen.js
git rm --cached -r packages/photon/dist/
git rm --cached -r docs/docs/api/
git rm --cached "*.js.map"

# Commit the removal
git commit -m "chore: remove build artifacts from git tracking"
```

**Note**: This is optional and can be done in a separate commit.

## Verification

### Check What's Ignored

```bash
git status --ignored
```

### Check What Would Be Committed

```bash
git status
```

Build outputs should no longer appear in `git status` after running builds.

## Benefits

1. ✅ **Cleaner Repository**: Only source code tracked
2. ✅ **Smaller Repo Size**: No large build artifacts
3. ✅ **Clearer Diffs**: Only source changes in PRs
4. ✅ **Fewer Conflicts**: No merge conflicts on build outputs
5. ✅ **Faster Clones**: Smaller repository to clone
6. ✅ **Best Practice**: Aligns with modern development workflows

## Conclusion

Updated `.gitignore` to properly exclude all build outputs and generated documentation. This follows best practices for monorepo management and ensures the repository contains only source code and configuration, not build artifacts.
