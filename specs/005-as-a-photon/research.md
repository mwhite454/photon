# Phase 0: Research & Technical Decisions

**Feature**: Local Development Site Preview & Defect Inventory  
**Date**: 2025-10-13  
**Status**: Complete

## Research Tasks

### 1. Jekyll Integration with Express Server

**Decision**: Use child_process to run Jekyll build, then serve `_site` output via Express

**Rationale**:

- Jekyll is already configured in `docs/_config.yml`
- Express server (`playground-server.js`) already serves static files from `docs/`
- Jekyll generates static HTML to `docs/_site/` directory
- Express can serve pre-built `_site` instead of raw templates

**Alternatives Considered**:

- **Jekyll serve directly**: Rejected because we need Express for playground API endpoints
- **Jekyll watch mode**: Rejected because adds complexity; one-time build on startup is sufficient
- **Alternative static site generator**: Rejected because Jekyll is already configured and working on production

**Implementation Approach**:

1. Add Jekyll build step to server startup
2. Modify Express static middleware to serve `_site` directory
3. Add file watcher to trigger Jekyll rebuild on template changes
4. Provide clear error messages if Jekyll is not installed

### 2. Jekyll Version & Upgrade Strategy

**Decision**: Upgrade to Jekyll 4.4.1 (latest stable) using Bundler for dependency management

**Rationale**:

- Current project has no Gemfile, suggesting Jekyll may be outdated or not properly managed
- Jekyll 4.4.1 (released 2024) includes important bug fixes and security updates
- Using Bundler ensures consistent versions across development environments
- Jekyll 4.x requires Ruby >= 2.7.0, which is widely available

**Version Details**:

- **Target Version**: Jekyll 4.4.1
- **Ruby Requirement**: >= 2.7.0
- **Key Dependencies**:
  - `webrick ~> 1.8` (required for Ruby 3.0+, as webrick was removed from stdlib)
  - Standard Jekyll dependencies will be resolved by Bundler

**Migration Approach**:

1. Create `docs/Gemfile` with explicit Jekyll version
2. Run `bundle install` to generate lockfile
3. Update all scripts to use `bundle exec jekyll` instead of `jekyll`
4. Test build process with new version
5. Document Ruby/Bundler prerequisites in README

**Alternatives Considered**:

- **Keep existing Jekyll version**: Rejected due to security concerns and missing dependency management
- **Use GitHub Pages gem**: Rejected because we're not constrained by GitHub Pages version limits
- **Jekyll 3.x**: Rejected because 4.x has been stable since 2019 and includes performance improvements

### 3. Jekyll Installation & Setup

**Decision**: Document Jekyll/Bundler as prerequisites with installation instructions for all platforms

**Rationale**:

- Jekyll requires Ruby runtime
- Different installation methods per platform (macOS, Linux, Windows)
- Better to document clearly than bundle Ruby/Jekyll with Node.js project
- Bundler ensures consistent gem versions across environments

**Installation Methods**:

- **macOS**: `gem install bundler` (Ruby pre-installed), then `bundle install` in docs/
- **Linux**: `sudo apt-get install ruby-full build-essential && gem install bundler`, then `bundle install`
- **Windows**: Use RubyInstaller + DevKit, then `gem install bundler`, then `bundle install`

**Verification**: Add startup check that fails gracefully if Jekyll/Bundler is not found

### 3. Playwright Browser Automation via MCP

**Decision**: Use mcp-playwright MCP server for automated site crawling

**Rationale**:
- MCP server already available in development environment
- Provides browser automation without additional dependencies
- Can capture screenshots, console errors, network requests
- Supports headless mode for CI/CD integration

**Capabilities Needed**:
- Navigate to pages via URL
- Extract page content and structure
- Capture console errors and warnings
- Take screenshots for visual comparison
- Extract CSS computed styles
- Detect missing resources (404s)

**Implementation Approach**:
1. Create crawler script that uses mcp-playwright tools
2. Start at homepage, discover all documentation links
3. Visit each page and collect defect data
4. Generate structured report from collected data

### 4. Local vs Production Comparison Strategy

**Decision**: Crawl both sites independently, then diff the results

**Rationale**:
- Production site (maker.js.org) is the source of truth
- Local site should match production styling and structure
- ES6 upgrade may cause content differences (acceptable)
- Styling differences indicate bugs (not acceptable)

**Comparison Dimensions**:
1. **Page Availability**: All production pages should exist locally
2. **CSS Loading**: Same stylesheets should load on both sites
3. **Visual Rendering**: Screenshots should be similar (allowing for content differences)
4. **Console Errors**: Local should have zero errors, production baseline
5. **Resource Loading**: No 404s for CSS, JS, images, fonts

**Diff Strategy**:
- Generate page inventory for both sites
- Compare CSS file lists and loading status
- Flag pages that exist in production but not locally
- Flag console errors unique to local site
- Create side-by-side screenshot comparisons

### 5. Defect Inventory Schema

**Decision**: Use structured JSON with markdown report generation

**Rationale**:
- JSON enables programmatic processing and filtering
- Markdown provides human-readable report
- Categorization enables prioritization
- Severity levels guide fix order

**Schema Structure**:
```json
{
  "timestamp": "ISO-8601 datetime",
  "sites": {
    "local": "http://localhost:3000",
    "production": "http://maker.js.org"
  },
  "summary": {
    "totalPages": 70,
    "pagesWithDefects": 15,
    "totalDefects": 42,
    "bySeverity": {
      "critical": 5,
      "high": 12,
      "medium": 20,
      "low": 5
    },
    "byType": {
      "missingStyles": 10,
      "brokenLinks": 8,
      "consoleErrors": 15,
      "missingContent": 9
    }
  },
  "defects": [
    {
      "id": "DEF-001",
      "page": "/docs/getting-started/",
      "type": "missingContent",
      "severity": "critical",
      "description": "Page shows snippet references instead of rendered content",
      "expected": "Rendered documentation with code examples",
      "actual": "Raw snippet_titles: [Try it now, For the browser, For Node.js]",
      "screenshot": "screenshots/def-001.png",
      "consoleErrors": ["Failed to load resource: _snippets/try-it-now.html"],
      "reproduction": "1. Start server\n2. Navigate to /docs/getting-started/\n3. Observe raw template"
    }
  ]
}
```

### 6. Performance Optimization

**Decision**: Parallel page crawling with concurrency limit

**Rationale**:
- ~70 pages would take too long serially
- Parallel crawling reduces total time
- Concurrency limit prevents overwhelming the server

**Implementation**:
- Use Promise.all with batching (10 concurrent pages)
- Estimated time: 70 pages / 10 concurrent * 3s per page = ~21 seconds
- Well under 5-minute target

### 7. Error Handling & Resilience

**Decision**: Continue crawling on individual page failures, report failures as defects

**Rationale**:
- One broken page shouldn't stop entire inventory
- Page load failures are themselves defects to report
- Partial results are better than no results

**Error Categories**:
- **Navigation failures**: Page doesn't load (timeout, 404, 500)
- **Rendering failures**: Page loads but JavaScript errors prevent rendering
- **Resource failures**: Page loads but CSS/images/fonts fail to load

## Technology Stack Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Static Site Generator | Jekyll | Process documentation templates |
| Web Server | Express.js | Serve documentation and playground |
| Browser Automation | Playwright (via MCP) | Crawl sites and collect defects |
| File Watching | Chokidar | Trigger Jekyll rebuild on changes |
| Report Format | JSON + Markdown | Structured data + human-readable |
| Testing | Mocha + Playwright | Test automation scripts |

## Dependencies to Add

```json
{
  "devDependencies": {
    "mocha": "^10.0.0",  // Already installed
    "playwright": "^1.56.0"  // Already installed
  }
}
```

No new dependencies required - all tools already available.

## Setup Prerequisites

1. **Ruby**: Required for Jekyll (version 2.5.0 or higher)
2. **Jekyll**: `gem install jekyll bundler`
3. **Node.js**: Already required (LTS version)
4. **Playwright browsers**: `npx playwright install` (if not already installed)

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Jekyll not installed | Server won't start | Clear error message with installation instructions |
| Jekyll build fails | Documentation won't render | Validate Jekyll config, provide detailed error output |
| Playwright timeout | Incomplete defect inventory | Increase timeout, retry failed pages |
| Production site changes | False positives in comparison | Document known differences, focus on styling not content |
| Large screenshot storage | Disk space issues | Store only defect screenshots, compress images |

## Next Steps

Proceed to Phase 1: Design & Contracts
- Define data model for defect inventory
- Create API contracts for crawler scripts
- Generate quickstart guide for setup
