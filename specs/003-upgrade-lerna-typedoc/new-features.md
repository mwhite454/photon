# New Features Available: Lerna v8 & TypeDoc v0.28

**Created**: 2025-10-12  
**Feature**: Upgrade Lerna & TypeDoc to Latest Versions  
**Purpose**: Document new features and capabilities available after upgrade

---

## Executive Summary

This document catalogs new features and improvements available in Lerna v8.2.4 and TypeDoc v0.28.14 that could enhance the Photon project's development workflow, documentation quality, and build performance.

**Key Highlights**:
- **Lerna v8**: Nx-powered task execution with caching, distributed builds, improved workspace management
- **TypeDoc v0.28**: ESM support, enhanced markdown features, better type documentation, multiple output formats

---

## Lerna v8.x New Features

### 1. Nx-Powered Task Execution (v6+)

**Status**: ✅ Already Active (Lerna v6+ delegates to Nx)

Lerna v6+ uses Nx's task runner under the hood, providing:

- **Computation Caching**: Never build/test the same thing twice
  - Local cache speeds up repeated builds
  - Shareable cache across team and CI
  - Automatic cache invalidation based on file changes
  
- **Parallel Execution**: Intelligent task scheduling
  - Runs tasks in optimal order respecting dependencies
  - Maximizes CPU utilization
  - Significantly faster than sequential execution

- **Task Distribution**: Scale across multiple machines
  - Zero-configuration distributed task execution (DTE)
  - Can make CI 20x faster for large monorepos
  - Preserves local dev ergonomics

**Applicability to Photon**: 
- ✅ Already benefiting from this (Lerna v8 installed)
- Could enable distributed execution for CI if build times become an issue
- Cache sharing could speed up local development

**Documentation**: [Lerna Task Running](https://lerna.js.org/docs/features/run-tasks)

---

### 2. Improved Workspace Management (v7+)

**Status**: ✅ Migrated (npm workspaces now used)

Lerna v7+ fully embraces npm/yarn/pnpm workspaces:

- **Native Workspace Support**: Uses package manager's workspace features
- **Deprecated Commands Removed**: `lerna bootstrap`, `lerna add`, `lerna link` removed in v7
- **Simplified Configuration**: Less Lerna-specific configuration needed
- **Better Performance**: Leverages native package manager optimizations

**Applicability to Photon**:
- ✅ Already migrated (workspaces field added to package.json)
- ✅ Bootstrap script updated to use `npm install`
- No further action needed

**Migration Guide**: [Legacy Package Management](https://lerna.js.org/docs/legacy-package-management)

---

### 3. Enhanced Version Management (v8.2.4)

**New in v8.2.4**: Workspace specifier updates in peerDependencies

- **Automatic Peer Dependency Updates**: `lerna version` now updates workspace specifiers in peerDependencies
- **Better Monorepo Versioning**: Keeps internal package references in sync
- **Reduced Manual Updates**: Less manual package.json editing needed

**Applicability to Photon**:
- 🟡 Potentially useful if packages have peer dependencies on each other
- Current project structure doesn't heavily use peer dependencies
- Could be valuable if architecture changes

**Feature PR**: [#4203](https://github.com/lerna/lerna/issues/4203)

---

### 4. Project Graph Visualizer

**Status**: Available in Lerna v6+

Interactive visualization of monorepo structure:

- **Dependency Graph**: Visual representation of package dependencies
- **Task Dependencies**: Shows which tasks depend on others
- **Interactive Exploration**: Click to explore relationships
- **Debugging Aid**: Helps understand complex monorepo structures

**Applicability to Photon**:
- 🟢 **Recommended for exploration**: Could help visualize package relationships
- Useful for onboarding new contributors
- Helps identify circular dependencies

**Usage**: `npx lerna graph` or `npx nx graph`

**Documentation**: [Project Graph](https://lerna.js.org/docs/features/project-graph)

---

### 5. Publishing Improvements (v8.x)

**New Features**:

- **Summary File Support**: Full file path support for `--summary-file` (v8.1.9)
- **Publishing Throttling**: Control rate of npm publishes (v8.1.8)
- **README File Names**: Ensures README file names are populated on package.json (v9.0.0 backported)

**Applicability to Photon**:
- 🟡 Useful if publishing workflow needs optimization
- Throttling could prevent npm rate limiting
- Summary files useful for CI/CD pipelines

**Feature PRs**: [#4039](https://github.com/lerna/lerna/issues/4039), [#4013](https://github.com/lerna/lerna/issues/4013)

---

### 6. Configuration Improvements

**New in v8.x**:

- **Extends Property**: Support for extending lerna.json configurations (v8.1.9)
- **Cosmiconfig v9**: Better configuration file discovery (v8.1.9)
- **Schema Validation**: Improved configuration validation

**Applicability to Photon**:
- 🟡 Could simplify configuration if multiple environments needed
- Useful for shared configurations across projects
- Not immediately needed for current setup

---

### 7. Nx Integration Features

**Available via Nx**:

- **Affected Commands**: Only run tasks for changed packages
  - `lerna run build --since HEAD~1`
  - Speeds up CI by skipping unchanged packages
  
- **Task Pipelines**: Define task dependencies declaratively
  - Ensure builds run before tests
  - Automatic parallelization where safe

- **Remote Caching**: Share cache across team and CI
  - Requires Nx Cloud (free tier available)
  - Can dramatically speed up CI

**Applicability to Photon**:
- 🟢 **Recommended**: `--since` flag could speed up CI
- Remote caching could benefit team collaboration
- Task pipelines could formalize build order

**Documentation**: [Nx Features](https://nx.dev/features)

---

## TypeDoc v0.28.x New Features

### 1. ESM Support (v0.27.0)

**Status**: ✅ Active (TypeDoc v0.28.14 installed)

TypeDoc v0.27+ is now pure ESM:

- **Modern Module System**: Uses ES modules natively
- **Better Tree Shaking**: Smaller bundle sizes for plugins
- **Future-Proof**: Aligns with JavaScript ecosystem direction

**Applicability to Photon**:
- ✅ Already active (TypeDoc v0.28.14 installed)
- No breaking changes observed in our usage
- Enables use of ESM-only TypeDoc plugins

**Breaking Change**: Requires Node.js with ESM support (already met)

---

### 2. Enhanced Markdown Features (v0.27.0)

**New Capabilities**:

- **Alerts/Callouts**: GitHub-style alerts in markdown
  ```markdown
  > [!NOTE]
  > Useful information
  
  > [!WARNING]
  > Critical content
  ```

- **Anchor Links in Relative Links**: Link to specific headings in other markdown files
  ```markdown
  [See installation](./guide.md#installation)
  ```

- **Include Files**: Embed external files in comments
  ```typescript
  /**
   * @include ./examples/usage.md
   * @includeCode ./examples/example.ts
   */
  ```

**Applicability to Photon**:
- 🟢 **Recommended**: Could significantly improve documentation quality
- Alerts could highlight important API notes
- Include files could reduce duplication in examples
- Anchor links improve cross-document navigation

**Documentation**: [TypeDoc Markdown](https://typedoc.org/guides/markdown/)

---

### 3. Advanced Type Documentation (v0.27.0)

**New Tags**:

- **`@expand`**: Inline type properties where referenced
  ```typescript
  /** @expand */
  interface Options {
    // Properties will be shown inline wherever Options is used
  }
  ```

- **`@inline`**: Resolve and inline type aliases
  ```typescript
  /** @inline */
  type Config = { ... }
  ```

- **`@useDeclaredType`**: Improve type alias documentation
  ```typescript
  /** @useDeclaredType */
  type ComplexType = ...
  ```

- **`@mergeModuleWith`**: Merge module contents with another module
  ```typescript
  /** @mergeModuleWith core */
  namespace extensions { ... }
  ```

**Applicability to Photon**:
- 🟢 **Recommended for complex types**: Could improve API documentation clarity
- `@expand` useful for frequently used configuration objects
- `@mergeModuleWith` could organize namespace exports better
- ⚠️ Use sparingly - can significantly increase doc size

**Documentation**: [TypeDoc Tags](https://typedoc.org/tags/)

---

### 4. Improved Parameter Documentation (v0.27.0)

**Enhanced `@param` Support**:

- **Nested Object Properties**: Document nested properties in parameters
  ```typescript
  /**
   * @param options - Configuration object
   * @param options.width - Width in pixels
   * @param options.height - Height in pixels
   */
  function create(options: { width: number; height: number }) {}
  ```

- **Type Alias Properties**: Highlight important properties on referenced types
  ```typescript
  /**
   * @param config - Configuration
   * @param config.precision - Important: affects output quality
   */
  function process(config: Config) {}
  ```

**Applicability to Photon**:
- 🟢 **Highly Recommended**: Photon has many functions with complex option objects
- Would improve API documentation significantly
- Particularly useful for maker functions with configuration parameters

**Example Use Case**: Document `makerjs.model.move()` options, path options, etc.

---

### 5. Multiple Output Formats (v0.27.0)

**New `outputs` Option**:

Generate documentation in multiple formats in one run:

```json
{
  "outputs": [
    { "format": "html", "out": "docs/html" },
    { "format": "json", "out": "docs/api.json" },
    { "format": "markdown", "out": "docs/markdown" }
  ]
}
```

**Applicability to Photon**:
- 🟡 Could be useful for multiple documentation targets
- JSON output useful for custom documentation tools
- Markdown output could integrate with existing docs site
- Not immediately needed but good to know

**Documentation**: [TypeDoc Outputs](https://typedoc.org/options/output/)

---

### 6. Automatic Entry Point Discovery (v0.27.0)

**New Feature**: Discovers entry points from package.json exports

- **Zero Configuration**: Automatically finds entry points from `exports` field
- **Package.json Driven**: Uses standard package.json conventions
- **Reduces Boilerplate**: No need to manually specify entry points

**Applicability to Photon**:
- 🟡 Could simplify TypeDoc configuration
- Requires package.json exports field (not currently used)
- Would need to restructure package.json to benefit

**Documentation**: [Entry Points](https://typedoc.org/options/input/#entrypoints)

---

### 7. Enhanced Tag Support (v0.28.x)

**New in v0.28.x**:

- **`@sortStrategy`**: Override sort order for specific reflections (v0.28.7)
- **`@this` Tag**: Support for `this` parameters in JS files (v0.28.14)
- **`preservedTypeAnnotationTags`**: Keep type annotations for specific tags (v0.28.14)
- **`excludePrivateClassFields`**: Hide `#private` while showing `private` (v0.28.14)

**Applicability to Photon**:
- 🟢 `@sortStrategy` could improve API organization
- `excludePrivateClassFields` useful if using private fields
- Type annotation preservation useful for custom documentation tools

---

### 8. Improved Link Resolution (v0.28.x)

**Enhancements**:

- **Better Relative Links**: Improved handling of relative paths
- **Package Directory Links**: Resolve paths relative to package root
- **Export Specifier Comments**: Check comments on export specifiers
- **Improved Warnings**: Better messaging for unresolved links

**Applicability to Photon**:
- ✅ Already benefiting from this
- Improved link resolution reduces broken documentation links
- Better warnings help catch documentation issues

---

### 9. Configuration Options (v0.27.0)

**New Options**:

- **`notRenderedTags`**: Hide tags from output but keep in data
- **`groupReferencesByType`**: Group references by type
- **`navigation.excludeReferences`**: Control reference visibility in navigation
- **`useFirstParagraphOfCommentAsSummary`**: Configure summary extraction
- **`favicon`**: Specify custom favicon

**Applicability to Photon**:
- 🟢 `notRenderedTags` useful for internal documentation tags
- `favicon` could add branding to documentation
- Navigation options could improve large API documentation

---

## Recommended Enhancements for Photon

Based on the available features, here are 1-2 optional enhancements that would provide immediate value:

### Enhancement 1: Enable Lerna Task Caching 🟢 RECOMMENDED

**What**: Configure Nx caching for Lerna tasks to speed up builds

**Why**: 
- Speeds up repeated builds significantly
- Reduces CI time by skipping unchanged packages
- Free performance improvement with minimal configuration

**How**:
1. Create `nx.json` in project root:
```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test", "docs"]
      }
    }
  }
}
```

2. Test caching:
```bash
npm run build    # First run - no cache
npm run build    # Second run - should use cache
```

**Effort**: Low (5-10 minutes)  
**Impact**: High (significant build time reduction)  
**Risk**: Very Low (non-breaking, can be disabled)

---

### Enhancement 2: Improve API Documentation with Enhanced Markdown 🟢 RECOMMENDED

**What**: Use TypeDoc v0.28's enhanced markdown features to improve documentation

**Why**:
- Makes documentation more readable and professional
- Highlights important information with alerts
- Reduces duplication with include files

**How**:
1. Add alerts to important API notes:
```typescript
/**
 * Create a new model
 * 
 * > [!WARNING]
 * > This function modifies the input model in place
 * 
 * > [!NOTE]
 * > Use `clone()` first if you need to preserve the original
 */
```

2. Use `@param` for nested options:
```typescript
/**
 * @param options - Configuration options
 * @param options.units - Units for measurements (mm, inch, etc.)
 * @param options.precision - Decimal precision for output
 */
```

3. Create reusable examples with `@include`:
```typescript
/**
 * @include ./examples/basic-usage.md
 */
```

**Effort**: Medium (1-2 hours to update key documentation)  
**Impact**: High (significantly improved documentation quality)  
**Risk**: Very Low (backward compatible, progressive enhancement)

---

## Testing Plan for Enhancement 1 (Task Caching)

To validate Lerna/Nx caching integration, we can run a simple test:

**Test Steps**:
1. Create minimal `nx.json` configuration
2. Run `npm run build` and measure time
3. Run `npm run build` again and verify cache usage
4. Modify a single package and verify only that package rebuilds
5. Remove `nx.json` if issues arise (easy rollback)

**Success Criteria**:
- Second build completes in <10% of first build time
- Cache invalidation works correctly when files change
- No build errors or warnings introduced

---

## Future Opportunities

Features to consider for future improvements:

### Lerna Features
- **Distributed Task Execution**: If CI times become problematic
- **Remote Caching**: If team grows and build times increase
- **Project Graph Visualization**: For onboarding and architecture documentation

### TypeDoc Features
- **Multiple Output Formats**: If custom documentation tools are needed
- **Advanced Type Tags** (`@expand`, `@inline`): For complex API documentation
- **Automatic Entry Points**: If package.json structure changes

---

## Version Compatibility Notes

**Lerna v8.2.4**:
- ✅ Requires Node.js 18+ (met: project uses Node.js 18/20/22)
- ✅ Compatible with npm workspaces (already configured)
- ✅ No breaking changes from v6.0.3 that affect this project

**TypeDoc v0.28.14**:
- ✅ Requires TypeScript 5.0+ (met: project uses TypeScript 5.6.3)
- ✅ ESM-only (compatible with current Node.js versions)
- ⚠️ Anchor format changed (may affect external links to docs)
- ⚠️ File name structure may differ (verify after upgrade)

---

## References

### Lerna Documentation
- [Official Documentation](https://lerna.js.org/docs/introduction)
- [Task Running](https://lerna.js.org/docs/features/run-tasks)
- [Version & Publish](https://lerna.js.org/docs/features/version-and-publish)
- [Project Graph](https://lerna.js.org/docs/features/project-graph)
- [Release Notes](https://github.com/lerna/lerna/releases)

### TypeDoc Documentation
- [Official Documentation](https://typedoc.org/)
- [Markdown Guide](https://typedoc.org/guides/markdown/)
- [Tags Reference](https://typedoc.org/tags/)
- [Options Reference](https://typedoc.org/options/)
- [Release Notes](https://github.com/TypeStrong/typedoc/releases)

### Nx Documentation (Lerna's Task Runner)
- [Nx Features](https://nx.dev/features)
- [Caching](https://nx.dev/features/cache-task-results)
- [Distributed Execution](https://nx.dev/ci/features/distribute-task-execution)

---

## Changelog

- **2025-10-12**: Initial documentation created
  - Documented Lerna v8.x features (v6.0.3 → v8.2.4)
  - Documented TypeDoc v0.28.x features (v0.26.0 → v0.28.14)
  - Identified 2 recommended enhancements
  - Created testing plan for task caching enhancement
