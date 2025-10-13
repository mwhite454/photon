# Implementation Plan: Modernize Examples and Playground Models

**Branch**: `004-all-examples-housed` | **Date**: 2025-10-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-all-examples-housed/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Update all 28 example and playground model files to use modern JavaScript (ES6+ imports, const/let) and reference the correct library name (photon instead of makerjs). This ensures developers can copy example code directly into modern projects without syntax errors or deprecated patterns. The migration is a straightforward syntax transformation that maintains all existing functionality while improving code quality and developer experience.

## Technical Context

**Language/Version**: JavaScript ES6+ / TypeScript 5.6.3 / Node.js 18.x+  
**Primary Dependencies**: @photon/core (the library being demonstrated), TypeScript compiler  
**Storage**: N/A (file-based examples only)  
**Testing**: Mocha (existing test framework), manual verification in playground  
**Target Platform**: Node.js (examples) and Browser (playground models)
**Project Type**: Monorepo with multiple packages (lerna-managed)  
**Performance Goals**: Examples must execute in <100ms, playground models must render in <500ms  
**Constraints**: Must maintain backward compatibility of functionality, zero breaking changes to example behavior  
**Scale/Scope**: 28 files total (23 in packages/photon/examples, 5 in packages/playground/models)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with Photon Constitution (`.specify/memory/constitution.md`):

- [x] **Test-Driven Development**: Tests will verify syntax transformation and functional equivalence before migration
- [x] **Specification-Driven**: User stories defined with Given-When-Then acceptance criteria in spec.md
- [x] **ES6+ Compatibility**: This feature DIRECTLY enforces ES6+ by migrating all examples to modern syntax
- [x] **Experiment-Friendly**: Playground models will demonstrate modern best practices for users to learn from
- [x] **User Experience First**: Updated examples improve developer experience by providing copy-paste ready modern code
- [x] **Living Documentation**: Examples ARE living documentation - this update ensures they stay current
- [x] **CNC/Laser Focus**: Maintains all precision and functionality - purely syntactic transformation
- [x] **Code Quality**: Migration follows Airbnb Style Guide (const/let best practices, ES6 imports)
- [x] **Performance Standards**: No performance impact - syntax transformation only
- [x] **Versioning**: PATCH version (0.18.1 → 0.18.2) - no API changes, only example improvements

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
packages/
├── photon/
│   ├── examples/              # 23 files to update
│   │   ├── Rimbox.js
│   │   ├── Text.js
│   │   ├── combine.js
│   │   ├── dependExample.html
│   │   ├── dependExample_forBrowser.js
│   │   ├── dependExample_forNode.js
│   │   ├── fillets.js
│   │   ├── filletstar.js
│   │   ├── logo.js
│   │   ├── m.js
│   │   ├── polygonstackbox.js
│   │   ├── skatedeck.js
│   │   ├── smile.js
│   │   ├── spiral.js
│   │   ├── starbox.js
│   │   ├── testpanel.js
│   │   ├── textOnChain.js
│   │   ├── textOnPath.js
│   │   ├── tubeclamp.js
│   │   ├── ventgrid.d.ts
│   │   ├── ventgrid.js
│   │   ├── ventgrid.ts
│   │   ├── ventgridcircle.js
│   │   └── ventgridcircle.ts
│   ├── src/                   # Core library (not modified)
│   └── test/                  # Existing tests (may add verification)
└── playground/
    ├── models/                # 5 files to update
    │   ├── basic-shapes.js
    │   ├── gear-wheel.js
    │   ├── rpi-case.js
    │   ├── simple-square.js
    │   └── smiley-face.js
    └── src/                   # Playground app (not modified)

specs/004-all-examples-housed/
├── verification/              # New verification scripts
│   ├── verify-imports.sh
│   ├── verify-var-usage.sh
│   └── verify-namespace.sh
└── tests/                     # Test examples before/after
```

**Structure Decision**: This is a monorepo with lerna-managed packages. The feature modifies example files in two locations: `packages/photon/examples/` (23 files) and `packages/playground/models/` (5 files). No core library code is modified. Verification scripts will be added to ensure complete migration.

## Complexity Tracking

*No constitutional violations - all checks passed.*

This feature aligns perfectly with constitutional principles:
- Enforces ES6+ modern JavaScript (Principle III)
- Improves living documentation through updated examples (Principle VI)
- Enhances user experience by providing modern, copy-paste ready code (Principle V)
- Maintains test-driven approach with verification before migration (Principle I)

## Planning Phase Complete ✅

### Artifacts Generated

**Phase 0 - Research**:
- ✅ [research.md](./research.md) - Technical decisions, best practices, and migration approach

**Phase 1 - Design & Contracts**:
- ✅ [data-model.md](./data-model.md) - File entities, transformation rules, and state transitions
- ✅ [contracts/migration-contract.md](./contracts/migration-contract.md) - Migration behavior specification
- ✅ [contracts/verification-scripts.md](./contracts/verification-scripts.md) - Automated verification specification
- ✅ [quickstart.md](./quickstart.md) - Step-by-step implementation guide
- ✅ Agent context updated (Windsurf rules)

### Constitution Re-Check (Post-Design)

All constitutional principles remain satisfied after design phase:
- ✅ TDD approach defined with verification-first workflow
- ✅ Specification complete with clear acceptance criteria
- ✅ ES6+ compliance is the core feature objective
- ✅ Playground models will demonstrate modern best practices
- ✅ Developer experience improved through copy-paste ready examples
- ✅ Examples serve as living documentation
- ✅ No impact on CNC/laser functionality
- ✅ Code quality standards defined (Airbnb Style Guide)
- ✅ Performance impact: none (syntax only)
- ✅ Version impact: PATCH (0.18.2)

## Implementation Status & Current Blockers

### ⚠️ CRITICAL ISSUE: Playground Execution Failure

**Status**: Files migrated but playground CANNOT execute models

**Root Cause Analysis**:
1. ✅ All 28 files successfully migrated to ES6 `import * as photon from 'photon'`
2. ✅ Monaco Editor displays with correct modern syntax
3. ✅ All 5 playground models appear in dropdown
4. ❌ **BLOCKER**: Clicking "Run" fails to execute and render models
5. ❌ **BLOCKER**: Error: "Cannot use import statement outside a module"

**Technical Details**:
- Playground uses iframe-based code execution with `new Function()`
- Worker file (`render-worker.ts`) has import-stripping code but execution still fails
- The code execution environment doesn't properly handle ES6 imports
- HTML default code was updated but runtime execution path is broken

**What Works**:
- ✅ File syntax is correct (all imports/exports modernized)
- ✅ TypeScript compilation succeeds
- ✅ Monaco Editor loads and displays code
- ✅ Model files are accessible via API

**What Doesn't Work**:
- ❌ Code execution in playground (Run button fails)
- ❌ Model rendering (no visual output)
- ❌ Import statement handling in execution context

### Definition of Done (UPDATED - NON-NEGOTIABLE)

**A task is NOT complete until ALL criteria are met**:

1. ✅ All 28 files use ES6 `import * as photon from 'photon'`
2. ✅ All files use `const`/`let` (zero `var` declarations)
3. ✅ All references use `photon` namespace (zero `makerjs` references)
4. ✅ TypeScript compilation succeeds
5. ✅ Playground loads without errors
6. ❌ **CRITICAL**: Clicking "Run" successfully executes code
7. ❌ **CRITICAL**: Model renders visually in SVG canvas
8. ❌ **CRITICAL**: Screenshot evidence shows rendered output

**Verification Requirements**:
- Use Playwright to navigate to playground
- Load a model (e.g., "Basic Shapes")
- Click "► Run" button
- Take screenshot showing rendered SVG output
- Verify no console errors related to imports/execution

**Failure is NOT Acceptable**:
- "It failed before" is NOT a valid reason to mark complete
- "The code looks right" is NOT sufficient
- "Monaco Editor works" is NOT the goal
- **ONLY visual proof of rendered models = success**

### Next Steps (MANDATORY)

1. **Debug playground execution environment**:
   - Investigate iframe code execution in `playground.js`
   - Fix import statement handling in runtime
   - Ensure `photon` is available in execution context
   - Test with simple model first

2. **Verify with Playwright**:
   - Navigate to `http://localhost:3000/playground/`
   - Select "Basic Shapes" from dropdown
   - Click "► Run"
   - Wait for rendering
   - Take screenshot of SVG canvas
   - Verify shapes are visible

3. **Only then proceed to**:
   - Test all 5 playground models
   - Document working solution
   - Create verification script
   - Update CHANGELOG

### Summary

**Feature**: Modernize 28 example and playground model files to ES6+ syntax  
**Scope**: 23 examples + 5 playground models  
**Current Status**: ⚠️ CRITICAL BLOCKER - Parent window still references makerjs  
**Progress**: Import stripping works ✅, but rendering blocked by makerjs references  
**Required**: Update all playground code to use photon namespace exclusively  
**Estimated Time**: 1-2 hours to update playground source and rebuild  

**CRITICAL**: The playground application itself must be updated to use `photon` instead of `makerjs`. This is a prerequisite for the feature to work.

---

## Phase 4.6: 🚨 NEW BLOCKER - Update Playground to Use Photon Namespace

### Problem Identified (2025-10-13)

**Status**: Tasks T060-T064 ✅ COMPLETE, T065 ❌ BLOCKED

**Root Cause**: The compiled playground JavaScript files in `docs/playground/js/` contain hardcoded references to `makerjs` namespace instead of `photon`. This causes runtime errors when trying to render models.

**Error**:
```
TypeError: makerjs.point.isPoint is not a function
    at setProcessedModel (http://localhost:3000/playground/js/playground.js:561:24)
```

**Impact**: 
- ✅ Import stripping works correctly (no "Cannot use import statement" errors)
- ✅ ES6 imports are removed from user code
- ✅ `photon` is injected into iframe global scope
- ❌ Parent window code references `makerjs` directly
- ❌ Models don't render in SVG canvas

### Files Affected

**Compiled JavaScript** (needs rebuilding):
- `docs/playground/js/playground.js` - Main playground logic (line 561+)
- `docs/playground/js/require-iframe.js` - Fixed ✅ (lines 112, 225, 229)
- Other playground support files may also reference `makerjs`

**TypeScript Source** (needs updating):
- `packages/playground/src/playground.ts` - Source for playground.js
- `packages/playground/src/**/*.ts` - All playground TypeScript files

### Solution Plan

#### Step 1: Audit Playground Source Files

Search all TypeScript files in `packages/playground/src/` for:
1. `import` statements importing `makerjs`
2. Direct references to `makerjs.` namespace
3. Type annotations using `Makerjs.*` or `MakerJs.*`

#### Step 2: Update TypeScript Source

Replace all references:
- `import * as makerjs from 'makerjs'` → `import * as photon from 'photon'`
- `makerjs.` → `photon.`
- `Makerjs.` → `Photon.`
- `MakerJs.` → `Photon.`

**Key Files to Update**:
1. `packages/playground/src/playground.ts`
2. `packages/playground/src/worker/render-worker.ts` (already has photon alias)
3. `packages/playground/src/**/*.ts` (all TypeScript files)

#### Step 3: Update Type Definitions

Check and update:
- `packages/playground/src/types/*.d.ts`
- Any `@types/makerjs` references
- Interface definitions using MakerJs types

#### Step 4: Rebuild Playground

```bash
cd packages/playground
npm run build
```

This will regenerate:
- `docs/playground/js/playground.js`
- `docs/playground/js/*.js` (all compiled files)

#### Step 5: Verify Build Output

Check that compiled files use `photon` namespace:
```bash
grep -r "makerjs\." docs/playground/js/
# Should return minimal or no results
```

#### Step 6: Test Rendering

1. Restart playground server
2. Load Simple Square model
3. Click Run
4. Verify SVG renders
5. Take Playwright screenshot as proof

### Technical Details

**Why This Happened**:
The rebrand from "makerjs" to "photon" updated:
- ✅ Core library exports
- ✅ Example files (T001-T040)
- ✅ Playground model files (T041-T051)
- ✅ Iframe execution environment (T052-T059)
- ❌ **Playground application source code** ← Missing!

**Dependency Chain**:
```
User Code (models/*.js)
  ↓ [import stripped]
  ↓ [photon injected]
Iframe Execution (require-iframe.js) ✅ Fixed
  ↓ [sends result to parent]
Parent Window (playground.js) ❌ Still uses makerjs
  ↓ [tries to process model]
ERROR: makerjs.point.isPoint is not a function
```

### Estimated Effort

- **Audit**: 15 minutes
- **Update Source**: 30 minutes
- **Rebuild**: 5 minutes
- **Test**: 15 minutes
- **Total**: ~1 hour

### Success Criteria

- [ ] All TypeScript source files use `photon` namespace
- [ ] Playground builds without errors
- [ ] No `makerjs.` references in compiled JavaScript (except in comments/strings)
- [ ] Simple Square model renders in playground
- [ ] Playwright screenshot shows rendered SVG
- [ ] All 5 playground models render successfully

### Dependencies

**Blocks**:
- T065: Verify SVG canvas shows rendered square
- T067-T070: Test all playground models
- Phase 5: Polish & final verification

**Depends On**:
- ✅ T052-T059: Import stripping implementation (complete)
- ✅ T060-T064: Import error verification (complete)

---

## 🚨 CRITICAL SCOPE CHANGE - Library Export Issue Discovered

**Date**: 2025-10-13  
**Status**: ⚠️ BLOCKER - Root cause identified, requires library fix

### Problem Statement

During Phase 4.6 testing (T088-T094), we discovered that the Photon library has **incorrect namespace exports** in the IIFE bundle. This is a **fundamental library issue**, not a playground issue.

**Root Cause**: Helper functions like `isPoint`, `isPointEqual`, etc. are exported in the wrong namespaces:
- ❌ **Current (Wrong)**: `photon.maker.isPoint()` 
- ✅ **Expected (Correct)**: `photon.point.isPoint()`
- ❌ **Current (Wrong)**: No `photon.measure.isPointEqual()`
- ✅ **Expected (Correct)**: `photon.measure.isPointEqual()`

**Impact**: 
- Playground cannot function with current exports
- API inconsistency: utility functions scattered in wrong namespaces
- Breaking change from makerjs → photon migration
- Technical debt if we work around this

### Evidence

Browser inspection shows:
```javascript
// What we have:
photon.maker.isPoint ✓ (exists but wrong namespace)
photon.point.isPoint ✗ (doesn't exist)
photon.measure.isPointEqual ✗ (doesn't exist)

// What we need:
photon.point = {
  isPoint,
  add, subtract, scale, // ... existing
}
photon.measure = {
  isPointEqual,
  isBetweenPoints, // ... existing  
}
```

### Decision: Fix Root Cause, Not Symptoms

**Rejected Approach**: Update playground to use `photon.maker.isPoint()`
- ❌ Creates technical debt
- ❌ Wrong API design
- ❌ Inconsistent with library structure
- ❌ Confusing for users

**Approved Approach**: Fix library exports to match expected namespaces
- ✅ Correct API design
- ✅ Consistent with makerjs legacy
- ✅ Clean migration path
- ✅ No technical debt

### Scope Change

**Original Scope**: Modernize 28 example files to ES6+ syntax  
**New Scope**: Fix library exports + modernize examples + verify playground

**New Phase Added**: Phase 4.7 - Fix Library Namespace Exports

### Updated Implementation Status

**Phase 1-3**: ✅ All 23 examples migrated and verified  
**Phase 4**: ✅ All 5 playground models migrated (syntax only)  
**Phase 4.5**: ✅ Import stripping implemented in iframe  
**Phase 4.6**: ✅ Playground TypeScript source updated to use photon  
**Phase 4.7**: ❌ **NEW - Fix library namespace exports** (BLOCKER)  
**Phase 4.8**: ⏳ Test playground rendering (blocked by 4.7)  
**Phase 5**: ⏳ Polish, documentation, final verification

### Next Steps

1. ✅ Document scope change in plan.md
2. ⏳ Update tasks.md with Phase 4.7 tasks
3. ⏳ Fix library source to export functions in correct namespaces
4. ⏳ Rebuild library
5. ⏳ Test playground
6. ⏳ Complete original feature
