# Data Model: MkDocs Warning Remediation

**Date**: 2025-10-16  
**Feature**: MkDocs Warning Remediation  
**Purpose**: Define data structures for warning capture, categorization, and remediation tracking

## Overview

This data model defines the structure for capturing, categorizing, and tracking MkDocs build warnings throughout the remediation process. All data is stored in JSON format for programmatic processing and analysis.

---

## Core Entities

### 1. Warning

Represents a single warning emitted by MkDocs during the build process.

**Attributes**:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (hash of file + line + message) |
| `timestamp` | ISO 8601 datetime | Yes | When warning was captured |
| `file_path` | string | Yes | Relative path to source file (e.g., "docs/snippets/models.md") |
| `line_number` | integer | No | Line number where warning occurs (if available) |
| `category` | enum | Yes | Warning category (see Warning Categories) |
| `severity` | enum | Yes | Warning severity: "error", "warning", "info" |
| `message` | string | Yes | Full warning message from MkDocs |
| `raw_output` | string | Yes | Raw stderr line from MkDocs |
| `status` | enum | Yes | Remediation status (see Remediation Status) |
| `fix_applied` | string | No | Description of fix applied (if status = "fixed") |
| `notes` | string | No | Additional context or justification |

**Warning Categories** (enum):
- `broken_link` - Internal link points to non-existent file or anchor
- `missing_reference` - Cross-reference target not found
- `syntax_error` - Markdown syntax issue (malformed table, list, etc.)
- `plugin_warning` - Plugin-specific warning
- `config_warning` - Configuration or deprecation warning
- `other` - Uncategorized warning

**Remediation Status** (enum):
- `pending` - Not yet addressed
- `in_progress` - Currently being investigated
- `fixed` - Successfully remediated
- `accepted` - Cannot be fixed, documented as acceptable
- `deferred` - Will be addressed in future work

**Example**:
```json
{
  "id": "a3f5b2c1",
  "timestamp": "2025-10-16T12:00:00Z",
  "file_path": "docs/snippets/models.md",
  "line_number": 42,
  "category": "broken_link",
  "severity": "warning",
  "message": "Doc file 'docs/snippets/models.md' contains a link '../api/classes.md', but the target 'docs/api/classes.md' is not found among documentation files.",
  "raw_output": "WARNING - Doc file 'docs/snippets/models.md' contains a link '../api/classes.md', but the target 'docs/api/classes.md' is not found among documentation files.",
  "status": "fixed",
  "fix_applied": "Updated link to point to 'api/index.md#classes' section",
  "notes": "API documentation was restructured; updated link to new location"
}
```

---

### 2. Warning Report

Aggregated view of all warnings, providing baseline and progress tracking.

**Attributes**:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `report_id` | string | Yes | Unique report identifier |
| `report_type` | enum | Yes | "baseline", "progress", "final" |
| `timestamp` | ISO 8601 datetime | Yes | When report was generated |
| `total_warnings` | integer | Yes | Total number of warnings |
| `target_warnings` | integer | Yes | Target warning count (150 for 70% reduction) |
| `reduction_percentage` | float | Yes | Actual reduction percentage |
| `warnings` | array[Warning] | Yes | Array of all warnings |
| `category_summary` | object | Yes | Summary by category (see Category Summary) |
| `file_summary` | object | Yes | Summary by file (see File Summary) |
| `remediation_summary` | object | Yes | Summary by status (see Remediation Summary) |

**Category Summary**:
```json
{
  "broken_link": {
    "count": 234,
    "percentage": 44.7,
    "fixed": 180,
    "pending": 54
  },
  "missing_reference": {
    "count": 156,
    "percentage": 29.8,
    "fixed": 120,
    "pending": 36
  }
  // ... other categories
}
```

**File Summary**:
```json
{
  "docs/snippets/models.md": {
    "warning_count": 15,
    "categories": {
      "broken_link": 8,
      "syntax_error": 7
    },
    "status": {
      "fixed": 10,
      "pending": 5
    }
  }
  // ... other files
}
```

**Remediation Summary**:
```json
{
  "fixed": 300,
  "pending": 150,
  "accepted": 23,
  "deferred": 50,
  "in_progress": 0
}
```

**Example**:
```json
{
  "report_id": "baseline-2025-10-16",
  "report_type": "baseline",
  "timestamp": "2025-10-16T12:00:00Z",
  "total_warnings": 523,
  "target_warnings": 150,
  "reduction_percentage": 0.0,
  "warnings": [ /* array of Warning objects */ ],
  "category_summary": { /* category breakdown */ },
  "file_summary": { /* file breakdown */ },
  "remediation_summary": {
    "fixed": 0,
    "pending": 523,
    "accepted": 0,
    "deferred": 0,
    "in_progress": 0
  }
}
```

---

### 3. Remediation Action

Represents a fix applied to address one or more warnings.

**Attributes**:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `action_id` | string | Yes | Unique action identifier |
| `timestamp` | ISO 8601 datetime | Yes | When action was taken |
| `action_type` | enum | Yes | Type of fix applied (see Action Types) |
| `file_path` | string | Yes | File that was modified |
| `warnings_addressed` | array[string] | Yes | Array of warning IDs addressed by this action |
| `description` | string | Yes | Human-readable description of fix |
| `before` | string | No | Content before fix (for rollback) |
| `after` | string | No | Content after fix (for verification) |
| `git_commit` | string | No | Git commit SHA if committed |
| `verified` | boolean | Yes | Whether fix was verified to work |
| `verification_notes` | string | No | Notes from verification process |

**Action Types** (enum):
- `link_update` - Updated link path or anchor
- `link_creation` - Created missing target content
- `syntax_fix` - Fixed markdown syntax error
- `config_update` - Updated MkDocs configuration
- `plugin_update` - Updated plugin settings
- `content_restructure` - Reorganized content to fix references
- `accepted_as_is` - Documented warning as acceptable

**Example**:
```json
{
  "action_id": "fix-001",
  "timestamp": "2025-10-16T14:30:00Z",
  "action_type": "link_update",
  "file_path": "docs/snippets/models.md",
  "warnings_addressed": ["a3f5b2c1", "b4c6d3e2"],
  "description": "Updated broken API links to point to new API index structure",
  "before": "[Model class](../api/classes.md#model)",
  "after": "[Model class](../api/index.md#model-class)",
  "git_commit": "abc123def456",
  "verified": true,
  "verification_notes": "Link tested in built site, navigates correctly"
}
```

---

### 4. Documentation File

Metadata about a documentation file and its warning status.

**Attributes**:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | Yes | Relative path to file |
| `file_type` | enum | Yes | "markdown", "yaml", "other" |
| `warning_count` | integer | Yes | Number of warnings in this file |
| `word_count` | integer | Yes | Total word count (for content preservation check) |
| `heading_count` | integer | Yes | Number of headings (for structure preservation) |
| `link_count` | integer | Yes | Number of links (for link validation) |
| `code_block_count` | integer | Yes | Number of code blocks (for content preservation) |
| `last_modified` | ISO 8601 datetime | Yes | Last modification timestamp |
| `remediation_status` | enum | Yes | "not_started", "in_progress", "completed" |
| `warnings` | array[string] | Yes | Array of warning IDs for this file |

**Example**:
```json
{
  "file_path": "docs/snippets/models.md",
  "file_type": "markdown",
  "warning_count": 15,
  "word_count": 1250,
  "heading_count": 8,
  "link_count": 23,
  "code_block_count": 12,
  "last_modified": "2025-10-16T14:30:00Z",
  "remediation_status": "completed",
  "warnings": ["a3f5b2c1", "b4c6d3e2", "c5d7e4f3"]
}
```

---

### 5. Link Reference

Represents a link found in documentation with validation status.

**Attributes**:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `link_id` | string | Yes | Unique link identifier |
| `source_file` | string | Yes | File containing the link |
| `source_line` | integer | No | Line number of link |
| `link_text` | string | Yes | Display text of link |
| `link_target` | string | Yes | Target path or URL |
| `link_type` | enum | Yes | "internal", "external", "anchor" |
| `is_valid` | boolean | Yes | Whether link target exists |
| `validation_error` | string | No | Error message if invalid |
| `suggested_fix` | string | No | Suggested correction if invalid |
| `status` | enum | Yes | "valid", "broken", "fixed", "ignored" |

**Example**:
```json
{
  "link_id": "link-001",
  "source_file": "docs/snippets/models.md",
  "source_line": 42,
  "link_text": "Model class",
  "link_target": "../api/classes.md#model",
  "link_type": "internal",
  "is_valid": false,
  "validation_error": "Target file 'docs/api/classes.md' does not exist",
  "suggested_fix": "../api/index.md#model-class",
  "status": "fixed"
}
```

---

## Data Relationships

```
Warning Report (1) ──┬──> (N) Warning
                     │
                     ├──> (N) Category Summary
                     │
                     ├──> (N) File Summary
                     │
                     └──> (1) Remediation Summary

Warning (N) ──> (1) Documentation File

Warning (N) ──> (1) Remediation Action

Documentation File (1) ──> (N) Link Reference

Link Reference (N) ──> (0..1) Warning
```

---

## State Transitions

### Warning Status Lifecycle

```
pending → in_progress → fixed
                     ↓
                  accepted
                     ↓
                  deferred
```

**Transitions**:
- `pending → in_progress`: Investigation started
- `in_progress → fixed`: Fix applied and verified
- `in_progress → accepted`: Cannot be fixed, documented as acceptable
- `in_progress → deferred`: Will address in future work
- `pending → deferred`: Deprioritized without investigation

### Documentation File Status Lifecycle

```
not_started → in_progress → completed
```

**Transitions**:
- `not_started → in_progress`: First warning in file addressed
- `in_progress → completed`: All warnings in file resolved

---

## Validation Rules

### Warning Entity
- `id` must be unique across all warnings
- `category` must be one of defined enum values
- `status` must be one of defined enum values
- If `status = "fixed"`, `fix_applied` must be provided
- If `status = "accepted"`, `notes` must explain why

### Warning Report
- `total_warnings` must equal count of warnings array
- `reduction_percentage` = (baseline_count - current_count) / baseline_count
- Sum of category counts must equal `total_warnings`
- Sum of remediation status counts must equal `total_warnings`

### Remediation Action
- All `warnings_addressed` IDs must exist in Warning entities
- If `verified = true`, `verification_notes` should be provided
- `before` and `after` should be provided for rollback capability

### Documentation File
- `warning_count` must match number of warnings with this `file_path`
- Content metrics (word_count, heading_count, etc.) must not decrease after remediation
- `remediation_status = "completed"` only if all warnings are fixed or accepted

### Link Reference
- If `is_valid = false`, `validation_error` must be provided
- If `status = "fixed"`, `suggested_fix` should match actual fix applied
- `link_type = "internal"` links must use relative paths
- `link_type = "external"` links must use absolute URLs

---

## File Storage Structure

```
reports/
├── baselines/
│   └── warning-baseline.json          # Initial Warning Report
├── docs-warnings/
│   ├── categorized-warnings.json      # Current Warning Report
│   ├── remediation-log.json           # Array of Remediation Actions
│   ├── progress-report-*.json         # Progress snapshots
│   └── file-metadata.json             # Array of Documentation Files
└── tests/
    ├── docs-validation.json           # Content audit results
    └── link-validation.json           # Array of Link References
```

---

## Query Patterns

### Get warnings by category
```python
warnings_by_category = {
    category: [w for w in warnings if w['category'] == category]
    for category in set(w['category'] for w in warnings)
}
```

### Get warnings by file
```python
warnings_by_file = {
    file: [w for w in warnings if w['file_path'] == file]
    for file in set(w['file_path'] for w in warnings)
}
```

### Calculate progress
```python
baseline_count = baseline_report['total_warnings']
current_count = current_report['total_warnings']
reduction = (baseline_count - current_count) / baseline_count
target_met = reduction >= 0.70
```

### Find high-priority files
```python
high_priority_files = sorted(
    file_summary.items(),
    key=lambda x: x[1]['warning_count'],
    reverse=True
)[:10]  # Top 10 files with most warnings
```

---

## Data Integrity Checks

### Pre-Remediation Baseline
- Capture all file metrics (word count, heading count, etc.)
- Store baseline warning count and distribution
- Create git tag for rollback reference

### Post-Remediation Validation
- Verify no content loss (word counts preserved)
- Verify no structure loss (heading counts preserved)
- Verify all "fixed" warnings no longer appear in build
- Verify no new warnings introduced

### Continuous Validation
- After each batch of fixes, regenerate Warning Report
- Compare against baseline to track progress
- Verify reduction percentage moving toward 70% target
- Alert if any content metrics decrease

---

## Next Steps

Data model complete. This schema will be used to:
1. Generate JSON schema contracts in `contracts/` directory
2. Implement Python scripts for warning capture and analysis
3. Create progress tracking and reporting tools
4. Validate remediation actions preserve content integrity
