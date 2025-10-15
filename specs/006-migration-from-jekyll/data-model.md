# Phase 1: Data Model

**Feature**: Documentation Migration from Jekyll to MkDocs  
**Date**: 2025-10-13  
**Status**: Complete

## Entity Definitions

### 1. DocumentationPage

**Purpose**: Represents a single documentation page in the MkDocs site

**Attributes**:
- `source_path` (string): Original Jekyll file path (e.g., `docs/docs/getting-started/index.html`)
- `target_path` (string): Target MkDocs markdown file path (e.g., `docs-new/docs/getting-started/index.md`)
- `title` (string): Page title
- `description` (string): Brief description for search and metadata
- `content` (string): Main content body (markdown format)
- `frontmatter` (Frontmatter): Page metadata
- `navigation_order` (number): Position in navigation hierarchy
- `category` (string): Documentation category (e.g., "Getting Started", "API Reference")
- `page_type` (PageType enum): Type of documentation page
- `last_updated` (ISO-8601 string): Last modification timestamp
- `word_count` (number): Content word count for analytics

**Validation Rules**:
- `source_path` must be a valid file path
- `target_path` must end with `.md`
- `title` must not be empty
- `content` must preserve all original content (verified by hash)
- `frontmatter` must include required fields (title, description)
- `navigation_order` must be non-negative
- `category` must be one of predefined categories

**State Transitions**:
- Pending → In Progress (conversion started)
- In Progress → Converted (markdown generated)
- Converted → Validated (content verified)
- Validated → Published (added to MkDocs site)
- Any state → Failed (conversion error)

### 2. Snippet

**Purpose**: Represents a Jekyll snippet being converted to markdown

**Attributes**:
- `snippet_id` (string): Unique identifier (e.g., "getting-started-browser")
- `source_file` (string): Original Jekyll snippet path (e.g., `docs/_snippets/getting-started-browser.html`)
- `target_file` (string): Target markdown file path (e.g., `docs-new/docs/getting-started/browser.md`)
- `title` (string): Snippet title
- `content_html` (string): Original HTML content
- `content_markdown` (string): Converted markdown content
- `liquid_tags` (array of LiquidTag): Liquid tags found in snippet
- `code_blocks` (array of CodeBlock): Code examples in snippet
- `snippet_type` (SnippetType enum): Type of snippet
- `references` (array of string): Pages that reference this snippet
- `conversion_notes` (string): Notes about conversion challenges

**Validation Rules**:
- `snippet_id` must be unique
- `source_file` must exist
- `content_markdown` must preserve all code examples
- All `liquid_tags` must be converted or documented
- `code_blocks` must maintain syntax highlighting
- `references` must be updated to point to new location

**Relationships**:
- One Snippet can be referenced by multiple DocumentationPages
- One Snippet contains multiple CodeBlocks

### 3. Frontmatter

**Purpose**: Metadata for documentation pages

**Attributes**:
- `title` (string): Page title
- `description` (string): Brief description (150-160 chars for SEO)
- `keywords` (array of string): Search keywords
- `category` (string): Documentation category
- `tags` (array of string): Topic tags
- `difficulty` (DifficultyLevel enum): Content difficulty level
- `prerequisites` (array of string): Required prior knowledge/pages
- `related` (array of string): Related documentation pages
- `created` (ISO-8601 string): Creation date
- `last_updated` (ISO-8601 string): Last update date
- `ai_summary` (string): Brief summary optimized for AI extraction
- `primary_topic` (string): Main topic of the page
- `hide_navigation` (boolean): Whether to hide from navigation
- `search_boost` (number): Search ranking boost (0.0-2.0)

**Validation Rules**:
- `title` is required and must not be empty
- `description` is required and should be 50-160 characters
- `keywords` should have 3-10 items
- `category` must match predefined categories
- `difficulty` must be valid enum value
- `prerequisites` must reference existing pages
- `related` must reference existing pages
- `search_boost` must be between 0.0 and 2.0

### 4. NavigationNode

**Purpose**: Represents a node in the documentation navigation hierarchy

**Attributes**:
- `node_id` (string): Unique identifier
- `title` (string): Display title in navigation
- `path` (string): URL path (e.g., "/getting-started/")
- `parent_id` (string, optional): Parent node ID
- `children` (array of string): Child node IDs
- `order` (number): Sort order within parent
- `icon` (string, optional): Icon identifier for navigation
- `is_section` (boolean): Whether this is a section header
- `is_hidden` (boolean): Whether to hide from navigation
- `depth` (number): Depth in hierarchy (0 = root)

**Validation Rules**:
- `node_id` must be unique
- `title` must not be empty
- `path` must be valid URL path
- `parent_id` must reference existing node (if provided)
- `children` must reference existing nodes
- `order` must be non-negative
- `depth` must match actual hierarchy depth
- No circular references in parent-child relationships

**Relationships**:
- One NavigationNode can have one parent NavigationNode
- One NavigationNode can have multiple child NavigationNodes
- Forms a tree structure with single root

### 5. MigrationResult

**Purpose**: Tracks the result of migrating a single file

**Attributes**:
- `migration_id` (string): Unique identifier
- `source_file` (string): Original file path
- `target_file` (string): Destination file path
- `status` (MigrationStatus enum): Current status
- `started_at` (ISO-8601 string): Migration start time
- `completed_at` (ISO-8601 string, optional): Migration completion time
- `content_hash_before` (string): SHA-256 hash of original content
- `content_hash_after` (string): SHA-256 hash of converted content
- `validation_results` (ValidationResult): Content validation results
- `errors` (array of string): Error messages if migration failed
- `warnings` (array of string): Warning messages
- `conversion_notes` (string): Notes about conversion process

**Validation Rules**:
- `migration_id` must be unique
- `source_file` must exist
- `status` must be valid enum value
- `started_at` must be valid timestamp
- `completed_at` must be after `started_at` (if present)
- `content_hash_before` must be valid SHA-256 hash
- `content_hash_after` must be valid SHA-256 hash (if status is Complete)

**State Transitions**:
- Pending → In Progress (migration started)
- In Progress → Complete (successful migration)
- In Progress → Failed (migration error)
- Complete → Validated (content verified)
- Failed → Retry (attempting again)

### 6. ValidationResult

**Purpose**: Results of content validation after migration

**Attributes**:
- `validation_id` (string): Unique identifier
- `file_path` (string): File being validated
- `content_preserved` (boolean): Whether content matches original
- `links_valid` (boolean): Whether all links work
- `code_blocks_valid` (boolean): Whether code blocks render correctly
- `frontmatter_valid` (boolean): Whether frontmatter is complete
- `validation_errors` (array of ValidationError): Specific errors found
- `validation_warnings` (array of ValidationWarning): Warnings
- `validated_at` (ISO-8601 string): Validation timestamp
- `overall_status` (ValidationStatus enum): Overall validation result

**Validation Rules**:
- `validation_id` must be unique
- `file_path` must exist
- `overall_status` must be PASS if all boolean checks are true
- `overall_status` must be FAIL if any boolean check is false
- `validated_at` must be valid timestamp

### 7. Asset

**Purpose**: Represents a static asset (image, stylesheet, font, etc.)

**Attributes**:
- `asset_id` (string): Unique identifier
- `asset_type` (AssetType enum): Type of asset
- `source_path` (string): Original file path
- `target_path` (string): Destination file path
- `file_size` (number): File size in bytes
- `mime_type` (string): MIME type
- `optimization_status` (OptimizationStatus enum): Whether asset is optimized
- `references` (array of string): Pages that reference this asset
- `is_migrated` (boolean): Whether asset has been copied
- `checksum` (string): File checksum for verification

**Validation Rules**:
- `asset_id` must be unique
- `source_path` must exist
- `file_size` must be non-negative
- `mime_type` must be valid MIME type
- `checksum` must match file content
- `references` must point to valid pages

**Relationships**:
- One Asset can be referenced by multiple DocumentationPages
- Assets are organized by AssetType

### 8. CodeBlock

**Purpose**: Represents a code example in documentation

**Attributes**:
- `code_id` (string): Unique identifier
- `language` (string): Programming language (e.g., "javascript", "python")
- `code_content` (string): The actual code
- `context` (string, optional): Explanation before code
- `expected_output` (string, optional): Expected result when run
- `line_numbers` (boolean): Whether to show line numbers
- `highlight_lines` (array of number): Lines to highlight
- `caption` (string, optional): Code block caption
- `is_runnable` (boolean): Whether code can be executed
- `parent_page` (string): Page containing this code block

**Validation Rules**:
- `code_id` must be unique
- `language` must be valid language identifier
- `code_content` must not be empty
- `highlight_lines` must be valid line numbers
- `parent_page` must reference existing page

### 9. LiquidTag

**Purpose**: Represents a Jekyll liquid tag that needs conversion

**Attributes**:
- `tag_id` (string): Unique identifier
- `tag_type` (string): Type of liquid tag (e.g., "highlight", "include")
- `original_syntax` (string): Original liquid tag syntax
- `converted_syntax` (string): Markdown equivalent
- `conversion_strategy` (string): How tag was converted
- `requires_manual_review` (boolean): Whether manual review is needed
- `location` (string): File and line number where tag appears

**Validation Rules**:
- `tag_id` must be unique
- `tag_type` must not be empty
- `original_syntax` must be valid liquid syntax
- `conversion_strategy` must be documented
- `location` must be valid file path and line number

## Enumerations

### PageType

**Values**:
- `tutorial`: Step-by-step tutorial
- `guide`: Conceptual guide
- `reference`: API reference documentation
- `example`: Code example showcase
- `quickstart`: Quick start guide
- `troubleshooting`: Problem-solving guide
- `overview`: High-level overview

### SnippetType

**Values**:
- `code_example`: Code snippet
- `installation`: Installation instructions
- `configuration`: Configuration example
- `usage`: Usage example
- `template`: Reusable template

### DifficultyLevel

**Values**:
- `beginner`: Suitable for beginners
- `intermediate`: Requires some experience
- `advanced`: For advanced users
- `expert`: Expert-level content

### MigrationStatus

**Values**:
- `pending`: Not yet started
- `in_progress`: Currently being migrated
- `complete`: Successfully migrated
- `failed`: Migration failed
- `retry`: Retrying after failure
- `validated`: Migration validated

### ValidationStatus

**Values**:
- `pass`: Validation passed
- `fail`: Validation failed
- `warning`: Validation passed with warnings
- `skipped`: Validation skipped

### AssetType

**Values**:
- `image`: Image file (png, jpg, svg, etc.)
- `stylesheet`: CSS file
- `javascript`: JavaScript file
- `font`: Font file
- `document`: Document file (pdf, etc.)
- `other`: Other asset type

### OptimizationStatus

**Values**:
- `original`: Not optimized
- `optimized`: Optimized (compressed, minified)
- `not_needed`: Optimization not needed

## Data Flow

```text
1. Migration Start
   ↓
2. Scan Jekyll Site
   → Create DocumentationPage records (pending)
   → Create Snippet records (pending)
   → Create Asset records (pending)
   ↓
3. Convert Snippets
   → Update Snippet.content_markdown
   → Convert LiquidTags
   → Extract CodeBlocks
   → Update status to converted
   ↓
4. Convert Pages
   → Update DocumentationPage.content
   → Map Frontmatter
   → Embed converted snippets
   → Update status to converted
   ↓
5. Migrate Assets
   → Copy files to target
   → Update Asset.is_migrated
   → Verify checksums
   ↓
6. Update Links
   → Scan all pages for links
   → Update internal links
   → Verify external links
   ↓
7. Build Navigation
   → Create NavigationNode tree
   → Generate mkdocs.yml nav section
   ↓
8. Validate Content
   → Create ValidationResult for each page
   → Verify content preservation
   → Check links
   → Validate frontmatter
   ↓
9. Create MigrationResult
   → Record success/failure
   → Document any issues
   ↓
10. Generate Reports
   → Migration summary
   → Validation report
   → Issue list
```

## Relationships Diagram

```text
DocumentationPage (1)
├── frontmatter: Frontmatter (1)
├── code_blocks: CodeBlock (0..*)
├── references: Snippet (0..*)
├── assets: Asset (0..*)
└── navigation_node: NavigationNode (1)

Snippet (1)
├── liquid_tags: LiquidTag (0..*)
├── code_blocks: CodeBlock (0..*)
└── referenced_by: DocumentationPage (0..*)

NavigationNode (1)
├── parent: NavigationNode (0..1)
├── children: NavigationNode (0..*)
└── page: DocumentationPage (0..1)

MigrationResult (1)
├── source: DocumentationPage | Snippet | Asset (1)
└── validation: ValidationResult (0..1)

Asset (1)
└── referenced_by: DocumentationPage (0..*)
```

## Validation Rules Summary

1. All IDs must be unique within their entity type
2. All file paths must be valid and accessible
3. All references must point to existing entities
4. All timestamps must be valid ISO-8601 format
5. All enums must use defined values
6. All required fields must be present and non-empty
7. Content hashes must match file content
8. Navigation tree must have no circular references
9. All links must resolve to valid targets
10. Frontmatter must include required metadata fields

## Storage Format

### JSON Schema

All entities will be serialized to JSON for migration tracking and validation. See `contracts/` directory for detailed JSON schemas.

### Migration Database

During migration, entities are stored in a SQLite database for efficient querying and relationship management:

```sql
-- Example schema
CREATE TABLE documentation_pages (
    source_path TEXT PRIMARY KEY,
    target_path TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    frontmatter JSON NOT NULL,
    navigation_order INTEGER,
    category TEXT,
    page_type TEXT,
    last_updated TEXT,
    word_count INTEGER
);

CREATE TABLE snippets (
    snippet_id TEXT PRIMARY KEY,
    source_file TEXT NOT NULL,
    target_file TEXT NOT NULL,
    title TEXT NOT NULL,
    content_html TEXT NOT NULL,
    content_markdown TEXT,
    snippet_type TEXT,
    conversion_notes TEXT
);

-- Additional tables for other entities...
```

## Example Data

### DocumentationPage Example

```json
{
  "source_path": "docs/docs/getting-started/index.html",
  "target_path": "docs-new/docs/getting-started/index.md",
  "title": "Getting Started",
  "description": "Get started with Photon for creating 2D drawings programmatically",
  "content": "# Getting Started\n\nPhoton is a JavaScript library...",
  "frontmatter": {
    "title": "Getting Started",
    "description": "Get started with Photon for creating 2D drawings programmatically",
    "keywords": ["getting started", "installation", "setup", "quickstart"],
    "category": "Getting Started",
    "tags": ["beginner", "tutorial"],
    "difficulty": "beginner",
    "prerequisites": [],
    "related": ["Basic Drawing", "API Reference"],
    "created": "2025-10-13T00:00:00Z",
    "last_updated": "2025-10-13T00:00:00Z",
    "ai_summary": "Learn how to install and set up Photon for browser and Node.js environments",
    "primary_topic": "installation",
    "hide_navigation": false,
    "search_boost": 1.5
  },
  "navigation_order": 1,
  "category": "Getting Started",
  "page_type": "quickstart",
  "last_updated": "2025-10-13T00:00:00Z",
  "word_count": 450
}
```

### Snippet Example

```json
{
  "snippet_id": "getting-started-browser",
  "source_file": "docs/_snippets/getting-started-browser.html",
  "target_file": "docs-new/docs/getting-started/browser.md",
  "title": "For the browser",
  "content_html": "<p>Download the browser-based version...</p>",
  "content_markdown": "## For the browser\n\nDownload the browser-based version...",
  "liquid_tags": [
    {
      "tag_id": "lt-001",
      "tag_type": "highlight",
      "original_syntax": "{% highlight html %}",
      "converted_syntax": "```html",
      "conversion_strategy": "fenced_code_block",
      "requires_manual_review": false,
      "location": "getting-started-browser.html:12"
    }
  ],
  "code_blocks": [
    {
      "code_id": "cb-001",
      "language": "html",
      "code_content": "<script src=\"http://maker.js.org/target/js/browser.maker.js\"></script>",
      "context": "Link to Photon in your HTML:",
      "line_numbers": false,
      "highlight_lines": [],
      "is_runnable": true,
      "parent_page": "getting-started/browser.md"
    }
  ],
  "snippet_type": "installation",
  "references": ["docs-new/docs/getting-started/index.md"],
  "conversion_notes": "Converted liquid highlight tags to fenced code blocks"
}
```

### MigrationResult Example

```json
{
  "migration_id": "mig-001",
  "source_file": "docs/_snippets/getting-started-browser.html",
  "target_file": "docs-new/docs/getting-started/browser.md",
  "status": "validated",
  "started_at": "2025-10-13T14:00:00Z",
  "completed_at": "2025-10-13T14:00:05Z",
  "content_hash_before": "a1b2c3d4e5f6...",
  "content_hash_after": "f6e5d4c3b2a1...",
  "validation_results": {
    "validation_id": "val-001",
    "file_path": "docs-new/docs/getting-started/browser.md",
    "content_preserved": true,
    "links_valid": true,
    "code_blocks_valid": true,
    "frontmatter_valid": true,
    "validation_errors": [],
    "validation_warnings": [],
    "validated_at": "2025-10-13T14:00:06Z",
    "overall_status": "pass"
  },
  "errors": [],
  "warnings": ["Liquid tag converted to fenced code block"],
  "conversion_notes": "Successfully converted HTML to markdown with all code examples preserved"
}
```
