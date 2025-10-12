<!--
Sync Impact Report:
Version: 0.0.0 → 1.0.0 (Initial Constitution)
Modified Principles: N/A (Initial creation)
Added Sections: All sections created from template
Removed Sections: None
Templates Requiring Updates:
  ✅ plan-template.md - Constitution Check section validated
  ✅ spec-template.md - User story and requirements alignment validated
  ✅ tasks-template.md - Task categorization reflects principles
Follow-up TODOs: None - all placeholders filled
-->

# Photon Constitution

## Core Principles

### I. Test-Driven Development (NON-NEGOTIABLE)

**TDD is mandatory for all feature development:**

- Tests MUST be written before implementation
- Tests MUST fail initially (Red phase)
- Implementation proceeds only after tests are approved and failing (Green phase)
- Code MUST be refactored after passing (Refactor phase)
- Red-Green-Refactor cycle is strictly enforced

**Rationale**: TDD ensures code correctness, prevents regressions, and creates living documentation. For a geometric library used in CNC/laser cutting where precision is critical, test coverage is non-negotiable.

### II. Specification-Driven Development

**All features begin with clear specifications:**

- User stories MUST be defined before implementation planning
- Specifications MUST include acceptance criteria in Given-When-Then format
- Requirements MUST be prioritized (P1, P2, P3) for incremental delivery
- Each user story MUST be independently testable
- Specifications MUST be reviewed and approved before implementation begins

**Rationale**: Specifications prevent scope creep, enable parallel development, and ensure features solve real user problems. Clear specs are essential for a library with complex geometric operations.

### III. ES6+ Modern JavaScript Library

**Photon is a modern JavaScript drafting library:**

- Core library MUST support ES6+ syntax (const, let, arrow functions, classes, async/await)
- Code MUST be compatible with both Node.js and browser environments
- Distribution formats MUST include ES modules, UMD, and CommonJS
- TypeScript definitions MUST be provided for all public APIs
- Dependencies MUST be minimal and well-justified

**Rationale**: Modern JavaScript enables better developer experience, improved performance, and wider adoption. As a library for CNC/laser projects, it must be accessible across all platforms.


### IV. Experiment-Friendly Frontend Experience

**The playground MUST welcome experimentation:**

- Monaco Editor provides VS Code-like editing experience with IntelliSense
- Modern JavaScript features (ES6+) MUST be fully supported in the playground
- Real-time preview MUST update as users type
- Example models MUST be easily discoverable and loadable
- Error messages MUST be clear, actionable, and beginner-friendly
- Future consideration: Observable-style notebooks for interactive model crafting

**Rationale**: User experience is king. A welcoming, experiment-friendly environment lowers the barrier to entry and encourages creative exploration of geometric designs.

### V. User Experience First

**Users MUST feel welcome and supported:**

- Documentation MUST be clear, concise, and example-driven
- Answers MUST never be far from reach (inline help, tooltips, contextual docs)
- Error messages MUST guide users toward solutions
- API design MUST be intuitive and consistent
- Learning curve MUST be gradual with progressive disclosure of complexity
- Community contributions MUST be acknowledged and celebrated

**Rationale**: A library is only as good as its adoption. Prioritizing UX ensures Photon remains accessible to makers, hobbyists, and professionals alike.

### VI. Living Documentation

**Documentation MUST stay current with every release:**

- Documentation MUST be updated in the same PR as code changes
- API documentation MUST be generated from TypeScript definitions
- Examples MUST be tested and verified to work
- Changelog MUST document all breaking changes, new features, and bug fixes
- Migration guides MUST be provided for breaking changes
- Documentation MUST be reviewed as part of the release process

**Rationale**: Stale documentation erodes trust and creates support burden. Living documentation ensures users always have accurate, reliable information.

### VII. CNC/Laser-Focused Purpose

**Photon serves makers working with CNC and laser cutters:**

- Export formats MUST support industry standards (DXF, SVG, PDF)
- Precision MUST be maintained throughout all operations
- Units MUST be explicit and convertible (mm, inches, etc.)
- Tool compensation features (dogbone fillets, kerf adjustment) MUST be supported
- Real-world manufacturing constraints MUST be considered in API design

**Rationale**: Photon has a clear purpose - enabling programmatic creation of precise 2D drawings for fabrication. This focus guides all design decisions.

## Development Standards

### Code Quality

- **Linting**: All code MUST pass ESLint with Airbnb Style Guide
- **Formatting**: Code MUST be formatted consistently (Prettier or similar)
- **Type Safety**: TypeScript MUST be used for all new code with strict mode enabled
- **Code Reviews**: All PRs MUST be reviewed by at least one maintainer
- **Test Coverage**: New features MUST include tests; aim for >80% coverage on critical paths

### Performance Standards

- **Geometric Operations**: Core path/model operations MUST complete in <10ms for typical use cases
- **Export Operations**: DXF/SVG export MUST handle models with 10,000+ paths efficiently
- **Playground Responsiveness**: Editor MUST remain responsive with files up to 5,000 lines
- **Bundle Size**: Browser bundle MUST remain under 200KB (minified + gzipped)

### Browser & Platform Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Node.js**: Active LTS versions (currently 18.x, 20.x, 22.x)
- **Mobile**: Playground MUST be usable on tablets (responsive design)

## Release Process

### Versioning

**Semantic Versioning (MAJOR.MINOR.PATCH):**

- **MAJOR**: Breaking API changes, removed features
- **MINOR**: New features, non-breaking API additions
- **PATCH**: Bug fixes, documentation updates, performance improvements

### Release Checklist

1. All tests MUST pass
2. Documentation MUST be updated
3. Changelog MUST be complete
4. Examples MUST be verified
5. TypeScript definitions MUST be validated
6. Bundle sizes MUST be checked
7. Migration guide MUST be provided (for breaking changes)

## Governance

### Constitution Authority

This constitution supersedes all other development practices and guidelines. When conflicts arise, this document takes precedence.

### Amendment Process

1. Proposed amendments MUST be documented with rationale
2. Amendments MUST be discussed with maintainers and community
3. Breaking amendments require MAJOR version bump
4. Amendment approval requires consensus from core maintainers
5. Amendments MUST include migration plan for affected workflows

### Compliance

- All PRs MUST be reviewed for constitutional compliance
- Violations MUST be justified in writing or corrected
- Complexity that violates simplicity principles MUST be explicitly justified
- Templates in `.specify/templates/` MUST align with these principles

### Review Cadence

- Constitution MUST be reviewed annually
- Review MUST assess relevance of principles to current project state
- Review MUST incorporate community feedback
- Review results MUST be documented

**Version**: 1.0.0 | **Ratified**: 2025-10-10 | **Last Amended**: 2025-10-10