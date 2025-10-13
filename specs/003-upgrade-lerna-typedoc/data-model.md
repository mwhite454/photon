# Data Model: Lerna & TypeDoc Upgrade

**Phase**: 1 (Design & Contracts)  
**Date**: 2025-10-12  
**Status**: Complete

## Purpose

Document the configuration entities, their relationships, and state transitions involved in upgrading Lerna and TypeDoc dependencies.

## Entities

### 1. Package Manifest (Root)

**File**: `/package.json`

**Fields**:
- `name`: string - "photon-dev"
- `private`: boolean - true (monorepo root)
- `devDependencies`: object
  - `lerna`: string - version specifier (currently "^6.0.3" → target "^8.2.4")
  - `typedoc`: string - version specifier (currently "^0.26.0" → target "^0.28.14")
  - Other dev dependencies (unchanged)
- `dependencies`: object - runtime dependencies (unchanged)
- `scripts`: object
  - `bootstrap`: string - "lerna bootstrap" → "npm install" (DEPRECATED COMMAND)
  - `build`: string - "lerna run build" (unchanged)
  - `docs`: string - "lerna run docs --parallel" (unchanged)
  - `test`: string - includes bootstrap call → remove bootstrap dependency
  - `postinstall`: string - "npm run bootstrap" → remove or update
- `workspaces`: array[string] - NEW FIELD REQUIRED
  - ["docs/demos", "packages/*"] - matches lerna.json packages

**Relationships**:
- References → Lerna Configuration (lerna.json)
- Contains → Package Lock File (package-lock.json)
- Defines → Workspace Packages (packages/*)

**Validation Rules**:
- `lerna` version must be "^8.2.4" or compatible
- `typedoc` version must be "^0.28.14" or compatible
- `workspaces` array must match `lerna.json` packages
- `bootstrap` script must not use deprecated `lerna bootstrap`
- `postinstall` script must not call `npm run bootstrap`

**State Transitions**:
1. **Initial**: v6.0.3 Lerna, v0.26.0 TypeDoc, has bootstrap script
2. **Updated Dependencies**: v8.2.4 Lerna, v0.28.14 TypeDoc, still has bootstrap
3. **Migrated Scripts**: Dependencies updated, bootstrap removed, workspaces added
4. **Final**: All changes applied, npm install works, tests pass

---

### 2. Lerna Configuration

**File**: `/lerna.json`

**Fields**:
- `packages`: array[string] - workspace package globs
  - ["docs/demos", "packages/*"]
- `version`: string - "0.0.0" (fixed version mode)
- Additional fields may be added by `lerna repair`

**Relationships**:
- Referenced by → Package Manifest (package.json)
- Governs → Workspace Packages (packages/*)

**Validation Rules**:
- `packages` array must include all workspace directories
- `version` can remain "0.0.0" (independent versioning)
- No deprecated options (checked by `lerna repair`)

**State Transitions**:
1. **Initial**: v6-compatible configuration
2. **Post-Upgrade**: Same configuration (v8-compatible)
3. **Post-Repair**: Migrated to v8 best practices (run `lerna repair`)

---

### 3. TypeDoc Configuration

**File**: `/packages/photon/typedoc.json`

**Fields**:
- `$schema`: string - "https://typedoc.org/schema.json"
- `entryPoints`: array[string] - ["./src"]
- `entryPointStrategy`: string - "expand"
- `out`: string - "./dist/docs"
- `json`: string - "./dist/project.json"
- `exclude`: array[string] - patterns to exclude
- `excludeExternals`: boolean - true
- `excludePrivate`: boolean - true
- `excludeProtected`: boolean - false
- `includeVersion`: boolean - true
- `readme`: string - "../../README.md"
- `name`: string - "Maker.js"
- `tsconfig`: string - "./target/tsconfig.typedoc.json"
- `plugin`: array - []
- `logLevel`: string - "Info"
- `treatWarningsAsErrors`: boolean - false
- `validation`: object - validation options

**Relationships**:
- References → TypeScript Configuration (tsconfig.json)
- Generates → Documentation Output (dist/docs/)
- Used by → Build Scripts (package.json scripts)

**Validation Rules**:
- All options must be v0.28-compatible (they are)
- `entryPoints` must point to valid source directory
- `tsconfig` must point to valid TypeScript config
- No deprecated options

**State Transitions**:
1. **Initial**: v0.26-compatible configuration
2. **Post-Upgrade**: Same configuration (v0.28-compatible, no changes needed)
3. **Optional Enhancement**: Add new v0.28 options if desired

---

### 4. Package Lock File

**File**: `/package-lock.json`

**Fields**:
- `lockfileVersion`: number - npm lock file format version
- `packages`: object - resolved dependency tree
  - Contains all transitive dependencies with exact versions
- `dependencies`: object - legacy format (npm v5/v6)

**Relationships**:
- Owned by → Package Manifest (package.json)
- Locks → Dependency Versions (npm registry)

**Validation Rules**:
- Must be regenerated after dependency updates
- Must resolve without conflicts
- Must not introduce high/critical vulnerabilities

**State Transitions**:
1. **Initial**: Locks Lerna v6.0.3, TypeDoc v0.26.0
2. **Post-Update**: Locks Lerna v8.2.4, TypeDoc v0.28.14
3. **Post-Install**: All transitive dependencies resolved

---

### 5. Workspace Packages

**Directories**: 
- `/packages/photon` - Core library
- `/packages/playground` - Interactive editor
- `/packages/docs` - Documentation
- `/packages/fonts` - Font utilities
- `/docs/demos` - Demo applications

**Fields** (per package.json):
- `name`: string - package name
- `version`: string - package version
- `dependencies`: object - package dependencies
- `devDependencies`: object - dev dependencies
- `scripts`: object - package-specific scripts

**Relationships**:
- Managed by → Lerna Configuration (lerna.json)
- Linked by → npm Workspaces (package.json workspaces)
- Built by → Lerna Run Commands (lerna run build)

**Validation Rules**:
- All packages must install successfully
- All packages must link correctly via workspaces
- All packages must build without errors
- All package tests must pass

**State Transitions**:
1. **Initial**: Linked via `lerna bootstrap`
2. **Post-Upgrade**: Linked via npm workspaces
3. **Validated**: All builds and tests pass

---

## Entity Relationships Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ Package Manifest (package.json)                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ devDependencies:                                        │ │
│ │   lerna: ^8.2.4                                         │ │
│ │   typedoc: ^0.28.14                                     │ │
│ │ workspaces: ["docs/demos", "packages/*"]                │ │
│ │ scripts:                                                │ │
│ │   bootstrap: "npm install"                              │ │
│ │   build: "lerna run build"                              │ │
│ │   docs: "lerna run docs --parallel"                     │ │
│ └─────────────────────────────────────────────────────────┘ │
└────────────┬────────────────────────────────────────────────┘
             │ references
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Lerna Configuration (lerna.json)                            │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ packages: ["docs/demos", "packages/*"]                  │ │
│ │ version: "0.0.0"                                        │ │
│ └─────────────────────────────────────────────────────────┘ │
└────────────┬────────────────────────────────────────────────┘
             │ governs
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Workspace Packages                                          │
│ ┌──────────────┬──────────────┬──────────────┬────────────┐ │
│ │ photon/      │ playground/  │ docs/        │ fonts/     │ │
│ │ package.json │ package.json │ package.json │ package.json│ │
│ └──────────────┴──────────────┴──────────────┴────────────┘ │
└────────────┬────────────────────────────────────────────────┘
             │ uses
             ▼
┌─────────────────────────────────────────────────────────────┐
│ TypeDoc Configuration (packages/photon/typedoc.json)        │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ entryPoints: ["./src"]                                  │ │
│ │ out: "./dist/docs"                                      │ │
│ │ tsconfig: "./target/tsconfig.typedoc.json"              │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Upgrade Workflow State Machine

```
┌──────────────┐
│   Initial    │ Lerna v6.0.3, TypeDoc v0.26.0
│    State     │ Has lerna bootstrap script
└──────┬───────┘
       │
       │ 1. Update package.json dependencies
       ▼
┌──────────────┐
│ Dependencies │ Lerna v8.2.4, TypeDoc v0.28.14
│   Updated    │ Still has bootstrap script (broken)
└──────┬───────┘
       │
       │ 2. Add workspaces, remove bootstrap
       ▼
┌──────────────┐
│   Scripts    │ npm workspaces configured
│   Migrated   │ bootstrap script removed
└──────┬───────┘
       │
       │ 3. npm install (regenerate lock file)
       ▼
┌──────────────┐
│ Dependencies │ All packages linked via workspaces
│   Installed  │ package-lock.json updated
└──────┬───────┘
       │
       │ 4. lerna repair (optional)
       ▼
┌──────────────┐
│    Lerna     │ lerna.json migrated to v8 format
│   Repaired   │ No deprecated options
└──────┬───────┘
       │
       │ 5. npm run build && npm run docs && npm test
       ▼
┌──────────────┐
│  Validated   │ All builds pass
│    State     │ All tests pass
└──────────────┘ Documentation generated
```

## Validation Checklist

After upgrade, all entities must satisfy:

- [ ] **Package Manifest**: Dependencies updated, workspaces configured, bootstrap removed
- [ ] **Lerna Configuration**: Compatible with v8.x, no deprecated options
- [ ] **TypeDoc Configuration**: Compatible with v0.28.x, no deprecated options
- [ ] **Package Lock File**: Regenerated, no conflicts, no high/critical vulnerabilities
- [ ] **Workspace Packages**: All install, link, build, and test successfully
- [ ] **Build Scripts**: All npm scripts execute without errors
- [ ] **Documentation**: Generated docs are complete and correct
- [ ] **Performance**: Build times within 10% of baseline
