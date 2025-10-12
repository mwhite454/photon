# Quickstart: Implementing the Photon Rebrand

**Feature**: Rebrand from Maker.js to Photon  
**Audience**: Developers implementing this rebrand  
**Estimated Time**: 4-6 hours for complete rebrand  
**Date**: 2025-10-10

## Prerequisites

Before starting:
- [ ] Read [spec.md](./spec.md) - Understand the requirements
- [ ] Read [research.md](./research.md) - Understand the decisions
- [ ] Read [data-model.md](./data-model.md) - Understand the rename mapping
- [ ] Verify you're on branch `001-rebrand-from-maker`
- [ ] Ensure clean working directory (`git status`)
- [ ] Backup current state (`git stash` if needed)

## Tools Needed

- Text editor with find/replace across files (VS Code recommended)
- Terminal for running scripts
- Web browser for testing playground
- Git for version control

## Implementation Phases

### Phase 1: Legal & Documentation Foundation (30 minutes)

**Goal**: Create legal attribution and roadmap before code changes

#### Step 1.1: Create NOTICE File

```bash
# Create NOTICE file in repository root
cat > NOTICE << 'EOF'
Photon
Copyright 2025-present [Your Name/Organization]

This product is a fork of Maker.js, originally created by Microsoft Corporation.
Original Maker.js: Copyright 2015-2016 Microsoft Corporation

Maker.js was released under the Apache License 2.0 and is no longer actively
maintained by Microsoft. Photon continues the project with modern tooling,
active maintenance, and community-driven development.

Original Maker.js repository: https://github.com/Microsoft/maker.js

For the full license text, see the LICENSE file.
EOF
```

**Verify**: File exists and contains proper attribution

#### Step 1.2: Update LICENSE File

```bash
# Edit LICENSE file - add dual copyright at line 189
# Change from:
#   Copyright 2015-2016 Microsoft
# To:
#   Copyright 2015-2016 Microsoft Corporation
#   Copyright 2025-present [Your Name/Organization]
```

**Verify**: Both copyright lines present, Apache 2.0 text unchanged

#### Step 1.3: Create ROADMAP.md

```bash
# Move draft to final location
mv ROADMAP_DRAFT.md ROADMAP.md

# Optional: Review and finalize content
# The draft already has good structure from spec phase
```

**Verify**: ROADMAP.md exists in root, contains near/mid/long-term goals

#### Step 1.4: Update Constitution

```bash
# Edit .specify/memory/constitution.md
# Find/replace "Maker.js" → "Photon" (keep "Maker.js" in attribution/origins context)
```

**Verify**: Constitution references Photon, maintains attribution to Maker.js origins

**Checkpoint**: Run `git status` - should see NOTICE, LICENSE, ROADMAP.md, constitution.md modified

---

### Phase 2: Package Renames (45 minutes)

**Goal**: Update all package.json files and directory structure

#### Step 2.1: Verify NPM Availability

```bash
# Check if @photon scope is available
npm view @photon/core

# If taken, use fallback: @photonjs/core or @photon-lib/core
# Update data-model.md with chosen names
```

#### Step 2.2: Rename Core Package Directory

```bash
# Rename the main library directory
cd packages
mv maker.js photon
cd ..
```

**Verify**: Directory is now `packages/photon/`

#### Step 2.3: Update All package.json Files

Edit these 5 files:

**1. `/package.json` (root)**
```json
{
  "name": "photon-dev",
  // ... rest unchanged
}
```

**2. `/packages/photon/package.json`**
```json
{
  "name": "@photon/core",
  "description": "Photon - Modern ES6+ JavaScript library for CNC/laser cutting",
  // Update any "makerjs" references in scripts, keywords, etc.
}
```

**3. `/packages/playground/package.json`**
```json
{
  "name": "@photon/playground",
  "description": "Interactive playground for Photon",
  "dependencies": {
    "@photon/core": "workspace:*"  // Update dependency reference
  }
}
```

**4. `/packages/fonts/package.json`**
```json
{
  "name": "@photon/fonts",
  "description": "Font generation tools for Photon",
  "dependencies": {
    "@photon/core": "workspace:*"
  }
}
```

**5. `/packages/docs/package.json`**
```json
{
  "name": "@photon/docs",
  "description": "Documentation generator for Photon",
  "dependencies": {
    "@photon/core": "workspace:*"
  }
}
```

#### Step 2.4: Regenerate Lock Files

```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
rm -rf packages/*/node_modules packages/*/package-lock.json
npm install
```

**Verify**: `npm install` completes successfully, no errors

**Checkpoint**: Run verification script
```bash
chmod +x specs/001-rebrand-from-maker/contracts/verify-package-names.sh
./specs/001-rebrand-from-maker/contracts/verify-package-names.sh
```

---

### Phase 3: TypeScript Namespace Renames (60 minutes)

**Goal**: Update all TypeScript source code

#### Step 3.1: Core Library Namespace

```bash
# In packages/photon/src/ directory
# Find/replace across all .ts files:
#   "namespace MakerJs" → "namespace Photon"
#   "MakerJs." → "Photon."
#   "typeof MakerJs" → "typeof Photon"

# Use VS Code or similar:
# 1. Open packages/photon/src in editor
# 2. Find in Files: "MakerJs"
# 3. Replace with: "Photon"
# 4. Review each change before applying
```

**Files to check manually**:
- `packages/photon/src/core/*.ts`
- `packages/photon/src/models/*.ts`
- `packages/photon/src/tools/*.ts`

#### Step 3.2: Playground Namespace

```bash
# In packages/playground/src/ directory
# Find/replace:
#   "namespace MakerJsPlayground" → "namespace PhotonPlayground"
#   "MakerJsPlayground." → "PhotonPlayground."
```

#### Step 3.3: Update Import/Require Statements

```bash
# Find all require('makerjs') or import statements
# Replace with: require('@photon/core') or import from '@photon/core'

# Common patterns:
#   var makerjs = require('makerjs') → var photon = require('@photon/core')
#   import * as makerjs from 'makerjs' → import * as photon from '@photon/core'
```

**Checkpoint**: Run verification script
```bash
chmod +x specs/001-rebrand-from-maker/contracts/verify-namespaces.sh
./specs/001-rebrand-from-maker/contracts/verify-namespaces.sh
```

---

### Phase 4: Build Configuration (30 minutes)

**Goal**: Update build scripts and configuration files

#### Step 4.1: Update TypeScript Configurations

Edit `packages/photon/tsconfig.json`:
```json
{
  "compilerOptions": {
    "outFile": "./dist/photon.js",  // Update if present
    // ... other settings
  }
}
```

#### Step 4.2: Update Vite Configuration

Edit `packages/photon/vite.config.ts` (or similar):
```typescript
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'Photon',  // Global variable name
      fileName: (format) => `photon.${format}.js`  // Output file names
    }
  }
})
```

#### Step 4.3: Update Build Scripts

Check `packages/photon/target/build.js` or similar:
- Update output file names
- Update header comments
- Update version injection

#### Step 4.4: Test Build

```bash
# Run full build
npm run build

# Check output files
ls -la packages/photon/dist/
# Should see: photon.es.js, photon.umd.js, photon.d.ts, etc.
```

**Checkpoint**: Run verification script
```bash
chmod +x specs/001-rebrand-from-maker/contracts/verify-build.sh
./specs/001-rebrand-from-maker/contracts/verify-build.sh
```

---

### Phase 5: Documentation Updates (90 minutes)

**Goal**: Update all documentation with Photon branding

#### Step 5.1: Update README.md

```markdown
# Photon

Your compass and straightedge, in JavaScript.

Create line drawings using familiar constructs from geometry and drafting. 
Initially designated for CNC and laser cutters, Photon can also help you 
programmatically draw shapes for any purpose. It runs in both Node.js and 
web browsers.

## Origins

Photon is a modern fork of [Maker.js](https://github.com/Microsoft/maker.js), 
originally created by Microsoft as a Garage project. The original project is 
no longer actively maintained. Photon continues the mission with modern 
tooling, active maintenance, and community-driven development.

### Migrating from Maker.js

If you're using Maker.js, here's how to migrate:

**Node.js:**
```javascript
// Old
const makerjs = require('makerjs');

// New
const photon = require('@photon/core');
```

**Browser (ES modules):**
```javascript
// Old
import * as makerjs from 'makerjs';

// New
import * as photon from '@photon/core';
```

**TypeScript:**
```typescript
// Old
import * as MakerJs from 'makerjs';

// New
import * as Photon from '@photon/core';
```

## Installation

```bash
npm install @photon/core
```

[... rest of README with updated examples ...]
```

#### Step 5.2: Regenerate API Documentation

```bash
# Run TypeDoc to regenerate API docs
npm run docs

# Verify output in docs/api/
# Should now reference Photon namespace
```

#### Step 5.3: Update Tutorial/Guide Pages

```bash
# In docs/ directory, find/replace:
#   "Maker.js" → "Photon"
#   "makerjs" → "photon" or "@photon/core" (context-dependent)
#   require('makerjs') → require('@photon/core')

# Review each file manually for context
# Some historical references to Maker.js should remain
```

#### Step 5.4: Update Code Examples

```bash
# In docs/_snippets/ and docs/demos/
# Update all code examples to use Photon
# Test examples in playground to verify they work
```

**Checkpoint**: Run verification script
```bash
chmod +x specs/001-rebrand-from-maker/contracts/verify-docs.sh
./specs/001-rebrand-from-maker/contracts/verify-docs.sh
```

---

### Phase 6: Playground Updates (45 minutes)

**Goal**: Rebrand playground interface

#### Step 6.1: Update HTML

Edit `docs/playground/index.html`:
```html
<title>Photon Playground</title>
<h1>Photon Playground</h1>
<!-- Update all text references -->
```

#### Step 6.2: Update Example Models

```bash
# In docs/playground/examples/ or similar
# Update each example:
#   var makerjs = require('makerjs') → var photon = require('@photon/core')
#   makerjs.model → photon.model
#   etc.
```

#### Step 6.3: Test Playground

```bash
# Start development server
npm start

# Open http://localhost:8020
# Verify:
# - Title shows "Photon Playground"
# - Examples load correctly
# - Code execution works
# - Monaco Editor functions properly
# - No console errors
```

**Checkpoint**: Manual testing - complete playground checklist from verification-checklist.md

---

### Phase 7: Final Verification (30 minutes)

**Goal**: Ensure everything works

#### Step 7.1: Run All Verification Scripts

```bash
cd specs/001-rebrand-from-maker/contracts
chmod +x verify-*.sh

./verify-package-names.sh
./verify-namespaces.sh
./verify-dist-files.sh
./verify-docs.sh
./verify-build.sh
```

All scripts should pass ✅

#### Step 7.2: Complete Manual Checklist

Work through `contracts/verification-checklist.md`:
- Check all automated items
- Check all manual items
- Test playground thoroughly
- Review documentation quality

#### Step 7.3: Git Commit

```bash
# Stage all changes
git add -A

# Commit with clear message
git commit -m "feat: Rebrand from Maker.js to Photon

- Rename all packages to @photon scope
- Update TypeScript namespaces (MakerJs → Photon)
- Rename distribution files
- Add NOTICE file with fork attribution
- Update LICENSE with dual copyright
- Create ROADMAP.md
- Regenerate API documentation
- Update all code examples
- Rebrand playground interface
- Update README with migration guide

BREAKING CHANGE: Package names changed from 'makerjs' to '@photon/core'.
See README migration section for upgrade instructions.

Closes #001"
```

---

## Troubleshooting

### Build Fails

**Problem**: TypeScript compilation errors  
**Solution**: Check for missed namespace renames, run verify-namespaces.sh

**Problem**: Module not found errors  
**Solution**: Check package.json dependencies, run `npm install` again

### Playground Doesn't Load

**Problem**: Blank page or errors  
**Solution**: Check browser console, verify dist files built correctly

**Problem**: Examples don't work  
**Solution**: Check require statements updated, verify global variable name

### Documentation Issues

**Problem**: Broken links  
**Solution**: Use link checker tool, update paths manually

**Problem**: API docs show old names  
**Solution**: Clean docs directory, regenerate with `npm run docs`

## Success Criteria

Before considering the rebrand complete:

✅ All 5 verification scripts pass  
✅ All manual checklist items checked  
✅ Playground loads and functions correctly  
✅ At least 10 examples tested and working  
✅ Documentation reviewed for quality  
✅ README clearly communicates Photon identity  
✅ Legal files (LICENSE, NOTICE) correct  
✅ Git commit made with clear message

## Next Steps

After rebrand is complete:

1. Create PR for review (if working with team)
2. Update GitHub repository metadata
3. Prepare npm publication (version 2.0.0)
4. Announce rebrand to community
5. Monitor for issues and feedback

## Time Estimates

- Phase 1 (Legal): 30 minutes
- Phase 2 (Packages): 45 minutes
- Phase 3 (TypeScript): 60 minutes
- Phase 4 (Build): 30 minutes
- Phase 5 (Documentation): 90 minutes
- Phase 6 (Playground): 45 minutes
- Phase 7 (Verification): 30 minutes

**Total**: ~5.5 hours (may vary based on familiarity with codebase)

## Support

If you encounter issues:
1. Review the spec, research, and data-model documents
2. Check verification scripts for specific errors
3. Consult ROADMAP.md for project direction
4. Refer to constitution for quality standards

**Remember**: This is a rebrand, not a rewrite. No architectural changes should be needed!
