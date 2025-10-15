# Feature Specification: Documentation Migration from Jekyll to MkDocs

**Feature Branch**: `006-migration-from-jekyll`  
**Created**: 2025-10-13  
**Status**: Draft  
**Input**: User description: "Migration from Jekyll to MkDocs with mkdocs-shadcn theme, including documentation translation from snippets to markdown with frontmatter, and Playwright tests for visual verification"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - MkDocs Site Builds and Serves Successfully (Priority: P1) 🎯 MVP

As a developer, I need the documentation site to build and serve using MkDocs with the mkdocs-shadcn theme so that I can preview documentation locally without Ruby/Jekyll dependencies.

**Why this priority**: This is the foundational requirement - without a working MkDocs build, no other migration work can be validated. It establishes the new documentation infrastructure.

**Independent Test**: Run the MkDocs build command and serve the site locally. Navigate to the homepage and verify the mkdocs-shadcn theme is applied with proper styling and navigation.

**Acceptance Scenarios**:

1. **Given** MkDocs is installed with mkdocs-shadcn theme, **When** I run the build command, **Then** the site builds successfully without errors
2. **Given** the site is built, **When** I start the development server, **Then** the site is accessible at localhost with the shadcn theme applied
3. **Given** the development server is running, **When** I navigate to any documentation page, **Then** the page loads with proper styling, navigation, and theme elements
4. **Given** I make changes to markdown files, **When** I save the changes, **Then** the site automatically rebuilds and reflects the updates

---

### User Story 2 - All Documentation Content Migrated to Markdown (Priority: P2)

As a documentation maintainer, I need all Jekyll snippets and HTML templates converted to standard markdown files with proper frontmatter so that the documentation content is accessible and maintainable in MkDocs.

**Why this priority**: Content migration is essential for the site to be functional. Without migrated content, the site structure exists but has no usable documentation.

**Independent Test**: Verify that all 71 snippet files and all documentation pages have been converted to markdown format with appropriate frontmatter, and that content renders correctly in MkDocs.

**Acceptance Scenarios**:

1. **Given** Jekyll snippet files exist in `_snippets/`, **When** migration is complete, **Then** all snippets are converted to markdown files with proper frontmatter
2. **Given** Jekyll HTML pages with snippet references exist, **When** migration is complete, **Then** pages are converted to markdown with embedded content from snippets
3. **Given** migrated markdown files, **When** I view them in MkDocs, **Then** code blocks, formatting, and links render correctly
4. **Given** Jekyll liquid tags exist in content, **When** migration is complete, **Then** all liquid syntax is replaced with markdown equivalents or removed

---

### User Story 3 - Navigation Structure Preserved and Enhanced (Priority: P3)

As a documentation user, I need the site navigation to match or improve upon the existing Jekyll structure so that I can easily find and navigate between documentation sections.

**Why this priority**: Navigation enhances usability but the site can function with basic navigation. This is an improvement over the baseline migration.

**Independent Test**: Compare the navigation structure in the new MkDocs site against the original Jekyll site and verify all sections are accessible and logically organized.

**Acceptance Scenarios**:

1. **Given** the original Jekyll site has a navigation structure, **When** I view the MkDocs site, **Then** all major sections are present in the navigation
2. **Given** nested documentation sections exist, **When** I navigate the site, **Then** the hierarchy is preserved and breadcrumbs show my location
3. **Given** I am on any documentation page, **When** I use the navigation, **Then** I can access all other documentation pages
4. **Given** the mkdocs-shadcn theme, **When** I view the navigation, **Then** it includes modern UI elements like search, dark mode toggle, and responsive design

---

### User Story 4 - Automated Visual Verification with Playwright (Priority: P4)

As a developer, I need automated Playwright tests that verify the documentation site loads correctly and uses the proper theme so that I can catch visual regressions and deployment issues early.

**Why this priority**: Automated testing provides confidence but is not required for the initial migration. It's valuable for ongoing maintenance and CI/CD integration.

**Independent Test**: Run the Playwright test suite and verify it checks for theme application, page loading, navigation functionality, and visual consistency.

**Acceptance Scenarios**:

1. **Given** Playwright tests are configured, **When** I run the test suite, **Then** tests verify the homepage loads successfully
2. **Given** the test suite runs, **When** tests execute, **Then** they confirm the mkdocs-shadcn theme is applied (check for theme-specific CSS classes or elements)
3. **Given** multiple documentation pages exist, **When** tests run, **Then** they verify each major section loads without errors
4. **Given** theme features exist, **When** tests run, **Then** they verify dark mode toggle, search functionality, and responsive layout work correctly
5. **Given** tests complete, **When** I review results, **Then** screenshots are captured for visual comparison

---

### User Story 5 - Documentation Content Refactored to Photon/Core with ES6 Syntax (Priority: P2.5)

As a documentation user, I need all code examples and references updated from maker.js to photon/core with modern ES6 syntax so that the documentation accurately reflects the current library and uses best practices.

**Why this priority**: Content refactoring is essential after migration but before AI enhancement. The documentation structure is migrated (P2), but the content still references the old library. This must be corrected before adding AI-friendly enhancements to ensure we're enhancing accurate, up-to-date content.

**Independent Test**: Review all documentation pages and verify that (1) no maker.js references remain, (2) all code examples use photon/core APIs, (3) all JavaScript code follows ES6+ syntax conventions, and (4) examples execute correctly with the new library.

**Acceptance Scenarios**:

1. **Given** documentation pages contain maker.js references, **When** refactoring is complete, **Then** all references are updated to photon or photon/core
2. **Given** code examples use old maker.js API, **When** refactoring is complete, **Then** all examples use the current photon/core API with correct import statements
3. **Given** code examples use older JavaScript syntax, **When** refactoring is complete, **Then** all examples use ES6+ syntax (const/let, arrow functions, destructuring, template literals)
4. **Given** refactored code examples exist, **When** I test them in the playground, **Then** they execute without errors and produce expected results
5. **Given** TypeDoc-generated API reference exists, **When** I review it, **Then** it correctly documents photon/core modules and links are not broken

---

### Edge Cases

- What happens when a Jekyll snippet contains complex liquid logic that doesn't translate directly to markdown?
- How does the system handle Jekyll includes and layouts that have no direct MkDocs equivalent?
- What happens when code blocks use Jekyll-specific syntax highlighting that differs from markdown?
- How are Jekyll collections (like `_snippets`) represented in the MkDocs structure?
- What happens to Jekyll front matter fields that don't map to MkDocs front matter?
- How are relative links between pages handled during migration to ensure they still work?
- What happens when the mkdocs-shadcn theme has different configuration requirements than standard MkDocs themes?
- What happens when maker.js API methods have no direct photon/core equivalent?
- How do we handle deprecated maker.js features that are no longer supported in photon/core?
- What happens when code examples rely on maker.js global namespace but photon/core uses ES6 modules?
- How do we ensure refactored examples maintain the same visual output as the original maker.js examples?
- What happens when TypeDoc-generated API documentation conflicts with manually written documentation?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST install and configure MkDocs with the mkdocs-shadcn theme
- **FR-002**: System MUST convert all 71 Jekyll snippet files from HTML to markdown format
- **FR-003**: System MUST convert all Jekyll documentation pages to markdown with proper frontmatter
- **FR-004**: System MUST preserve all code examples, syntax highlighting, and formatting during migration
- **FR-005**: System MUST translate Jekyll liquid tags to markdown equivalents or remove them appropriately
- **FR-006**: System MUST create a navigation structure in MkDocs configuration that mirrors the Jekyll site organization
- **FR-007**: System MUST update all internal links to work with the new MkDocs URL structure
- **FR-008**: System MUST configure the mkdocs-shadcn theme with appropriate settings for the Photon documentation
- **FR-009**: System MUST create Playwright tests that verify the site loads and renders correctly
- **FR-010**: System MUST create Playwright tests that verify the mkdocs-shadcn theme is properly applied
- **FR-011**: System MUST integrate MkDocs build into the existing development server workflow
- **FR-012**: System MUST provide migration scripts or tools to automate the Jekyll-to-markdown conversion
- **FR-013**: System MUST preserve all existing documentation content without loss during migration
- **FR-014**: System MUST update the project build process to use MkDocs instead of Jekyll
- **FR-015**: System MUST replace all maker.js namespace references with photon or photon/core references throughout documentation
- **FR-016**: System MUST update all code examples to use photon/core API methods instead of maker.js API methods
- **FR-017**: System MUST refactor all JavaScript code examples to use ES6+ syntax (const/let, arrow functions, modules, template literals)
- **FR-018**: System MUST update import statements in code examples to use ES6 module syntax (import/export)
- **FR-019**: System MUST validate that refactored code examples execute correctly with the photon/core library
- **FR-020**: System MUST integrate TypeDoc-generated API reference into the MkDocs documentation
- **FR-021**: System MUST ensure all links to API documentation point to the correct photon/core reference pages
- **FR-022**: System MUST maintain backward compatibility notes where maker.js and photon/core APIs differ significantly

### Key Entities

- **Documentation Page**: A markdown file representing a single documentation page with frontmatter (title, description, navigation order) and content (text, code examples, links)
- **Snippet**: A reusable documentation fragment that was previously a Jekyll snippet, now embedded directly into markdown pages or referenced via MkDocs includes
- **Navigation Structure**: The hierarchical organization of documentation pages defined in the MkDocs configuration file
- **Theme Configuration**: Settings specific to the mkdocs-shadcn theme including colors, fonts, features, and layout options
- **Playwright Test Suite**: A collection of automated tests that verify site functionality, theme application, and visual consistency
- **Code Example**: A code block within documentation showing usage of photon/core API, following ES6+ syntax standards
- **API Reference**: TypeDoc-generated documentation for photon/core modules, methods, and types
- **API Mapping**: A reference document mapping maker.js API methods to their photon/core equivalents
- **Refactoring Script**: An automated tool that identifies and replaces maker.js references with photon/core equivalents

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Documentation site builds successfully with MkDocs in under 10 seconds
- **SC-002**: All 71 snippet files are converted to markdown format with 100% content preservation
- **SC-003**: All documentation pages from the Jekyll site are accessible in the MkDocs site with correct formatting
- **SC-004**: Playwright tests achieve 100% pass rate for site loading and theme verification
- **SC-005**: Development server starts and serves MkDocs site without requiring Ruby or Jekyll installation
- **SC-006**: Visual comparison shows the mkdocs-shadcn theme provides equal or better user experience than the Jekyll theme
- **SC-007**: All internal documentation links work correctly with zero broken links
- **SC-008**: Site navigation allows users to access any documentation page within 3 clicks from the homepage
- **SC-009**: Zero maker.js references remain in documentation (100% replaced with photon/core)
- **SC-010**: All code examples use ES6+ syntax with no var declarations or pre-ES6 patterns
- **SC-011**: All code examples execute successfully in the playground without errors
- **SC-012**: TypeDoc-generated API reference is accessible and complete with zero broken links to core modules
- **SC-013**: API mapping document covers 100% of commonly-used maker.js methods with photon/core equivalents
