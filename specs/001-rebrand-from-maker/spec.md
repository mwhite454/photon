# Feature Specification: Rebrand to Photon

**Feature Branch**: `001-rebrand-from-maker`  
**Created**: 2025-10-10  
**Status**: Draft  
**Input**: User description: "Rebrand from Maker.js to Photon - complete project rebrand including name, documentation, package names, attribution, and roadmap for future as modern ES6+ CNC/laser drafting library"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Core Identity Rebrand (Priority: P1)

As a project maintainer, I need to rebrand all core project identity elements from "Maker.js" to "Photon" so that the project has a clear, modern identity that reflects its resurrection and future direction while properly attributing its Microsoft origins.

**Why this priority**: This is the foundation of the rebrand. Without establishing the new identity, no other work can proceed. This creates the legal and branding foundation for all future development.

**Independent Test**: Can be fully tested by verifying that all package names, documentation headers, and core branding elements display "Photon" instead of "Maker.js", while maintaining proper Apache 2.0 attribution to Microsoft's original work.

**Acceptance Scenarios**:

1. **Given** the current Maker.js codebase, **When** I examine package.json files, **Then** all package names use "photon" or "@photon" scope instead of "makerjs"
2. **Given** the rebranded project, **When** I read the main README, **Then** it clearly identifies as "Photon" with attribution to Maker.js origins
3. **Given** the rebranded project, **When** I check the LICENSE and NOTICE files, **Then** they properly attribute Microsoft's original copyright while adding new maintainer copyright
4. **Given** the rebranded project, **When** I build the library, **Then** the output files are named "photon.js", "photon.es.js", etc.
5. **Given** the rebranded project, **When** I examine TypeScript namespaces, **Then** they use "Photon" instead of "MakerJs"

---

### User Story 2 - Documentation & Web Presence Update (Priority: P2)

As a new user discovering Photon, I need all documentation, examples, and web content to reflect the Photon brand so that I have a consistent, professional experience and understand the project's modern direction.

**Why this priority**: After core identity is established, documentation is the primary user touchpoint. Users need to see consistent branding and understand what Photon is and how it differs from the archived Maker.js.

**Independent Test**: Can be fully tested by navigating through all documentation pages, playground, and examples to verify consistent "Photon" branding and updated messaging about the project's modern ES6+ focus.

**Acceptance Scenarios**:

1. **Given** the Photon playground, **When** I open it in a browser, **Then** the title, logo, and interface all display "Photon" branding
2. **Given** the API documentation, **When** I browse through it, **Then** all references use "Photon" terminology and examples
3. **Given** the example models, **When** I load them in the playground, **Then** the code examples use `import photon` or `const photon = require('photon')`
4. **Given** the project website, **When** I read the "About" section, **Then** it explains Photon as a modern fork of Maker.js with clear value proposition
5. **Given** any code snippet in documentation, **When** I copy and use it, **Then** it works with the new Photon package names

---

### User Story 3 - Future Roadmap Communication (Priority: P2)

As a potential contributor or user, I need to see Photon's roadmap and vision so that I understand where the project is heading and can decide whether to invest time in learning or contributing to it.

**Why this priority**: After core identity and documentation, the roadmap is critical for attracting new users and contributors. With minimal existing Maker.js users to migrate, focus shifts to building a new community around Photon's vision.

**Independent Test**: Can be fully tested by reviewing the roadmap document and verifying it clearly communicates Photon's direction, planned features, and community involvement opportunities.

**Acceptance Scenarios**:

1. **Given** the Photon repository, **When** I look for the roadmap, **Then** I find a clear ROADMAP.md file in the root directory
2. **Given** the roadmap document, **When** I read it, **Then** it outlines near-term (3-6 months), mid-term (6-12 months), and long-term (1-2 years) goals
3. **Given** the roadmap, **When** I review planned features, **Then** it emphasizes modern JavaScript, user experience, and CNC/laser focus per the constitution
4. **Given** the roadmap, **When** I want to contribute, **Then** it explains how community members can get involved and influence direction
5. **Given** the roadmap, **When** I compare to Maker.js, **Then** it clearly articulates what makes Photon different and better

---

### Edge Cases

- What happens when users have bookmarked old Maker.js URLs? (Redirect strategy needed)
- How do we handle npm package name conflicts if "photon" is taken? (Check availability, consider @photon scope)
- What about existing Maker.js projects? (Minimal usage observed, but include basic migration notes in README)
- How do we handle search engine results still pointing to Maker.js? (SEO strategy, canonical URLs)
- What if Microsoft objects to the fork? (Apache 2.0 allows it, but maintain respectful attribution)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All package.json files MUST use "photon" or "@photon" scoped package names
- **FR-002**: All TypeScript namespaces MUST be renamed from "MakerJs" to "Photon"
- **FR-003**: All distribution files MUST be renamed to use "photon" prefix (photon.js, photon.es.js, photon.umd.js)
- **FR-004**: LICENSE file MUST retain original Microsoft copyright and add new maintainer copyright
- **FR-005**: A NOTICE file MUST be created documenting the fork from Maker.js with proper attribution
- **FR-006**: README.md MUST clearly identify the project as "Photon" with a dedicated section explaining origins
- **FR-007**: All documentation pages MUST be updated to use "Photon" terminology
- **FR-008**: Playground interface MUST display "Photon" branding (title, headers, about section)
- **FR-009**: All code examples in documentation MUST use Photon package names and imports
- **FR-010**: API documentation MUST be regenerated with Photon branding
- **FR-011**: README MUST include a brief "Migrating from Maker.js" section with package name changes
- **FR-012**: A ROADMAP.md file MUST be created outlining Photon's future direction
- **FR-013**: Constitution MUST be updated to reference "Photon" instead of "Maker.js"
- **FR-014**: All HTML meta tags and titles MUST use "Photon" for SEO
- **FR-015**: CDN links and installation instructions MUST be updated for new package names
- **FR-016**: Contributing guidelines MUST be updated to reflect new project ownership (remove Microsoft CLA references)
- **FR-017**: All internal code comments referencing "Maker.js" MUST be updated to "Photon"
- **FR-018**: Git repository description and topics MUST be updated to reflect Photon branding

### Assumptions

- NPM package name "photon" or "@photon/core" is available (will verify during implementation)
- Maker.js has minimal active usage based on download/usage analysis, so extensive migration support is not needed
- The rebrand will be released as a major version (2.0.0) to signal breaking changes
- GitHub repository will remain at current location with updated description, or will be forked to new organization
- Existing Maker.js demos and examples will be preserved for historical reference with clear "archived" labels
- Focus is on attracting new users rather than migrating existing ones

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of package names in package.json files use "photon" or "@photon" scope
- **SC-002**: 100% of documentation pages display "Photon" branding consistently
- **SC-003**: Zero broken links in documentation after rebrand
- **SC-004**: README migration section provides clear package name mapping for any existing users
- **SC-005**: All build outputs (npm package, CDN files, TypeScript definitions) successfully use new Photon naming
- **SC-006**: Playground loads and functions correctly with Photon branding
- **SC-007**: At least 10 example models work correctly with new Photon package names
- **SC-008**: LICENSE and NOTICE files pass Apache 2.0 compliance review
- **SC-009**: README clearly communicates project identity to new visitors within first 30 seconds of reading
- **SC-010**: Roadmap document outlines at least 5 concrete near-term goals and 3 long-term vision items
