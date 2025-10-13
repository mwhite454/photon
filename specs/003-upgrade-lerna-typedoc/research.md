# Research: Lerna & TypeDoc Upgrade

**Phase**: 0 (Outline & Research)  
**Date**: 2025-10-12  
**Status**: Complete

## Purpose

Research breaking changes, migration requirements, and compatibility considerations for upgrading:

- Lerna: v6.0.3 → v8.x (latest stable)
- TypeDoc: v0.26.0 → v0.26.x or v0.27+ (latest stable)

## Research Questions

### 1. What is the latest stable version of Lerna?

**Decision**: Upgrade to Lerna v8.2.4 (latest stable v8.x as of October 2025, v9.0.0 available but requires Node.js 20+)

**Rationale**:

- Lerna v8.2.4 is the latest stable v8.x release (July 2025)
- Lerna v9.0.0 was released September 2025 but requires Node.js 20.19.0+ (breaking change)
- v8.2.4 includes security patches and bug fixes since v6.0.3
- Staying on v8.x allows Node.js 18+ compatibility while getting most recent stable features

**Breaking Changes (v6 → v7 → v8)**:

- **v7.0.0**: Dropped Node.js 14 support (requires Node.js 16+)
- **v7.0.0**: Removed deprecated `lerna bootstrap`, `lerna add`, `lerna link` commands - replaced with package manager workspaces
- **v7.0.0**: Changed default behavior for version bumping
- **v8.0.0**: Dropped Node.js 16 support (requires Node.js 18+)
- **v8.0.0**: Updated internal dependencies and build tools
- **v8.2.x**: Removed all lodash usage, improved workspace specifier handling

**Breaking Changes (v8 → v9)** - NOT upgrading to v9 at this time:

- **v9.0.0**: Dropped Node.js 18 support (requires Node.js 20.19.0+, 22.12.0+, or 24.0.0+)
- **v9.0.0**: Fully removed `@lerna/legacy-package-management` package (no polyfill available)
- **v9.0.0**: Added OIDC trusted publishing support

**Migration Required**:

- ✅ Node.js version check: Current project uses Node.js 18+ (compatible with v8.x)
- ⚠️ `lerna bootstrap` command: Used in package.json scripts - MUST be removed (deprecated in v7, removed in v9)
- ⚠️ Package manager workspaces: MUST configure npm workspaces in root package.json
- ✅ Version bumping: Not used in this project (version is fixed at 0.0.0 in lerna.json)

**Alternatives Considered**:

- Stay on v6.x: Rejected - no security updates, missing bug fixes, deprecated commands
- Upgrade to v7.x only: Rejected - v8.2.4 is more stable with additional fixes
- Upgrade to v9.0.0: Rejected - requires Node.js 20+, too aggressive for this upgrade

### 2. What is the latest stable version of TypeDoc?

**Decision**: Upgrade to TypeDoc v0.28.14 (latest stable as of October 2025)

**Rationale**:

- Current: v0.26.0 (specified in package.json)
- TypeDoc v0.28.14 is the latest stable release (includes TypeScript 5.9 support)
- v0.28.x includes new features and bug fixes since v0.26.x
- No major breaking changes reported between v0.26 and v0.28

**Breaking Changes (v0.26.0 → v0.28.14)**:

- ✅ No major breaking changes - mostly additive features
- New options added: `preservedTypeAnnotationTags`, `excludePrivateClassFields`, `displayBasePath`
- Improved link resolution and anchor generation
- Better support for TypeScript 5.9 features (auto-accessors, etc.)
- Enhanced `@inheritDoc` behavior
- Improved relative link resolution

**New Features Available**:

- `@sortStrategy` tag for custom sorting per reflection
- Better handling of type-only exports
- Improved CommonMark link parsing
- Enhanced validation options

**Migration Required**:

- ✅ Current config in `packages/photon/typedoc.json` is v0.28-compatible (all options still valid)
- ✅ No deprecated options detected in current configuration
- ✅ TypeScript 5.6.3 is fully compatible with TypeDoc v0.28.14
- ⚠️ Review generated docs output for any visual/structural changes

**Alternatives Considered**:

- Stay on v0.26.0: Rejected - missing bug fixes, TypeScript 5.9 support, and improvements
- Lock to v0.26.x: Rejected - v0.28.x is stable with no breaking changes
- Use `^0.28.0`: Recommended - allows patch updates within v0.28.x

### 3. Are there any configuration changes required?

**Decision**: Minimal configuration changes needed

**Lerna Configuration** (`lerna.json`):

```json
{
  "packages": ["docs/demos", "packages/*"],
  "version": "0.0.0"
}
```

- ✅ Current config is minimal and compatible with v8.x
- ✅ No deprecated options used
- ⚠️ Review if additional options needed for v8 features

**TypeDoc Configuration** (`packages/photon/typedoc.json`):

```jsonc
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["./src"],
  "entryPointStrategy": "expand"
  // ... other options
}
```

- ✅ All options are v0.26-compatible
- ✅ Using standard options (entryPoints, entryPointStrategy, excludeExternals, etc.)
- ✅ No deprecated options detected

**NPM Scripts** (`package.json`):

```json
{
  "scripts": {
    "bootstrap": "lerna bootstrap", // ⚠️ DEPRECATED in v7+
    "build": "lerna run build",
    "docs": "lerna run docs --parallel",
    "test": "... && lerna run test --parallel && ..."
  }
}
```

**Required Changes**:

1. Replace `lerna bootstrap` with standard npm install workflow
2. Update package.json to use `npx lerna` or ensure Lerna is in devDependencies
3. Verify `lerna run` commands still work in v8.x (they should)

### 4. What are the performance implications?

**Decision**: No significant performance degradation expected

**Lerna v8.x Performance**:

- Improved caching mechanisms for `lerna run` commands
- Better workspace detection and dependency resolution
- Parallel execution performance maintained or improved

**TypeDoc v0.26.x Performance**:

- Performance comparable to v0.26.0
- Success criterion: Build time within 10% of baseline

**Measurement Plan**:

1. Baseline current docs build time: `time npm run docs`
2. After upgrade: `time npm run docs`
3. Compare and validate <10% regression

### 5. Are there any peer dependency conflicts?

**Decision**: Check peer dependencies during upgrade

**Known Dependencies**:

- Lerna v8.x requires: Node.js 18+, npm/yarn/pnpm 7+
- TypeDoc v0.26.x requires: TypeScript 4.6+ (project uses 5.6.3 ✅)

**Conflict Resolution**:

- ✅ Node.js 18+ is already required by other dependencies
- ✅ TypeScript 5.6.3 is compatible with TypeDoc v0.26.x
- ⚠️ Run `npm install` and check for peer dependency warnings

### 6. What testing strategy should be used?

**Decision**: Use existing test suite + manual validation

**Test Strategy**:

1. **Automated Tests**: Run existing test suite (`npm test`)
   - Must pass without modification (per spec FR-006, SC-006)
2. **Build Validation**: Run all build scripts

   - `npm run bootstrap` (updated to use new approach)
   - `npm run build`
   - `npm run docs`
   - All must complete with exit code 0 (SC-003)

3. **Documentation Validation**: Verify generated docs

   - Compare output before/after upgrade
   - Check for missing content or broken links (SC-007)
   - Verify no deprecation warnings (User Story 3)

4. **Security Audit**: Run npm audit

   - Zero high/critical vulnerabilities for Lerna and TypeDoc (SC-005)

5. **Performance Benchmark**: Measure docs build time
   - Must be within 10% of baseline (SC-004)

**Rollback Plan**:

- If tests fail: Revert package.json and package-lock.json
- Git branch allows safe experimentation

## Summary of Findings

### Lerna Upgrade Path

**Current**: v6.0.3  
**Target**: v8.2.4 (latest stable v8.x, v9.0.0 requires Node.js 20+)  
**Breaking Changes**: Yes (v6→v7→v8)  
**Action Required**: 
- Remove `lerna bootstrap` command from scripts
- Configure npm workspaces in root package.json
- Replace `lerna bootstrap` with `npm install`
- Run `lerna repair` after upgrade to migrate lerna.json

### TypeDoc Upgrade Path

**Current**: v0.26.0  
**Target**: v0.28.14 (latest stable)  
**Breaking Changes**: No major breaking changes (mostly additive)  
**Action Required**: 
- Update package.json to `^0.28.0`
- Review generated documentation output
- Optionally leverage new features (`@sortStrategy`, improved link resolution)

### Configuration Changes

| File           | Changes Needed                   | Reason                                   |
| -------------- | -------------------------------- | ---------------------------------------- |
| `package.json` (root) | Update dependency versions       | Upgrade to Lerna v8.2.4 and TypeDoc v0.28.14 |
| `package.json` (root) | Add `workspaces` configuration   | Required for Lerna v7+ (replaces bootstrap) |
| `package.json` (root) | Replace `lerna bootstrap` script | Deprecated in v7, removed in v9          |
| `package.json` (root) | Update `postinstall` script      | Remove `npm run bootstrap` call          |
| `lerna.json`   | Run `lerna repair` after upgrade | Migrate to latest configuration format   |
| `typedoc.json` | No changes required              | Current config is v0.28-compatible       |
| `CHANGELOG.md` | Document upgrade                 | Living documentation principle           |

### Build Process Repair Requirements

**Decision**: Fix pre-existing build failures as part of upgrade scope

**Rationale**:
- Cannot validate upgrade success when builds fail in both baseline and post-upgrade states
- Build failures prevent proper testing and documentation generation
- Fixing issues ensures project is in fully functional state after upgrade

**Pre-existing Issues Identified**:

1. **TypeDoc Documentation Generation Failure**
   - **Error**: "Unable to find any entry points" with 60 warnings about files not in tsconfig
   - **Root Cause**: TypeDoc entry points not referenced in tsconfig files/include option
   - **Fix Required**: Update `packages/photon/target/tsconfig.typedoc.json` to include all entry points OR adjust TypeDoc configuration to use correct tsconfig

2. **TypeScript Compilation Errors in demos/fonts**
   - **Error**: `Interface 'Buffer' incorrectly extends interface 'Uint8Array<ArrayBufferLike>'`
   - **Root Cause**: @types/node version incompatibility (Buffer interface changed)
   - **Fix Required**: Update @types/node to compatible version OR adjust TypeScript configuration

3. **Build Validation Impossible**
   - **Issue**: All build commands fail in baseline, making upgrade validation impossible
   - **Impact**: Cannot determine if upgrade introduces new issues
   - **Fix Required**: Ensure all builds complete with exit code 0

**Action Plan**:

1. **Fix TypeDoc Configuration**:
   - Review `packages/photon/typedoc.json` and referenced tsconfig
   - Ensure all entry points in `src/` are included in tsconfig
   - Test documentation generation completes successfully

2. **Fix TypeScript Compilation**:
   - Update @types/node to latest compatible version
   - OR add TypeScript compiler options to handle Buffer interface
   - Verify demos and fonts packages compile without errors

3. **Validate All Builds**:
   - Run `npm run build-tools` → exit code 0
   - Run `npm run build` → exit code 0
   - Run `npm run docs` → exit code 0
   - Run `npm test` → exit code 0

**Alternatives Considered**:

- **Skip build repair**: Rejected - cannot validate upgrade, leaves project broken
- **Separate task for build repair**: Rejected - upgrade validation requires working builds
- **Accept broken builds**: Rejected - violates project quality standards

### Risk Assessment

**Low Risk**:

- TypeDoc upgrade (minor version, well-tested)
- Lerna configuration (minimal, standard setup)
- Rollback available (git branch)
- TypeDoc configuration fix (standard tsconfig update)

**Medium Risk**:

- Lerna bootstrap removal (requires npm workspaces configuration)
- Package linking behavior change (npm workspaces vs lerna bootstrap)
- Peer dependency conflicts (check during install)
- @types/node version update (may affect other packages)

**High Risk (Mitigated)**:

- Build repair during upgrade (could introduce new issues)
- **Mitigation**: Test each fix independently, maintain baseline comparison

**Mitigation**:

- Thorough testing before merge
- Document all changes in CHANGELOG
- Keep git history clean for easy rollback
- Test build fixes independently before combining with upgrade
- Maintain baseline metrics for comparison

## Next Steps (Phase 1)

1. Create `data-model.md` documenting configuration entities and their relationships
2. Create `contracts/` directory with upgrade procedure specification
3. Create `quickstart.md` with step-by-step upgrade instructions
4. Update agent context with technology choices (Lerna v8.2.4, TypeDoc v0.28.14)
5. Re-evaluate Constitution Check post-design
6. Proceed to Phase 2 task breakdown in `/speckit.tasks`
