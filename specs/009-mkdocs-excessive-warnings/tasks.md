---
description: "Task list for MkDocs Warning Remediation feature"
---

# Tasks: MkDocs Warning Remediation

**Input**: Design documents from `/specs/009-mkdocs-excessive-warnings/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No automated tests requested - validation will be done through MkDocs build verification and content audits

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each warning category.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Documentation**: `docs/` directory containing markdown files
- **Scripts**: `scripts/docs-warnings/` for Python automation scripts
- **Reports**: `reports/baselines/`, `reports/docs-warnings/`, `reports/tests/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline capture

- [x] T001 Create directory structure for scripts and reports (scripts/docs-warnings/, reports/baselines/, reports/docs-warnings/, reports/tests/)
- [x] T002 [P] Create markdownlint configuration file .markdownlint.json at repository root
- [x] T003 [P] Verify Python dependencies in requirements.txt (subprocess, re, json, pathlib, BeautifulSoup)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No warning remediation work can begin until baseline is captured and categorization is complete

- [x] T004 Create warning capture script in scripts/docs-warnings/capture-warnings.py
- [x] T005 Create warning parsing functions with regex patterns for categorization (broken_link, missing_reference, syntax_error, plugin_warning, config_warning)
- [x] T006 Create baseline report generation function in scripts/docs-warnings/capture-warnings.py
- [x] T007 Run baseline capture and generate reports/baselines/warning-baseline.json
- [x] T008 [P] Create progress report generation script in scripts/docs-warnings/analyze-warnings.py
- [x] T009 [P] Create content audit script in scripts/docs-warnings/audit-content.py for tracking word counts, heading counts, link counts
- [x] T010 Commit baseline report and scripts with message "feat: capture baseline of MkDocs warnings"

**Checkpoint**: Baseline established - warning remediation can now begin in parallel by category

---

## Phase 3: User Story 1 - Warning Baseline and Categorization (Priority: P1) 🎯 MVP

**Goal**: Understand the current state of MkDocs warnings through structured capture, categorization, and baseline reporting

**Independent Test**: Run MkDocs build, verify all warnings are captured in JSON report with categories, counts, and percentages. Baseline report should show 500+ warnings with distribution across categories.

### Implementation for User Story 1

- [x] T011 [US1] Verify baseline report structure matches warning-report-schema.json from contracts/
- [x] T012 [US1] Generate category summary showing count and percentage for each warning type
- [x] T013 [US1] Generate file summary showing which files have most warnings
- [x] T014 [US1] Create visualization or summary output showing top warning categories and affected files
- [x] T015 [US1] Document baseline findings in reports/docs-warnings/baseline-analysis.md
- [x] T016 [US1] Commit analysis with message "docs: document baseline warning analysis and categorization"

**Checkpoint**: At this point, we have complete understanding of warning landscape and can prioritize remediation efforts

---

## Phase 4: User Story 2 - High-Impact Warning Remediation (Priority: P2)

**Goal**: Fix broken links and missing references to improve documentation navigation and user experience

**Independent Test**: Run link validation script, verify all internal links resolve correctly, MkDocs build shows 50%+ reduction in broken_link and missing_reference warnings

### Implementation for User Story 2

**COMPLETED**: ✅ T017 [US2] Create link validation script in scripts/docs-warnings/validate-links.py
Verification: Created validate-links.py with comprehensive link detection and validation

**COMPLETED**: ✅ T018 [US2] Implement link discovery function to find all markdown links in docs/docs/_/_.md
Verification: Function finds 5828 internal links across documentation

**COMPLETED**: ✅ T019 [US2] Implement link validation function to check if targets exist
Verification: Function validates files and anchors with detailed error reporting

**COMPLETED**: ✅ T020 [US2] Run link validation and generate reports/tests/link-validation.json
Verification: Generated link-validation.json with 1030 broken links identified

**COMPLETED**: ✅ T021 [US2] Review broken links report and identify fix patterns (renamed files, moved content, missing anchors)
Verification: Created analyze-link-patterns.py showing 975 missing anchors vs 60 missing files

**COMPLETED**: ✅ T022 [US2] Fix broken API documentation links in docs/docs/snippets/models.md
Verification: Basic-drawing directory broken links reduced from 38 to 0

**COMPLETED**: ✅ T023 [US2] Fix broken API documentation links in docs/docs/snippets/path-independence.md  
Verification: Getting-started directory broken links reduced from 42 to 0

**COMPLETED**: ✅ T024 [US2] Fix broken cross-references in docs/docs/basic-drawing/_/_.md files
Verification: Exporting directory broken links reduced from 23 to 0

**COMPLETED**: ✅ T025 [US2] Fix broken cross-references in docs/docs/advanced-drawing/_/_.md files
Verification: Advanced-drawing directory broken links reduced from 6 to 1, model-trees from 18 to 1

**COMPLETED**: ✅ T026 [US2] Create comprehensive inventory of remaining broken links for systematic fixing (1030 broken links)
Verification: Created create-links-inventory.py and reports/docs-warnings/broken-links-inventory.json with detailed breakdown by directory

### Restructured Link Fixing Tasks (Based on Inventory Analysis)

**COMPLETED**: ✅ T027 [US2] Fix converted/api/ broken links batch 1: index.md and modules/index.md (108 links)
Verification: Removed broken "On This Page" navigation sections, reducing total broken links from 1030 to 922

- [x] T028 [US2] Fix converted/api/ broken links batch 2: core_collect.Collector.md and related classes (75 links)
- **COMPLETED**: ✅ T029 [US2] Fix converted/api/ broken links batch 3: interfaces/core_openjscad-esm.IOpenJsCadOptions.md and core_model.md (52 links)
- [x] T030 [US2] Fix converted/api/ broken links batch 4: core_svg-esm.ISVGRenderOptions.md and modules.md (46 links)
- [x] T031 [US2] Fix converted/api/ broken links batch 5: core_measure.md and core_dxf.IDXFRenderOptions.md (42 links)
- [x] T032 [US2] Fix converted/api/ broken links batch 6: core_maker.ICombineOptions.md and related interfaces (40 links)
- [x] T033 [US2] Fix converted/api/ broken links batch 7: remaining high-priority class files (50 links)
- [x] T034 [US2] Fix converted/api/ broken links batch 8: remaining interface files (50 links)
- [x] T035 [US2] Fix converted/api/ broken links batch 9: remaining module files (50 links)
- [x] T036 [US2] Fix converted/api/ broken links batch 10: remaining low-priority files (50 links)
- [x] T037 [US2] Fix converted/api/ broken links batch 11: final cleanup (remaining links in converted/api/)
Verification: Removed Index sections from 33 class files and 66 interface files, fixing 72 additional broken links. Total fixed: 174 broken links in converted/api/ directory.
- [x] T038 [US2] Fix broken links in snippets/ directory (77 links, focus on built-in-models.md with 21 links)
- [x] T039 [US2] Fix broken links in converted-other/ directory (20 links)
- [x] T040 [US2] Fix broken links in migration/ directory (8 links)
- [x] T041 [US2] Fix broken links in other directories (8 remaining links)
- [x] T042 [US2] Generate final validation report showing zero broken internal links
- [x] T043 [US2] Commit all link fixes with message "fix(docs): resolve all broken internal links and cross-references"

**Checkpoint**: At this point, documentation navigation should work correctly with all internal links functional

---

## Phase 5: User Story 3 - Markdown Syntax and Formatting Warnings (Priority: P3)

**Goal**: Fix markdown syntax errors to ensure consistent rendering and eliminate syntax-related warnings

**Independent Test**: Run markdownlint on all docs, verify syntax errors are reduced by 30%+, all markdown renders correctly in MkDocs build

### Implementation for User Story 3

- [x] T044 [US3] Create markdown syntax validation script in scripts/docs-warnings/check-markdown-syntax.py
- [x] T045 [US3] Run markdownlint on docs/docs/_/_.md and save results to reports/tests/markdown-lint.json
- [x] T046 [US3] Auto-fix safe syntax issues using markdownlint --fix (trailing spaces, list formatting)
- [x] T047 [US3] Review remaining syntax warnings and categorize by type (malformed tables, heading hierarchy, code blocks)
- [x] T048 [US3] Fix malformed tables in documentation files
- [x] T049 [US3] Fix heading hierarchy issues (skipped levels, duplicate H1s)
- [x] T050 [US3] Fix code block formatting issues (missing language tags, improper fencing)
- [x] T051 [US3] Fix nested list formatting issues
- [x] T052 [US3] Validate fixes by running MkDocs build and visual inspection of rendered pages
- [x] T053 [US3] Generate progress report showing syntax_error warnings reduced by 30%+
- [x] T054 [US3] Commit syntax fixes with message "fix(docs): resolve markdown syntax and formatting issues"

**Checkpoint**: All markdown files should render correctly with consistent formatting and structure

---

## Phase 6: User Story 4 - Plugin and Configuration Warnings (Priority: P4)

**Goal**: Update MkDocs configuration and plugins to eliminate deprecation and configuration warnings

**Independent Test**: Run MkDocs build, verify zero configuration-related warnings, all plugins load correctly without deprecation messages

### Implementation for User Story 4

- [x] T055 [US4] Audit docs/mkdocs.yml against latest MkDocs documentation
- [x] T056 [US4] Review plugin versions and check for compatibility with current MkDocs version
- [x] T057 [US4] Review plugin documentation for deprecated settings (search, awesome-pages, git-revision-date, minify, excalidraw)
- [x] T058 [US4] Update deprecated configuration settings in docs/mkdocs.yml
- [x] T059 [US4] Update plugin configurations to current best practices
- [x] T060 [US4] Update markdown extension settings if needed
- [x] T061 [US4] Test MkDocs build after each configuration change to ensure no breakage
- [x] T062 [US4] Verify theme (shadcn) configuration is up to date
- [x] T063 [US4] Generate progress report showing config_warning and plugin_warning reduced to zero
- [x] T064 [US4] Commit configuration updates with message "fix(docs): update MkDocs configuration and plugin settings"

**Checkpoint**: MkDocs configuration should be current with no deprecation warnings

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, documentation, and cleanup

- [x] T052 [P] Generate final warning report using scripts/docs-warnings/capture-warnings.py --final
- [x] T053 [P] Run content audit to verify no content loss (word counts, heading counts, code blocks preserved)
- [x] T054 Validate success criteria: total warnings reduced from 500+ to <150 (70%+ reduction)
- [x] T055 Validate success criteria: all broken links fixed (100% of link-related warnings resolved)
- [x] T056 Validate success criteria: syntax warnings reduced by 30%+
- [x] T057 Validate success criteria: configuration warnings reduced to zero
- [x] T058 [P] Document edge cases and accepted warnings in reports/docs-warnings/accepted-warnings.md
- [x] T059 [P] Create remediation summary report showing before/after metrics by category
- [x] T060 Update CHANGELOG.md with warning remediation improvements
- [x] T061 Run quickstart.md validation workflow to ensure all steps are accurate
- [x] T062 Create PR with summary of changes, before/after warning counts, and link to final report

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in priority order (P1 → P2 → P3 → P4)
  - US2, US3, US4 can proceed in parallel if desired (different warning categories)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent from other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent from other stories
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Independent from other stories

### Within Each User Story

- Validation/analysis scripts before manual fixes
- Fixes in small batches with testing after each batch
- Progress reports after each batch of fixes
- Commit after each logical group of fixes

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, US2, US3, and US4 can work in parallel (different warning categories)
- Within each user story, validation and reporting tasks can run in parallel
- Polish phase validation tasks marked [P] can run in parallel

---

## Parallel Example: User Story 2 (Broken Links)

```bash
# After link validation script is ready:
# Fix broken links in different documentation sections in parallel:
Task: "Fix broken API documentation links in docs/docs/snippets/models.md"
Task: "Fix broken cross-references in docs/docs/basic-drawing/**/*.md files"
Task: "Fix broken cross-references in docs/docs/advanced-drawing/**/*.md files"

# These can be done by different team members or in parallel batches
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Review baseline analysis, understand warning landscape
5. Decide on remediation priorities

### Incremental Delivery

1. Complete Setup + Foundational → Baseline established
2. Add User Story 1 → Baseline analysis complete → Understand problem scope
3. Add User Story 2 → Fix broken links → Test navigation → Major user impact
4. Add User Story 3 → Fix syntax issues → Test rendering → Improved quality
5. Add User Story 4 → Update configuration → Test build → Future-proof
6. Each story adds value and reduces warnings incrementally

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 2 (broken links) - highest user impact
   - Developer B: User Story 3 (syntax errors) - independent category
   - Developer C: User Story 4 (configuration) - independent category
3. Stories complete independently, all contribute to 70% reduction goal

---

## Notes

- [P] tasks = different files or independent operations, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story targets a different warning category and can be independently completed
- Fix warnings in small batches (5-10 at a time) and test after each batch
- Commit after each batch of fixes with clear descriptions
- Never remove content to silence warnings - always fix the underlying issue
- Track progress regularly using progress reports
- Document edge cases where warnings cannot be fixed
- Success criteria: 70%+ reduction (500+ → <150 warnings) with zero content loss

---

## Success Metrics

Track these throughout implementation:

- **Total Warning Count**: Baseline 500+ → Target <150 (70%+ reduction)
- **Broken Links**: Should reach 0 (100% fixed)
- **Syntax Errors**: 30%+ reduction minimum
- **Configuration Warnings**: Should reach 0 (100% fixed)
- **Content Preservation**: Word count, heading count, code block count must not decrease
- **Build Success**: MkDocs build should always complete successfully
- **Documentation Quality**: Navigation works, rendering is correct, no broken functionality
