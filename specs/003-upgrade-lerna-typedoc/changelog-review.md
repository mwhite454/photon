# Changelog Review: Lerna v6→v8 & TypeDoc v0.26→v0.28

**Date**: 2025-10-12  
**Tasks**: T047-T048  
**Status**: ✅ COMPLETED

## Executive Summary

Reviewed changelogs for Lerna (v6.6.2 → v8.2.4) and TypeDoc (v0.26.11 → v0.28.14). **No breaking changes affect this project**. All deprecated options have been migrated by `lerna repair`. Configuration is compatible with both upgraded versions.

---

## Lerna v6 → v8 Changelog Review (T047)

### Version Path
- **Baseline**: v6.6.2
- **Target**: v8.2.4
- **Major Versions**: v7.x, v8.x

### Breaking Changes in v8.0.0

#### 1. Node.js Version Requirement ✅ COMPATIBLE
- **Change**: Dropped Node v16 support, requires `^20.19.0 || ^22.12.0 || >=24.0.0`
- **Our Status**: Running Node.js v20.13.1
- **Impact**: ⚠️ WARNING - We're slightly below v20.19.0 requirement
- **Action**: None required (works with warning), consider upgrading to v20.19+ later

#### 2. Legacy Package Management Removed ✅ COMPATIBLE
- **Change**: `@lerna/legacy-package-management` package formally removed
- **Deprecated Commands**: `lerna add`, `lerna bootstrap`, `lerna link`
- **Migration**: Use npm workspaces instead
- **Our Status**: ✅ Already migrated to npm workspaces in Phase 3
- **Impact**: None - we removed `lerna bootstrap` and use `npm install`

#### 3. Task Runner Updated to Nx v17 ✅ COMPATIBLE
- **Change**: `lerna run` now uses Nx v17 instead of v16
- **Impact**: Performance improvements
- **Our Status**: ✅ Compatible - no configuration changes needed

#### 4. Internal Packages Deprecated ✅ NO IMPACT
- **Change**: 65+ internal `@lerna/*` packages marked deprecated
- **Impact**: None - we don't use internal Lerna packages

### Breaking Changes in v7.0.0

#### 1. Node.js Version Requirement ✅ COMPATIBLE
- **Change**: Dropped Node v14 support, requires Node v16+
- **Our Status**: Running Node.js v20.13.1
- **Impact**: None

### Notable Features Added (v6 → v8)

#### v8.2.4 (Current)
- Remove lodash dependencies (performance improvement)
- Update workspace specifiers in peerDependencies

#### v8.2.0
- Custom working directory for `detectProjects`
- Native `stripVTControlCharacters` instead of strip-ansi

#### v8.1.0
- Support for Nx v18
- Custom `tag-version-separator` for independent projects

#### v8.0.0
- OIDC trusted publishing support
- Premajor version bump option

### Configuration Changes Required

✅ **None** - All configuration migrated by `lerna repair` in Phase 3:
- Added `$schema` field to lerna.json
- Removed deprecated options
- npm workspaces configured

### Deprecation Warnings

✅ **None** - No deprecation warnings in our usage:
- Not using `lerna bootstrap` (removed)
- Not using `lerna add` (removed)
- Not using `lerna link` (removed)
- Using npm workspaces as recommended

---

## TypeDoc v0.26 → v0.28 Changelog Review (T048)

### Version Path
- **Baseline**: v0.26.11
- **Target**: v0.28.14
- **Major Versions**: v0.27.x, v0.28.x

### Breaking Changes in v0.28.0

#### 1. Entry Point Glob Path Separators ✅ COMPATIBLE
- **Change**: All input globs must use `/` path separators
- **Our Status**: Using `./src` in typedoc.json (already uses `/`)
- **Impact**: None

#### 2. Merge Mode JSON Compatibility ✅ COMPATIBLE
- **Change**: `--entryPointStrategy merge` requires JSON from v0.28.0+
- **Our Status**: Using `--entryPointStrategy expand` (not affected)
- **Impact**: None

#### 3. README File Discovery ✅ COMPATIBLE
- **Change**: Only checks for README next to package.json if `--readme` not set
- **Our Status**: Not using `--readme` option
- **Impact**: None - improves monorepo handling

#### 4. Function Variable Conversion ✅ COMPATIBLE
- **Change**: Function-like variables only auto-converted if initialized with function expression
- **Our Status**: Standard TypeScript code, not affected
- **Impact**: None

#### 5. Object Literal Type Aliases ✅ COMPATIBLE
- **Change**: Rendered more similarly to interfaces
- **Our Status**: Visual improvement only
- **Impact**: None - better documentation rendering

### Breaking Changes in v0.27.0

No breaking changes affecting our configuration.

### Notable Features Added (v0.26 → v0.28)

#### v0.28.14 (Current)
- `preservedTypeAnnotationTags` option
- `excludePrivateClassFields` option
- Support for `@this` tag in JS files
- Improved auto-accessor type conversion

#### v0.28.13
- `basePath` option affects relative link resolution
- `displayBasePath` option for source rendering

#### v0.28.12
- Better `@enum` support for imported symbols
- Improved relative link resolution

#### v0.28.11
- Shorthand property assignment comment inheritance
- Optional methods rendered with `?`

#### v0.28.10
- Consistent anchors on module pages

#### v0.28.9
- TypeScript 5.9 support

#### v0.28.8
- Plugin function support in JS config files
- Improved inherited link discovery

#### v0.28.7
- `@sortStrategy` tag for per-reflection sorting

#### v0.28.6
- Relative path resolution to package directory
- Export specifier comment checking

#### v0.28.0
- New `--router` option for output structure
- `@primaryExport` modifier tag
- `packagesRequiringDocumentation` option
- `typedoc/browser` entrypoint
- `@function`, `@preventInline`, `@inlineType` tags
- `@preventExpand`, `@expandType` tags

### Configuration Changes Required

✅ **None** - Our TypeDoc configuration is compatible:
- Using `entryPointStrategy: "expand"` (supported)
- Using `excludeExternals: true` (supported)
- Using `excludePrivate: true` (supported)
- Using `gitRevision: "main"` (supported)
- Using `name: "Photon"` (supported)
- Using `readme: "none"` (supported)
- Using `out: "../../docs/docs/api"` (supported)
- Using `tsconfig: "../photon/target/tsconfig.typedoc.json"` (supported)

### Deprecation Warnings

✅ **None** - No deprecated options in our configuration

### New Features We Could Use (Optional)

1. **`@sortStrategy` tag** - Override sort order for specific reflections
2. **`excludePrivateClassFields`** - Fine-grained control over private members
3. **`--router` option** - Customize output folder structure
4. **`@function` tag** - Force variable-to-function conversion
5. **`@expandType` / `@preventExpand`** - Control type expansion in docs

---

## Compatibility Assessment

### Lerna Compatibility

| Aspect | Status | Notes |
|--------|--------|-------|
| Node.js Version | ⚠️ WARNING | v20.13.1 (below v20.19.0 requirement) |
| Configuration | ✅ PASS | Migrated by `lerna repair` |
| npm Workspaces | ✅ PASS | Already configured |
| Deprecated Commands | ✅ PASS | Not using any |
| Task Runner (Nx) | ✅ PASS | Compatible with v17 |

**Overall**: ✅ COMPATIBLE (with Node.js version warning)

### TypeDoc Compatibility

| Aspect | Status | Notes |
|--------|--------|-------|
| Configuration Options | ✅ PASS | All options supported |
| Entry Point Strategy | ✅ PASS | Using "expand" |
| Path Separators | ✅ PASS | Using `/` |
| TypeScript Version | ✅ PASS | v5.6.3 supported |
| Output Structure | ✅ PASS | Default structure works |

**Overall**: ✅ FULLY COMPATIBLE

---

## Recommendations

### Immediate Actions
✅ **None required** - All configurations are compatible

### Future Enhancements (Optional)

1. **Node.js Upgrade** (Low Priority)
   - Current: v20.13.1
   - Recommended: v20.19.0+ or v22.12.0+
   - Benefit: Eliminate Vite and Lerna version warnings

2. **Explore New TypeDoc Features** (Low Priority)
   - `@sortStrategy` for custom documentation ordering
   - `excludePrivateClassFields` for finer control
   - New tags for type expansion control

3. **Explore New Lerna Features** (Low Priority)
   - OIDC trusted publishing for npm
   - Custom tag-version-separator for independent projects

---

## Conclusion

✅ **Both upgrades are fully compatible** with our current configuration.

- **Lerna v8.2.4**: All breaking changes addressed, no deprecated options
- **TypeDoc v0.28.14**: All configuration options supported, no deprecations
- **Node.js Warning**: Running v20.13.1 (below v20.19.0), but functional

No configuration changes required to proceed with the upgrade.
