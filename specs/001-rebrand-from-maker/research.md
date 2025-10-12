# Research: Rebrand to Photon

**Feature**: Rebrand from Maker.js to Photon  
**Phase**: 0 - Research & Decision Documentation  
**Date**: 2025-10-10

## Overview

This document captures research and decisions for the Photon rebrand. Since this is a rename-in-place operation with no architectural changes, research focuses on tooling, naming conventions, and legal compliance rather than technical architecture.

## Key Decisions

### 1. Package Naming Strategy

**Decision**: Use "@photon" scoped packages on npm

**Rationale**:
- Scoped packages (@photon/core, @photon/playground, etc.) provide clear namespace ownership
- Avoids potential conflicts with existing "photon" package on npm
- Allows for future expansion (@photon/plugins, @photon/cli, etc.)
- Industry standard pattern (e.g., @angular, @babel, @types)

**Alternatives Considered**:
- **Unscoped "photon"**: Simpler but may conflict with existing packages, less extensible
- **"photonjs"**: Adds unnecessary suffix, less clean
- **"photon-cad"**: Too specific, limits future scope

**Implementation**: 
- Core library: `@photon/core`
- Playground: `@photon/playground` 
- Fonts: `@photon/fonts`
- Docs: `@photon/docs`

### 2. TypeScript Namespace Renaming

**Decision**: Rename `MakerJs` namespace to `Photon`, maintain IIFE pattern temporarily

**Rationale**:
- Maintains existing build architecture (TypeScript namespace → IIFE)
- Minimizes risk during rebrand (no module system changes)
- Future modernization (ES modules) can be separate effort
- Existing code using `MakerJs` namespace will break (acceptable for MAJOR version)

**Alternatives Considered**:
- **Keep MakerJs namespace**: Confusing, defeats purpose of rebrand
- **Switch to ES modules immediately**: Too risky, combines rebrand with architecture change
- **Provide compatibility layer**: Adds complexity, delays clean break

**Implementation**:
- Find/replace `namespace MakerJs` → `namespace Photon`
- Find/replace `MakerJs.` → `Photon.` in all TypeScript files
- Update tsconfig.json outFile names
- Regenerate type definitions

### 3. Distribution File Naming

**Decision**: Rename all output files to use "photon" prefix

**Rationale**:
- Consistent with package naming
- Clear identity for CDN users
- Follows convention (maker.js → photon.js, maker.es.js → photon.es.js)

**File Mapping**:
- `dist/index.js` → `dist/index.js` (internal, no change)
- `dist/browser.maker.js` → `dist/browser.photon.js` (UMD bundle)
- `dist/maker.es.js` → `dist/photon.es.js` (ES module)
- `dist/maker.umd.js` → `dist/photon.umd.js` (UMD)
- `dist/maker.d.ts` → `dist/photon.d.ts` (TypeScript definitions)

**Build Script Updates**:
- Update Vite config output names
- Update Browserify output paths
- Update version injection scripts
- Update CDN deployment paths

### 4. Legal Attribution & Licensing

**Decision**: Maintain Apache 2.0, add NOTICE file, update LICENSE with dual copyright

**Rationale**:
- Apache 2.0 explicitly allows forks and derivative works
- Section 4(c) requires retaining attribution notices
- Section 4(d) requires NOTICE file if present (we'll create one)
- Adding our copyright alongside Microsoft's is permitted (Section 4, line 123-124)

**LICENSE File Format**:
```
Copyright 2015-2016 Microsoft Corporation
Copyright 2025-present [Maintainer Name]

Licensed under the Apache License, Version 2.0...
```

**NOTICE File Content**:
```
Photon
Copyright 2025-present [Maintainer Name]

This product is a fork of Maker.js, originally created by Microsoft Corporation.
Original Maker.js: Copyright 2015-2016 Microsoft Corporation

Maker.js was released under the Apache License 2.0 and is no longer actively
maintained by Microsoft. Photon continues the project with modern tooling,
active maintenance, and community-driven development.

Original Maker.js repository: https://github.com/Microsoft/maker.js
```

**Alternatives Considered**:
- **Different license**: Would require permission, Apache 2.0 is permissive enough
- **No NOTICE file**: Not required but best practice for attribution
- **Separate LICENSE**: Confusing, dual copyright in single file is standard

### 5. Documentation Regeneration Strategy

**Decision**: Regenerate all API docs, manually update prose documentation

**Rationale**:
- API docs generated from TypeScript (TypeDoc) - automatic update
- Prose docs (tutorials, guides) need manual review for context
- Examples need code updates (require('makerjs') → require('@photon/core'))

**Documentation Types**:
1. **API Reference** (Generated):
   - Run TypeDoc with updated namespace
   - Output to `/docs/api/`
   - Automatic rebrand through source code changes

2. **Tutorials & Guides** (Manual):
   - ~50 markdown files in `/docs/`
   - Find/replace "Maker.js" → "Photon"
   - Update code examples
   - Review for context (some may reference "making" vs "photon" concepts)

3. **Playground Examples** (Semi-automatic):
   - ~30 example models
   - Update require statements
   - Test each example loads correctly
   - Update descriptions/comments

**Tools**:
- TypeDoc 0.26.0 (already in package.json)
- Manual find/replace with verification
- Playground testing via localhost:8020

### 6. NPM Package Availability

**Research Task**: Verify @photon scope availability on npm

**Status**: TO BE VERIFIED during implementation

**Fallback Options** (if @photon taken):
1. `@photonjs/*` - adds js suffix
2. `@photon-cad/*` - more specific
3. `@photon-lib/*` - generic library scope
4. Request scope from current owner (if inactive)

**Action**: Check `npm view @photon/core` before proceeding with package renames

### 7. Build System Compatibility

**Decision**: Maintain existing Lerna + Vite + Browserify build system

**Rationale**:
- Build system works, no need to change during rebrand
- Vite 7.1.9 already upgraded (modern)
- Lerna 6.0.3 handles monorepo well
- Browserify still needed for UMD bundle (legacy support)

**No Changes Required**:
- Lerna configuration (just package names)
- Vite config (just output names)
- TypeScript compilation (just namespace names)
- Browserify bundling (just input/output paths)

**Verification**:
- Run `npm run build` after renames
- Verify all 4 packages build successfully
- Check dist/ output files have correct names
- Test playground loads and functions

### 8. Git & Repository Strategy

**Decision**: Rebrand in-place on current repository

**Rationale**:
- Preserves git history
- Maintains GitHub stars, issues, PRs
- Simpler than forking to new repo
- Can update description/topics easily

**Repository Updates**:
- Description: "Photon - Modern ES6+ JavaScript library for CNC/laser cutting"
- Topics: Add "photon", "laser-cutting", "cnc", "es6", "typescript"
- Topics: Keep "makerjs" for discoverability during transition
- README badge updates (npm, build status, etc.)
- GitHub Pages: Update CNAME if custom domain desired

**Alternatives Considered**:
- **Fork to new repo**: Loses history, stars, community
- **Keep maker.js name**: Defeats purpose of rebrand

## Research Summary

All technical decisions documented above. No NEEDS CLARIFICATION items remain - this is a straightforward rebrand operation with clear technical path:

1. ✅ Package naming: @photon scope
2. ✅ Namespace: MakerJs → Photon
3. ✅ Distribution files: photon.js, photon.es.js, etc.
4. ✅ Legal: Apache 2.0 maintained, NOTICE file added
5. ✅ Documentation: TypeDoc regeneration + manual updates
6. ⏳ NPM availability: Verify during implementation
7. ✅ Build system: No changes, just renames
8. ✅ Repository: In-place rebrand

## Next Steps

Proceed to **Phase 1: Design & Contracts** to document:
- File rename mapping (data-model.md)
- Verification checklist (contracts/)
- Quick start guide for contributors (quickstart.md)
