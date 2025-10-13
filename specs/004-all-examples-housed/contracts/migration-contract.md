# Migration Contract: Example File Modernization

**Feature**: 004-all-examples-housed  
**Date**: 2025-10-12  
**Type**: File Transformation Contract

## Overview

This contract defines the expected behavior for migrating example files from legacy JavaScript syntax to ES6+ modern syntax. It serves as the specification for both automated migration tools and manual verification.

## Contract: File Migration

### Input

**File Requirements**:
- Valid JavaScript, TypeScript, or HTML file
- Located in `packages/photon/examples/` or `packages/playground/models/`
- Contains at least one legacy syntax pattern:
  - `require()` import statements
  - `module.exports` export statements
  - `var` variable declarations
  - `makerjs` namespace references

**Example Input File** (`smile.js`):
```javascript
var makerjs = require('./../target/js/node.maker.js');

function smile(span, teeth, droop, dainty, gaze, heady) {
    this.paths = {
        head: new makerjs.paths.Circle([0, 0], 27),
        rightEye: new makerjs.paths.Circle([10, heady], gaze),
        leftEye: new makerjs.paths.Circle([-10, heady], gaze)
    };

    var mouth = new makerjs.models.OvalArc(270 - span, 270 + span, dainty, teeth);
    mouth.origin = [0, droop];

    this.models = {
        mouth: mouth
    };
}

smile.metaParameters = [
    { title: "smile span", type: "range", min: 0, max: 90, value: 45 }
];

module.exports = smile;
```

### Output

**File Guarantees**:
- Valid ES6+ JavaScript/TypeScript syntax
- All imports use ES6 `import` statements
- All exports use ES6 `export` statements
- All variables use `const` or `let` (no `var`)
- All namespace references use `photon` (not `makerjs`)
- Functional behavior identical to input
- File formatting preserved (indentation, line breaks)

**Example Output File** (`smile.js`):
```javascript
import * as photon from 'photon';

function smile(span, teeth, droop, dainty, gaze, heady) {
    this.paths = {
        head: new photon.paths.Circle([0, 0], 27),
        rightEye: new photon.paths.Circle([10, heady], gaze),
        leftEye: new photon.paths.Circle([-10, heady], gaze)
    };

    const mouth = new photon.models.OvalArc(270 - span, 270 + span, dainty, teeth);
    mouth.origin = [0, droop];

    this.models = {
        mouth: mouth
    };
}

smile.metaParameters = [
    { title: "smile span", type: "range", min: 0, max: 90, value: 45 }
];

export default smile;
```

### Transformation Rules

#### Rule 1: Import Transformation

**Pattern**: `var <identifier> = require(<path>)`  
**Replacement**: `import * as <identifier> from 'photon'`

**Conditions**:
- `<path>` contains 'makerjs' or internal build paths
- `<identifier>` is typically 'makerjs'
- Import statement is at file top (before any code)

**Guarantees**:
- Import uses ES6 syntax
- Import references 'photon' package
- Identifier changed to 'photon' if originally 'makerjs'

#### Rule 2: Export Transformation

**Pattern**: `module.exports = <identifier>`  
**Replacement**: `export default <identifier>`

**Conditions**:
- Export statement typically at file end
- Single default export per file

**Guarantees**:
- Export uses ES6 syntax
- Exported identifier unchanged
- File remains single-export module

#### Rule 3: Variable Declaration Transformation

**Pattern**: `var <identifier> = <value>`  
**Replacement**: `const <identifier> = <value>` OR `let <identifier> = <value>`

**Conditions**:
- Use `const` if variable is never reassigned
- Use `let` if variable is reassigned
- Preserve variable scope and initialization

**Guarantees**:
- No `var` declarations remain
- Block scoping maintained
- Immutability enforced where possible

#### Rule 4: Namespace Transformation

**Pattern**: `makerjs.`  
**Replacement**: `photon.`

**Conditions**:
- Only transform in code (not in strings or comments)
- Apply to all property accesses (paths, models, etc.)

**Guarantees**:
- All code references use 'photon' namespace
- No 'makerjs' references in active code
- Comments may retain 'makerjs' for historical context

## Contract: Verification

### Syntax Verification

**Input**: Migrated file path  
**Output**: Boolean (pass/fail) + error details

**Verification Steps**:
1. Parse file with JavaScript/TypeScript parser
2. Verify no syntax errors
3. Verify AST is valid

**Success Criteria**:
- File parses without errors
- All statements are valid ES6+ syntax

### Import Verification

**Input**: Migrated file content  
**Output**: Boolean (pass/fail) + list of violations

**Verification Steps**:
1. Search for `require(` pattern
2. Count occurrences
3. Report any found

**Success Criteria**:
- Zero `require()` statements found
- All imports use ES6 `import` syntax

### Variable Verification

**Input**: Migrated file content  
**Output**: Boolean (pass/fail) + list of violations

**Verification Steps**:
1. Search for `var ` pattern (with space)
2. Exclude matches in comments/strings
3. Count occurrences
4. Report any found

**Success Criteria**:
- Zero `var` declarations found
- All variables use `const` or `let`

### Namespace Verification

**Input**: Migrated file content  
**Output**: Boolean (pass/fail) + list of violations

**Verification Steps**:
1. Search for `makerjs` pattern (case-sensitive)
2. Exclude matches in comments/strings
3. Count occurrences in code
4. Report any found

**Success Criteria**:
- Zero `makerjs` references in code
- All namespace references use `photon`

### Functional Verification

**Input**: Original file, migrated file  
**Output**: Boolean (pass/fail) + difference report

**Verification Steps**:
1. Execute original file, capture output
2. Execute migrated file, capture output
3. Compare outputs for equivalence
4. Report any differences

**Success Criteria**:
- Migrated file executes without errors
- Output matches original file output
- Behavior is functionally equivalent

## Contract: Batch Migration

### Input

**Batch Requirements**:
- List of file paths to migrate
- Priority order (P1 examples first, P2 playground second)
- Verification configuration

### Output

**Batch Guarantees**:
- All files processed in priority order
- Migration report generated
- Verification results for each file
- Rollback capability if any file fails

### Migration Report Schema

```json
{
  "migrationId": "004-examples-modernization",
  "timestamp": "2025-10-12T23:41:00Z",
  "filesProcessed": 28,
  "filesSucceeded": 28,
  "filesFailed": 0,
  "results": [
    {
      "filePath": "packages/photon/examples/smile.js",
      "status": "success",
      "transformations": {
        "imports": 1,
        "exports": 1,
        "variables": 1,
        "namespaces": 5
      },
      "verification": {
        "syntax": "pass",
        "imports": "pass",
        "variables": "pass",
        "namespace": "pass",
        "functional": "pass"
      }
    }
  ]
}
```

## Error Handling

### Error: Syntax Error After Migration

**Condition**: Migrated file fails syntax verification

**Response**:
- Halt migration for this file
- Preserve original file
- Log error with file path and syntax error details
- Mark file for manual review

### Error: Functional Behavior Changed

**Condition**: Migrated file produces different output than original

**Response**:
- Halt migration for this file
- Preserve original file
- Log error with difference report
- Mark file for manual review

### Error: File Access Error

**Condition**: Cannot read or write file

**Response**:
- Halt migration for this file
- Log error with file path and permission details
- Mark file for retry

### Error: Ambiguous Variable Usage

**Condition**: Cannot determine if variable should be `const` or `let`

**Response**:
- Default to `let` (safer choice)
- Log warning for manual review
- Continue migration

## Performance Contract

### Migration Performance

**Guarantees**:
- Single file migration completes in < 1 second
- Batch migration of 28 files completes in < 30 seconds
- Verification adds < 2 seconds per file

### Resource Usage

**Guarantees**:
- Memory usage < 100MB for entire batch
- No temporary files created (in-memory processing)
- Original files backed up before modification

## Rollback Contract

### Rollback Conditions

- Any file fails verification
- User requests rollback
- Unexpected error during migration

### Rollback Guarantees

- All files restored to original state
- No partial migrations remain
- Git working directory clean

## Acceptance Criteria

### Migration Acceptance

- ✅ All 28 files migrated successfully
- ✅ All verification checks pass
- ✅ Migration report generated
- ✅ No syntax errors introduced
- ✅ No functional changes detected

### Code Quality Acceptance

- ✅ All files follow Airbnb Style Guide
- ✅ ESLint passes with no errors
- ✅ TypeScript compiler validates .ts files
- ✅ No `var` declarations remain
- ✅ No `require()` statements remain
- ✅ No `makerjs` references in code

### Documentation Acceptance

- ✅ Migration report documents all changes
- ✅ Verification results archived
- ✅ Any manual interventions documented

## Version Compatibility

**Node.js**: 18.x, 20.x, 22.x (LTS versions)  
**TypeScript**: 5.6.3+  
**Browser**: Modern browsers with ES6 module support

## References

- Feature Specification: [spec.md](../spec.md)
- Research Document: [research.md](../research.md)
- Data Model: [data-model.md](../data-model.md)
