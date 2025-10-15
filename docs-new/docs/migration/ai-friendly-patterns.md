---
title: AI-Friendly Documentation Patterns
description: Guidelines for writing documentation that's optimized for both human readers and AI agents
category: Migration Guide
difficulty: intermediate
ai_summary: Best practices for creating AI-optimized technical documentation with structured metadata, clear signposting, and contextual code examples
primary_topic: documentation
keywords:
  - ai-friendly
  - documentation
  - metadata
  - structured-data
  - best-practices
tags:
  - migration-guide
  - documentation
  - intermediate
---

# AI-Friendly Documentation Patterns

This guide documents the AI-friendly patterns implemented in the Photon documentation to improve discoverability and comprehension by AI agents and search engines.

## Overview

The documentation has been enhanced with:

1. **Rich Frontmatter Metadata** - Structured YAML metadata for categorization and search
2. **Standardized Signposts** - Consistent section markers for navigation
3. **Structured Data (JSON-LD)** - Schema.org markup for search engines
4. **Enhanced Code Examples** - Context, prerequisites, and expected outputs

## Frontmatter Metadata

Every documentation page includes rich YAML frontmatter:

```yaml
---
title: "Page Title"
description: "Brief description (50-160 chars for SEO)"
category: "Category Name"
difficulty: beginner | intermediate | advanced | expert
ai_summary: "Brief summary optimized for AI extraction"
primary_topic: "main-topic-slug"
keywords:
  - keyword1
  - keyword2
  - keyword3
tags:
  - tag1
  - tag2
prerequisites:
  - "Required Page 1"
  - "Required Page 2"
related:
  - "Related Page 1"
  - "Related Page 2"
---
```

### Metadata Fields

- **title**: Page title (required)
- **description**: Brief description for search engines and social media
- **category**: Documentation category for organization
- **difficulty**: Content complexity level
- **ai_summary**: Concise summary optimized for AI agents
- **primary_topic**: Main topic identifier
- **keywords**: Search keywords (3-10 recommended)
- **tags**: Topic tags for categorization
- **prerequisites**: Required prior knowledge or pages
- **related**: Related documentation pages

## Signpost Patterns

Standardized section markers help AI agents navigate content:

### Prerequisites Section

Appears near the top of the page when prerequisites exist:

```markdown
## Prerequisites

Before working with this feature, you should be familiar with:

- [Getting Started](../getting-started/index.md)
- [Basic Drawing](../basic-drawing/index.md)
```

### Examples Section

Groups code examples together:

```markdown
## Examples

### Example: Creating a Rectangle

**Context**: This example shows how to create a basic rectangle.

```javascript
import { models } from 'photon/core';

const rectangle = new models.Rectangle(100, 50);
```

**Expected Output**: A rectangle model with 100x50 dimensions.
```

### Related Topics Section

Appears at the end of the page:

```markdown
## Related Topics

- [Advanced Shapes](../advanced-drawing/shapes.md)
- [Exporting SVG](../exporting/svg.md)
```

## Structured Data (JSON-LD)

Pages include Schema.org JSON-LD markup in the HTML head:

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Page Title",
  "description": "Page description",
  "keywords": "keyword1, keyword2, keyword3",
  "proficiencyLevel": "Beginner",
  "about": {
    "@type": "Thing",
    "name": "primary-topic"
  }
}
```

This structured data helps search engines and AI agents understand:

- Content type (technical article)
- Subject matter
- Difficulty level
- Relationships to other content
- Software application details

## Code Example Best Practices

### Context Before Code

Always provide context before code blocks:

```markdown
**Context**: This example demonstrates how to create a circle with a 50-unit radius.

```javascript
import { models } from 'photon/core';

const circle = new models.Circle(50);
```
```

### Language Tags

Always specify the language for syntax highlighting:

- JavaScript: ```javascript
- HTML: ```html
- Bash: ```bash
- JSON: ```json

### Expected Output

Document what the code produces:

```markdown
**Expected Output**: An SVG string representing a circle.
```

### Common Issues

Include troubleshooting tips:

```markdown
**Common Issues**:
- Ensure radius is a positive number
- Check that photon/core is properly imported
```

## Meta Tags for AI Agents

Pages include additional meta tags:

```html
<meta name="topic" content="primary-topic">
<meta name="difficulty" content="beginner">
<meta name="category" content="Getting Started">
```

## Benefits

### For AI Agents

- **Structured metadata** enables accurate content extraction
- **Consistent signposting** aids in navigation and topic identification
- **JSON-LD schemas** provide machine-readable context
- **Clear difficulty levels** help match content to user expertise

### For Search Engines

- **Rich snippets** in search results
- **Better indexing** with structured data
- **Improved rankings** with semantic markup
- **Enhanced previews** on social media

### For Human Readers

- **Clear prerequisites** help assess readiness
- **Consistent structure** improves navigation
- **Related topics** facilitate discovery
- **Code examples** include helpful context

## Implementation

All 581 documentation pages have been enhanced with:

- ✅ Rich frontmatter metadata
- ✅ AI-friendly summaries
- ✅ Primary topic classification
- ✅ Difficulty levels
- ✅ Keywords and tags
- ✅ Prerequisites and related content
- ✅ Standardized signposts (259 signposts added)
- ✅ JSON-LD structured data
- ✅ Open Graph meta tags

## Verification

To verify AI-friendly enhancements on a page:

1. **Check frontmatter**: Open the markdown file and verify YAML metadata
2. **Inspect HTML**: View page source and look for JSON-LD script
3. **Test search**: Verify keywords appear in search results
4. **Validate structured data**: Use [Google's Rich Results Test](https://search.google.com/test/rich-results)

## Future Enhancements

Potential improvements for even better AI-friendliness:

- Add FAQ sections with Schema.org FAQPage markup
- Include code execution results as structured data
- Add interactive examples with Schema.org HowTo markup
- Implement versioning metadata for API changes
- Add visual diagrams with alt text descriptions

## Summary

The AI-friendly documentation patterns implemented in Photon provide:

- **Enhanced discoverability** through rich metadata
- **Improved navigation** with consistent signposting
- **Better search rankings** via structured data
- **Clearer context** in code examples
- **Seamless experience** for both humans and AI agents

These patterns follow modern best practices for technical documentation and ensure Photon documentation is optimized for the AI-augmented web.
