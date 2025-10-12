# Photon Rebrand - Specification Summary

**Branch**: `001-rebrand-from-maker`  
**Status**: ✅ Specification Complete - Ready for Planning  
**Created**: 2025-10-10

## Overview

This specification defines the complete rebrand of Maker.js to **Photon** - a modern, resurrected fork that honors its Microsoft origins while establishing a new identity for the future.

## Why "Photon"?

- **Laser Reference**: Clever nod to the CNC/laser cutting focus (photons = light particles)
- **Modern & Clean**: Short, memorable, professional
- **Future-Forward**: Signals a fresh start and modern approach
- **Available**: Can be secured as npm package name

## Three User Stories (Prioritized)

### P1: Core Identity Rebrand 🎯 **MVP**
**Goal**: Establish legal and branding foundation

- Rename all packages to "photon" or "@photon" scope
- Update TypeScript namespaces from "MakerJs" to "Photon"
- Rename distribution files (photon.js, photon.es.js, photon.umd.js)
- Create proper Apache 2.0 attribution (LICENSE + NOTICE files)
- Update README with clear Photon identity and Maker.js origins
- Include brief migration notes in README (package name mapping)

**Why P1**: Nothing else can proceed without this foundation. This alone delivers a functional rebrand.

### P2: Documentation & Web Presence
**Goal**: Consistent user experience across all touchpoints

- Update all documentation pages with Photon branding
- Rebrand playground interface
- Update all code examples to use Photon package names
- Regenerate API documentation
- Update meta tags and SEO elements

**Why P2**: After identity is established, documentation is the primary user touchpoint.

### P2: Future Roadmap
**Goal**: Communicate vision and attract contributors

- Create ROADMAP.md with near/mid/long-term goals
- Emphasize modern JavaScript, UX, and CNC/laser focus
- Explain how to contribute and influence direction
- Articulate what makes Photon different from Maker.js

**Why P2**: With minimal existing Maker.js users, focus shifts to attracting new users and contributors through clear vision.

## Key Requirements Highlights

### Legal & Attribution (Apache 2.0 Compliant)
- ✅ Retain Microsoft's original copyright (2015-2016)
- ✅ Add new maintainer copyright (2025+)
- ✅ Create NOTICE file documenting the fork
- ✅ Maintain Apache 2.0 license
- ✅ Remove Microsoft CLA references (establish own contribution policy)

### Technical Scope

- 18 functional requirements covering all rebrand aspects
- Package names, namespaces, distribution files
- Documentation, examples, playground
- Brief migration notes in README (not full guide)
- Roadmap and constitution updates

### Success Metrics

- 100% package name consistency
- 100% documentation branding
- Zero broken links
- README migration section with clear package name mapping
- 10+ working example models
- Apache 2.0 compliance verified
- 30-second README comprehension for new visitors

## Edge Cases Identified

- **URL Redirects**: Old Maker.js bookmarks need redirect strategy
- **NPM Conflicts**: Check "photon" availability, consider @photon scope
- **Backward Compatibility**: Strategy for projects that can't migrate immediately
- **SEO**: Handle search results still pointing to Maker.js
- **Legal**: Maintain respectful attribution (Apache 2.0 allows fork)

## Assumptions

- NPM package name "photon" or "@photon/core" is available
- Maker.js has minimal active usage (no extensive migration support needed)
- Rebrand will be released as v2.0.0 (major version for breaking changes)
- GitHub repo stays at current location with updated description
- Existing Maker.js demos preserved with "archived" labels
- Focus is on attracting new users rather than migrating existing ones

## What Makes This Spec Strong

1. **Independently Testable Stories**: Each user story can be implemented and verified standalone
2. **Clear Prioritization**: P1 delivers MVP, P2-P3 add value incrementally
3. **Measurable Success**: Concrete metrics (100%, zero, 15 minutes, 10+, 30 seconds)
4. **Legal Clarity**: Apache 2.0 compliance requirements explicit
5. **User-Focused**: Written for maintainers, new users, existing users, contributors
6. **Edge Cases Addressed**: Realistic concerns identified early
7. **No Implementation Details**: Focuses on WHAT, not HOW

## Next Steps

### Immediate
1. ✅ Specification complete and validated
2. **Next**: Run `/speckit.plan` to create implementation plan
3. **Then**: Run `/speckit.tasks` to generate task breakdown

### Planning Phase Will Define
- Exact file paths and rename strategy
- Build process updates
- Testing approach for rebrand verification
- Rollout and communication strategy
- Timeline and milestones

## Alignment with Photon Constitution

This rebrand **perfectly aligns** with the newly created Photon Constitution:

- ✅ **Test-Driven**: Spec includes testable acceptance criteria
- ✅ **Spec-Driven**: This document itself demonstrates the principle
- ✅ **ES6+ Focus**: Roadmap will emphasize modern JavaScript
- ✅ **Experiment-Friendly**: Monaco Editor already integrated
- ✅ **User Experience First**: Migration guide and clear documentation prioritized
- ✅ **Living Documentation**: Documentation updates are core requirements
- ✅ **CNC/Laser Purpose**: Identity maintained, just with new name

## Vision Statement

**Photon is the modern resurrection of Maker.js** - a powerful ES6+ JavaScript library for programmatically creating precise 2D drawings for CNC machines and laser cutters. Born from Microsoft's archived Maker.js project, Photon brings modern tooling (Monaco Editor, ES6+ support), active maintenance, and a welcoming user experience to the maker community.

**Photon: Illuminate your designs. ✨**

---

**Ready to proceed?** Run `/speckit.plan` to begin implementation planning!
