# Feature Specification: Critical Dependency Modernization

**Feature Branch**: `002-upgrade-dependencies-to`  
**Created**: 2025-10-11  
**Status**: Draft  
**Input**: User description: "Upgrade dependencies to modern standards - from what I can tell Graham Scan, Bezier.js and KDBrush are all extremely important dependencies to this codebase and have recieved more recent updates than maker.js had. We need to research to understand what (if anything) has changed about the api/contract of these three critical libraries and either update or pull in older version and refactor it to suit our needs."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Maintain Existing Functionality (Priority: P1)

As a developer using Photon (formerly Maker.js), I need all existing geometric operations (convex hull calculations, Bezier curve manipulations, and spatial indexing) to continue working exactly as they did before the dependency upgrade, so that my existing projects don't break.

**Why this priority**: This is the foundation - without maintaining existing functionality, the library becomes unusable for current users. All geometric operations depend on these three critical libraries.

**Independent Test**: Can be fully tested by running the existing test suite and verifying all tests pass without modification. Delivers confidence that no regressions were introduced.

**Acceptance Scenarios**:

1. **Given** the existing test suite, **When** tests are run after dependency upgrade, **Then** all existing tests pass without modification
2. **Given** existing code using convex hull calculations, **When** executed with upgraded graham_scan, **Then** results match previous output
3. **Given** existing code using Bezier curves, **When** executed with upgraded bezier-js, **Then** curve calculations produce identical results
4. **Given** existing code using spatial indexing, **When** executed with upgraded kdbush, **Then** point queries return identical results

---

### User Story 2 - Leverage Modern Dependency Features (Priority: P2)

As a Photon maintainer, I want to utilize new performance improvements and features from updated dependencies, so that the library becomes faster and more memory-efficient for users working with complex geometric models.

**Why this priority**: Once compatibility is ensured, leveraging modern features provides tangible benefits to users without requiring them to change their code.

**Independent Test**: Can be tested by running performance benchmarks comparing old vs new dependency versions on identical operations. Delivers measurable performance improvements.

**Acceptance Scenarios**:

1. **Given** a large point dataset, **When** spatial indexing is performed, **Then** memory usage is reduced compared to the old kdbush version
2. **Given** complex Bezier curve operations, **When** executed with new bezier-js, **Then** calculations complete in equal or less time
3. **Given** the updated dependencies, **When** library is built, **Then** bundle size is equal or smaller than before

---

### User Story 3 - Ensure Future Maintainability (Priority: P3)

As a Photon maintainer, I need clear documentation of any API changes or migration patterns required for the dependency upgrades, so that future updates can be performed confidently and efficiently.

**Why this priority**: While less urgent than functional correctness, good documentation prevents technical debt and makes future maintenance easier.

**Independent Test**: Can be tested by having a developer unfamiliar with the changes successfully understand what was modified and why by reading the documentation alone.

**Acceptance Scenarios**:

1. **Given** the upgrade documentation, **When** a developer reviews it, **Then** they can identify all breaking changes and required code adaptations
2. **Given** inline code comments, **When** reviewing dependency usage, **Then** any workarounds or compatibility shims are clearly explained
3. **Given** the migration is complete, **When** reviewing package.json, **Then** all dependency versions are explicitly documented with rationale

---

### Edge Cases

- What happens when bezier-js API changes require different constructor patterns (v2.1.0 → v6.1.4 major version jump)?
- What happens when kdbush v4.0.0 breaking changes require new initialization patterns (constructor API changed)?
- How does the system handle the transition from CommonJS to ESM-only modules in newer versions?
- What happens if graham_scan API remained stable but internal behavior changed?
- How are TypeScript type definitions handled when @types packages may have version mismatches?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST maintain backward compatibility for all public APIs that depend on graham_scan, bezier-js, and kdbush
- **FR-002**: System MUST upgrade graham_scan from v1.0.4 to v1.0.5 (latest stable)
- **FR-003**: System MUST upgrade bezier-js from v2.1.0 to v6.1.4 (latest stable)
- **FR-004**: System MUST upgrade kdbush from v2.0.1 to v4.0.2 (latest stable)
- **FR-005**: System MUST adapt to kdbush v4.0.0 breaking API changes (constructor pattern and ESM-only export)
- **FR-006**: System MUST adapt to bezier-js major version changes while maintaining existing Photon API surface
- **FR-007**: System MUST update corresponding TypeScript type definitions (@types/graham_scan, @types/bezier-js)
- **FR-008**: System MUST verify all existing geometric operations produce identical or improved results
- **FR-009**: System MUST document any internal code changes required to accommodate new dependency APIs
- **FR-010**: System MUST ensure ES module compatibility for both Node.js and browser environments after upgrades (no UMD/CommonJS backward compatibility required)
- **FR-011**: System MUST handle ESM module imports correctly for all three dependencies
- **FR-012**: System MUST maintain or improve build performance and bundle size

### Assumptions

- The existing test suite provides adequate coverage of dependency usage
- Performance improvements in newer versions will not negatively impact correctness
- The project's build system (Vite, TypeScript) supports the module formats of updated dependencies
- Breaking changes in dependencies can be absorbed through adapter code without exposing changes to Photon users
- Photon is moving to ESM-only distribution; no effort required for UMD/CommonJS backward compatibility

### Key Entities

- **graham_scan**: Convex hull calculation library used in measure.ts for geometric boundary calculations. Current v1.0.4, target v1.0.5 (minor update, likely stable API).
- **bezier-js**: Bezier curve manipulation library used extensively in BezierCurve-esm.ts for curve operations. Current v2.1.0, target v6.1.4 (major version jump with significant API changes including ESM-first approach).
- **kdbush**: Spatial indexing library used in collect.ts for efficient 2D point queries. Current v2.0.1, target v4.0.2 (major version jump with breaking constructor API changes and ESM-only exports).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All existing unit tests pass without modification after dependency upgrades
- **SC-002**: Build process completes successfully with zero errors and zero new warnings
- **SC-003**: Bundle size remains within 5% of current size (or decreases)
- **SC-004**: Memory usage for spatial indexing operations decreases by at least 10% (per kdbush v4 improvements)
- **SC-005**: No breaking changes are exposed to Photon library consumers (public API remains stable)
- **SC-006**: Documentation clearly identifies all internal code changes made to accommodate dependency updates
- **SC-007**: TypeScript compilation produces no new type errors
