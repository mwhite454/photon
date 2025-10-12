# Data Model: Rebrand Rename Mapping

**Feature**: Rebrand from Maker.js to Photon  
**Phase**: 1 - Design  
**Date**: 2025-10-10

## Overview

For a rebrand operation, the "data model" is actually a comprehensive rename mapping that documents every file, namespace, package, and identifier that needs to change from "Maker.js" / "makerjs" / "MakerJs" to "Photon" / "photon" / "Photon".

## Rename Categories

### 1. NPM Package Names

| Current | New | File Location |
|---------|-----|---------------|
| `makerjs` | `@photon/core` | `/packages/maker.js/package.json` |
| `makerjs-playground` | `@photon/playground` | `/packages/playground/package.json` |
| `makerjs-fonts` | `@photon/fonts` | `/packages/fonts/package.json` |
| `makerjs-docs` | `@photon/docs` | `/packages/docs/package.json` |
| `makerjs-dev` (root) | `photon-dev` | `/package.json` |

**Impact**: Breaking change - requires MAJOR version bump (2.0.0)

### 2. TypeScript Namespaces

| Current | New | Scope |
|---------|-----|-------|
| `MakerJs` | `Photon` | Core library (`/packages/maker.js/src/**/*.ts`) |
| `MakerJsPlayground` | `PhotonPlayground` | Playground (`/packages/playground/src/**/*.ts`) |

**Pattern**: `namespace MakerJs` → `namespace Photon`

**Files Affected**: ~50 TypeScript source files

### 3. Distribution File Names

| Current | New | Location |
|---------|-----|----------|
| `browser.maker.js` | `browser.photon.js` | `/packages/maker.js/dist/` |
| `maker.es.js` | `photon.es.js` | `/packages/maker.js/dist/` |
| `maker.umd.js` | `photon.umd.js` | `/packages/maker.js/dist/` |
| `maker.d.ts` | `photon.d.ts` | `/packages/maker.js/dist/` |
| `index.js` | `index.js` | No change (internal) |

**Build Config Updates**: Vite config, Browserify scripts, TypeScript outFile

### 4. Directory Names

| Current | New | Parent |
|---------|-----|--------|
| `/packages/maker.js/` | `/packages/photon/` | `/packages/` |

**Note**: Other package directories keep generic names (playground, fonts, docs)

### 5. Global Variables (Browser)

| Current | New | Context |
|---------|-----|---------|
| `window.makerjs` | `window.photon` | UMD bundle |
| `var makerjs = require('makerjs')` | `var photon = require('@photon/core')` | Playground examples |

**Files Affected**: `/docs/playground/index.html`, example models, documentation snippets

### 6. Documentation References

| Current | New | Scope |
|---------|-----|-------|
| "Maker.js" | "Photon" | All prose documentation |
| "maker.js" | "photon" | Code examples, CLI commands |
| "MakerJs" | "Photon" | API references, TypeScript examples |
| "makerjs" | "@photon/core" or "photon" | Package installation instructions |

**Files Affected**: ~100 markdown files in `/docs/`, README.md, CONTRIBUTING.md

### 7. URLs & Links

| Current | New | Type |
|---------|-----|------|
| `maker.js.org` | `photon.js.org` (or keep existing) | Domain |
| `/docs/api/modules/makerjs.html` | `/docs/api/modules/photon.html` | Generated API docs |
| GitHub topics: `makerjs` | Add: `photon`, `photonjs` | Repository metadata |

**Decision**: Keep existing domain initially, add redirect/alias to new domain if acquired

### 8. Code Comments & Strings

| Pattern | Replacement | Scope |
|---------|-------------|-------|
| `// Maker.js` | `// Photon` | Comment headers |
| `"Maker.js"` | `"Photon"` | String literals in code |
| `'makerjs'` | `'@photon/core'` | Import/require strings |

**Files Affected**: All `.ts`, `.js`, `.html` files

### 9. Configuration Files

| File | Changes |
|------|---------|
| `tsconfig.json` | Update `outFile` paths if they reference "maker" |
| `vite.config.ts` | Update output file names |
| `lerna.json` | Update package references if needed |
| `.gitignore` | No changes needed |
| `package-lock.json` | Will regenerate after package.json updates |

### 10. Legal & Attribution Files

| File | Action |
|------|--------|
| `LICENSE` | Add dual copyright header |
| `NOTICE` | **CREATE NEW** - Document fork attribution |
| `CONTRIBUTING.md` | Remove Microsoft CLA references |
| `README.md` | Add "Origins" section, update all branding |
| `ROADMAP.md` | **CREATE NEW** - Move from ROADMAP_DRAFT.md |

## Rename Execution Order

To minimize build errors, renames must follow this sequence:

### Phase 1: Preparation
1. ✅ Create NOTICE file
2. ✅ Update LICENSE with dual copyright
3. ✅ Create ROADMAP.md from draft
4. ✅ Update constitution.md references

### Phase 2: Package Renames
5. Update all 5 package.json files (name fields)
6. Update package.json dependencies (if packages reference each other)
7. Run `npm install` to regenerate lock files

### Phase 3: Source Code Renames
8. Rename `/packages/maker.js/` → `/packages/photon/`
9. Find/replace TypeScript namespaces in all `.ts` files
10. Update import/require statements
11. Update build configuration files

### Phase 4: Build & Distribution
12. Run `npm run build` to verify compilation
13. Verify output file names in dist/ directories
14. Update CDN deployment scripts if any

### Phase 5: Documentation
15. Regenerate API documentation (TypeDoc)
16. Find/replace in all markdown files
17. Update code examples in documentation
18. Update playground example models
19. Test playground functionality

### Phase 6: Repository Metadata
20. Update README.md with new branding
21. Update CONTRIBUTING.md
22. Update GitHub repository description
23. Update GitHub topics/tags
24. Update any CI/CD configuration

## Validation Checklist

After all renames, verify:

- [ ] All 5 packages build successfully
- [ ] No references to "makerjs" in package.json files (except devDependencies if needed)
- [ ] No "MakerJs" namespace references in TypeScript
- [ ] Distribution files have "photon" names
- [ ] Playground loads and displays "Photon" branding
- [ ] At least 10 example models work correctly
- [ ] API documentation generated successfully
- [ ] No broken links in documentation
- [ ] LICENSE and NOTICE files present and correct
- [ ] README clearly identifies as Photon with attribution
- [ ] ROADMAP.md present in root directory

## Risk Mitigation

**Risks**:
1. **Broken builds**: Missed reference causes compilation failure
2. **Broken links**: Documentation links point to old paths
3. **NPM conflicts**: @photon scope not available
4. **User confusion**: Unclear migration path

**Mitigations**:
1. Follow execution order strictly, test after each phase
2. Use link checker tool after documentation updates
3. Verify NPM availability before starting (fallback to @photonjs)
4. Include clear migration notes in README

## Success Criteria Mapping

This rename mapping directly supports spec success criteria:

- **SC-001**: 100% package names → Tracked in section 1
- **SC-002**: 100% documentation branding → Tracked in section 6
- **SC-003**: Zero broken links → Validation checklist item
- **SC-004**: README migration section → Section 10, README updates
- **SC-005**: Build outputs → Section 3, distribution files
- **SC-006**: Playground branding → Section 5, global variables
- **SC-007**: 10+ examples work → Validation checklist item
- **SC-008**: LICENSE/NOTICE compliance → Section 10, legal files
- **SC-009**: README clarity → Section 10, README updates
- **SC-010**: Roadmap goals → Section 10, ROADMAP.md creation

## Next Steps

With rename mapping complete, proceed to:
1. Create verification contracts (automated checks)
2. Create quickstart guide for implementation
3. Begin Phase 2: Task generation (`/speckit.tasks`)
