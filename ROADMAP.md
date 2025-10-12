# Photon Roadmap 🚀

**Status**: Draft - Will be finalized as part of rebrand (User Story 4)  
**Last Updated**: 2025-10-10

> **Photon**: A modern ES6+ JavaScript library for programmatically creating precise 2D drawings for CNC machines and laser cutters. Resurrected from Microsoft's Maker.js with modern tooling, active maintenance, and exceptional user experience.

## Vision

Photon will be the **go-to library** for makers, hobbyists, and professionals who want to programmatically generate precise 2D designs for fabrication. We prioritize:

- **Modern JavaScript**: Full ES6+ support, modern tooling
- **User Experience**: Welcoming, experiment-friendly, answers always within reach
- **Precision**: CNC/laser-grade accuracy and industry-standard formats
- **Community**: Open, collaborative, responsive to user needs

## Near-Term (3-6 months) - Foundation

### ✅ Completed
- [x] Monaco Editor integration (VS Code-like experience)
- [x] ES6+ syntax support in playground
- [x] Project constitution established
- [x] TypeScript 5.x upgrade

### 🎯 In Progress
- [ ] **Rebrand to Photon** (Current focus - see specs/001-rebrand-from-maker/)
  - Core identity and legal attribution
  - Documentation and web presence
  - Migration guide for Maker.js users
  - This roadmap document

### 📋 Planned
- [ ] **Modern Build System**
  - Migrate from Browserify to Vite
  - ES modules as primary distribution format
  - Tree-shaking support for smaller bundles
  - Source maps for better debugging

- [ ] **Enhanced Playground**
  - Live preview with real-time updates
  - Share/save designs (local storage + optional cloud)
  - Export preview before download
  - Mobile-responsive design improvements
  - Dark mode support
  - Ability to import multiple models into a space and chain them together
  - Operations/Color support for paths within models (most lasers support distinct colors of paths as distinct operations with differing speed/power settings)

- [ ] **Documentation Overhaul**
  - Interactive examples in every doc page
  - Video tutorials for common patterns
  - Searchable API reference
  - Beginner-friendly quick start guide
  - Advanced patterns cookbook

## Mid-Term (6-12 months) - Growth

### Developer Experience
- [ ] **TypeScript-First Development**
  - Rewrite core library in TypeScript (currently compiled from TS but uses namespace pattern)
  - Proper ES module exports
  - Enhanced IntelliSense and type safety
  - Generic types for extensibility

- [ ] **Plugin System**
  - Official plugin API for custom models
  - Community plugin registry
  - Hot-reload plugins in playground
  - Example plugins (parametric designs, fractals, etc.)

- [ ] **Testing Infrastructure**
  - Comprehensive unit test suite (>80% coverage)
  - Visual regression testing for geometric operations
  - Performance benchmarks
  - CI/CD pipeline with automated releases

### User Features
- [ ] **Observable-Style Notebooks** (Constitutional goal)
  - Reactive cells for iterative design
  - Inline visualization
  - Export to standalone HTML
  - Integration with Observable HQ

- [ ] **Enhanced Export Formats**
  - G-code generation for CNC
  - Improved DXF with layer support
  - PDF with multiple pages
  - PNG/JPEG raster export with anti-aliasing
  - .3mf style file that includes multiple SVG's for laser cutting along with a markdown file that describes the project and can work as labnotes for makers.

- [ ] **Material & Tool Libraries**
  - Pre-configured settings for common materials
  - Tool compensation presets
  - Kerf adjustment calculator
  - Feed rate recommendations

### Community Building
- [ ] **Community Gallery**
  - User-submitted designs
  - Voting and favorites
  - Remix/fork functionality
  - Design challenges and contests

- [ ] **Contribution Framework**
  - Clear contribution guidelines
  - Good first issue labels
  - Mentorship program for new contributors
  - Regular community calls

## Long-Term (1-2 years) - Innovation

### Advanced Features
- [ ] **3D Extrusion & Visualization**
  - Preview 3D extrusions from 2D paths
  - STL import/export improvements
  - WebGL-based 3D viewer
  - Assembly modeling (multiple parts)

- [ ] **AI-Assisted Design**
  - Natural language to design ("create a gear with 20 teeth")
  - Design optimization suggestions
  - Automatic constraint solving
  - Pattern recognition and completion

- [ ] **Collaborative Features**
  - Real-time collaborative editing
  - Design versioning and history
  - Comments and annotations
  - Team workspaces

### Platform Expansion
- [ ] **Desktop Application**
  - Electron-based standalone app
  - Offline-first functionality
  - Native file system integration
  - Hardware integration (direct machine control)

- [ ] **Mobile Apps**
  - iOS/Android apps for design viewing
  - Simple editing on tablets
  - AR preview (hold phone over material)
  - Remote monitoring of cuts

- [ ] **Cloud Services** (Optional)
  - Design storage and sync
  - Render farm for complex operations
  - API for programmatic access
  - Integration with fabrication services

### Ecosystem
- [ ] **Photon Studio** (Visual Editor)
  - Drag-and-drop interface for non-coders
  - Code generation from visual designs
  - Hybrid visual + code workflow
  - Template marketplace

- [ ] **Hardware Partnerships**
  - Verified compatibility with popular machines
  - Direct export to machine software
  - Material libraries from suppliers
  - Educational partnerships (makerspaces, schools)

## What Makes Photon Different

### From Maker.js (Original)
- ✅ **Active Maintenance**: Regular updates, bug fixes, community support
- ✅ **Modern Tooling**: Monaco Editor, ES6+, modern build system
- ✅ **Better UX**: Welcoming playground, clear docs, helpful errors
- ✅ **Community-Driven**: Open governance, responsive to user needs

### From Other CAD Tools
- **Programmatic**: Code-first approach for parametric designs
- **Lightweight**: Runs in browser, no installation required
- **Open Source**: Free, transparent, extensible
- **CNC-Focused**: Built specifically for fabrication, not general CAD
- **JavaScript**: Accessible to web developers, huge ecosystem

## Success Metrics

We'll measure Photon's success by:

- **Adoption**: npm downloads, GitHub stars, community size
- **Quality**: Test coverage, bug resolution time, documentation completeness
- **Performance**: Bundle size, operation speed, playground responsiveness
- **Community**: Contributors, plugins, gallery submissions
- **Impact**: Designs created, machines supported, educational use

## How to Contribute

We welcome contributions in many forms:

- **Code**: Features, bug fixes, performance improvements
- **Documentation**: Tutorials, examples, translations
- **Design**: UI/UX improvements, branding, graphics
- **Community**: Support users, organize events, create content
- **Testing**: Report bugs, test new features, write tests

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Feedback & Discussion

This roadmap is a living document. We want to hear from you:

- **GitHub Discussions**: Share ideas and feedback
- **GitHub Issues**: Request features or report bugs
- **Community Calls**: Join monthly planning sessions (coming soon)
- **Discord/Slack**: Real-time chat with maintainers and users (coming soon)

---

**Photon: Illuminate your designs. ✨**

*This roadmap will be finalized and moved to the root directory as part of the rebrand implementation.*
