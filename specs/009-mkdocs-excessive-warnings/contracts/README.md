# API Contracts: MkDocs Warning Remediation

**Date**: 2025-10-16  
**Feature**: MkDocs Warning Remediation  
**Purpose**: JSON Schema definitions for warning capture, tracking, and remediation

## Overview

This directory contains JSON Schema definitions for all data structures used in the MkDocs warning remediation process. These schemas ensure data consistency, enable validation, and serve as contracts between different components of the system.

## Schemas

### 1. warning-schema.json

Defines the structure for a single warning emitted by MkDocs.

**Key Fields**:
- `id`: Unique identifier (hash)
- `category`: broken_link | missing_reference | syntax_error | plugin_warning | config_warning | other
- `status`: pending | in_progress | fixed | accepted | deferred
- `file_path`: Source file where warning occurs
- `message`: Full warning message from MkDocs

**Validation Rules**:
- If `status = "fixed"`, `fix_applied` field is required
- `file_path` must start with "docs/"
- `id` must be hexadecimal hash (8+ characters)

**Usage**:
```python
import json
import jsonschema

with open('contracts/warning-schema.json') as f:
    schema = json.load(f)

# Validate a warning object
warning = {
    "id": "a3f5b2c1",
    "timestamp": "2025-10-16T12:00:00Z",
    "file_path": "docs/snippets/models.md",
    "category": "broken_link",
    "severity": "warning",
    "message": "Link target not found",
    "raw_output": "WARNING - ...",
    "status": "pending"
}

jsonschema.validate(instance=warning, schema=schema)
```

---

### 2. warning-report-schema.json

Defines the structure for aggregated warning reports (baseline, progress, final).

**Key Fields**:
- `report_type`: baseline | progress | final
- `total_warnings`: Current warning count
- `target_warnings`: Target count (150 for 70% reduction)
- `reduction_percentage`: Progress toward goal (0.0 to 1.0)
- `warnings`: Array of Warning objects
- `category_summary`: Breakdown by warning category
- `file_summary`: Breakdown by source file
- `remediation_summary`: Breakdown by status

**Validation Rules**:
- `report_id` must follow pattern: `(baseline|progress|final)-YYYY-MM-DD(-N)?`
- `total_warnings` must equal length of `warnings` array
- Sum of category counts must equal `total_warnings`
- Sum of remediation status counts must equal `total_warnings`

**Usage**:
```python
# Generate a progress report
report = {
    "report_id": "progress-2025-10-16-1",
    "report_type": "progress",
    "timestamp": "2025-10-16T14:00:00Z",
    "total_warnings": 350,
    "target_warnings": 150,
    "reduction_percentage": 0.33,
    "warnings": [...],
    "category_summary": {...},
    "file_summary": {...},
    "remediation_summary": {
        "fixed": 173,
        "pending": 150,
        "accepted": 27,
        "deferred": 0,
        "in_progress": 0
    }
}

jsonschema.validate(instance=report, schema=report_schema)
```

---

### 3. remediation-action-schema.json

Defines the structure for a fix applied to address warnings.

**Key Fields**:
- `action_type`: link_update | link_creation | syntax_fix | config_update | plugin_update | content_restructure | accepted_as_is
- `warnings_addressed`: Array of warning IDs fixed by this action
- `description`: Human-readable explanation of fix
- `before` / `after`: Content snapshots for rollback
- `verified`: Whether fix was tested and confirmed

**Validation Rules**:
- `action_id` must follow pattern: `fix-NNN` (3+ digits)
- `warnings_addressed` must contain at least one warning ID
- Each warning ID must be valid hexadecimal hash

**Usage**:
```python
# Log a remediation action
action = {
    "action_id": "fix-001",
    "timestamp": "2025-10-16T14:30:00Z",
    "action_type": "link_update",
    "file_path": "docs/snippets/models.md",
    "warnings_addressed": ["a3f5b2c1", "b4c6d3e2"],
    "description": "Updated broken API links",
    "before": "[Model class](../api/classes.md)",
    "after": "[Model class](../api/index.md#model-class)",
    "verified": true,
    "verification_notes": "Link tested in built site"
}

jsonschema.validate(instance=action, schema=action_schema)
```

---

### 4. link-reference-schema.json

Defines the structure for a link found in documentation.

**Key Fields**:
- `link_type`: internal | external | anchor
- `is_valid`: Boolean indicating if target exists
- `validation_error`: Error message if invalid
- `suggested_fix`: Proposed correction
- `status`: valid | broken | fixed | ignored

**Validation Rules**:
- If `is_valid = false`, `validation_error` is required
- `source_file` must start with "docs/"
- `link_id` must follow pattern: `link-NNN` (3+ digits)

**Usage**:
```python
# Validate a link
link = {
    "link_id": "link-001",
    "source_file": "docs/snippets/models.md",
    "source_line": 42,
    "link_text": "Model class",
    "link_target": "../api/classes.md#model",
    "link_type": "internal",
    "is_valid": false,
    "validation_error": "Target file does not exist",
    "suggested_fix": "../api/index.md#model-class",
    "status": "broken"
}

jsonschema.validate(instance=link, schema=link_schema)
```

---

## Schema Relationships

```
Warning Report
├── warnings[] → Warning Schema
├── category_summary → (derived from warnings)
├── file_summary → (derived from warnings)
└── remediation_summary → (derived from warnings)

Remediation Action
└── warnings_addressed[] → Warning.id

Link Reference
└── (may generate) → Warning (if broken)
```

---

## Validation Workflow

### 1. Capture Phase
```python
# Capture warnings from MkDocs build
warnings = capture_warnings()

# Validate each warning against schema
for warning in warnings:
    jsonschema.validate(instance=warning, schema=warning_schema)

# Generate baseline report
baseline = generate_report(warnings, report_type="baseline")
jsonschema.validate(instance=baseline, schema=report_schema)
```

### 2. Remediation Phase
```python
# Apply fix
action = apply_fix(warning_ids=["a3f5b2c1"])
jsonschema.validate(instance=action, schema=action_schema)

# Update warning status
for warning_id in action['warnings_addressed']:
    warning = get_warning(warning_id)
    warning['status'] = 'fixed'
    warning['fix_applied'] = action['description']
    jsonschema.validate(instance=warning, schema=warning_schema)
```

### 3. Progress Tracking
```python
# Generate progress report
progress = generate_report(warnings, report_type="progress")
jsonschema.validate(instance=progress, schema=report_schema)

# Check if target met
if progress['reduction_percentage'] >= 0.70:
    print("✅ Target achieved!")
```

---

## File Storage Conventions

### Baseline Report
- **Path**: `reports/baselines/warning-baseline.json`
- **Schema**: warning-report-schema.json
- **Generated**: Once at project start
- **Immutable**: Never modified after creation

### Progress Reports
- **Path**: `reports/docs-warnings/progress-report-YYYY-MM-DD-N.json`
- **Schema**: warning-report-schema.json
- **Generated**: After each batch of fixes
- **Naming**: Date + sequence number for multiple reports per day

### Remediation Log
- **Path**: `reports/docs-warnings/remediation-log.json`
- **Schema**: Array of remediation-action-schema.json
- **Generated**: Append-only log of all fixes
- **Format**: JSON array of Remediation Action objects

### Link Validation
- **Path**: `reports/tests/link-validation.json`
- **Schema**: Array of link-reference-schema.json
- **Generated**: During link validation phase
- **Format**: JSON array of Link Reference objects

---

## Schema Versioning

All schemas use JSON Schema Draft 07. If schema changes are needed:

1. **Minor changes** (add optional field): Update schema, increment patch version in `$id`
2. **Breaking changes** (remove/rename field): Create new schema version, maintain backward compatibility
3. **Document changes**: Update this README with migration notes

**Current Version**: 1.0.0 (Initial release)

---

## Testing Schemas

### Validate Schema Syntax
```bash
# Install JSON Schema validator
pip install check-jsonschema

# Validate schema files
check-jsonschema --check-metaschema contracts/*.json
```

### Validate Data Against Schema
```python
import json
import jsonschema

def validate_file(data_file, schema_file):
    with open(data_file) as f:
        data = json.load(f)
    with open(schema_file) as f:
        schema = json.load(f)
    
    try:
        jsonschema.validate(instance=data, schema=schema)
        print(f"✅ {data_file} is valid")
    except jsonschema.ValidationError as e:
        print(f"❌ {data_file} is invalid: {e.message}")

# Validate baseline report
validate_file(
    'reports/baselines/warning-baseline.json',
    'contracts/warning-report-schema.json'
)
```

---

## Integration with Python Scripts

All Python scripts in `scripts/docs-warnings/` should:

1. Import schemas for validation
2. Validate all generated data before writing to files
3. Validate all loaded data after reading from files
4. Handle validation errors gracefully with clear error messages

**Example**:
```python
import json
import jsonschema
from pathlib import Path

class WarningReporter:
    def __init__(self):
        schema_dir = Path('specs/009-mkdocs-excessive-warnings/contracts')
        with open(schema_dir / 'warning-schema.json') as f:
            self.warning_schema = json.load(f)
        with open(schema_dir / 'warning-report-schema.json') as f:
            self.report_schema = json.load(f)
    
    def validate_warning(self, warning):
        jsonschema.validate(instance=warning, schema=self.warning_schema)
    
    def validate_report(self, report):
        jsonschema.validate(instance=report, schema=self.report_schema)
    
    def save_report(self, report, filepath):
        self.validate_report(report)
        with open(filepath, 'w') as f:
            json.dump(report, f, indent=2)
```

---

## Next Steps

1. Implement Python scripts using these schemas
2. Generate baseline report and validate against schema
3. Implement remediation workflow with schema validation at each step
4. Create progress tracking dashboard using validated data
