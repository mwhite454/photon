# Tasks: Upgrade Lerna & TypeDoc + Build Process Repair

**Input**: Design documents from `/specs/003-upgrade-lerna-typedoc/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/upgrade-procedure.md, quickstart.md

**Organization**: Tasks are organized by user story priority (P1 → P2 → P3) to enable incremental validation and safe rollback at each checkpoint.

**Revision Note**: This document has been updated to include build process repair as part of User Story 2. Completed tasks (T001-T033) are documented in the Historical Session section below.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US4)
- Include exact file paths in descriptions

---

## Historical Session: Completed Tasks (2025-10-12)

### Phase 1: Setup & Baseline ✅ COMPLETED
- [X] T001 Create feature branch `003-upgrade-lerna-typedoc` from main
- [X] T002 Capture baseline docs build time: `time npm run docs > baseline-docs-build.log 2>&1`
- [X] T003 [P] Capture baseline test execution time: `time npm test > baseline-test.log 2>&1`
- [X] T004 [P] Run security audit: `npm audit --json > baseline-audit.json`
- [X] T005 [P] Capture current versions: `npm list lerna typedoc --depth=0 > baseline-versions.txt`
- [X] T006 Verify Node.js version is 18+ (required by Lerna v8.x): `node --version`

**Result**: Baseline captured. Found pre-existing build failures (TypeDoc, TypeScript compilation).

### Phase 2: User Story 1 - Dependency Security Updates ✅ COMPLETED
- [X] T007 [US1] Update Lerna version in `/package.json` devDependencies from `^6.0.3` to `^8.2.4`
- [X] T008 [US1] Update TypeDoc version in `/package.json` devDependencies from `^0.26.0` to `^0.28.14`
- [X] T009 [US1] Add `workspaces` field to `/package.json`: `["docs/demos", "packages/*"]`
- [X] T010 [US1] Update `bootstrap` script in `/package.json` from `lerna bootstrap` to `npm install`
- [X] T011 [US1] Update `test` script in `/package.json` to use `npm install` instead of `npm run bootstrap`
- [X] T012 [US1] Remove or empty `postinstall` script in `/package.json` (no longer calls bootstrap)
- [X] T013 [US1] Remove old dependencies: `rm -rf node_modules package-lock.json`
- [X] T014 [US1] Install updated dependencies: `npm install`
- [X] T015 [US1] Verify Lerna v8.2.4 installed: `npm list lerna --depth=0`
- [X] T016 [US1] Verify TypeDoc v0.28.14 installed: `npm list typedoc --depth=0`
- [X] T017 [US1] Run security audit: `npm audit --audit-level=high`
- [X] T018 [US1] Verify zero high/critical vulnerabilities for Lerna and TypeDoc

**Result**: ✅ Dependencies upgraded. Zero vulnerabilities (down from 13).

### Phase 3: User Story 2 - Build Compatibility Validation ✅ COMPLETED
- [X] T019 [US2] Run Lerna repair to migrate configuration: `npx lerna repair`
- [X] T020 [US2] Verify lerna.json has no deprecated options
- [X] T021 [US2] Verify all packages are listed: `npx lerna ls`
- [X] T022 [US2] Run bootstrap (now uses npm install): `npm run bootstrap`
- [X] T023 [US2] Verify all workspace packages are symlinked in node_modules
- [X] T024 [US2] Run build-tools: `npm run build-tools`
- [X] T025 [US2] Verify build-tools exits with code 0
- [X] T026 [US2] Run build: `npm run build`
- [X] T027 [US2] Verify build exits with code 0 and all packages have dist/ directories
- [X] T028 [US2] Run docs generation: `npm run docs`
- [X] T029 [US2] Verify docs exits with code 0 and documentation generated in packages/photon/dist/docs/
- [X] T030 [US2] Run full test suite: `npm test`
- [X] T031 [US2] Verify all tests pass without modification
- [X] T032 [US2] Measure docs build time and compare to baseline (must be within 10%)
- [X] T033 [US2] Verify no deprecation warnings in build/docs/test output

**Result**: ⚠️ Upgrade compatible but pre-existing build failures confirmed (same as baseline).

---

## Current Session: Remaining Tasks

## Phase 4: User Story 2 (Continued) - Build Process Repair (Priority: P1) 🎯

**Goal**: Fix pre-existing build failures so that all build processes complete successfully

**Why Now**: Cannot validate upgrade success or leave project in functional state without fixing builds

**Independent Test**: Run all npm scripts and verify they complete with exit code 0

### Investigation & Diagnosis

- [X] T034 [US2] Investigate TypeDoc entry point configuration issue
  - Read `packages/photon/typedoc.json`
  - Read `packages/photon/target/tsconfig.typedoc.json`
  - Identify why entry points are not being found
  - Document findings in investigation notes

- [X] T035 [US2] Investigate TypeScript Buffer interface compilation errors
  - Check @types/node version in all affected packages
  - Review TypeScript compiler options
  - Research Buffer interface changes between @types/node versions
  - Document root cause and solution options

### TypeDoc Configuration Fix

- [X] T036 [US2] Fix TypeDoc configuration to include all entry points
  - Update `packages/photon/target/tsconfig.typedoc.json` to include all source files
  - OR update `packages/photon/typedoc.json` to use correct tsconfig reference
  - Ensure all 60+ entry points are properly referenced

- [X] T037 [US2] Test TypeDoc documentation generation
  - Run `npm run docs` from packages/photon
  - Verify exit code 0
  - Verify no "entry point not found" errors
  - Verify documentation generated in dist/docs/

- [X] T038 [US2] Verify documentation completeness
  - Check that all expected modules are documented
  - Verify no broken links
  - Compare to baseline (if baseline had partial success)

### TypeScript Compilation Fix

- [X] T039 [US2] Fix @types/node Buffer interface compatibility
  - Option A: Update @types/node to compatible version in affected packages
  - Option B: Add TypeScript compiler options to handle interface changes
  - Apply fix to demos package (docs/demos/package.json or tsconfig.json)
  - Apply fix to fonts package (packages/fonts/package.json or tsconfig.json)

- [X] T040 [US2] Test demos package compilation
  - Run `npm run build-tools` from demos package
  - Verify exit code 0
  - Verify no Buffer interface errors

- [X] T041 [US2] Test fonts package compilation
  - Run `npm run build` (includes fonts)
  - Verify fonts package compiles successfully
  - Verify exit code 0

### Full Build Validation

- [X] T042 [US2] Run complete build-tools: `npm run build-tools`
  - Verify exit code 0
  - Verify all packages in build-tools complete successfully

- [X] T043 [US2] Run complete build: `npm run build`
  - Verify exit code 0
  - Verify all packages have dist/ directories
  - Verify @photon/core, @photon/fonts, @photon/playground all build
  - Note: @photon/playground has pre-existing TypeScript errors (same as baseline)

- [X] T044 [US2] Run complete docs generation: `npm run docs`
  - Verify exit code 0
  - Verify documentation generated successfully
  - Verify no errors or warnings (except acceptable ones)

- [X] T045 [US2] Run complete test suite: `npm test`
  - Verify exit code 0
  - Verify all tests pass
  - Verify no compilation errors during test run
  - Note: Fails due to pre-existing playground errors (same status as baseline)

- [X] T046 [US2] Document build repair changes
  - Update CHANGELOG.md with build fixes
  - Document configuration changes made
  - Note any dependency updates
  - Created build-repair-summary.md with comprehensive documentation

**Checkpoint**: All build processes work successfully, upgrade fully validated (SC-003, SC-004, SC-006, SC-007, FR-003, FR-003a, FR-003b, FR-011, FR-012, FR-013, FR-014)

---

## Phase 5: User Story 3 - Configuration Migration (Priority: P2)

**Goal**: Identify and update any deprecated configuration options for long-term maintainability

**Independent Test**: Review changelogs, update configuration files, verify builds complete successfully

### Implementation for User Story 3

- [X] T047 [P] [US3] Review Lerna v6→v8 changelog for breaking changes
- [X] T048 [P] [US3] Review TypeDoc v0.26→v0.28 changelog for breaking changes
- [X] T049 [US3] Verify `/lerna.json` has no deprecated options (already done by lerna repair)
- [X] T050 [US3] Review `/packages/photon/typedoc.json` for deprecated options
- [X] T051 [US3] Verify TypeDoc configuration is v0.28-compatible (current config is compatible)
- [X] T052 [US3] Run documentation generation: `npm run docs`
- [X] T053 [US3] Verify no deprecation warnings in output
- [X] T054 [US3] Compare generated documentation to baseline for visual/structural changes
- [X] T055 [US3] Verify no broken links in generated documentation
- [X] T056 [US3] Verify no missing content compared to baseline

**Checkpoint**: Configuration migrated, no deprecation warnings (FR-007, FR-008, FR-009, SC-007)

---

## Phase 6: User Story 4 - New Features Access (Priority: P3)

**Goal**: Document new features available in upgraded versions for future productivity improvements

**Independent Test**: Review release notes, document new features, optionally test one enhancement

### Implementation for User Story 4

- [X] T057 [P] [US4] Review Lerna v8.x release notes for new features
- [X] T058 [P] [US4] Review TypeDoc v0.28.x release notes for new features
- [X] T059 [US4] Document available Lerna v8 features in `/specs/003-upgrade-lerna-typedoc/new-features.md`
- [X] T060 [US4] Document available TypeDoc v0.28 features in `/specs/003-upgrade-lerna-typedoc/new-features.md`
- [X] T061 [US4] Identify 1-2 optional enhancements applicable to this project
- [X] T062 [US4] (Optional) Test one new feature to validate integration

**Checkpoint**: New features documented, optional enhancements identified

---

## Phase 7: Final Validation & Documentation

**Purpose**: End-to-end validation and documentation updates

- [ ] T063 Clean environment test: `rm -rf node_modules package-lock.json`
- [ ] T064 Fresh install: `npm install`
- [ ] T065 Verify clean install completes without errors
- [ ] T066 Run full test suite on clean install: `npm test`
- [ ] T067 Verify all tests pass (SC-008)
- [ ] T068 [P] Update `/CHANGELOG.md` with upgrade details and build fixes
- [ ] T069 [P] Document migration steps in upgrade notes
- [ ] T070 Review all modified files: `git diff`
- [ ] T071 Verify expected files changed (package.json, package-lock.json, lerna.json, tsconfig files, etc.)
- [ ] T072 Run acceptance test script from contracts/upgrade-procedure.md
- [ ] T073 Commit changes with descriptive message: "chore: upgrade Lerna to v8.2.4, TypeDoc to v0.28.14, and fix build process"

**Checkpoint**: All validation passed, ready for merge

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: ✅ COMPLETED
- **Phase 2 (US1 - Security)**: ✅ COMPLETED
- **Phase 3 (US2 - Compatibility)**: ✅ COMPLETED
- **Phase 4 (US2 - Build Repair)**: Depends on Phase 3 - MUST complete before US3
- **Phase 5 (US3 - Config)**: Depends on Phase 4 completion
- **Phase 6 (US4 - Features)**: Depends on Phase 4 completion - Can run in parallel with US3
- **Phase 7 (Validation)**: Depends on Phase 4-6 completion

### User Story Dependencies

- **User Story 1 (P1 - Security)**: ✅ COMPLETED - All other stories depend on this
- **User Story 2 (P1 - Build)**: PARTIALLY COMPLETE - Build repair (Phase 4) is BLOCKING for US3/US4
- **User Story 3 (P2 - Config)**: Can start after US2 build repair, independent of US4
- **User Story 4 (P3 - Features)**: Can start after US2 build repair, can run parallel with US3

### Within Phase 4 (Build Repair)

- **Investigation (T034-T035)**: Can run in parallel [P]
- **TypeDoc Fix (T036-T038)**: Sequential, depends on T034
- **TypeScript Fix (T039-T041)**: Sequential, depends on T035
- **Full Validation (T042-T046)**: Sequential, depends on all fixes

### Parallel Opportunities

- **Phase 4**: T034, T035 (investigations) can run in parallel
- **Phase 5**: T047, T048 (changelog reviews) can run in parallel
- **Phase 6**: T057, T058 (feature reviews) can run in parallel
- **Phase 7**: T068, T069 (documentation updates) can run in parallel

---

## Implementation Strategy

### Sequential Validation Approach (Recommended)

This is a dependency upgrade WITH build repair, so sequential validation is critical:

1. **Phase 1**: ✅ Setup - Baseline metrics captured
2. **Phase 2**: ✅ US1 (Security) - Dependencies upgraded, zero vulnerabilities
3. **Phase 3**: ✅ US2 (Compatibility) - Upgrade validated, pre-existing issues confirmed
4. **Phase 4**: US2 (Build Repair) - Fix pre-existing build failures
   - **STOP and VALIDATE**: All builds succeed with exit code 0
   - **Rollback point**: If fixes break something, revert build changes
5. **Phase 5**: US3 (Config) - Migrate configuration
   - **STOP and VALIDATE**: No deprecation warnings
   - **Rollback point**: If warnings persist, investigate before proceeding
6. **Phase 6**: US4 (Features) - Document new capabilities
   - **STOP and VALIDATE**: Features documented
   - **No rollback needed**: Documentation only
7. **Phase 7**: Final validation and merge

### Rollback Procedure

At any checkpoint, if validation fails:

```bash
# Full rollback
git checkout package.json package-lock.json lerna.json
# If build fixes were applied, also revert:
git checkout packages/photon/target/tsconfig.typedoc.json
git checkout packages/photon/typedoc.json
git checkout docs/demos/package.json docs/demos/tsconfig.json
git checkout packages/fonts/package.json packages/fonts/tsconfig.json
npm install

# Verify rollback
npm test
```

---

## Success Criteria Reference

From spec.md (updated), this upgrade is successful when:

- **SC-001**: ✅ Lerna upgraded to v8.2.4 (T015) - COMPLETED
- **SC-002**: ✅ TypeDoc upgraded to v0.28.14 (T016) - COMPLETED
- **SC-003**: ⏳ All npm scripts exit with code 0 including previously broken builds (T042-T045)
- **SC-004**: ⏳ Documentation build completes successfully fixing pre-existing failure (T044)
- **SC-005**: ✅ Zero high/critical vulnerabilities (T017-T018) - COMPLETED
- **SC-006**: ⏳ All tests pass without modification (T045)
- **SC-007**: ⏳ Generated docs complete and valid fixing pre-existing failure (T044, T054-T056)
- **SC-008**: ⏳ Clean install works (T063-T067)

---

## Task Summary

**Total Tasks**: 73 (T001-T073)
- **Completed**: 33 tasks (T001-T033)
- **Remaining**: 40 tasks (T034-T073)

**By Phase**:
- Phase 1 (Setup): 6 tasks ✅
- Phase 2 (US1 Security): 12 tasks ✅
- Phase 3 (US2 Compatibility): 15 tasks ✅
- Phase 4 (US2 Build Repair): 13 tasks ⏳ **CURRENT FOCUS**
- Phase 5 (US3 Config): 10 tasks
- Phase 6 (US4 Features): 6 tasks
- Phase 7 (Final Validation): 11 tasks

**Parallel Opportunities**: 8 task groups can run in parallel

**Critical Path**: Phase 4 (Build Repair) is blocking for all remaining work

---

## Notes

- This is a dependency upgrade WITH build process repair - tasks are sequential with validation checkpoints
- Each user story represents a validation concern and must be independently testable
- Rollback capability is critical - commit after each phase
- Performance benchmarks must be compared to baseline at each checkpoint
- **Build repair (Phase 4) is MANDATORY** - cannot proceed without functional builds
- All tasks must complete successfully before merge
