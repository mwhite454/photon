# Tasks: Critical Dependency Modernization

**Input**: Design documents from `/specs/002-upgrade-dependencies-to/`  
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md  
**Branch**: `002-upgrade-dependencies-to`

**Tests**: Test tasks included per TDD constitutional requirement - existing test suite validates all changes.

**Organization**: Tasks are grouped by user story (dependency) to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1=graham_scan, US2=bezier-js, US3=kdbush)
- Include exact file paths in descriptions

## Path Conventions

Monorepo structure:
- **Primary package**: `packages/photon/`
- **Tests**: `packages/photon/test/`
- **Type definitions**: `packages/docs/`

---

## Phase 1: Setup (Baseline & Preparation)

**Purpose**: Establish baseline and prepare for upgrades

- [X] T001 Verify current branch is `002-upgrade-dependencies-to`
- [X] T002 Run baseline test suite in `packages/photon/` and capture results
- [X] T003 [P] Measure baseline bundle size for `dist/photon.es.js` and `dist/photon.umd.js`
- [X] T004 [P] Measure baseline memory usage for spatial indexing operations (if benchmark available)
- [X] T005 Document baseline metrics in `specs/002-upgrade-dependencies-to/baseline-metrics.md`

**Checkpoint**: Baseline established - ready for dependency upgrades

---

## Phase 2: Foundational (No Foundational Tasks Required)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ NOTE**: This feature has no foundational tasks - dependency upgrades can proceed directly to user stories.

---

## Phase 3: User Story 1 - Maintain Existing Functionality (Priority: P1) 🎯 MVP

**Goal**: Upgrade graham_scan from v1.0.4 to v1.0.5 while maintaining all existing convex hull functionality

**Independent Test**: Run existing test suite - all tests pass, convex hull calculations produce identical results

### Tests for User Story 1

**NOTE: Existing test suite provides coverage - run tests BEFORE and AFTER upgrade**

- [X] T006 [US1] Run existing tests for convex hull operations: `npm test -- --grep "convex|hull"` in `packages/photon/`
- [X] T007 [US1] Verify test results match baseline from T002

### Implementation for User Story 1

- [X] T008 [US1] Update `packages/photon/package.json`: Change `"graham_scan": "^1.0.4"` to `"graham_scan": "^1.0.5"`
- [X] T009 [US1] Run `npm install` in `packages/photon/`
- [X] T010 [US1] Verify no code changes required in `packages/photon/src/core/measure.ts`
- [X] T011 [US1] Run full test suite: `npm test` in `packages/photon/`
- [X] T012 [US1] Verify all tests pass without modification
- [X] T013 [US1] Build library: `npm run build` in `packages/photon/`
- [X] T014 [US1] Verify build completes with zero errors and zero new warnings
- [X] T015 [US1] Document any observations in commit message

**Checkpoint**: graham_scan upgraded successfully - convex hull operations validated

---

## Phase 4: User Story 2 - Leverage Modern Dependency Features (Priority: P2)

**Goal**: Upgrade bezier-js from v2.1.0 to v6.1.4 while maintaining all existing Bezier curve functionality

**Independent Test**: Run existing test suite - all tests pass, Bezier curve calculations produce identical results

### Tests for User Story 2

**NOTE: Existing test suite provides coverage - run tests BEFORE and AFTER upgrade**

- [X] T016 [US2] Run existing tests for Bezier operations: `npm test -- --grep "bezier|curve"` in `packages/photon/`
- [X] T017 [US2] Verify test results match baseline from T002

### Implementation for User Story 2

- [X] T018 [P] [US2] Update `packages/photon/package.json`: Change `"bezier-js": "^2.1.0"` to `"bezier-js": "^6.1.4"`
- [X] T019 [P] [US2] Update `packages/docs/package.json`: Change `"@types/bezier-js": "^0.0.6"` to `"@types/bezier-js": "^0.0.7"`
- [X] T020 [US2] Run `npm install` in `packages/photon/`
- [X] T021 [US2] Run `npm install` in `packages/docs/`
- [X] T022 [US2] Verify existing compatibility shim in `packages/photon/src/models/BezierCurve-esm.ts` (line 14-15: `const Bezier: any = BezierJsDefault`)
- [X] T023 [US2] Test Bezier curve construction from points
- [X] T024 [US2] Test `extrema()` calculations
- [X] T025 [US2] Test `get(t)` point evaluation
- [X] T026 [US2] Test `split()` operations
- [X] T027 [US2] Test arc approximation functionality
- [X] T028 [US2] Run full test suite: `npm test` in `packages/photon/`
- [X] T029 [US2] Verify all tests pass without modification
- [X] T030 [US2] Build library: `npm run build` in `packages/photon/`
- [X] T031 [US2] Verify TypeScript compilation produces no new type errors
- [X] T032 [US2] Verify build completes with zero errors and zero new warnings
- [X] T033 [US2] Document any compatibility notes in commit message

**Checkpoint**: bezier-js upgraded successfully - Bezier curve operations validated

---

## Phase 5: User Story 3 - Ensure Future Maintainability (Priority: P3)

**Goal**: Upgrade kdbush from v2.0.1 to v4.0.2 with API refactoring while maintaining all existing spatial indexing functionality

**Independent Test**: Run existing test suite - all tests pass, spatial indexing produces identical results with improved memory usage

### Tests for User Story 3

**NOTE: Existing test suite provides coverage - run tests BEFORE and AFTER upgrade**

- [ ] T034 [US3] Run existing tests for spatial indexing: `npm test -- --grep "spatial|index|collect"` in `packages/photon/`
- [ ] T035 [US3] Verify test results match baseline from T002

### Implementation for User Story 3

#### Code Refactoring (Breaking API Changes)

- [ ] T036 [US3] Locate all kdbush usage in `packages/photon/src/core/collect.ts`
- [ ] T037 [US3] Identify current v2.x initialization patterns (constructor with accessor functions)
- [ ] T038 [US3] Refactor to v4.x pattern: Replace `new KDBush(points, p => p.x, p => p.y, nodeSize, ArrayType)` with pre-allocation pattern
- [ ] T039 [US3] Add loop to populate index with `index.add(x, y)` for each point
- [ ] T040 [US3] Add `index.finish()` call before first query operation
- [ ] T041 [US3] Verify all query operations (`range()`, `within()`) remain unchanged
- [ ] T042 [US3] Add inline comments documenting v4.x API pattern and rationale

#### Dependency Update

- [ ] T043 [US3] Update `packages/photon/package.json`: Change `"kdbush": "^2.0.1"` to `"kdbush": "^4.0.2"`
- [ ] T044 [US3] Remove `@types/kdbush` from devDependencies if present (v4.x includes built-in types)
- [ ] T045 [US3] Run `npm install` in `packages/photon/`

#### Validation

- [ ] T046 [US3] Run TypeScript compilation: `npm run build:types` in `packages/photon/`
- [ ] T047 [US3] Verify no type errors related to kdbush
- [ ] T048 [US3] Test point insertion operations
- [ ] T049 [US3] Test range query operations
- [ ] T050 [US3] Test radius query operations
- [ ] T051 [US3] Run full test suite: `npm test` in `packages/photon/`
- [ ] T052 [US3] Verify all tests pass without modification
- [ ] T053 [US3] Build library: `npm run build` in `packages/photon/`
- [ ] T054 [US3] Verify build completes with zero errors and zero new warnings
- [ ] T055 [US3] Measure memory usage for spatial indexing (compare with T004 baseline)
- [ ] T056 [US3] Verify memory usage decreased by at least 10% (per SC-004)
- [ ] T057 [US3] Document API changes and memory improvements in commit message

**Checkpoint**: kdbush upgraded successfully - spatial indexing validated with improved performance

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation across all dependency upgrades

- [ ] T058 [P] Run complete test suite: `npm test` in `packages/photon/`
- [ ] T059 [P] Verify all tests pass (SC-001)
- [ ] T060 [P] Build complete library: `npm run build` in `packages/photon/`
- [ ] T061 [P] Verify build completes with zero errors and zero new warnings (SC-002)
- [ ] T062 [P] Measure final bundle size and compare with T003 baseline
- [ ] T063 [P] Verify bundle size within 5% of baseline or smaller (SC-003)
- [ ] T064 [P] Verify memory usage improvement from T056 (SC-004)
- [ ] T065 [P] Verify no breaking changes to public Photon API (SC-005)
- [ ] T066 [P] Update `packages/photon/package.json` with all three dependency versions
- [ ] T067 [P] Update `packages/docs/package.json` with type definition versions
- [ ] T068 Document all changes in commit message with rationale
- [ ] T069 Create summary of metrics: baseline vs final (tests, bundle size, memory)
- [ ] T070 Verify quickstart.md procedures match actual implementation
- [ ] T071 Run linting: verify code style compliance
- [ ] T072 Final validation: all success criteria (SC-001 through SC-007) met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: N/A - no foundational tasks required
- **User Stories (Phase 3-5)**: Depend on Setup completion
  - **Recommended order**: US1 (graham_scan) → US2 (bezier-js) → US3 (kdbush)
  - **Rationale**: Lowest risk → highest risk
  - **Can run in parallel**: Yes, but sequential recommended for easier debugging
- **Polish (Phase 6)**: Depends on all three user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - graham_scan)**: Can start after Setup - No dependencies on other stories
- **User Story 2 (P2 - bezier-js)**: Can start after Setup - No dependencies on other stories
- **User Story 3 (P3 - kdbush)**: Can start after Setup - No dependencies on other stories

**Note**: While user stories are independent, sequential execution (P1 → P2 → P3) is recommended to isolate any issues.

### Within Each User Story

1. Run baseline tests FIRST
2. Update package.json
3. Install dependencies
4. Refactor code (if needed - only US3)
5. Run tests to verify
6. Build and validate
7. Document changes

### Parallel Opportunities

- **Phase 1 Setup**: T003 and T004 can run in parallel
- **Phase 4 (US2)**: T018 and T019 can run in parallel (different package.json files)
- **Phase 6 Polish**: T058-T065 can run in parallel (different validation tasks)

**Note**: User stories COULD run in parallel with multiple developers, but sequential execution is safer for this upgrade.

---

## Parallel Example: Phase 6 Validation

```bash
# Launch all validation tasks together:
Task: "Run complete test suite in packages/photon/"
Task: "Verify all tests pass"
Task: "Build complete library"
Task: "Verify build completes with zero errors"
Task: "Measure final bundle size"
Task: "Verify bundle size within 5%"
Task: "Verify memory usage improvement"
Task: "Verify no breaking changes to public API"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (establish baseline)
2. Complete Phase 3: User Story 1 (graham_scan upgrade)
3. **STOP and VALIDATE**: Test independently, verify all tests pass
4. Commit and push if successful

### Incremental Delivery (Recommended)

1. Complete Setup → Baseline established
2. Add User Story 1 (graham_scan) → Test independently → Commit
3. Add User Story 2 (bezier-js) → Test independently → Commit
4. Add User Story 3 (kdbush) → Test independently → Commit
5. Complete Polish → Final validation → Commit
6. Each upgrade adds value without breaking previous upgrades

### Risk Mitigation Strategy

Since this is a dependency upgrade with potential for issues:

1. **Sequential execution recommended** (not parallel)
2. **Commit after each user story** for easy rollback
3. **Test thoroughly at each checkpoint**
4. **Document any issues immediately**
5. **Rollback plan**: `git checkout packages/photon/package.json` + `npm install`

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific dependency upgrade (US1=graham_scan, US2=bezier-js, US3=kdbush)
- Each user story should be independently completable and testable
- Existing test suite provides TDD validation (tests already exist)
- Commit after each user story completion
- Stop at any checkpoint to validate upgrade independently
- **Critical**: kdbush (US3) requires code refactoring - most complex upgrade

## Task Summary

- **Total Tasks**: 72
- **Setup Tasks**: 5 (Phase 1)
- **User Story 1 (graham_scan)**: 10 tasks (T006-T015)
- **User Story 2 (bezier-js)**: 18 tasks (T016-T033)
- **User Story 3 (kdbush)**: 24 tasks (T034-T057)
- **Polish Tasks**: 15 tasks (T058-T072)
- **Parallel Opportunities**: 8 tasks marked [P]
- **Estimated Time**: 2-4 hours total
- **MVP Scope**: Phase 1 + Phase 3 (graham_scan only) = ~30 minutes
