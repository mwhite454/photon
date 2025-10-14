# Implementation Plan: Documentation Migration from Jekyll to MkDocs

**Branch**: `006-migration-from-jekyll` | **Date**: 2025-10-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-migration-from-jekyll/spec.md`

## Summary

Migrate the Photon documentation from Jekyll (Ruby-based) to MkDocs (Python-based) with the modern mkdocs-shadcn theme. This migration eliminates Ruby dependencies, modernizes the documentation infrastructure, and improves maintainability. The plan includes:

1. **MkDocs Setup**: Install and configure MkDocs with mkdocs-shadcn theme
2. **Content Migration**: Convert 71 Jekyll snippets and all HTML documentation pages to markdown with frontmatter
3. **AI-Friendly Documentation**: Research and implement best practices for LLM/search agent readability
4. **Navigation Enhancement**: Preserve and improve the documentation structure with modern UI features
5. **Automated Testing**: Create Playwright tests for visual verification and theme validation
6. **Cleanup**: Remove deprecated Jekyll files and configurations

## Technical Context

**Language/Version**: Python 3.8+ (for MkDocs), JavaScript/Node.js (for migration scripts and Playwright tests)

**Primary Dependencies**:

- MkDocs 1.5+
- mkdocs-material or mkdocs-shadcn theme
- Playwright (for testing)
- BeautifulSoup4 or similar (for HTML parsing during migration)
- Python markdown extensions (pymdown-extensions for enhanced markdown features)

**Storage**: File-based (markdown files, static assets)

**Testing**: Playwright for end-to-end visual testing, Python unittest for migration script validation

**Target Platform**: Local development (macOS/Linux/Windows), GitHub Pages for deployment

**Project Type**: Documentation tooling + migration scripts

**Performance Goals**:

- MkDocs build completes in <10 seconds
- Development server hot-reload in <2 seconds
- Site search returns results in <500ms

**Constraints**:

- Must preserve all existing documentation content (100% fidelity)
- Must maintain or improve SEO and accessibility
- Must support both local development and GitHub Pages deployment
- Migration must be idempotent and verifiable

**Scale/Scope**:

- 71 Jekyll snippet files to migrate
- ~70 documentation pages across multiple sections
- ~50 static assets (images, fonts, stylesheets)
- Navigation hierarchy with 3-4 levels of nesting

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with Photon Constitution (`.specify/memory/constitution.md`):

- [X] **Test-Driven Development**: Playwright tests will be written before final migration validation
- [X] **Specification-Driven**: User stories defined with Given-When-Then acceptance criteria in spec.md
- [X] **ES6+ Compatibility**: Migration scripts will use modern JavaScript (ES6+)
- [X] **Experiment-Friendly**: Not directly applicable (documentation migration, not playground feature)
- [X] **User Experience First**: AI-friendly documentation research phase ensures optimal UX for both humans and LLMs
- [X] **Living Documentation**: This migration IS the documentation update - modernizing the entire docs infrastructure
- [X] **CNC/Laser Focus**: Documentation content preserves all CNC/laser-specific examples and tutorials
- [X] **Code Quality**: Migration scripts will follow ESLint Airbnb style guide
- [X] **Performance Standards**: Build time <10s, hot-reload <2s documented in Technical Context
- [X] **Versioning**: PATCH version - infrastructure change with no API modifications

## Project Structure

### Documentation (this feature)

```text
specs/006-migration-from-jekyll/
├── plan.md              # This file
├── research.md          # Phase 0: MkDocs theme research, AI-friendly docs best practices
├── data-model.md        # Phase 1: Documentation structure entities
├── quickstart.md        # Phase 1: MkDocs setup and migration guide
├── contracts/           # Phase 1: Migration script interfaces, test contracts
│   ├── migration-schema.json
│   └── playwright-test-spec.json
├── checklists/
│   └── requirements.md  # Specification validation (already complete)
└── tasks.md             # Phase 2: Detailed task breakdown
```

### Source Code (repository root)

```text
# Migration scripts (Python)
scripts/migration/
├── jekyll_to_mkdocs.py      # Main migration orchestrator
├── snippet_converter.py     # Convert Jekyll snippets to markdown
├── page_converter.py        # Convert HTML pages to markdown
├── frontmatter_mapper.py    # Map Jekyll frontmatter to MkDocs
├── link_updater.py          # Update internal links for new structure
├── asset_migrator.py        # Copy and organize static assets
└── validation/
    ├── content_validator.py # Verify content preservation
    └── link_checker.py      # Verify all links work

# New MkDocs documentation structure
docs-new/                    # New MkDocs site (will replace docs/)
├── mkdocs.yml              # MkDocs configuration
├── docs/                   # Documentation content
│   ├── index.md           # Homepage
│   ├── getting-started/
│   │   ├── index.md
│   │   ├── browser.md     # Converted from snippet
│   │   └── nodejs.md      # Converted from snippet
│   ├── basic-drawing/
│   ├── advanced-drawing/
│   ├── model-trees/
│   ├── exporting/
│   └── api/               # API documentation
├── overrides/             # Theme customizations
│   └── main.html
└── assets/                # Static assets
    ├── images/
    ├── stylesheets/
    └── javascripts/

# Playwright tests
tests/docs-migration/
├── visual-verification.spec.js    # Theme and styling tests
├── navigation.spec.js             # Navigation structure tests
├── content-rendering.spec.js      # Content display tests
├── search.spec.js                 # Search functionality tests
└── accessibility.spec.js          # A11y compliance tests

# Deprecated (to be removed after migration)
docs/                      # Old Jekyll site
├── _config.yml           # Jekyll config (REMOVE)
├── _layouts/             # Jekyll layouts (REMOVE)
├── _includes/            # Jekyll includes (REMOVE)
├── _snippets/            # Jekyll snippets (REMOVE after conversion)
├── Gemfile               # Ruby dependencies (REMOVE)
└── [other Jekyll files]  # (REMOVE)
```

**Structure Decision**: This is a documentation migration project. We're creating a parallel MkDocs structure (`docs-new/`) alongside the existing Jekyll site (`docs/`), then replacing the old with the new after validation. Migration scripts are Python-based for consistency with MkDocs tooling. Playwright tests verify the migration quality before we remove Jekyll files.

## Complexity Tracking

No constitutional violations. All checks passed.

---

## Phase 0: Research & Technical Decisions ✅ COMPLETE

**Status**: Complete  
**Output**: `research.md`

### Research Tasks

1. **MkDocs Theme Selection**
   - Research mkdocs-shadcn theme availability and features
   - Compare mkdocs-material vs mkdocs-shadcn capabilities
   - Evaluate theme customization options
   - Decision: Select theme based on shadcn UI compatibility and feature set

2. **AI-Friendly Documentation Best Practices**
   - Research LLM/search agent readability patterns
   - Investigate structured data markup (JSON-LD, schema.org)
   - Study semantic HTML and heading hierarchy best practices
   - Research code example formatting for AI consumption
   - Evaluate frontmatter metadata standards for discoverability
   - Decision: Define documentation structure optimized for both humans and AI agents

3. **Jekyll to MkDocs Migration Patterns**
   - Research existing Jekyll-to-MkDocs migration tools
   - Identify liquid tag equivalents in markdown/MkDocs
   - Study frontmatter mapping strategies
   - Evaluate HTML-to-markdown conversion libraries (BeautifulSoup, html2text, markdownify)
   - Decision: Select conversion approach and tooling

4. **MkDocs Plugin Ecosystem**
   - Research essential MkDocs plugins (search, navigation, code highlighting)
   - Evaluate pymdown-extensions for enhanced markdown features
   - Investigate mkdocs-awesome-pages for navigation control
   - Research mkdocs-minify for production optimization
   - Decision: Define plugin stack for feature parity with Jekyll

5. **Content Preservation Validation**
   - Research diff tools for markdown comparison
   - Investigate link checking tools (linkchecker, broken-link-checker)
   - Study content hashing strategies for verification
   - Decision: Define validation approach to ensure 100% content fidelity

6. **Documentation Signposting for AI Agents**
   - Research "AI-friendly" documentation markers and patterns
   - Investigate how to structure code examples for LLM extraction
   - Study metadata tagging for improved searchability
   - Evaluate table-of-contents generation strategies
   - Decision: Define signpost patterns (e.g., "Quick Start", "Prerequisites", "Example", "API Reference")

### Research Artifacts

- ✅ **Theme Selection**: mkdocs-material with shadcn-inspired customization
- ✅ **AI-Friendly Patterns**: Comprehensive signposting and metadata standards defined
- ✅ **Migration Approach**: Custom Python scripts using BeautifulSoup
- ✅ **Plugin Stack**: 7 essential plugins identified for feature parity
- ✅ **Validation Strategy**: Multi-layer approach (hashing, diff, visual, manual)
- ✅ **Signpost Patterns**: Standardized section templates and frontmatter schema
- ✅ **Risk Mitigation**: Parallel development, gradual rollout, rollback plans

---

## Phase 1: Design & Contracts ✅ COMPLETE

**Status**: Complete  
**Outputs**: `data-model.md`, `contracts/`, `quickstart.md`

### Deliverables

1. **Data Model** (`data-model.md`):
   - DocumentationPage entity (path, title, content, frontmatter, navigation order)
   - Snippet entity (original Jekyll snippet, converted markdown, metadata)
   - NavigationNode entity (hierarchy, parent-child relationships, ordering)
   - MigrationResult entity (source file, target file, status, validation results)
   - Asset entity (type, source path, target path, optimization status)
   - Enumerations: PageType, SnippetType, MigrationStatus, ValidationStatus
   - Validation rules and relationships

2. **API Contracts** (`contracts/`):
   - `migration-schema.json`: JSON schema for migration script output
   - `playwright-test-spec.json`: Test contract for visual verification
   - `mkdocs-config-schema.json`: MkDocs configuration structure
   - `frontmatter-schema.json`: Standardized frontmatter format

3. **Quickstart Guide** (`quickstart.md`):
   - Prerequisites (Python 3.8+, pip, Node.js for Playwright)
   - MkDocs installation instructions
   - Theme installation and configuration
   - Running migration scripts
   - Validating migration results
   - Starting MkDocs development server
   - Running Playwright tests
   - Deployment to GitHub Pages
   - Troubleshooting common issues

4. **Agent Context Updated**:
   - Run `.specify/scripts/bash/update-agent-context.sh windsurf`
   - Add Python and MkDocs to language context
   - Add file-based documentation storage
   - Update Windsurf rules file with migration-specific guidelines

### Constitution Re-Check

All constitutional requirements remain satisfied:

- ✅ TDD approach defined for migration validation
- ✅ Specification-driven with clear acceptance criteria
- ✅ Modern JavaScript for Playwright tests
- ✅ User experience prioritized with AI-friendly documentation
- ✅ Living documentation maintained through migration
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

1. **MkDocs Setup & Configuration**
   - Install MkDocs and theme
   - Configure mkdocs.yml with navigation structure
   - Set up theme customizations
   - Configure plugins and extensions

2. **Migration Script Development**
   - Create snippet converter (Jekyll HTML → Markdown)
   - Create page converter (HTML → Markdown with frontmatter)
   - Create frontmatter mapper (Jekyll → MkDocs)
   - Create link updater (adjust internal links)
   - Create asset migrator (copy and organize static files)

3. **Content Migration Execution**
   - Convert all 71 snippets to markdown
   - Convert all documentation pages
   - Migrate static assets
   - Update all internal links
   - Validate content preservation

4. **AI-Friendly Documentation Enhancement**
   - Add structured metadata to all pages
   - Implement signposting patterns
   - Enhance code examples with context
   - Add semantic markup for search agents
   - Create comprehensive table of contents

5. **Playwright Test Suite**
   - Visual verification tests (theme application)
   - Navigation structure tests
   - Content rendering tests
   - Search functionality tests
   - Accessibility compliance tests

6. **Validation & Quality Assurance**
   - Run content validation scripts
   - Check all links (internal and external)
   - Verify frontmatter consistency
   - Compare against Jekyll site
   - Performance benchmarking

7. **Cleanup & Deprecation**
   - Remove Jekyll configuration files
   - Remove Jekyll layouts and includes
   - Remove Ruby dependencies (Gemfile)
   - Archive old Jekyll site
   - Update CI/CD for MkDocs deployment

8. **Documentation & Finalization**
   - Update README with MkDocs instructions
   - Create migration guide for future reference
   - Document AI-friendly patterns used
   - Update contributing guidelines
   - Final validation and sign-off

---

## Implementation Notes

### Migration Strategy

**Parallel Development Approach**:

- Create `docs-new/` alongside existing `docs/` directory
- Develop and test MkDocs site without disrupting Jekyll
- Validate migration completeness before switching
- Atomic cutover: rename `docs/` → `docs-jekyll-archive/`, `docs-new/` → `docs/`

**Content Preservation Priority**:

- 100% content fidelity is non-negotiable
- All code examples must be preserved exactly
- All images and assets must be migrated
- All internal links must work after migration
- Validation scripts must confirm zero content loss

### AI-Friendly Documentation Patterns

Based on Phase 0 research, implement these signposting patterns:

1. **Clear Section Headers**: Use consistent heading hierarchy (H1 → H2 → H3)
2. **Explicit Prerequisites**: Mark prerequisite sections clearly
3. **Code Example Markers**: Label code blocks with language and context
4. **Quick Start Sections**: Provide fast-path instructions for common tasks
5. **API Reference Structure**: Consistent parameter, return value, and example formatting
6. **Metadata Richness**: Comprehensive frontmatter with description, tags, and related pages
7. **Semantic Markup**: Use appropriate HTML5 semantic elements in custom templates

### Critical Path

1. **Phase 0 Research** (enables all technical decisions)
2. **MkDocs Setup** (establishes infrastructure)
3. **Migration Scripts** (enables content conversion)
4. **Content Migration** (core deliverable)
5. **AI Enhancement** (improves discoverability)
6. **Testing & Validation** (ensures quality)
7. **Cleanup** (completes migration)

### Known Challenges

1. **Jekyll Liquid Tags**: Complex logic may not translate directly to markdown
2. **Snippet References**: Jekyll's snippet inclusion system needs markdown equivalent
3. **Theme Parity**: Ensuring mkdocs-shadcn provides equal or better UX than Jekyll theme
4. **Link Structure**: URL paths may change, requiring comprehensive link updates
5. **Search Functionality**: MkDocs search must match or exceed Jekyll search quality
6. **Build Performance**: MkDocs must build faster than Jekyll for developer experience

### Success Metrics

- ✅ MkDocs builds in <10 seconds (vs Jekyll ~30 seconds)
- ✅ All 71 snippets converted with 100% content preservation
- ✅ All documentation pages accessible and properly formatted
- ✅ Playwright tests achieve 100% pass rate
- ✅ Zero broken links (internal or external)
- ✅ Search functionality returns relevant results
- ✅ AI-friendly metadata present on all pages
- ✅ Theme provides modern, accessible UI

---

## Plan Status & Next Steps

**Branch**: `006-migration-from-jekyll`  
**Spec**: [spec.md](./spec.md) ✅  
**Research**: [research.md](./research.md) ✅  
**Data Model**: [data-model.md](./data-model.md) ✅  
**Contracts**: [contracts/](./contracts/) ✅  
**Quickstart**: [quickstart.md](./quickstart.md) ✅  
**Tasks**: Pending - run `/speckit.tasks` to generate

**Ready for**: `/speckit.tasks` command to generate detailed task breakdown

**Next Steps**:

1. Execute Phase 0 research tasks
2. Document findings in `research.md`
3. Execute Phase 1 design tasks
4. Generate data model, contracts, and quickstart guide
5. Run `/speckit.tasks` to create detailed task breakdown
6. Begin implementation with migration scripts
