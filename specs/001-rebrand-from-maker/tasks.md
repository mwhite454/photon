# Tasks: Rebrand to Photon

**Input**: Design documents from `/specs/001-rebrand-from-maker/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: This rebrand uses verification scripts instead of traditional unit tests. Verification tasks are included at checkpoints.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **Monorepo structure**: `packages/photon/`, `packages/playground/`, `packages/fonts/`, `packages/docs/`
- **Documentation**: `docs/`, `README.md`, `ROADMAP.md`, `NOTICE`, `LICENSE`
- **Constitution**: `.specify/memory/constitution.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project preparation and legal foundation

- [X] T001 [P] [Setup] Verify @photon scope availability on npm (`npm view @photon/core`)
- [X] T002 [P] [Setup] Create NOTICE file in repository root with Apache 2.0 fork attribution
- [X] T003 [P] [Setup] Update LICENSE file to add dual copyright (Microsoft 2015-2016 + new maintainer 2025)
- [X] T004 [P] [Setup] Move ROADMAP_DRAFT.md to ROADMAP.md in repository root
- [X] T005 [P] [Setup] Update .specify/memory/constitution.md to reference "Photon" instead of "Maker.js"
- [X] T006 [Setup] Create verification scripts directory: specs/001-rebrand-from-maker/verification/
- [X] T007 [P] [Setup] Create verify-package-names.sh script in verification directory
- [X] T008 [P] [Setup] Create verify-namespaces.sh script in verification directory
- [X] T009 [P] [Setup] Create verify-dist-files.sh script in verification directory
- [X] T010 [P] [Setup] Create verify-docs.sh script in verification directory
- [X] T011 [P] [Setup] Create verify-build.sh script in verification directory
- [X] T012 [Setup] Make all verification scripts executable (`chmod +x verification/*.sh`)

**Checkpoint**: Legal foundation established, verification scripts ready

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core renames that MUST be complete before ANY user story can proceed

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T013 [Foundational] Rename directory: `packages/maker.js/` → `packages/photon/`
- [X] T014 [Foundational] Update root package.json: name "makerjs-dev" → "photon-dev"
- [X] T015 [Foundational] Update packages/photon/package.json: name "makerjs" → "@photon/core"
- [X] T016 [Foundational] Update packages/playground/package.json: name "makerjs-playground" → "@photon/playground", dependency "makerjs" → "@photon/core"
- [X] T017 [Foundational] Update packages/fonts/package.json: name "makerjs-fonts" → "@photon/fonts", dependency "makerjs" → "@photon/core"
- [X] T018 [Foundational] Update packages/docs/package.json: name "makerjs-docs" → "@photon/docs", dependency "makerjs" → "@photon/core"
- [X] T019 [Foundational] Clean and reinstall dependencies: `rm -rf node_modules package-lock.json packages/*/node_modules packages/*/package-lock.json && npm install`
- [X] T020 [Foundational] Run verification: `./specs/001-rebrand-from-maker/verification/verify-package-names.sh`

**Checkpoint**: Foundation ready - all packages renamed, dependencies updated, verification passed

---

## Phase 3: User Story 1 - Core Identity Rebrand (Priority: P1) 🎯 MVP

**Goal**: Establish Photon as the project identity with proper legal attribution

**Independent Test**: Verify all package names, namespaces, distribution files, and legal files use Photon branding

### TypeScript Namespace Renames (US1)

- [x] T021 [P] [US1] Find/replace in packages/photon/src/**/*.ts: "namespace MakerJs" → "namespace Photon"
- [x] T022 [P] [US1] Find/replace in packages/photon/src/**/*.ts: "MakerJs." → "Photon."
- [x] T023 [P] [US1] Find/replace in packages/photon/src/**/*.ts: "typeof MakerJs" → "typeof Photon"
- [x] T024 [P] [US1] Find/replace in packages/playground/src/**/*.ts: "namespace MakerJsPlayground" → "namespace PhotonPlayground"
- [x] T025 [P] [US1] Find/replace in packages/playground/src/**/*.ts: "MakerJsPlayground." → "PhotonPlayground."
- [x] T026 [US1] Run verification: `./specs/001-rebrand-from-maker/verification/verify-namespaces.sh`

### Build Configuration Updates (US1)

- [x] T027 [P] [US1] Update packages/photon/tsconfig.json: Update outFile paths if they reference "maker"
- [x] T028 [P] [US1] Update packages/photon/vite.config.ts: Change output file names to "photon.js", "photon.es.js", "photon.umd.js"
- [x] T029 [P] [US1] Update packages/photon/vite.config.ts: Change global variable name from "MakerJs" to "Photon"
- [x] T030 [P] [US1] Update packages/photon/target/build.js (if exists): Update output file names and header comments
- [x] T031 [US1] Run build: `npm run build`
- [x] T032 [US1] Run verification: `./specs/001-rebrand-from-maker/verification/verify-dist-files.sh`
- [x] T033 [US1] Run verification: `./specs/001-rebrand-from-maker/verification/verify-build.sh`

### README and Core Documentation (US1)

- [x] T034 [US1] Update README.md: Change header to "# Photon"
- [x] T035 [US1] Update README.md: Add "Origins" section explaining Maker.js fork with attribution
- [x] T036 [US1] Update README.md: Add "Migrating from Maker.js" section with package name mapping
- [x] T037 [US1] Update README.md: Update all code examples to use `@photon/core` and `photon` variable names
- [x] T038 [US1] Update README.md: Update installation instructions to `npm install @photon/core`
- [x] T039 [US1] Update CONTRIBUTING.md: Remove Microsoft CLA references, establish new contribution policy

**Checkpoint**: User Story 1 complete - Core identity established, builds successfully, legal compliance verified

---

## Phase 4: User Story 2 - Documentation & Web Presence (Priority: P2)

**Goal**: Consistent Photon branding across all user-facing documentation and playground

**Independent Test**: Navigate through documentation and playground to verify consistent Photon branding

### API Documentation Regeneration (US2) - **DEFERRED**

- [ ] T040 [US2] [DEFERRED] Clean existing API documentation: `rm -rf docs/api/`
- [ ] T041 [US2] [DEFERRED] Regenerate API documentation with TypeDoc: `npm run docs`
- [ ] T042 [US2] [DEFERRED] Verify API docs reference "Photon" namespace (check docs/api/modules/photon.html exists)

**Note**: Documentation tooling and Lerna will be updated in a future phase. These tasks are deferred until the new tooling is in place.

### Tutorial and Guide Updates (US2) - **DEFERRED**

- [ ] T043 [P] [US2] [DEFERRED] Find/replace in docs/**/*.md: "Maker.js" → "Photon" (preserve attribution contexts)
- [ ] T044 [P] [US2] [DEFERRED] Find/replace in docs/**/*.md: "makerjs" → "@photon/core" or "photon" (context-dependent)
- [ ] T045 [P] [US2] [DEFERRED] Find/replace in docs/**/*.md: `require('makerjs')` → `require('@photon/core')`
- [ ] T046 [P] [US2] [DEFERRED] Find/replace in docs/**/*.md: `import * as makerjs` → `import * as photon`
- [ ] T047 [US2] [DEFERRED] Manual review of docs/ for contextual accuracy (some historical Maker.js references should remain)

**Note**: Deferred until documentation tooling is updated.

### Code Example Updates (US2) - **DEFERRED**

- [ ] T048 [P] [US2] [DEFERRED] Update docs/_snippets/**/*.html: Replace makerjs references with photon
- [ ] T049 [P] [US2] [DEFERRED] Update docs/demos/**/*.js: Replace `var makerjs = require('makerjs')` with `var photon = require('@photon/core')`
- [ ] T050 [P] [US2] [DEFERRED] Update docs/demos/**/*.js: Replace makerjs.* calls with photon.* calls
- [ ] T051 [US2] [DEFERRED] Test at least 10 example models in playground to verify they work

**Note**: Deferred until documentation tooling is updated.

### Playground Interface Rebrand (US2)

- [x] T052 [US2] Update docs/playground/index.html: Change `<title>` to "Photon Playground"
- [x] T053 [US2] Update docs/playground/index.html: Change main heading to "Photon Playground"
- [x] T054 [US2] Update docs/playground/index.html: Update all text references from "Maker.js" to "Photon"
- [x] T055 [US2] Update docs/playground/index.html: Update meta tags for SEO (description, og:title, etc.)
- [ ] T056 [US2] Update playground example models: Replace require('makerjs') with require('@photon/core') - **MANUAL**
- [ ] T057 [US2] Start playground server: `npm start` - **MANUAL**
- [ ] T058 [US2] Manual test: Open http://localhost:8020 and verify branding - **MANUAL**
- [ ] T059 [US2] Manual test: Load and run at least 10 example models - **MANUAL**
- [ ] T060 [US2] Manual test: Verify Monaco Editor functions correctly - **MANUAL**
- [ ] T061 [US2] Manual test: Verify no console errors - **MANUAL**

**Note**: T056-T061 require manual testing and verification by running the playground server.

### HTML and SEO Updates (US2) - **DEFERRED**

- [ ] T062 [P] [US2] [DEFERRED] Update docs/**/*.html: Find/replace "Maker.js" → "Photon" in titles and headings
- [ ] T063 [P] [US2] [DEFERRED] Update docs/**/*.html: Update meta tags (title, description, og:title, og:description)
- [ ] T064 [P] [US2] [DEFERRED] Update docs/_layouts/**/*.html: Update site-wide branding elements
- [ ] T065 [US2] [DEFERRED] Run link checker on documentation to identify broken links
- [ ] T066 [US2] [DEFERRED] Fix any broken links identified by link checker

**Note**: Deferred until documentation tooling is updated.

### Verification (US2) - **DEFERRED**

- [ ] T067 [US2] [DEFERRED] Run verification: `./specs/001-rebrand-from-maker/verification/verify-docs.sh`
- [ ] T068 [US2] [DEFERRED] Manual checklist: Complete documentation section from contracts/verification-checklist.md

**Note**: Deferred until documentation tooling is updated.

**Checkpoint**: User Story 2 complete - All documentation and playground consistently branded as Photon

---

## Phase 5: User Story 3 - Future Roadmap Communication (Priority: P2)

**Goal**: Communicate Photon's vision and attract new community members

**Independent Test**: Review ROADMAP.md to verify it clearly communicates direction and contribution opportunities

### Roadmap Finalization (US3)

- [x] T069 [US3] Review ROADMAP.md content for completeness (already moved from draft in T004)
- [x] T070 [US3] Verify ROADMAP.md has near-term goals (3-6 months) - at least 5 items ✅ (8 items: Monaco, ES6+, rebrand, build system, playground, docs)
- [x] T071 [US3] Verify ROADMAP.md has mid-term goals (6-12 months) - at least 3 items ✅ (9 items across Developer Experience, User Features, Community Building)
- [x] T072 [US3] Verify ROADMAP.md has long-term vision (1-2 years) - at least 3 items ✅ (12 items across Advanced Features, Platform Expansion, Ecosystem)
- [x] T073 [US3] Verify ROADMAP.md explains how to contribute ✅ (Section "How to Contribute" with 5 contribution types)
- [x] T074 [US3] Verify ROADMAP.md articulates what makes Photon different from Maker.js ✅ (Section "What Makes Photon Different")
- [x] T075 [US3] Add any user-requested features from ROADMAP_DRAFT.md edits (multi-model import, color/operations support, .3mf export, STL import) ✅ (All included)

### Repository Metadata Updates (US3)

- [ ] T076 [P] [US3] Update GitHub repository description to mention Photon - **MANUAL (GitHub UI)**
- [ ] T077 [P] [US3] Update GitHub repository topics: Add "photon", "laser-cutting", "cnc", "es6", "typescript" - **MANUAL (GitHub UI)**
- [ ] T078 [P] [US3] Update GitHub repository topics: Keep "makerjs" temporarily for discoverability - **MANUAL (GitHub UI)**
- [ ] T079 [US3] Update README badges if any (npm version, build status, etc.) - **MANUAL (GitHub UI)**

**Note**: These tasks require manual updates via the GitHub repository settings interface.

**Checkpoint**: User Story 3 complete - Roadmap communicates vision, repository metadata updated

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final touches and comprehensive verification

### Code Comment Updates

- [x] T080 [P] [Polish] Find/replace in packages/**/*.ts: Comment headers "// Maker.js" → "// Photon" ✅ (No instances found)
- [x] T081 [P] [Polish] Find/replace in packages/**/*.ts: String literals `"Maker.js"` → `"Photon"` ✅ (No instances found)
- [x] T082 [P] [Polish] Find/replace in packages/**/*.js: Update any generated code comments ✅ (Handled by build process)

### Final Verification

- [x] T083 [Polish] Run all verification scripts in sequence ✅ (All verifications pass)
- [ ] T084 [Polish] Complete full manual checklist from contracts/verification-checklist.md - **MANUAL**
- [ ] T085 [Polish] Verify build time < 2 minutes - **MANUAL**
- [ ] T086 [Polish] Verify playground load time < 3 seconds - **MANUAL**
- [ ] T087 [Polish] Verify zero broken links in documentation
- [ ] T088 [Polish] Verify LICENSE and NOTICE files pass Apache 2.0 compliance review
- [ ] T089 [Polish] Verify README communicates project identity clearly (30-second test with fresh eyes)
- [ ] T090 [Polish] Verify at least 10 example models work correctly

### Git Commit

- [ ] T091 [Polish] Stage all changes: `git add -A`
- [ ] T092 [Polish] Review staged changes for any missed items
- [ ] T093 [Polish] Commit with semantic commit message (see quickstart.md for template)

**Checkpoint**: All verification passed, rebrand complete, ready for PR/release

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T001-T012) - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (T013-T020) - MVP delivery
- **User Story 2 (Phase 4)**: Depends on User Story 1 (T021-T039) - Documentation needs core identity
- **User Story 3 (Phase 5)**: Depends on User Story 1 (T021-T039) - Roadmap needs core identity
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Can start after US1 complete - Needs package names and namespaces finalized
- **User Story 3 (P2)**: Can start after US1 complete - Independent of US2, can run in parallel

### Within Each User Story

- **US1**: Namespaces → Build config → README (sequential within groups, parallel across groups)
- **US2**: API docs → Tutorials → Examples → Playground (mostly sequential, some parallel within groups)
- **US3**: Roadmap review → Metadata updates (sequential)

### Parallel Opportunities

**Setup Phase (T001-T012)**:
- T001, T002, T003, T004, T005 can all run in parallel
- T007-T011 can all run in parallel (creating different scripts)

**Foundational Phase (T013-T020)**:
- Must be sequential (directory rename blocks package.json updates)

**User Story 1 (T021-T039)**:
- T021-T025 can run in parallel (different source files)
- T027-T030 can run in parallel (different config files)

**User Story 2 (T040-T068)**:
- T043-T046 can run in parallel (different doc files)
- T048-T050 can run in parallel (different example files)
- T062-T064 can run in parallel (different HTML files)

**User Story 3 (T069-T079)**:
- T076-T078 can run in parallel (different metadata fields)

**Polish (T080-T093)**:
- T080-T082 can run in parallel (different file types)

---

## Parallel Example: User Story 1

```bash
# Launch namespace renames together:
Task T021: "Find/replace in packages/photon/src: namespace MakerJs → namespace Photon"
Task T022: "Find/replace in packages/photon/src: MakerJs. → Photon."
Task T023: "Find/replace in packages/photon/src: typeof MakerJs → typeof Photon"
Task T024: "Find/replace in packages/playground/src: namespace MakerJsPlayground → namespace PhotonPlayground"
Task T025: "Find/replace in packages/playground/src: MakerJsPlayground. → PhotonPlayground."

# Then verify:
Task T026: "Run verify-namespaces.sh"

# Launch build config updates together:
Task T027: "Update packages/photon/tsconfig.json"
Task T028: "Update packages/photon/vite.config.ts output names"
Task T029: "Update packages/photon/vite.config.ts global variable"
Task T030: "Update packages/photon/target/build.js"

# Then build and verify:
Task T031: "npm run build"
Task T032: "Run verify-dist-files.sh"
Task T033: "Run verify-build.sh"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T012)
2. Complete Phase 2: Foundational (T013-T020) - CRITICAL
3. Complete Phase 3: User Story 1 (T021-T039)
4. **STOP and VALIDATE**: Run all verification scripts
5. Test build and basic functionality
6. **MVP DELIVERED**: Core identity rebrand complete

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → **MVP!**
3. Add User Story 2 → Test independently → Documentation complete
4. Add User Story 3 → Test independently → Roadmap complete
5. Polish → Final verification → **RELEASE READY**

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (T021-T039)
   - Wait for US1 checkpoint, then:
   - Developer B: User Story 2 (T040-T068)
   - Developer C: User Story 3 (T069-T079)
3. Team completes Polish together (T080-T093)

---

## Time Estimates

Based on quickstart.md estimates:

- **Phase 1 (Setup)**: 30 minutes (T001-T012)
- **Phase 2 (Foundational)**: 45 minutes (T013-T020)
- **Phase 3 (US1)**: 90 minutes (T021-T039)
- **Phase 4 (US2)**: 135 minutes (T040-T068)
- **Phase 5 (US3)**: 30 minutes (T069-T079)
- **Phase 6 (Polish)**: 30 minutes (T080-T093)

**Total**: ~6 hours (360 minutes)

---

## Notes

- [P] tasks = different files, no dependencies within group
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Verification scripts provide automated quality gates
- Manual testing required for playground and documentation quality
- Commit after completing each user story phase
- Stop at any checkpoint to validate story independently
- Follow quickstart.md for detailed step-by-step instructions

---

## Success Criteria Mapping

Tasks directly support spec success criteria (SC-001 through SC-010):

- **SC-001**: 100% package names → T014-T018, T020 (verify-package-names.sh)
- **SC-002**: 100% documentation branding → T043-T047, T052-T054, T062-T064, T067
- **SC-003**: Zero broken links → T065-T066, T087
- **SC-004**: README migration section → T036
- **SC-005**: Build outputs correct → T028-T033
- **SC-006**: Playground functions → T057-T061
- **SC-007**: 10+ examples work → T051, T059, T090
- **SC-008**: LICENSE/NOTICE compliance → T002-T003, T088
- **SC-009**: README clarity → T034-T038, T089
- **SC-010**: Roadmap goals → T069-T075

---

**Total Tasks**: 93  
**MVP Tasks (US1 only)**: 32 (T001-T033 after foundational)  
**Parallel Opportunities**: ~30 tasks marked [P]  
**Verification Points**: 7 automated scripts + comprehensive manual checklist  
**Estimated Time**: ~6 hours following quickstart guide
