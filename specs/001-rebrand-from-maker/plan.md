# Implementation Plan: Rebrand to Photon

**Branch**: `001-rebrand-from-maker` | **Date**: 2025-10-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-rebrand-from-maker/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Complete rebrand of Maker.js to Photon, including all package names, TypeScript namespaces, distribution files, documentation, playground interface, and legal attribution. This rebrand establishes Photon as a modern, resurrected fork of Microsoft's archived Maker.js project, with proper Apache 2.0 compliance and a clear roadmap for future development as an ES6+ CNC/laser drafting library.

**Primary Requirement**: Rename all project identity elements from "Maker.js" to "Photon" while maintaining Apache 2.0 legal compliance and creating foundation for future community growth.

**Technical Approach**: Systematic find-and-replace across codebase, build configuration updates, documentation regeneration, and creation of new branding assets. No architectural changes required - this is purely a rebrand operation.

## Technical Context

**Language/Version**: TypeScript 5.6.3 (already upgraded), JavaScript ES6+  
**Primary Dependencies**: Lerna 6.0.3 (monorepo), Vite 7.1.9 (build), Monaco Editor 0.44.0 (playground)  
**Storage**: File-based (no database required)  
**Testing**: Manual verification of rebrand completeness, build success, playground functionality  
**Target Platform**: Node.js (18.x, 20.x, 22.x LTS), Modern browsers (Chrome, Firefox, Safari, Edge last 2 versions)
**Project Type**: Monorepo library + web playground  
**Performance Goals**: Build time <2 minutes, playground load time <3 seconds, no runtime performance impact  
**Constraints**: Must maintain backward compatibility at API level (namespace mapping), zero broken links post-rebrand  
**Scale/Scope**: ~50,000 LOC across packages, ~100 documentation pages, 10+ example models, 4 package.json files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with Maker.js Constitution (`.specify/memory/constitution.md`):

- [x] **Test-Driven Development**: Verification tests defined for each rebrand aspect (package names, docs, builds)
- [x] **Specification-Driven**: 3 user stories with clear acceptance criteria (P1: Core Identity, P2: Documentation, P2: Roadmap)
- [x] **ES6+ Compatibility**: No changes to existing ES6+ support (Monaco Editor already integrated)
- [x] **Experiment-Friendly**: Playground rebrand maintains existing Monaco Editor UX
- [x] **User Experience First**: Clear README, migration notes, and roadmap for new users
- [x] **Living Documentation**: All documentation updates are core requirements (FR-007, FR-009, FR-010)
- [x] **CNC/Laser Focus**: Identity maintained - Photon name reinforces laser/CNC purpose
- [x] **Code Quality**: Existing linting/TypeScript standards maintained, no code changes required
- [x] **Performance Standards**: No performance impact - purely rebrand operation
- [x] **Versioning**: MAJOR version bump (2.0.0) for breaking package name changes

**Gate Status**: ✅ **PASSED** - All constitutional requirements met. This is a rebrand operation that maintains existing quality standards while improving project identity and documentation.

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
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```
# Existing Lerna Monorepo Structure (NO CHANGES)
packages/
├── maker.js/              # Core library → rename to photon
│   ├── src/              # TypeScript source (namespace: MakerJs → Photon)
│   ├── dist/             # Build outputs (maker.js → photon.js)
│   └── package.json      # name: "makerjs" → "photon" or "@photon/core"
├── playground/           # Web playground
│   ├── src/              # TypeScript source (namespace: MakerJsPlayground → PhotonPlayground)
│   └── package.json      # name: "makerjs-playground" → "photon-playground"
├── fonts/                # Font generation tools
│   └── package.json      # name: "makerjs-fonts" → "photon-fonts"
└── docs/                 # Documentation generator
    └── package.json      # name: "makerjs-docs" → "photon-docs"

docs/                     # Generated documentation site
├── playground/           # Playground HTML/assets
│   └── index.html        # Update branding, Monaco Editor already integrated
├── api/                  # Generated API docs
└── demos/                # Example models

.specify/                 # Project management
├── memory/
│   └── constitution.md   # Update "Maker.js" → "Photon"
└── templates/            # No changes needed

Root files to update:
├── README.md             # Primary rebrand + migration notes
├── LICENSE               # Add new copyright, retain Microsoft
├── NOTICE                # NEW: Document fork attribution
├── ROADMAP.md            # NEW: From ROADMAP_DRAFT.md
├── CONTRIBUTING.md       # Remove Microsoft CLA references
└── package.json          # Root monorepo config
```

**Structure Decision**: Existing Lerna monorepo structure is maintained. This is a **rename-in-place** operation with no architectural changes. All 4 packages will be renamed, TypeScript namespaces updated, and documentation regenerated. The playground already has Monaco Editor integrated (completed prior to rebrand).

## Complexity Tracking

*No violations - section not applicable for this rebrand operation.*

---

## Phase 0: Research (COMPLETE)

**Status**: ✅ Complete  
**Output**: [research.md](./research.md)

All technical decisions documented:
- Package naming: @photon scoped packages
- Namespace strategy: MakerJs → Photon
- Distribution files: photon.js, photon.es.js, etc.
- Legal compliance: Apache 2.0 with NOTICE file
- Documentation approach: TypeDoc regeneration + manual updates
- Build system: No changes, maintain existing Lerna + Vite + Browserify

No NEEDS CLARIFICATION items remain.

---

## Phase 1: Design & Contracts (COMPLETE)

**Status**: ✅ Complete  
**Outputs**: 
- [data-model.md](./data-model.md) - Comprehensive rename mapping
- [contracts/verification-checklist.md](./contracts/verification-checklist.md) - Automated verification scripts
- [quickstart.md](./quickstart.md) - Implementation guide

### Design Artifacts Created

**Rename Mapping** (data-model.md):
- 10 categories of renames documented
- Execution order defined (6 phases)
- Validation checklist included
- Risk mitigation strategies

**Verification Contracts** (contracts/):
- 5 automated verification scripts (bash)
- Manual verification checklist
- Success criteria mapping
- Execution instructions

**Implementation Guide** (quickstart.md):
- 7 implementation phases
- Step-by-step instructions
- Time estimates (~5.5 hours total)
- Troubleshooting guide

### Constitution Check (Post-Design)

*Re-evaluation after Phase 1 design complete:*

- [x] **Test-Driven Development**: Verification scripts provide automated testing ✅
- [x] **Specification-Driven**: Design follows spec requirements exactly ✅
- [x] **ES6+ Compatibility**: No changes to existing support ✅
- [x] **Experiment-Friendly**: Playground rebrand maintains UX ✅
- [x] **User Experience First**: Clear guides and migration path ✅
- [x] **Living Documentation**: All docs updated as part of plan ✅
- [x] **CNC/Laser Focus**: Identity reinforced through Photon name ✅
- [x] **Code Quality**: Verification scripts enforce quality ✅
- [x] **Performance Standards**: No performance impact ✅
- [x] **Versioning**: 2.0.0 MAJOR version confirmed ✅

**Final Gate Status**: ✅ **PASSED** - Ready for implementation (Phase 2: Tasks)

---

## Summary

**Planning Complete**: All design artifacts created and validated.

**Next Step**: Run `/speckit.tasks` to generate detailed task breakdown for implementation.

**Key Deliverables**:
1. ✅ Technical context documented
2. ✅ Constitution compliance verified (twice)
3. ✅ Research decisions documented
4. ✅ Rename mapping complete
5. ✅ Verification contracts created
6. ✅ Implementation guide ready

**Estimated Implementation Time**: 5.5 hours following quickstart guide

**Risk Level**: Low - straightforward rebrand with clear execution path
