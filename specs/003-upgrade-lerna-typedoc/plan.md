# Implementation Plan: Upgrade Lerna & TypeDoc to Latest Versions

**Branch**: `003-upgrade-lerna-typedoc` | **Date**: 2025-10-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-upgrade-lerna-typedoc/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Upgrade Lerna from v6.0.3 to latest stable v8.x and TypeDoc from v0.26.0 to latest stable version to benefit from security patches, bug fixes, and performance improvements. Additionally, fix pre-existing build process failures (TypeDoc documentation generation, TypeScript compilation errors in demos/fonts packages) to ensure all monorepo functionality, package linking, building, testing, and documentation generation work successfully.

## Technical Context

**Language/Version**: JavaScript/TypeScript, Node.js (LTS versions 18.x, 20.x, 22.x assumed)  
**Primary Dependencies**: Lerna (currently v6.0.3 → target v8.x), TypeDoc (currently v0.26.0 → target latest stable), TypeScript v5.6.3, Vite v7.1.9, Mocha v10.0.0  
**Storage**: N/A (build tooling upgrade)  
**Testing**: Mocha test framework, existing test suite must pass post-upgrade  
**Target Platform**: Node.js monorepo with browser-compatible library output (ES modules, UMD, CommonJS)  
**Project Type**: Monorepo with multiple packages (photon core, playground, docs, fonts)  
**Performance Goals**: Documentation build must complete successfully (currently fails), no regression in build/test execution time  
**Constraints**: All packages must link and build successfully with exit code 0, no new high/critical security vulnerabilities, must fix pre-existing build failures  
**Scale/Scope**: 5 packages in monorepo (photon core, playground, docs, fonts, demos), TypeScript codebase with ES6+ features, API documentation generation for public library  
**Pre-existing Issues**: TypeDoc entry points not in tsconfig (docs fail), @types/node Buffer interface errors (demos/fonts fail to compile)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with Photon Constitution (`.specify/memory/constitution.md`):

- [x] **Test-Driven Development**: Existing test suite validates upgrade success (tests run post-upgrade)
- [x] **Specification-Driven**: User stories defined with Given-When-Then acceptance criteria in spec.md
- [x] **ES6+ Compatibility**: Upgrade maintains ES6+ support (no impact on library code)
- [x] **Experiment-Friendly**: Playground unaffected by build tooling changes
- [x] **User Experience First**: Documentation generation quality maintained/improved
- [x] **Living Documentation**: Changelog and migration notes will document upgrade process
- [x] **CNC/Laser Focus**: No impact on precision or export formats (tooling upgrade only)
- [x] **Code Quality**: Existing linting/TypeScript setup maintained
- [x] **Performance Standards**: Documentation build time tracked (10% tolerance)
- [x] **Versioning**: PATCH version bump (internal tooling upgrade, no API changes)

**Post-Phase 1 Re-evaluation** (2025-10-12):
- ✅ All constitutional requirements remain satisfied
- ✅ Design artifacts (data-model.md, contracts/, quickstart.md) align with principles
- ✅ No complexity violations introduced
- ✅ Upgrade procedure follows TDD validation approach (tests before merge)
- ✅ Living documentation maintained (research.md, quickstart.md, upgrade-procedure.md)

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
packages/
├── photon/              # Core library (@photon/core)
│   ├── src/
│   ├── dist/
│   ├── typedoc.json     # TypeDoc configuration
│   └── package.json
├── playground/          # Interactive editor
├── docs/                # Documentation and demos
└── fonts/               # Font utilities

# Root-level configuration
lerna.json               # Lerna monorepo config
package.json             # Root package with Lerna & TypeDoc dependencies
package-lock.json        # Dependency lock file (will be updated)
```

**Structure Decision**: Monorepo managed by Lerna with 5 packages. Lerna and TypeDoc are root-level devDependencies. TypeDoc configuration lives in `packages/photon/typedoc.json`. All packages are linked via npm workspaces (migrating from deprecated lerna bootstrap). This upgrade affects root-level tooling dependencies, configuration files, and requires fixing pre-existing build configuration issues.

## Complexity Tracking

*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
