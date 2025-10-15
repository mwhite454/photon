# Implementation Plan: Local Development Site Preview & Defect Inventory

**Branch**: `005-as-a-photon` | **Date**: 2025-10-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-as-a-photon/spec.md`

**Note**: This plan addresses the critical issue that the local development server serves raw Jekyll templates instead of rendered documentation, and creates an automated system to compare local vs. production (maker.js.org) to identify all defects.

## Summary

The Photon documentation site currently fails to render properly on localhost:3000 because Jekyll templates are being served as static files without processing. Documentation pages show only snippet references (e.g., `snippet_titles: [Try it now, For the browser, For Node.js]`) instead of actual content. This plan establishes:

1. **Jekyll Build Integration**: Fix the local development server to properly build and serve Jekyll-processed documentation
2. **Baseline Comparison**: Compare local rendered output against the production maker.js.org site to identify styling and content differences
3. **Automated Defect Discovery**: Use mcp-playwright tools to crawl both sites, capture screenshots, console errors, and missing styles
4. **Structured Defect Inventory**: Generate a comprehensive, categorized report of all issues for prioritized fixing

**IMPORTANT**: These changes are **for local development environment only**. The production deployment (GitHub Pages, maker.js.org) already serves pre-built Jekyll output from the `_site` directory and requires no changes. This plan fixes the local development experience to match production behavior.

## Technical Context

**Language/Version**: Node.js (current LTS), Ruby (for Jekyll)

**Primary Dependencies**:

- Express.js (existing server in `playground-server.js`)
- Jekyll (static site generator for documentation)
- Playwright (via mcp-playwright MCP server for browser automation)
- Chokidar (existing file watcher)

**Storage**: File-based (markdown defect reports, JSON structured data)

**Testing**: Playwright for browser automation, Mocha for unit tests

**Target Platform**: Local development environment (macOS/Linux/Windows)

**Project Type**: Documentation tooling + automation scripts

**Performance Goals**:

- Jekyll build completes in <30 seconds
- Full site crawl completes in <5 minutes
- Server startup in <10 seconds

**Constraints**:

- Must preserve existing Express server functionality for playground
- Must not modify core Photon library code
- Jekyll must process templates including `_snippets` collection
- Comparison must handle ES6 upgrade differences gracefully

**Scale/Scope**:

- ~70 documentation pages across multiple sections
- ~71 snippet files in `_snippets/` directory
- Comparison against live maker.js.org site
- Generate structured defect inventory with categorization

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with Photon Constitution (`.specify/memory/constitution.md`):

- [x] **Test-Driven Development**: Playwright tests will be written before implementing defect discovery automation
- [x] **Specification-Driven**: User stories defined with Given-When-Then acceptance criteria in spec.md
- [x] **ES6+ Compatibility**: Node.js scripts will use modern JavaScript (ES6+)
- [x] **Experiment-Friendly**: Fixes enable proper local preview for playground development
- [x] **User Experience First**: Clear error messages and documentation for setup process
- [x] **Living Documentation**: This plan documents the Jekyll build process and defect inventory system
- [x] **CNC/Laser Focus**: Ensures documentation site properly showcases library capabilities
- [x] **Code Quality**: ESLint with Airbnb style guide for automation scripts
- [x] **Performance Standards**: Performance goals documented (Jekyll <30s, crawl <5min)
- [x] **Versioning**: PATCH version - bug fix for local development environment (no API changes)

## Project Structure

### Documentation (this feature)

```text
specs/005-as-a-photon/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output - Jekyll setup research
├── data-model.md        # Phase 1 output - Defect inventory schema
├── quickstart.md        # Phase 1 output - Setup instructions
├── contracts/           # Phase 1 output - Defect report format
│   └── defect-inventory-schema.json
├── checklists/          # Quality validation
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
# Documentation tooling scripts
scripts/
├── jekyll-build.js      # Jekyll build integration
├── defect-crawler.js    # Playwright-based site crawler
└── compare-sites.js     # Local vs production comparison

# Jekyll site (existing)
docs/
├── _config.yml          # Jekyll configuration
├── _layouts/            # Jekyll layouts
├── _snippets/           # Documentation snippets (71 files)
├── docs/                # Documentation pages (~70 pages)
│   ├── getting-started/
│   ├── basic-drawing/
│   ├── advanced-drawing/
│   └── [other sections]
└── _site/               # Jekyll build output (gitignored)

# Server (existing, to be enhanced)
playground-server.js     # Express server - add Jekyll build integration

# Test suite
tests/
└── defect-discovery/
    ├── crawler.test.js
    └── comparison.test.js

# Generated reports
specs/005-as-a-photon/
└── defect-inventory.md  # Generated defect report
```

**Structure Decision**: This is a tooling enhancement to existing documentation infrastructure. We're adding automation scripts to the `scripts/` directory and enhancing the existing `playground-server.js` to integrate Jekyll builds. The Jekyll site structure in `docs/` remains unchanged.

## Complexity Tracking

No constitutional violations. All checks passed.

---

## Phase 0: Research & Technical Decisions ✅ COMPLETE

**Status**: Complete  
**Output**: `research.md`

### Key Decisions Made

1. **Jekyll Integration**: Use child_process to run Jekyll build, serve `_site` output via Express
2. **Jekyll Installation**: Document as prerequisite with platform-specific instructions
3. **Browser Automation**: Use mcp-playwright MCP server for site crawling
4. **Comparison Strategy**: Crawl both sites independently, then diff results
5. **Defect Schema**: Structured JSON with markdown report generation
6. **Performance**: Parallel crawling with 10 concurrent pages
7. **Error Handling**: Continue on failures, report failures as defects

### Research Artifacts

- ✅ Technology stack defined
- ✅ Dependencies identified (no new deps required)
- ✅ Setup prerequisites documented
- ✅ Risk mitigation strategies defined

---

## Phase 1: Design & Contracts ✅ COMPLETE

**Status**: Complete  
**Outputs**: `data-model.md`, `contracts/defect-inventory-schema.json`, `quickstart.md`

### Deliverables

1. **Data Model** (`data-model.md`):
   - DefectInventory entity (root container)
   - SiteConfig entity (site URLs)
   - InventorySummary entity (aggregate stats)
   - Defect entity (individual defect records)
   - PageRecord entity (page inventory)
   - Enumerations: DefectType, SeverityLevel, PageStatus
   - Validation rules and relationships

2. **API Contracts** (`contracts/defect-inventory-schema.json`):
   - Full JSON Schema for defect inventory
   - Validation rules for all fields
   - Required vs optional properties
   - Format constraints and patterns

3. **Quickstart Guide** (`quickstart.md`):
   - Prerequisites and installation instructions
   - Starting the development server
   - Running defect discovery
   - Understanding the defect report
   - Common issues and solutions
   - Development workflow

4. **Agent Context Updated**:
   - Added Node.js and Ruby to language context
   - Added file-based storage to database context
   - Updated Windsurf rules file

### Constitution Re-Check

All constitutional requirements remain satisfied:
- ✅ TDD approach defined for automation scripts
- ✅ Specification-driven with clear acceptance criteria
- ✅ ES6+ JavaScript for all Node.js scripts
- ✅ User experience prioritized with clear documentation
- ✅ Living documentation maintained
- ✅ Performance goals documented and achievable

---

## Phase 2: Task Generation (Next Step)

**Status**: Pending  
**Command**: `/speckit.tasks`

This phase will generate the detailed task breakdown in `tasks.md` with:
- Dependency-ordered implementation tasks
- Test-first approach for each component
- Clear acceptance criteria per task
- Estimated complexity and priority

### Expected Task Categories

1. **Jekyll Build Integration**
   - Modify `playground-server.js` to run Jekyll build on startup
   - Add file watcher for automatic rebuilds
   - Implement error handling and user feedback

2. **Defect Crawler Implementation**
   - Create `scripts/defect-crawler.js`
   - Implement page discovery algorithm
   - Implement defect detection logic
   - Generate structured defect inventory

3. **Site Comparison Tool**
   - Create `scripts/compare-sites.js`
   - Crawl production site (maker.js.org)
   - Compare local vs production
   - Enrich defect records with comparison data

4. **Report Generation**
   - JSON export with schema validation
   - Markdown report generation
   - Screenshot capture and storage
   - Summary statistics calculation

5. **Testing & Validation**
   - Playwright tests for crawler
   - Unit tests for report generation
   - Integration tests for full workflow
   - Validation against JSON schema

---

## Implementation Notes

### Development vs Production Environments

**Local Development** (what this plan fixes):
- Express server (`playground-server.js`) runs Jekyll build on startup
- Serves `docs/_site/` directory (Jekyll build output)
- File watcher triggers rebuilds on template changes
- Enables live preview of documentation changes

**Production Deployment** (no changes needed):
- GitHub Pages automatically runs Jekyll build
- Serves pre-built static HTML from `_site` directory
- No Express server involved
- Already working correctly at maker.js.org

**Key Insight**: Production already works because GitHub Pages handles Jekyll processing. Local development is broken because Express serves raw `docs/` instead of built `docs/_site/`.

### Critical Path

1. Jekyll build integration (enables all other work)
2. Basic crawler (page discovery + defect detection)
3. Report generation (makes results visible)
4. Site comparison (enriches defect data)
5. Testing & refinement

### Known Challenges

1. **Jekyll Template Complexity**: The `_snippets` collection needs special handling
2. **Production Site Access**: Ensure maker.js.org is accessible and stable
3. **Screenshot Storage**: May need compression or selective capture
4. **ES6 Content Differences**: Need to distinguish expected differences from bugs
5. **Environment Parity**: Ensure local Jekyll build matches GitHub Pages output

### Success Metrics

- ✅ Jekyll builds complete in <30 seconds
- ✅ Server starts without errors
- ✅ All documentation pages render properly
- ✅ Defect crawler completes in <5 minutes
- ✅ Defect inventory captures 95%+ of issues
- ✅ Zero critical defects after fixes applied

---

## Summary

**Branch**: `005-as-a-photon`  
**Spec**: [spec.md](./spec.md)  
**Research**: [research.md](./research.md) ✅  
**Data Model**: [data-model.md](./data-model.md) ✅  
**Contracts**: [contracts/](./contracts/) ✅  
**Quickstart**: [quickstart.md](./quickstart.md) ✅  
**Tasks**: Pending - run `/speckit.tasks` to generate

**Ready for**: Task generation and implementation
