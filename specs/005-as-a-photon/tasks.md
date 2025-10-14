---
description: "Task list for Local Development Site Preview & Defect Inventory"
---

# Tasks: Local Development Site Preview & Defect Inventory

**Input**: Design documents from `/specs/005-as-a-photon/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: TDD approach specified in constitution - tests will be written before implementation

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **Scripts**: `scripts/` at repository root
- **Server**: `playground-server.js` at repository root
- **Tests**: `tests/defect-discovery/` at repository root
- **Documentation**: `docs/` (Jekyll site)
- **Reports**: `specs/005-as-a-photon/` (generated defect inventory)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for documentation tooling

- [X] T001 Create `scripts/` directory for documentation tooling scripts
- [X] T002 Create `tests/defect-discovery/` directory for test suite
- [ ] T003 [P] Upgrade Jekyll to latest version (4.4.1)
  - Create `docs/Gemfile` with Jekyll 4.4.1 and required dependencies
  - Add `gem 'jekyll', '~> 4.4.1'`
  - Add `gem 'webrick', '~> 1.8'` (required for Ruby 3.0+)
  - Add any theme gems if needed
  - Run `bundle install` in `docs/` directory
  - Document Ruby version requirement (>= 2.7.0)
- [ ] T004 [P] Verify Jekyll installation and version (`bundle exec jekyll --version`)
- [ ] T005 [P] Verify Playwright is installed (`npx playwright --version`)
- [ ] T006 [P] Create `.gitignore` entries for `docs/_site/`, `docs/.jekyll-cache/`, `docs/Gemfile.lock`, and `specs/005-as-a-photon/screenshots/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Jekyll build integration that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until Jekyll build is integrated into the server

- [ ] T007 Create `scripts/jekyll-build.js` - Jekyll build wrapper module
  - Export `buildJekyll()` function that runs `bundle exec jekyll build` in `docs/` directory
  - Return promise that resolves when build completes
  - Capture and format build output for logging
  - Handle build errors with clear error messages
  - Include platform-specific command handling (Windows vs Unix)

- [ ] T008 Modify `playground-server.js` - Integrate Jekyll build on startup
  - Import `buildJekyll()` from `scripts/jekyll-build.js`
  - Run Jekyll build before starting Express server
  - Log build progress and completion time
  - Exit with error if Jekyll build fails
  - Add startup message indicating Jekyll build status

- [ ] T009 Modify `playground-server.js` - Serve `_site` directory instead of `docs`
  - Change `app.use(express.static('docs'))` to `app.use(express.static('docs/_site'))`
  - Update redirect logic for `/docs/*` paths if needed
  - Preserve existing `/packages` and `/api` routes

- [ ] T010 [P] Add file watcher for automatic Jekyll rebuilds
  - Extend existing Chokidar watcher to watch `docs/` directory
  - Exclude `docs/_site/` from watch (avoid infinite loops)
  - Trigger Jekyll rebuild on changes to `.html`, `.md`, `.yml` files
  - Debounce rebuild triggers (wait 500ms after last change)
  - Log rebuild events to console

**Checkpoint**: Foundation ready - server now builds and serves Jekyll site properly

---

## Phase 3: User Story 1 - Start Local Development Server Successfully (Priority: P1) 🎯 MVP

**Goal**: Fix the local development server to build Jekyll site and serve rendered documentation without errors

**Independent Test**: Start server with `npm start`, navigate to http://localhost:3000/docs/getting-started/, verify rendered content (not raw templates)

### Tests for User Story 1

**NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] [US1] Create test file `tests/defect-discovery/server-startup.test.js`
  - Test: Server starts without errors
  - Test: Server responds to HTTP requests on port 3000
  - Test: Jekyll build completes within 30 seconds
  - Test: `docs/_site/` directory exists after startup
  - Use Mocha test framework

- [ ] T012 [P] [US1] Create test file `tests/defect-discovery/jekyll-build.test.js`
  - Test: `buildJekyll()` function exists and is callable
  - Test: Build succeeds with valid Jekyll site
  - Test: Build fails gracefully with invalid config
  - Test: Build output is captured and logged
  - Use Mocha test framework

### Implementation for User Story 1

- [ ] T013 [US1] Implement error handling in `scripts/jekyll-build.js`
  - Check if Jekyll is installed before attempting build
  - Provide installation instructions if Jekyll not found
  - Handle permission errors
  - Handle port conflicts (if Jekyll serve is running)
  - Return structured error objects with actionable messages

- [ ] T014 [US1] Add startup validation to `playground-server.js`
  - Check if `docs/_config.yml` exists
  - Validate Jekyll configuration before build
  - Check if port 3000 is available
  - Provide clear error messages for common issues
  - Exit gracefully on validation failures

- [ ] T015 [US1] Update `package.json` scripts
  - Ensure `npm start` uses `node playground-server.js`
  - Add `npm run build:docs` script for manual Jekyll build
  - Add `npm run clean:docs` script to remove `_site` directory
  - Update documentation in README if needed

- [ ] T016 [US1] Test server startup end-to-end
  - Run `npm start` from clean state
  - Verify Jekyll build completes
  - Verify server starts on port 3000
  - Navigate to http://localhost:3000/docs/getting-started/
  - Confirm rendered content (not raw `snippet_titles: [...]`)
  - Check browser console for errors (should be none)

**Checkpoint**: At this point, User Story 1 should be fully functional - server starts, builds Jekyll, serves rendered docs

---

## Phase 4: User Story 2 - View Documentation with Correct Styling (Priority: P2)

**Goal**: Ensure all CSS stylesheets load correctly and documentation renders with proper styling

**Independent Test**: Load any documentation page, verify CSS is applied, check browser console for 404 errors (should be zero)

### Tests for User Story 2

- [ ] T017 [P] [US2] Create test file `tests/defect-discovery/styling-validation.test.js`
  - Test: CSS files exist in `docs/_site/stylesheets/`
  - Test: CSS files are served without 404 errors
  - Test: Documentation pages include CSS link tags
  - Test: Computed styles are applied to page elements
  - Use Playwright for browser-based tests

- [ ] T018 [P] [US2] Create test file `tests/defect-discovery/resource-loading.test.js`
  - Test: All stylesheets load successfully (status 200)
  - Test: All fonts load successfully
  - Test: All images load successfully
  - Test: No 404 errors in network tab
  - Use Playwright to capture network requests

### Implementation for User Story 2

- [ ] T019 [US2] Verify Jekyll copies static assets to `_site`
  - Check `docs/_config.yml` for asset exclusions
  - Ensure `stylesheets/`, `fonts/`, `images/` are not excluded
  - Test that Jekyll build copies all assets correctly
  - Verify asset paths are correct in built HTML

- [ ] T020 [US2] Add asset validation to `scripts/jekyll-build.js`
  - After build completes, verify critical assets exist
  - Check for `_site/stylesheets/*.css`
  - Check for `_site/fonts/*`
  - Warn if expected assets are missing
  - Log asset copy statistics

- [ ] T021 [US2] Test documentation pages for styling
  - Navigate to multiple documentation pages
  - Verify CSS is applied (check computed styles)
  - Verify code syntax highlighting works
  - Verify responsive layout works
  - Check for visual regressions compared to production

- [ ] T022 [US2] Validate against production site (maker.js.org)
  - Load same page on local and production
  - Compare CSS file lists
  - Compare computed styles on key elements
  - Document expected differences (ES6 content changes)
  - Create baseline for visual comparison

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - server runs, docs render with correct styling

---

## Phase 5: User Story 3 - Automated Defect Discovery and Inventory (Priority: P3)

**Goal**: Create automated crawler that discovers all documentation pages, detects defects, and generates structured inventory

**Independent Test**: Run `node scripts/defect-crawler.js`, verify it generates `defect-inventory.json` and `defect-inventory.md` with categorized defects

### Tests for User Story 3

- [ ] T023 [P] [US3] Create test file `tests/defect-discovery/crawler.test.js`
  - Test: Crawler discovers all documentation pages
  - Test: Crawler detects missing styles
  - Test: Crawler detects console errors
  - Test: Crawler detects broken links
  - Test: Crawler handles navigation failures gracefully
  - Use Mocha with mocked Playwright responses

- [ ] T024 [P] [US3] Create test file `tests/defect-discovery/inventory-generation.test.js`
  - Test: Defect inventory JSON matches schema
  - Test: Summary statistics are calculated correctly
  - Test: Defects are categorized by type and severity
  - Test: Markdown report is generated from JSON
  - Validate against `contracts/defect-inventory-schema.json`

### Implementation for User Story 3

- [ ] T025 [US3] Create `scripts/defect-crawler.js` - Main crawler script
  - Import mcp-playwright tools for browser automation
  - Implement page discovery algorithm (start at homepage, follow links)
  - Implement defect detection logic (CSS errors, console errors, 404s)
  - Implement parallel crawling (10 concurrent pages)
  - Store results in DefectInventory data structure
  - Export to JSON and Markdown formats

- [ ] T026 [P] [US3] Implement page discovery in `scripts/defect-crawler.js`
  - Function: `discoverPages(startUrl)` returns array of page URLs
  - Start at homepage, extract all documentation links
  - Filter to only `/docs/*` paths
  - Deduplicate URLs
  - Handle relative and absolute URLs
  - Respect robots.txt (if present)

- [ ] T027 [P] [US3] Implement defect detection in `scripts/defect-crawler.js`
  - Function: `detectDefects(page)` returns array of Defect objects
  - Capture console errors and warnings
  - Check for CSS load failures (404s)
  - Check for missing content (empty elements, raw templates)
  - Check for broken links (404 responses)
  - Capture screenshots for visual defects
  - Assign severity levels based on impact

- [ ] T028 [US3] Implement report generation in `scripts/defect-crawler.js`
  - Function: `generateInventory(defects, pages)` returns DefectInventory
  - Calculate summary statistics (total pages, defects by type/severity)
  - Create PageRecord for each discovered page
  - Create Defect record for each issue found
  - Validate against JSON schema
  - Export to `specs/005-as-a-photon/defect-inventory.json`

- [ ] T029 [US3] Implement markdown report generation
  - Function: `generateMarkdownReport(inventory)` returns markdown string
  - Format summary section with statistics
  - Group defects by severity (Critical, High, Medium, Low)
  - Include reproduction steps for each defect
  - Include page inventory table
  - Export to `specs/005-as-a-photon/defect-inventory.md`

- [ ] T030 [US3] Add CLI interface to `scripts/defect-crawler.js`
  - Accept command-line arguments (--url, --output, --verbose)
  - Default to http://localhost:3000
  - Show progress bar during crawl
  - Log summary statistics on completion
  - Exit with code 0 if successful, 1 if errors

- [ ] T031 [US3] Create `scripts/compare-sites.js` - Production comparison tool
  - Crawl both local (localhost:3000) and production (maker.js.org)
  - Generate separate inventories for each site
  - Compare page availability (pages in production but not local)
  - Compare CSS loading (styles in production but not local)
  - Compare console errors (errors in local but not production)
  - Enrich defect records with `comparisonData` field
  - Generate comparison report

- [ ] T032 [P] [US3] Implement screenshot capture for defects
  - Function: `captureScreenshot(page, defectId)` saves screenshot
  - Save to `specs/005-as-a-photon/screenshots/`
  - Use defect ID as filename (e.g., `DEF-001.png`)
  - Compress images to reduce storage
  - Only capture for visual defects (not console errors)
  - Include screenshot path in Defect record

- [ ] T033 [US3] Test defect crawler end-to-end
  - Start local server
  - Run `node scripts/defect-crawler.js`
  - Verify crawl completes in <5 minutes
  - Verify `defect-inventory.json` is generated
  - Verify `defect-inventory.md` is generated
  - Verify JSON validates against schema
  - Review defect inventory for accuracy

- [ ] T034 [US3] Test production comparison tool
  - Run `node scripts/compare-sites.js`
  - Verify both sites are crawled
  - Verify comparison data is added to defects
  - Verify differences are highlighted
  - Review comparison report for accuracy

**Checkpoint**: All user stories should now be independently functional - server runs, docs render, defects are discovered automatically

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [ ] T035 [P] Update `README.md` with Jekyll setup instructions
  - Add prerequisites section (Ruby, Jekyll)
  - Add installation instructions per platform
  - Add troubleshooting section
  - Link to `specs/005-as-a-photon/quickstart.md`

- [ ] T036 [P] Add logging and monitoring
  - Add structured logging to all scripts
  - Log Jekyll build times
  - Log crawl statistics
  - Add verbose mode for debugging

- [ ] T037 [P] Performance optimization
  - Optimize Jekyll build (exclude unnecessary files)
  - Optimize crawler (increase concurrency if safe)
  - Add caching for repeated crawls
  - Measure and log performance metrics

- [ ] T038 [P] Error handling improvements
  - Add retry logic for transient failures
  - Add timeout handling for slow pages
  - Add graceful degradation for missing dependencies
  - Improve error messages with actionable guidance

- [ ] T039 Code cleanup and refactoring
  - Extract common utilities to shared module
  - Add JSDoc comments to all functions
  - Ensure ESLint passes with Airbnb style guide
  - Remove debug code and console.logs

- [ ] T040 [P] Create `specs/005-as-a-photon/VERIFICATION.md`
  - Document verification steps for each user story
  - Include expected vs actual results
  - Include screenshots of working system
  - Include sample defect inventory output

- [ ] T041 Run full validation per `quickstart.md`
  - Follow quickstart guide step-by-step
  - Verify all prerequisites
  - Verify server startup
  - Verify documentation rendering
  - Verify defect discovery
  - Document any issues found

- [ ] T042 Generate initial defect inventory for current state
  - Run defect crawler on current local site
  - Generate baseline defect inventory
  - Commit to repository as `defect-inventory-baseline.json`
  - Use as reference for future improvements

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User Story 1 (P1): Can start after Foundational - No dependencies on other stories
  - User Story 2 (P2): Can start after Foundational - Depends on US1 for working server
  - User Story 3 (P3): Can start after Foundational - Depends on US1 for working server
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Requires US1 complete (needs working server to test styling)
- **User Story 3 (P3)**: Requires US1 complete (needs working server to crawl)

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Core functionality before validation
- Validation before moving to next story
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003, T004, T005, T006)
- Within US1 tests: T011 and T012 can run in parallel
- Within US2 tests: T017 and T018 can run in parallel
- Within US3 tests: T023 and T024 can run in parallel
- Within US3 implementation: T026, T027, T032 can run in parallel (different files)
- All Polish tasks marked [P] can run in parallel (T035, T036, T037, T038, T040)

---

## Parallel Example: User Story 3

```bash
# Launch all tests for User Story 3 together:
Task: "Create test file tests/defect-discovery/crawler.test.js"
Task: "Create test file tests/defect-discovery/inventory-generation.test.js"

# Launch parallel implementation tasks for User Story 3:
Task: "Implement page discovery in scripts/defect-crawler.js"
Task: "Implement defect detection in scripts/defect-crawler.js"
Task: "Implement screenshot capture for defects"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T010) - CRITICAL
3. Complete Phase 3: User Story 1 (T011-T016)
4. **STOP and VALIDATE**: Test server startup independently
5. Deploy/demo if ready - developers can now preview docs locally

### Incremental Delivery

1. Complete Setup + Foundational → Server builds and serves Jekyll site
2. Add User Story 1 → Test independently → **MVP ACHIEVED** (working local docs)
3. Add User Story 2 → Test independently → Styling validated
4. Add User Story 3 → Test independently → Automated defect discovery
5. Each story adds value without breaking previous stories

### Sequential Strategy (Recommended)

Due to dependencies, recommend sequential implementation:

1. Complete Setup + Foundational (T001-T010)
2. Complete User Story 1 (T011-T016) - Test and validate
3. Complete User Story 2 (T017-T022) - Test and validate
4. Complete User Story 3 (T023-T034) - Test and validate
5. Complete Polish (T035-T042)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- TDD approach: Write tests first, ensure they fail, then implement
- Commit after each task or logical group
- Stop at each checkpoint to validate story independently
- **IMPORTANT**: These changes are for local development only - production deployment unchanged
- Jekyll build must complete before server starts (blocking operation)
- Defect crawler requires working local server (US1 must be complete)
- Use mcp-playwright tools for browser automation (already available)

## Task Summary

- **Total Tasks**: 42
- **Setup Tasks**: 6 (T001-T006) - Includes Jekyll upgrade
- **Foundational Tasks**: 4 (T007-T010)
- **User Story 1 Tasks**: 6 (T011-T016) - Server startup
- **User Story 2 Tasks**: 6 (T017-T022) - Styling validation
- **User Story 3 Tasks**: 12 (T023-T034) - Automated defect discovery
- **Polish Tasks**: 8 (T035-T042) - Cross-cutting improvements
- **Parallel Opportunities**: 16 tasks marked [P]
- **MVP Scope**: Phases 1-3 (T001-T016) = 16 tasks
