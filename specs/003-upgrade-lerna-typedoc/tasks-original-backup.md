# Tasks: Upgrade Lerna & TypeDoc to Latest Versions

**Input**: Design documents from `/specs/003-upgrade-lerna-typedoc/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/upgrade-procedure.md, quickstart.md

**Organization**: Tasks are organized by user story priority (P1 → P2 → P3) to enable incremental validation and safe rollback at each checkpoint.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Baseline & Preparation)

**Purpose**: Establish baseline metrics and prepare for upgrade

- [X] T001 Create feature branch `003-upgrade-lerna-typedoc` from main
- [X] T002 Capture baseline docs build time: `time npm run docs > baseline-docs-build.log 2>&1`
- [X] T003 [P] Capture baseline test execution time: `time npm test > baseline-test.log 2>&1`
- [X] T004 [P] Run security audit: `npm audit --json > baseline-audit.json`
- [X] T005 [P] Capture current versions: `npm list lerna typedoc --depth=0 > baseline-versions.txt`
- [X] T006 Verify Node.js version is 18+ (required by Lerna v8.x): `node --version`

**Checkpoint**: Baseline metrics captured, ready to proceed with upgrade

---

## Phase 2: User Story 1 - Dependency Security Updates (Priority: P1) 🎯

**Goal**: Upgrade Lerna to v8.2.4 and TypeDoc to v0.28.14 to benefit from security patches and bug fixes

**Independent Test**: Install upgraded dependencies, run build process, verify no security vulnerabilities

### Implementation for User Story 1

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

**Checkpoint**: Dependencies upgraded, security audit passed (SC-001, SC-002, SC-005)

---

## Phase 3: User Story 2 - Build Process Compatibility (Priority: P1) 🎯

**Goal**: Ensure all existing build scripts and documentation generation work after dependency upgrades

**Independent Test**: Run all npm scripts and verify they complete successfully without errors

### Implementation for User Story 2

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

**Checkpoint**: All build scripts work, tests pass, performance acceptable (SC-003, SC-004, SC-006, FR-003, FR-004)

---

## Phase 4: User Story 3 - Configuration Migration (Priority: P2)

**Goal**: Identify and update any deprecated configuration options for long-term maintainability

**Independent Test**: Review changelogs, update configuration files, verify builds complete successfully

### Implementation for User Story 3

- [ ] T034 [P] [US3] Review Lerna v6→v8 changelog for breaking changes
- [ ] T035 [P] [US3] Review TypeDoc v0.26→v0.28 changelog for breaking changes
- [ ] T036 [US3] Verify `/lerna.json` has no deprecated options (already done by lerna repair)
- [ ] T037 [US3] Review `/packages/photon/typedoc.json` for deprecated options
- [ ] T038 [US3] Verify TypeDoc configuration is v0.28-compatible (current config is compatible)
- [ ] T039 [US3] Run documentation generation: `npm run docs`
- [ ] T040 [US3] Verify no deprecation warnings in output
- [ ] T041 [US3] Compare generated documentation to baseline for visual/structural changes
- [ ] T042 [US3] Verify no broken links in generated documentation
- [ ] T043 [US3] Verify no missing content compared to baseline

**Checkpoint**: Configuration migrated, no deprecation warnings (FR-007, FR-008, FR-009, SC-007)

---

## Phase 5: User Story 4 - New Features Access (Priority: P3)

**Goal**: Document new features available in upgraded versions for future productivity improvements

**Independent Test**: Review release notes, document new features, optionally test one enhancement

### Implementation for User Story 4

- [ ] T044 [P] [US4] Review Lerna v8.x release notes for new features
- [ ] T045 [P] [US4] Review TypeDoc v0.28.x release notes for new features
- [ ] T046 [US4] Document available Lerna v8 features in `/specs/003-upgrade-lerna-typedoc/new-features.md`
- [ ] T047 [US4] Document available TypeDoc v0.28 features in `/specs/003-upgrade-lerna-typedoc/new-features.md`
- [ ] T048 [US4] Identify 1-2 optional enhancements applicable to this project
- [ ] T049 [US4] (Optional) Test one new feature to validate integration

**Checkpoint**: New features documented, optional enhancements identified

---

## Phase 6: Final Validation & Documentation

**Purpose**: End-to-end validation and documentation updates

- [ ] T050 Clean environment test: `rm -rf node_modules package-lock.json`
- [ ] T051 Fresh install: `npm install`
- [ ] T052 Verify clean install completes without errors
- [ ] T053 Run full test suite on clean install: `npm test`
- [ ] T054 Verify all tests pass (SC-008)
- [ ] T055 [P] Update `/CHANGELOG.md` with upgrade details
- [ ] T056 [P] Document migration steps in upgrade notes
- [ ] T057 Review all modified files: `git diff`
- [ ] T058 Verify only expected files changed (package.json, package-lock.json, lerna.json)
- [ ] T059 Run acceptance test script from contracts/upgrade-procedure.md
- [ ] T060 Commit changes with descriptive message: "chore: upgrade Lerna to v8.2.4 and TypeDoc to v0.28.14"

**Checkpoint**: All validation passed, ready for merge

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (US1 - Security)**: Depends on Phase 1 completion - MUST complete before US2
- **Phase 3 (US2 - Build)**: Depends on Phase 2 completion - MUST complete before US3
- **Phase 4 (US3 - Config)**: Depends on Phase 3 completion - Can run before US4
- **Phase 5 (US4 - Features)**: Depends on Phase 2 completion - Can run in parallel with US3
- **Phase 6 (Validation)**: Depends on Phase 2-5 completion

### User Story Dependencies

- **User Story 1 (P1 - Security)**: BLOCKING - Must complete first, all other stories depend on this
- **User Story 2 (P1 - Build)**: BLOCKING - Must complete second, validates upgrade works
- **User Story 3 (P2 - Config)**: Can start after US2, independent of US4
- **User Story 4 (P3 - Features)**: Can start after US1, can run parallel with US2/US3

### Within Each User Story

- **US1**: Sequential dependency updates → install → verification
- **US2**: Sequential build validation (bootstrap → build-tools → build → docs → test)
- **US3**: Parallel changelog reviews → sequential validation
- **US4**: Parallel feature reviews → documentation

### Parallel Opportunities

- **Phase 1**: T003, T004, T005 (baseline captures) can run in parallel
- **Phase 5**: T044, T045 (changelog reviews) can run in parallel
- **Phase 6**: T055, T056 (documentation updates) can run in parallel

---

## Parallel Example: Baseline Capture

```bash
# Launch all baseline captures together:
Task: "Capture baseline test execution time"
Task: "Run security audit"
Task: "Capture current versions"
```

---

## Implementation Strategy

### Sequential Validation Approach (Recommended)

This is a dependency upgrade with breaking changes, so sequential validation is critical:

1. **Phase 1**: Setup - Capture baseline metrics
2. **Phase 2**: US1 (Security) - Upgrade dependencies, verify security
   - **STOP and VALIDATE**: Dependencies installed, no vulnerabilities
   - **Rollback point**: If security audit fails, revert package.json
3. **Phase 3**: US2 (Build) - Validate all build processes work
   - **STOP and VALIDATE**: All builds pass, tests pass, performance acceptable
   - **Rollback point**: If builds fail, full rollback
4. **Phase 4**: US3 (Config) - Migrate configuration
   - **STOP and VALIDATE**: No deprecation warnings
   - **Rollback point**: If warnings persist, investigate before proceeding
5. **Phase 5**: US4 (Features) - Document new capabilities
   - **STOP and VALIDATE**: Features documented
   - **No rollback needed**: Documentation only
6. **Phase 6**: Final validation and merge

### Rollback Procedure

At any checkpoint, if validation fails:

```bash
# Full rollback
git checkout package.json package-lock.json lerna.json
npm install

# Verify rollback
npm test
```

---

## Edge Cases & Risk Mitigation

### Edge Case: Lerna bootstrap breaking changes

**Risk**: `lerna bootstrap` deprecated in v7, removed in v9
**Mitigation**: T009-T012 update scripts to use npm workspaces
**Validation**: T022-T023 verify workspace linking works

### Edge Case: TypeDoc output structure changes

**Risk**: TypeDoc v0.28 may render documentation differently
**Mitigation**: T041-T043 compare output to baseline
**Validation**: Visual review and link checking

### Edge Case: Node.js version compatibility

**Risk**: Lerna v8 requires Node.js 18+
**Mitigation**: T006 verify Node.js version before starting
**Validation**: Pre-flight check in Phase 1

### Edge Case: Peer dependency conflicts

**Risk**: TypeDoc or Lerna may have conflicting peer dependencies
**Mitigation**: T014 install will surface conflicts
**Validation**: T017-T018 security audit and manual review

---

## Success Criteria Reference

From spec.md, this upgrade is successful when:

- **SC-001**: ✅ Lerna upgraded to v8.2.4 (T015)
- **SC-002**: ✅ TypeDoc upgraded to v0.28.14 (T016)
- **SC-003**: ✅ All npm scripts exit with code 0 (T025, T027, T029, T031)
- **SC-004**: ✅ Docs build time within 10% of baseline (T032)
- **SC-005**: ✅ Zero high/critical vulnerabilities (T017-T018)
- **SC-006**: ✅ All tests pass without modification (T031)
- **SC-007**: ✅ Generated docs functionally equivalent (T041-T043)
- **SC-008**: ✅ Clean install works (T050-T054)

---

## Notes

- This is a dependency upgrade, not a feature implementation - tasks are sequential with validation checkpoints
- Each user story represents a validation concern, not an independent feature
- Rollback capability is critical - commit after each phase
- Performance benchmarks must be compared to baseline at each checkpoint
- All tasks must complete successfully before merge
- No [P] markers within user stories except for independent reviews/documentation
