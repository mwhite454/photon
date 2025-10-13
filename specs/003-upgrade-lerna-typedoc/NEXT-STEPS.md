# Next Steps: Rebrand Cleanup User Story

**Date**: 2025-10-12  
**Status**: Recommendation for next feature

## Summary

The Lerna v8.2.4 and TypeDoc v0.28.14 upgrade has been successfully completed and committed. However, during the implementation, we discovered extensive lingering references to the old "makerjs" branding throughout the codebase that need cleanup.

## What Was Completed

✅ **Upgrade Tasks (All Phases)**:
- Lerna upgraded from v6.0.3 to v8.2.4
- TypeDoc upgraded from v0.26.0 to v0.28.14
- Migrated to npm workspaces from deprecated lerna bootstrap
- Fixed TypeDoc documentation generation
- Fixed TypeScript compilation in demos and fonts packages
- Eliminated 13 npm audit vulnerabilities (0 high/critical)
- Created comprehensive documentation and CHANGELOG

## Remaining Issues

### Playground TypeScript Compilation Errors

The playground package has TypeScript errors that prevent it from building:

**Root Cause**: Incomplete rebrand from "makerjs" to "Photon"

**Specific Issues**:
1. **Variable declaration conflicts**: Workers declare `var makerjs: typeof Photon` which conflicts with global declarations
2. **Missing type definitions**: jscad, PDFKit namespaces need proper type definitions
3. **Mixed naming**: Code uses both `makerjs` and `Photon` interchangeably

**Examples Found**:
- `packages/photon/examples/filletstar.js`: `var makerjs = require('./../target/js/node.maker.js');`
- `packages/playground/src/worker/export-worker.ts`: `var makerjs: typeof Photon = require('makerjs');`
- `packages/playground/src/worker/render-worker.ts`: `var makerjs: typeof Photon = self.require('makerjs');`
- Global declarations in `globals.d.ts`: `declare var makerjs: any;`

## Recommended Next User Story

### Feature: Complete Maker.js to Photon Rebrand Cleanup

**Priority**: P2 (High - affects build quality and developer experience)

**Scope**:
1. **Audit Phase**: Search entire codebase for "makerjs" and "maker.js" references
2. **Categorize**: Identify which references are:
   - Internal code that should use "Photon"
   - External dependencies/libraries that must remain "makerjs"
   - Build artifacts that can be renamed
   - Documentation/comments that need updating

3. **Implementation**:
   - Rename internal variables from `makerjs` to `photon` or `Photon`
   - Update require/import statements to use consistent naming
   - Fix TypeScript type declarations to eliminate conflicts
   - Update build output file names (e.g., `node.maker.js` → `node.photon.js`)
   - Update documentation and comments
   - Ensure backward compatibility where needed

4. **Validation**:
   - All packages build successfully (including playground)
   - All tests pass
   - Documentation generates without errors
   - No TypeScript compilation errors

**Estimated Effort**: Medium (2-3 sessions)
- Session 1: Audit and categorization
- Session 2: Implementation and testing
- Session 3: Documentation and validation

**Benefits**:
- Playground package builds successfully
- Consistent branding throughout codebase
- Improved developer experience
- Cleaner TypeScript types
- Better maintainability

## Files That Need Attention

Based on initial investigation:

### High Priority (Blocking Builds)
- `packages/playground/src/globals.d.ts` - Type declarations
- `packages/playground/src/worker/export-worker.ts` - Variable naming
- `packages/playground/src/worker/render-worker.ts` - Variable naming
- `packages/playground/tsconfig.json` - Configuration
- `packages/playground/src/worker/tsconfig.json` - Configuration

### Medium Priority (Examples and Documentation)
- `packages/photon/examples/*.js` - All example files
- Build output paths and filenames
- Documentation references

### Low Priority (Comments and Legacy)
- Code comments
- Historical documentation
- Deprecated files

## Success Criteria for Next Story

1. ✅ Playground package builds with exit code 0
2. ✅ All TypeScript compilation errors resolved
3. ✅ Consistent naming convention throughout codebase
4. ✅ No "makerjs" references in active code (except where required for compatibility)
5. ✅ All tests pass
6. ✅ Documentation updated
7. ✅ CHANGELOG entry for rebrand cleanup

## Current Status

**Branch**: `003-upgrade-lerna-typedoc`  
**Commits**: 2 commits
1. Main upgrade commit with all changes
2. Documentation update marking tasks complete

**Build Status**:
- ✅ @photon/core: Builds successfully
- ✅ @photon/fonts: Builds successfully  
- ✅ @photon/docs: Generates successfully
- ❌ @photon/playground: TypeScript errors (rebrand cleanup needed)

**Test Status**: Same as baseline (playground errors prevent full test suite)

## Recommendation

Create a new feature specification:
```
specs/004-complete-rebrand-cleanup/
├── spec.md
├── plan.md
├── tasks.md
└── ...
```

Use `/speckit.specify` to create the specification for comprehensive rebrand cleanup.
