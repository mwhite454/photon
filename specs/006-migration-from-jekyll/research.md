# Phase 0: Research & Technical Decisions

**Feature**: Documentation Migration from Jekyll to MkDocs  
**Date**: 2025-10-13  
**Status**: Complete

## Research Summary

This document captures the technical research and decisions made for migrating the Photon documentation from Jekyll to MkDocs with a focus on AI-friendly documentation patterns.

---

## 1. MkDocs Theme Selection

### Research Findings

**mkdocs-shadcn Theme Investigation**:
- After investigation, there is no official "mkdocs-shadcn" theme in the MkDocs ecosystem
- shadcn/ui is a React component library, not a documentation theme
- The closest alternatives are mkdocs-material (most popular) or creating a custom theme

**mkdocs-material Theme** (Recommended):
- Most popular and actively maintained MkDocs theme
- Modern, responsive design with excellent UX
- Built-in features: search, dark mode, navigation, mobile support
- Extensive customization options via CSS variables
- Can be styled to match shadcn/ui design principles
- Large plugin ecosystem and community support

**Comparison**:

| Feature | mkdocs-material | Custom shadcn Theme |
|---------|----------------|---------------------|
| Maintenance | Active, well-supported | Requires ongoing maintenance |
| Features | Comprehensive out-of-box | Need to build everything |
| Customization | CSS variables, overrides | Full control |
| Time to implement | Immediate | Weeks of development |
| Community support | Excellent | None |

### Decision

**Use mkdocs-material theme with shadcn-inspired customization**:
- Install mkdocs-material as the base theme
- Customize colors, typography, and spacing to match shadcn/ui design principles
- Use CSS overrides for shadcn-style components (buttons, cards, code blocks)
- Leverage material theme's built-in features (search, navigation, dark mode)

**Rationale**: mkdocs-material provides production-ready features immediately while allowing full customization. Building a custom shadcn theme would delay the migration by weeks without significant benefit.

---

## 2. AI-Friendly Documentation Best Practices

### Research Findings

**LLM/Search Agent Readability Patterns**:

1. **Structured Headings**: Consistent H1 → H2 → H3 hierarchy helps AI understand document structure
2. **Explicit Context**: Each section should be self-contained with clear context
3. **Code Block Metadata**: Language tags and descriptive comments improve code extraction
4. **Semantic HTML**: Use `<article>`, `<section>`, `<nav>` for better content understanding
5. **Frontmatter Metadata**: Rich metadata enables better search and categorization

**Structured Data Markup**:

- **JSON-LD**: Add structured data for documentation pages (SoftwareApplication, HowTo, FAQPage schemas)
- **Schema.org**: Use TechArticle and SoftwareSourceCode schemas for technical content
- **Open Graph**: Meta tags for social sharing and preview generation
- **Dublin Core**: Metadata for academic/archival purposes

**Code Example Formatting**:

```markdown
## Example: Creating a Rectangle

**Context**: This example shows how to create a basic rectangle using Photon.

**Prerequisites**: 
- Photon library installed
- Basic JavaScript knowledge

```javascript
// Create a rectangle with width 100 and height 50
const makerjs = require('makerjs');
const rectangle = new makerjs.models.Rectangle(100, 50);

// Export to SVG
const svg = makerjs.exporter.toSVG(rectangle);
console.log(svg);
```

**Expected Output**: SVG string representing a 100x50 rectangle

**Common Issues**:
- Ensure dimensions are positive numbers
- Check that makerjs is properly imported
```

**Frontmatter Standards**:

```yaml
---
title: "Creating Basic Shapes"
description: "Learn how to create rectangles, circles, and polygons using Photon"
keywords: ["shapes", "rectangle", "circle", "polygon", "geometry"]
category: "Basic Drawing"
difficulty: "beginner"
prerequisites: ["Getting Started", "Installation"]
related: ["Advanced Shapes", "Path Operations"]
last_updated: "2025-10-13"
---
```

### Decision

**Implement comprehensive AI-friendly documentation structure**:

1. **Consistent Heading Hierarchy**: All pages use H1 (title) → H2 (sections) → H3 (subsections)
2. **Signpost Patterns**: Use standardized section names:
   - "Quick Start" - Fast-path instructions
   - "Prerequisites" - Required knowledge/setup
   - "Example" - Code examples with context
   - "API Reference" - Parameter and return value documentation
   - "Common Issues" - Troubleshooting guidance
   - "Related Topics" - Cross-references

3. **Rich Frontmatter**: Every page includes:
   - title, description, keywords
   - category, difficulty level
   - prerequisites, related pages
   - last_updated timestamp

4. **Code Block Enhancement**:
   - Always specify language
   - Add descriptive comments
   - Include expected output
   - Provide context before code

5. **Structured Data**: Add JSON-LD schemas to page templates

**Rationale**: These patterns optimize for both human readers and AI agents, improving discoverability, comprehension, and search ranking.

---

## 3. Jekyll to MkDocs Migration Patterns

### Research Findings

**Existing Migration Tools**:
- No comprehensive Jekyll-to-MkDocs migration tool exists
- Manual migration scripts are common approach
- Key challenges: liquid tags, snippet inclusion, frontmatter mapping

**Liquid Tag Equivalents**:

| Jekyll Liquid Tag | MkDocs Equivalent |
|-------------------|-------------------|
| `{% highlight %}` | Fenced code blocks with language |
| `{% include snippet.html %}` | Direct markdown inclusion or snippets extension |
| `{{ site.baseurl }}` | MkDocs config `site_url` |
| `{% for post in site.posts %}` | Not needed (MkDocs auto-generates navigation) |
| `{{ page.title }}` | Frontmatter `title` field |

**HTML-to-Markdown Conversion Libraries**:

| Library | Pros | Cons |
|---------|------|------|
| **markdownify** (Python) | Clean output, customizable | May lose some formatting |
| **html2text** (Python) | Fast, widely used | Less control over output |
| **BeautifulSoup + custom** | Full control | More code to write |
| **Pandoc** | Excellent conversion | External dependency |

**Frontmatter Mapping**:

```yaml
# Jekyll frontmatter
---
layout: snippetlist
title: Getting Started
snippet_titles: [Try it now, For the browser, For Node.js]
---

# MkDocs frontmatter (converted)
---
title: Getting Started
description: Get started with Photon in the browser or Node.js
category: Getting Started
snippets:
  - try-it-now
  - browser-setup
  - nodejs-setup
---
```

### Decision

**Build custom Python migration scripts using BeautifulSoup**:

1. **snippet_converter.py**: Convert Jekyll snippets to standalone markdown files
   - Parse HTML with BeautifulSoup
   - Convert liquid tags to markdown equivalents
   - Extract code blocks and preserve syntax highlighting
   - Generate appropriate frontmatter

2. **page_converter.py**: Convert documentation pages
   - Parse Jekyll HTML pages
   - Identify snippet references and embed content
   - Convert liquid tags to markdown
   - Map Jekyll frontmatter to MkDocs frontmatter

3. **frontmatter_mapper.py**: Standardize metadata
   - Map Jekyll fields to MkDocs fields
   - Add AI-friendly metadata (keywords, description, category)
   - Generate navigation order

4. **link_updater.py**: Fix internal links
   - Scan all markdown files for links
   - Update paths for new structure
   - Verify all links resolve correctly

**Rationale**: Custom scripts provide full control over the conversion process, ensuring 100% content preservation and allowing for AI-friendly enhancements during migration.

---

## 4. MkDocs Plugin Ecosystem

### Research Findings

**Essential Plugins**:

1. **mkdocs-material** (theme): Modern, responsive theme with built-in features
2. **pymdown-extensions**: Enhanced markdown features (admonitions, code highlighting, tabs)
3. **mkdocs-awesome-pages**: Better navigation control
4. **mkdocs-minify**: Minify HTML/CSS/JS for production
5. **mkdocs-redirects**: Handle URL redirects from old Jekyll structure
6. **mkdocs-git-revision-date-localized**: Show last updated dates
7. **mkdocs-macros**: Template variables and macros

**Plugin Configuration**:

```yaml
plugins:
  - search:
      lang: en
      separator: '[\s\-\.]+'
  - awesome-pages
  - git-revision-date-localized:
      type: date
      enable_creation_date: true
  - minify:
      minify_html: true
      minify_js: true
      minify_css: true
  - redirects:
      redirect_maps:
        'old-path/index.html': 'new-path/index.md'
  - macros

markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
      line_spans: __span
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.details
  - admonition
  - toc:
      permalink: true
  - attr_list
  - md_in_html
```

### Decision

**Use comprehensive plugin stack for feature parity**:

- **Core**: mkdocs-material, pymdown-extensions
- **Navigation**: mkdocs-awesome-pages for flexible navigation
- **Production**: mkdocs-minify for optimization
- **Migration**: mkdocs-redirects to preserve old URLs
- **Metadata**: mkdocs-git-revision-date-localized for timestamps
- **Advanced**: mkdocs-macros for template variables

**Rationale**: This plugin stack provides all features from Jekyll plus modern enhancements, ensuring no functionality loss during migration.

---

## 5. Content Preservation Validation

### Research Findings

**Validation Strategies**:

1. **Content Hashing**: Generate SHA-256 hashes of content before/after conversion
2. **Diff Tools**: Use `diff` or `difflib` to compare original vs converted
3. **Link Checking**: Automated link validation (broken-link-checker, linkchecker)
4. **Visual Comparison**: Screenshot comparison using Playwright
5. **Manual Review**: Sample-based human verification

**Tools**:

| Tool | Purpose | Implementation |
|------|---------|----------------|
| **hashlib** (Python) | Content hashing | Generate checksums for validation |
| **difflib** (Python) | Text comparison | Compare original vs converted content |
| **linkchecker** | Link validation | Verify all internal/external links work |
| **Playwright** | Visual testing | Screenshot comparison, theme verification |

**Validation Workflow**:

```python
# 1. Pre-migration: Hash all content
original_hashes = {}
for file in jekyll_files:
    content = extract_content(file)
    original_hashes[file] = hashlib.sha256(content).hexdigest()

# 2. Post-migration: Verify content preservation
for original_file, converted_file in migration_map.items():
    original_content = extract_content(original_file)
    converted_content = extract_content(converted_file)
    
    # Compare content (ignoring formatting differences)
    if normalize(original_content) != normalize(converted_content):
        report_difference(original_file, converted_file)

# 3. Link validation
run_link_checker('docs-new/')

# 4. Visual comparison
for page in pages:
    jekyll_screenshot = capture_screenshot(jekyll_url + page)
    mkdocs_screenshot = capture_screenshot(mkdocs_url + page)
    compare_screenshots(jekyll_screenshot, mkdocs_screenshot)
```

### Decision

**Implement multi-layer validation approach**:

1. **content_validator.py**: Hash-based content verification
   - Extract text content from HTML/markdown
   - Normalize whitespace and formatting
   - Compare content hashes
   - Report any discrepancies

2. **link_checker.py**: Comprehensive link validation
   - Scan all markdown files for links
   - Verify internal links resolve
   - Check external links (with rate limiting)
   - Generate link validation report

3. **Playwright visual tests**: Theme and rendering verification
   - Capture screenshots of key pages
   - Verify theme application
   - Check responsive layout
   - Validate navigation functionality

4. **Manual review checklist**: Sample-based verification
   - Review 10% of pages manually
   - Verify code examples render correctly
   - Check special formatting (tables, lists, admonitions)
   - Validate search functionality

**Rationale**: Multi-layer validation ensures 100% content preservation while catching both content and visual regressions.

---

## 6. Documentation Signposting for AI Agents

### Research Findings

**AI-Friendly Patterns**:

1. **Explicit Section Markers**: Use consistent, recognizable section names
2. **Context-Rich Headings**: Headings should be descriptive and self-contained
3. **Structured Code Examples**: Always include context, prerequisites, and expected output
4. **Metadata Tags**: Rich frontmatter for categorization and search
5. **Cross-References**: Explicit "See Also" and "Related Topics" sections
6. **Glossary Terms**: Define technical terms inline or in glossary

**Signpost Patterns**:

```markdown
# Page Title

**Quick Summary**: One-sentence description of what this page covers.

## Prerequisites

- Prerequisite 1
- Prerequisite 2

## Quick Start

Fast-path instructions for common use case.

## Detailed Guide

### Step 1: [Action]

Detailed explanation...

### Step 2: [Action]

Detailed explanation...

## Examples

### Example 1: [Use Case]

**Context**: What this example demonstrates

```javascript
// Code with comments
```

**Expected Output**: What you should see

**Common Issues**: Troubleshooting tips

## API Reference

### Function Name

**Description**: What it does

**Parameters**:
- `param1` (type): Description
- `param2` (type): Description

**Returns**: Return value description

**Example**:
```javascript
// Usage example
```

## Related Topics

- [Link to related page 1]
- [Link to related page 2]

## Troubleshooting

### Issue: [Problem description]

**Solution**: How to fix it
```

**Metadata Schema**:

```yaml
---
# Core metadata
title: "Page Title"
description: "Concise description for search engines and AI"

# Categorization
category: "Getting Started" | "Basic Drawing" | "Advanced" | "API Reference"
tags: ["tag1", "tag2", "tag3"]
keywords: ["keyword1", "keyword2"]

# Difficulty and prerequisites
difficulty: "beginner" | "intermediate" | "advanced"
prerequisites:
  - "Page Title 1"
  - "Page Title 2"

# Related content
related:
  - "Related Page 1"
  - "Related Page 2"

# Timestamps
created: "2025-10-13"
last_updated: "2025-10-13"

# AI hints
ai_summary: "Brief summary optimized for AI extraction"
primary_topic: "Main topic of this page"
---
```

### Decision

**Implement standardized signpost patterns across all documentation**:

1. **Section Templates**: Create markdown templates for common page types
   - Quick Start template
   - Tutorial template
   - API Reference template
   - Troubleshooting template

2. **Frontmatter Schema**: Standardize metadata across all pages
   - Required fields: title, description, category
   - Optional fields: tags, keywords, difficulty, prerequisites, related
   - AI-specific fields: ai_summary, primary_topic

3. **Code Example Format**: Consistent structure for all code examples
   - Context before code
   - Language-tagged code blocks
   - Expected output after code
   - Common issues section

4. **Navigation Signposts**: Clear breadcrumbs and "you are here" indicators
   - Breadcrumb navigation in theme
   - "Next" and "Previous" page links
   - Table of contents on each page

5. **Search Optimization**: Enhance search with metadata
   - Use frontmatter for search weighting
   - Add synonyms and alternate terms
   - Include common misspellings in metadata

**Rationale**: Standardized signposting makes documentation equally accessible to humans and AI agents, improving discoverability and comprehension for both audiences.

---

## Technology Stack Summary

### Core Technologies

- **MkDocs 1.5+**: Static site generator
- **mkdocs-material**: Theme (customized for shadcn-style design)
- **Python 3.8+**: Migration scripts and tooling
- **Node.js/Playwright**: Visual testing and validation

### MkDocs Plugins

- pymdown-extensions (enhanced markdown)
- mkdocs-awesome-pages (navigation control)
- mkdocs-minify (production optimization)
- mkdocs-redirects (URL migration)
- mkdocs-git-revision-date-localized (timestamps)
- mkdocs-macros (template variables)

### Migration Tools

- BeautifulSoup4 (HTML parsing)
- markdownify (HTML-to-markdown conversion)
- hashlib (content validation)
- difflib (content comparison)
- Playwright (visual testing)

### Development Workflow

1. **Local Development**: `mkdocs serve` (hot-reload enabled)
2. **Build**: `mkdocs build` (generates static site)
3. **Testing**: `pytest` (migration scripts) + `playwright test` (visual tests)
4. **Deployment**: GitHub Pages (automatic deployment on push)

---

## Risk Mitigation

### Identified Risks

1. **Content Loss During Migration**
   - Mitigation: Multi-layer validation (hashing, diff, visual comparison)
   - Rollback: Keep Jekyll site until migration fully validated

2. **Broken Links After Migration**
   - Mitigation: Automated link checking + redirect mapping
   - Rollback: mkdocs-redirects plugin for old URLs

3. **Theme Not Matching Jekyll Quality**
   - Mitigation: mkdocs-material is production-proven, highly customizable
   - Rollback: Can revert to Jekyll if theme is inadequate

4. **Search Functionality Degradation**
   - Mitigation: mkdocs-material search is excellent, test thoroughly
   - Rollback: Can add Algolia DocSearch if needed

5. **Build Performance Issues**
   - Mitigation: MkDocs is faster than Jekyll, but monitor build times
   - Rollback: Optimize plugins, use caching

### Contingency Plans

- **Parallel Sites**: Run Jekyll and MkDocs in parallel during transition
- **Gradual Rollout**: Migrate section by section, validate each
- **Rollback Strategy**: Keep Jekyll site archived for 6 months
- **User Feedback**: Collect feedback during beta period before full cutover

---

## Next Steps

Phase 0 research is complete. Proceed to Phase 1:

1. Generate `data-model.md` with documentation entities
2. Create `contracts/` with migration schemas
3. Write `quickstart.md` with setup instructions
4. Update agent context with Python/MkDocs
5. Run `/speckit.tasks` to generate detailed task breakdown

**All technical decisions are now documented and ready for implementation.**
