# Implementation Plan: Critical Dependency Modernization

**Branch**: `002-upgrade-dependencies-to` | **Date**: 2025-10-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-upgrade-dependencies-to/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Upgrade three critical geometric computation dependencies (graham_scan, bezier-js, kdbush) to their latest stable versions while maintaining backward compatibility for all public Photon APIs. The upgrades address security, performance, and maintainability concerns while aligning with Photon's ESM-only distribution strategy. Key challenges include adapting to kdbush v4.0.0's complete API rewrite and bezier-js's major version jump from 2.x to 6.x.

## Technical Context

**Language/Version**: TypeScript 5.6.3 / JavaScript ES2020+  
**Primary Dependencies**: 
- graham_scan 1.0.4 → 1.0.5 (convex hull calculations)
- bezier-js 2.1.0 → 6.1.4 (Bezier curve operations)
- kdbush 2.0.1 → 4.0.2 (spatial indexing)

**Storage**: N/A (library, no persistence layer)  
**Testing**: Mocha test framework with existing test suite in packages/photon/test  
**Target Platform**: Node.js (18.x, 20.x, 22.x LTS) + Modern browsers (Chrome, Firefox, Safari, Edge last 2 versions)  
**Project Type**: Monorepo library (packages/photon is primary package)  
**Performance Goals**: 
- Geometric operations <10ms for typical use cases
- Memory usage reduction of 10%+ for spatial indexing (kdbush v4 benefit)
- Bundle size maintained or reduced

**Constraints**: 
- Zero breaking changes to public Photon API
- ESM-only distribution (no UMD/CommonJS backward compatibility)
- All existing tests must pass without modification
- Build must complete with zero errors/warnings

**Scale/Scope**: 
- 3 dependencies to upgrade
- ~5 files with direct dependency usage
- Existing test suite provides coverage baseline

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with Photon Constitution (`.specify/memory/constitution.md`):

- [x] **Test-Driven Development**: Existing test suite will validate changes; tests run before/after each dependency upgrade
- [x] **Specification-Driven**: User stories defined with P1/P2/P3 priorities and Given-When-Then acceptance criteria
- [x] **ES6+ Compatibility**: All dependencies support ESM; aligns with Photon's ESM-only distribution
- [x] **Experiment-Friendly**: No playground changes required; dependency upgrades are transparent to users
- [x] **User Experience First**: Zero breaking changes to public API; internal changes only
- [x] **Living Documentation**: package.json updates, inline comments for compatibility shims, research findings documented
- [x] **CNC/Laser Focus**: Precision maintained through geometric operation validation; no export format changes
- [x] **Code Quality**: TypeScript strict mode enabled; existing linting applies; code review required
- [x] **Performance Standards**: Memory usage improvement goal (10%+ for spatial indexing); bundle size monitored
- [x] **Versioning**: PATCH version (bug fixes/dependency updates); no breaking changes to public API

**Constitution Compliance**: ✅ PASS - All principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/002-upgrade-dependencies-to/
├── spec.md              # Feature specification (completed)
├── research-findings.md # Dependency research (completed)
├── checklists/
│   └── requirements.md  # Spec quality checklist (completed)
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (dependency migration patterns)
├── data-model.md        # Phase 1 output (N/A - no data model for this feature)
├── quickstart.md        # Phase 1 output (upgrade guide)
├── contracts/           # Phase 1 output (N/A - no API contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
packages/photon/
├── src/
│   ├── core/
│   │   ├── measure.ts           # Uses graham_scan (convex hull)
│   │   └── collect.ts           # Uses kdbush (spatial indexing)
│   ├── models/
│   │   └── BezierCurve-esm.ts   # Uses bezier-js (curve operations)
│   └── index.ts
├── test/
│   ├── measure.test.ts          # Tests for convex hull operations
│   ├── collect.test.ts          # Tests for spatial indexing
│   └── bezier.test.ts           # Tests for Bezier curve operations
├── package.json                 # Dependency version updates
└── package-lock.json            # Lock file updates

packages/docs/
└── package.json                 # Type definition updates
```

**Structure Decision**: Monorepo library structure. Primary changes in `packages/photon` where the three dependencies are used. No new files required - only modifications to existing dependency usage patterns and package.json updates.

## Complexity Tracking

*Fill ONLY if Constitution Check has violations that must be justified*

**No violations** - Constitution Check passed all requirements.

---

## Phase 0: Research & Patterns ✅ COMPLETE

**Deliverable**: [research.md](./research.md)

**Summary**: Comprehensive research completed for all three dependencies with migration patterns defined:

- **graham_scan**: Simple version bump (1.0.4 → 1.0.5), stable API
- **bezier-js**: Major version upgrade (2.1.0 → 6.1.4), existing compatibility shim handles changes
- **kdbush**: API refactoring required (2.0.1 → 4.0.2), new initialization pattern documented

All NEEDS CLARIFICATION items resolved. Testing strategy and risk mitigation plans documented.

---

## Phase 1: Design & Documentation ✅ COMPLETE

**Deliverables**:
- [data-model.md](./data-model.md) - N/A (no data models for dependency upgrades)
- [contracts/](./contracts/) - N/A (no API contracts, internal changes only)
- [quickstart.md](./quickstart.md) - Step-by-step upgrade guide for maintainers
- Agent context updated via `.specify/scripts/bash/update-agent-context.sh windsurf`

**Summary**: Documentation artifacts created. Since this feature involves internal dependency upgrades only:
- No data models required (computational libraries)
- No API contracts required (zero breaking changes to public API)
- Quickstart guide provides detailed upgrade procedures
- Agent context updated with TypeScript 5.6.3 and monorepo structure

---

## Phase 2: Task Generation

**Status**: Ready for `/speckit.tasks` command

**Next Steps**:
1. Run `/speckit.tasks` to generate actionable task list
2. Tasks will be ordered by dependency (graham_scan → bezier-js → kdbush)
3. Each task will include test validation steps
4. Implementation follows TDD principles per constitution

---

## Planning Summary

**Branch**: `002-upgrade-dependencies-to`  
**Constitution Compliance**: ✅ PASS  
**Research**: ✅ Complete  
**Design**: ✅ Complete  
**Ready for**: Task generation and implementation

**Key Artifacts**:
- ✅ [spec.md](./spec.md) - Feature specification with user stories and requirements
- ✅ [research-findings.md](./research-findings.md) - Detailed dependency analysis
- ✅ [research.md](./research.md) - Migration patterns and testing strategy
- ✅ [quickstart.md](./quickstart.md) - Upgrade guide for maintainers
- ✅ [plan.md](./plan.md) - This implementation plan
- ⏭️ [tasks.md](./tasks.md) - To be generated by `/speckit.tasks`

**Estimated Effort**: 2-4 hours (upgrade + testing + validation)  
**Risk Level**: Low-Medium (with proper testing)  
**Impact**: Improved performance, reduced memory usage, enhanced maintainability
