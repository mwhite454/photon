---
description: "Task list for Publish and Verify Latest Photon Docs on GitHub Pages"
---

# Tasks: Publish and Verify Latest Photon Docs on GitHub Pages

**Input**: Design documents from `/specs/008-as-a-user/`
**Prerequisites**: plan.md, spec.md, research.md

**Tests**: Tests are included as this feature requires automated verification per FR-005 and User Story 3.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions
- Documentation: `docs/` at repository root
- CI/CD: `.github/workflows/`
- Tests: `tests/docs-migration/`
- Configuration: `playwright.config.js`, `docs/mkdocs.yml`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and verification of existing structure

- [x] T001 Verify MkDocs configuration in `docs/mkdocs.yml` has correct `site_url` for GitHub Pages
- [x] T002 [P] Verify GitHub Pages settings in repository (Settings → Pages → Source: GitHub Actions)
- [x] T003 [P] Verify existing Playwright configuration in `playwright.config.js` is functional

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Update `docs/mkdocs.yml` to set `site_url` to production GitHub Pages URL (https://mwhite454.github.io/photon/)
- [x] T005 Verify `.github/workflows/docs-deploy.yml` triggers on push to `main` branch with `docs/**` path filter
- [x] T006 Verify `.github/workflows/docs-deploy.yml` builds MkDocs site and deploys via `actions/deploy-pages@v4`
- [x] T007 Verify workflow has correct permissions (`pages: write`, `id-token: write`)
- [x] T008 Add version/date marker to docs homepage template in `docs/docs/index.md` using `git-revision-date-localized` plugin

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Latest Documentation on GitHub Pages (Priority: P1) 🎯 MVP

**Goal**: Visitors can access the Photon documentation site on GitHub Pages and see the latest documentation with the modern docs theme clearly visible.

**Independent Test**: Navigate to https://mwhite454.github.io/photon/ and verify visible markers indicating the current version/date and modern theme UI elements.

### Tests for User Story 1 ⚠️

**NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T009 [P] [US1] Create Playwright test spec in `tests/docs-migration/live-site-verification.spec.js` to verify site loads
- [ ] T010 [P] [US1] Add test assertion for page title "Photon" in header
- [ ] T011 [P] [US1] Add test assertion for "Getting Started" in top navigation
- [ ] T012 [P] [US1] Add test assertion for search input visibility
- [ ] T013 [P] [US1] Add test assertion for repository link "mwhite454/photon" on page

### Implementation for User Story 1

- [ ] T014 [US1] Trigger manual workflow run of `.github/workflows/docs-deploy.yml` to build and publish docs
- [ ] T015 [US1] Verify GitHub Pages deployment completes successfully (check Actions tab)
- [ ] T016 [US1] Manually verify site at https://mwhite454.github.io/photon/ shows modern theme
- [ ] T017 [US1] Run Playwright tests from T009-T013 and verify they pass
- [ ] T018 [US1] Document site URL and verification steps in `specs/008-as-a-user/quickstart.md`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Automatic Publication from Default Branch (Priority: P2)

**Goal**: Documentation builds and publishes automatically when changes are merged into the default branch.

**Independent Test**: Merge a documentation change to `main`; verify a new build runs and the site updates without manual steps.

### Tests for User Story 2 ⚠️

- [ ] T019 [P] [US2] Create test script in `tests/docs-migration/auto-publish-test.sh` to make a docs change and verify workflow triggers
- [ ] T020 [P] [US2] Add GitHub Actions workflow validation test to verify workflow syntax and configuration

### Implementation for User Story 2

- [ ] T021 [US2] Verify workflow trigger configuration in `.github/workflows/docs-deploy.yml` includes `push` event on `main` branch
- [ ] T022 [US2] Verify workflow path filter includes `docs/**` to trigger on docs changes
- [ ] T023 [US2] Make a test documentation change in `docs/docs/index.md` (e.g., update timestamp or add test section)
- [ ] T024 [US2] Commit and push change to `main` branch
- [ ] T025 [US2] Verify workflow automatically triggers in GitHub Actions
- [ ] T026 [US2] Verify site updates at https://mwhite454.github.io/photon/ reflect the test change
- [ ] T027 [US2] Revert test change or keep if useful

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Automated Verification of Theme and Recency (Priority: P3)

**Goal**: An automated check validates that the published site uses the modern theme and reflects the latest content.

**Independent Test**: Execute an automated browser check that visits the site and asserts presence of specific visual/text markers.

### Tests for User Story 3 ⚠️

- [ ] T028 [P] [US3] Enhance `tests/docs-migration/live-site-verification.spec.js` to check for build date/version marker
- [ ] T029 [P] [US3] Add test assertion for shadcn theme-specific CSS classes or DOM structure
- [ ] T030 [P] [US3] Add test to verify homepage content is not stale (check for recent date marker)

### Implementation for User Story 3

- [ ] T031 [US3] Create GitHub Actions workflow in `.github/workflows/docs-verification.yml` to run Playwright tests
- [ ] T032 [US3] Configure workflow to trigger after `docs-deploy.yml` completes successfully
- [ ] T033 [US3] Configure workflow to run on schedule (e.g., daily) for continuous monitoring
- [ ] T034 [US3] Add workflow step to install Playwright and dependencies
- [ ] T035 [US3] Add workflow step to run `npx playwright test tests/docs-migration/live-site-verification.spec.js`
- [ ] T036 [US3] Configure workflow to report test results and fail if assertions fail
- [ ] T037 [US3] Test workflow by triggering manually and verifying it passes
- [ ] T038 [US3] Document verification process in `specs/008-as-a-user/quickstart.md`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Handling of Edge Cases (Priority: P4)

**Goal**: The system handles edge cases such as cache delays, broken links, and build/publish failures to ensure a smooth user experience.

**Independent Test**: Simulate edge cases and verify the system's response.

### Tests for User Story 4 ⚠️

- [ ] T039 [P] [US4] Add Playwright test for cache-busting verification (check for version markers in URLs or headers)
- [ ] T040 [P] [US4] Add test to verify broken link detection using existing `pytest-check-links` job
- [ ] T041 [P] [US4] Add workflow test to verify failure handling and retry logic

### Implementation for User Story 4

- [ ] T042 [US4] Review `.github/workflows/docs-deploy.yml` for error handling and add failure notifications if missing
- [ ] T043 [US4] Add cache-busting strategy to `docs/mkdocs.yml` (e.g., use `git-revision-date-localized` in asset paths)
- [ ] T044 [US4] Verify `pytest-check-links` job in CI catches broken links
- [ ] T045 [US4] Add workflow step to surface build/publish failures clearly (e.g., GitHub Actions summary, Slack notification)
- [ ] T046 [US4] Test cache delay scenario: make change, verify version marker updates within 10 minutes
- [ ] T047 [US4] Test broken link scenario: introduce broken link, verify detection and reporting
- [ ] T048 [US4] Test build failure scenario: introduce syntax error in mkdocs.yml, verify failure is surfaced
- [ ] T049 [US4] Document edge case handling in `specs/008-as-a-user/quickstart.md`

**Checkpoint**: All edge cases should be handled gracefully

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T050 [P] Update main `README.md` with link to published docs site
- [ ] T051 [P] Add documentation in `docs/docs/` about how the docs are built and published
- [ ] T052 [P] Review and update `CONTRIBUTING.md` with docs contribution guidelines
- [ ] T053 [P] Add badges to `README.md` for docs build status and site availability
- [ ] T054 Code cleanup: Remove any outdated docs build scripts or configurations
- [ ] T055 Performance check: Verify site load time meets mkdocs defaults (< 3s for homepage)
- [ ] T056 Security review: Verify workflow permissions follow principle of least privilege
- [ ] T057 Run all Playwright tests in `tests/docs-migration/` to ensure no regressions
- [ ] T058 Create `specs/008-as-a-user/quickstart.md` with complete validation steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 being complete for verification target
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Enhances US1-US3 but should be independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Verification tests before implementation tasks
- Core implementation before edge case handling
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003)
- All test creation tasks within a user story marked [P] can run in parallel
- Once Foundational phase completes, User Stories 1 and 2 can start in parallel
- User Story 3 can start once US1 has a deployed site to verify
- User Story 4 can be worked on in parallel with US3
- All Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Create Playwright test spec in tests/docs-migration/live-site-verification.spec.js"
Task: "Add test assertion for page title 'Photon' in header"
Task: "Add test assertion for 'Getting Started' in top navigation"
Task: "Add test assertion for search input visibility"
Task: "Add test assertion for repository link 'mwhite454/photon' on page"
```

---

## Parallel Example: User Story 3

```bash
# Launch all test enhancements for User Story 3 together:
Task: "Enhance tests/docs-migration/live-site-verification.spec.js to check for build date/version marker"
Task: "Add test assertion for shadcn theme-specific CSS classes or DOM structure"
Task: "Add test to verify homepage content is not stale"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T008) - CRITICAL - blocks all stories
3. Complete Phase 3: User Story 1 (T009-T018)
4. **STOP and VALIDATE**: Test User Story 1 independently by visiting https://mwhite454.github.io/photon/
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!) - Site is live with modern theme
3. Add User Story 2 → Test independently → Deploy/Demo - Auto-publish on merge works
4. Add User Story 3 → Test independently → Deploy/Demo - Automated verification in place
5. Add User Story 4 → Test independently → Deploy/Demo - Edge cases handled
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (T009-T018)
   - Developer B: User Story 2 (T019-T027) - can start in parallel with US1
3. After US1 completes:
   - Developer C: User Story 3 (T028-T038) - needs US1 deployed site
   - Developer D: User Story 4 (T039-T049) - can work in parallel with US3
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Site URL: https://mwhite454.github.io/photon/
- Workflow file: `.github/workflows/docs-deploy.yml`
- Verification workflow: `.github/workflows/docs-verification.yml` (to be created)
- Test specs: `tests/docs-migration/live-site-verification.spec.js`
- Success criteria from spec.md:
  - SC-001: Merge to live update ≤ 10 minutes at p95
  - SC-002: 0 outdated theme occurrences over 30 days
  - SC-003: Automated verification 95% pass rate over 30 days
  - SC-004: 80% reduction in "docs outdated" support requests within one month

