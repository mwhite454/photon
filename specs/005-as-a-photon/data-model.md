# Phase 1: Data Model

**Feature**: Local Development Site Preview & Defect Inventory  
**Date**: 2025-10-13  
**Status**: Complete

## Entity Definitions

### 1. DefectInventory

**Purpose**: Root container for all defect discovery results

**Attributes**:
- `timestamp` (ISO-8601 string): When the inventory was generated
- `sites` (SiteConfig): URLs of local and production sites
- `summary` (InventorySummary): Aggregate statistics
- `defects` (array of Defect): Individual defect records
- `pageInventory` (array of PageRecord): All pages discovered

**Validation Rules**:
- `timestamp` must be valid ISO-8601 format
- `sites.local` and `sites.production` must be valid URLs
- `defects` array must not contain duplicate IDs
- `summary` counts must match actual defect array lengths

**State Transitions**:
- Created → In Progress (crawling started)
- In Progress → Complete (all pages crawled)
- In Progress → Partial (some pages failed but inventory generated)
- Any state → Failed (critical error prevents inventory generation)

### 2. SiteConfig

**Purpose**: Configuration for sites being compared

**Attributes**:
- `local` (string): Local development server URL (e.g., "http://localhost:3000")
- `production` (string): Production site URL (e.g., "http://maker.js.org")

**Validation Rules**:
- Both URLs must be valid HTTP/HTTPS URLs
- Local URL must be reachable before crawling starts
- Production URL must be reachable for comparison

### 3. InventorySummary

**Purpose**: Aggregate statistics for quick assessment

**Attributes**:
- `totalPages` (number): Total documentation pages discovered
- `pagesWithDefects` (number): Pages containing at least one defect
- `totalDefects` (number): Total defect count across all pages
- `bySeverity` (object): Defect counts by severity level
  - `critical` (number)
  - `high` (number)
  - `medium` (number)
  - `low` (number)
- `byType` (object): Defect counts by type
  - `missingStyles` (number)
  - `brokenLinks` (number)
  - `consoleErrors` (number)
  - `missingContent` (number)
  - `renderingIssues` (number)

**Validation Rules**:
- All counts must be non-negative integers
- `totalDefects` must equal sum of `bySeverity` values
- `totalDefects` must equal sum of `byType` values
- `pagesWithDefects` must be ≤ `totalPages`

### 4. Defect

**Purpose**: Individual defect record with full context

**Attributes**:
- `id` (string): Unique identifier (format: "DEF-###")
- `page` (string): Page URL path where defect was found
- `type` (DefectType enum): Category of defect
- `severity` (SeverityLevel enum): Impact level
- `description` (string): Human-readable description
- `expected` (string): What should happen
- `actual` (string): What actually happens
- `screenshot` (string, optional): Path to screenshot file
- `consoleErrors` (array of string): Related console error messages
- `reproduction` (string): Steps to reproduce the defect
- `comparisonData` (object, optional): Data from production site comparison
  - `productionStatus` (string): How production site handles this
  - `isDifference` (boolean): Whether this differs from production

**Validation Rules**:
- `id` must be unique within inventory
- `id` must match format "DEF-\d{3,}"
- `page` must be a valid URL path
- `type` must be valid DefectType enum value
- `severity` must be valid SeverityLevel enum value
- `description`, `expected`, `actual`, and `reproduction` must not be empty
- `consoleErrors` array can be empty but must be present

**Relationships**:
- Belongs to one DefectInventory
- References one PageRecord via `page` attribute

### 5. PageRecord

**Purpose**: Inventory of all pages discovered during crawl

**Attributes**:
- `url` (string): Full URL of the page
- `path` (string): URL path (e.g., "/docs/getting-started/")
- `title` (string): Page title from HTML
- `status` (PageStatus enum): Accessibility status
- `loadTime` (number): Page load time in milliseconds
- `resourceCounts` (object): Resource loading statistics
  - `css` (number): CSS files loaded
  - `js` (number): JavaScript files loaded
  - `images` (number): Images loaded
  - `fonts` (number): Fonts loaded
  - `failed` (number): Resources that failed to load
- `defectIds` (array of string): IDs of defects found on this page
- `discoveredFrom` (string, optional): URL of page that linked to this one

**Validation Rules**:
- `url` must be valid URL
- `path` must start with "/"
- `status` must be valid PageStatus enum value
- `loadTime` must be non-negative
- All `resourceCounts` values must be non-negative
- `defectIds` must reference valid Defect IDs in inventory

**Relationships**:
- Belongs to one DefectInventory
- Can have multiple Defects (one-to-many)

## Enumerations

### DefectType

**Values**:
- `missingStyles`: CSS not loaded or not applied
- `brokenLinks`: Navigation links that 404 or error
- `consoleErrors`: JavaScript errors in browser console
- `missingContent`: Content that should render but doesn't
- `renderingIssues`: Visual layout problems
- `resourceLoadFailure`: Images, fonts, or other assets fail to load
- `performanceIssue`: Page loads too slowly

### SeverityLevel

**Values**:
- `critical`: Blocks core functionality, must fix immediately
- `high`: Significant impact on user experience, fix soon
- `medium`: Noticeable issue but workarounds exist
- `low`: Minor cosmetic issue, fix when convenient

**Severity Assignment Guidelines**:
- **Critical**: Page doesn't load, core documentation missing, site unusable
- **High**: Styling completely broken, major content missing, navigation broken
- **Medium**: Some styles missing, minor content issues, non-critical links broken
- **Low**: Cosmetic issues, minor formatting problems, optional content missing

### PageStatus

**Values**:
- `accessible`: Page loaded successfully
- `error`: Page returned HTTP error (404, 500, etc.)
- `timeout`: Page load exceeded timeout threshold
- `redirected`: Page redirected to different URL
- `blocked`: Access denied or authentication required

## Data Flow

```text
1. Crawler Start
   ↓
2. Discover Pages (build PageRecord list)
   ↓
3. Visit Each Page
   ↓
4. Collect Defects (create Defect records)
   ↓
5. Compare with Production (enrich with comparisonData)
   ↓
6. Calculate Summary (aggregate statistics)
   ↓
7. Generate DefectInventory
   ↓
8. Export to JSON + Markdown
```

## Storage Format

### JSON Schema

See `contracts/defect-inventory-schema.json` for full JSON Schema definition.

### Markdown Report Format

```markdown
# Defect Inventory Report

**Generated**: {timestamp}
**Local Site**: {sites.local}
**Production Site**: {sites.production}

## Summary

- **Total Pages**: {summary.totalPages}
- **Pages with Defects**: {summary.pagesWithDefects}
- **Total Defects**: {summary.totalDefects}

### By Severity
- Critical: {summary.bySeverity.critical}
- High: {summary.bySeverity.high}
- Medium: {summary.bySeverity.medium}
- Low: {summary.bySeverity.low}

### By Type
- Missing Styles: {summary.byType.missingStyles}
- Broken Links: {summary.byType.brokenLinks}
- Console Errors: {summary.byType.consoleErrors}
- Missing Content: {summary.byType.missingContent}
- Rendering Issues: {summary.byType.renderingIssues}

## Critical Defects

[List all critical severity defects with full details]

## High Priority Defects

[List all high severity defects with full details]

## Medium Priority Defects

[List all medium severity defects with full details]

## Low Priority Defects

[List all low severity defects with full details]

## Page Inventory

[Table of all pages with status and defect count]
```

## Example Data

```json
{
  "timestamp": "2025-10-13T16:54:00Z",
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
      "missingContent": 9,
      "renderingIssues": 0
    }
  },
  "defects": [
    {
      "id": "DEF-001",
      "page": "/docs/getting-started/",
      "type": "missingContent",
      "severity": "critical",
      "description": "Documentation page shows raw Jekyll template instead of rendered content",
      "expected": "Rendered documentation with code examples and explanatory text",
      "actual": "Raw YAML front matter visible: 'snippet_titles: [Try it now, For the browser, For Node.js]'",
      "screenshot": "screenshots/def-001.png",
      "consoleErrors": [
        "Failed to load resource: the server responded with a status of 404 (Not Found) - _snippets/try-it-now.html"
      ],
      "reproduction": "1. Start server with 'npm start'\n2. Navigate to http://localhost:3000/docs/getting-started/\n3. Observe raw template instead of rendered content",
      "comparisonData": {
        "productionStatus": "Renders correctly with full content",
        "isDifference": true
      }
    }
  ],
  "pageInventory": [
    {
      "url": "http://localhost:3000/docs/getting-started/",
      "path": "/docs/getting-started/",
      "title": "Getting Started",
      "status": "accessible",
      "loadTime": 245,
      "resourceCounts": {
        "css": 3,
        "js": 5,
        "images": 2,
        "fonts": 4,
        "failed": 1
      },
      "defectIds": ["DEF-001"],
      "discoveredFrom": "http://localhost:3000/"
    }
  ]
}
```

## Relationships Diagram

```text
DefectInventory (1)
├── sites: SiteConfig (1)
├── summary: InventorySummary (1)
├── defects: Defect (0..*)
│   └── references → PageRecord.path
└── pageInventory: PageRecord (0..*)
    └── defectIds → Defect.id (0..*)
```

## Validation Rules Summary

1. All IDs must be unique within their entity type
2. All references must point to valid entities
3. All counts must be non-negative and consistent
4. All URLs must be valid and reachable
5. All enums must use defined values
6. All required fields must be present and non-empty
7. Summary statistics must match actual data counts
