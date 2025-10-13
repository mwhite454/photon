# Data Model: Modernize Examples and Playground Models

**Feature**: 004-all-examples-housed  
**Date**: 2025-10-12  
**Purpose**: Define the structure and transformations for example file migration

## Overview

This feature involves transforming file content, not managing persistent data. The "entities" here are the files themselves and the syntax patterns being transformed.

## Entities

### Example File

**Description**: A JavaScript, TypeScript, or HTML file demonstrating photon library functionality

**Attributes**:
- **filePath** (string): Absolute path to the file (e.g., `/packages/photon/examples/smile.js`)
- **fileType** (enum): `javascript` | `typescript` | `html`
- **hasImports** (boolean): Whether file contains import/require statements
- **hasExports** (boolean): Whether file contains export/module.exports statements
- **hasMetaParameters** (boolean): Whether file defines metaParameters property
- **variableCount** (number): Number of variable declarations in the file
- **originalContent** (string): File content before migration
- **migratedContent** (string): File content after migration

**Relationships**:
- Belongs to one **File Location** (examples or playground)
- Contains multiple **Syntax Patterns** to transform

**Validation Rules**:
- File must exist and be readable
- File must be valid JavaScript/TypeScript syntax before migration
- File must be valid JavaScript/TypeScript syntax after migration
- File must maintain functional equivalence after migration

### File Location

**Description**: The directory containing files to migrate

**Attributes**:
- **path** (string): Directory path (`packages/photon/examples` or `packages/playground/models`)
- **fileCount** (number): Number of files in the location
- **priority** (enum): `P1` (examples) | `P2` (playground)

**Relationships**:
- Contains multiple **Example Files**

**Validation Rules**:
- Path must exist
- Path must be within the photon monorepo

### Syntax Pattern

**Description**: A specific syntax transformation to apply

**Attributes**:
- **patternType** (enum): `import` | `export` | `variable` | `namespace`
- **searchPattern** (regex): Pattern to find in source code
- **replacementPattern** (string): Replacement syntax
- **requiresManualReview** (boolean): Whether transformation needs human verification

**Pattern Types**:

#### Import Pattern
- **Search**: `var makerjs = require('./../target/js/node.maker.js')` or `var makerjs = require('makerjs')`
- **Replace**: `import * as photon from 'photon'`
- **Manual Review**: No (straightforward replacement)

#### Export Pattern
- **Search**: `module.exports = <identifier>`
- **Replace**: `export default <identifier>`
- **Manual Review**: No (straightforward replacement)

#### Variable Pattern
- **Search**: `var <identifier> = <value>`
- **Replace**: `const <identifier> = <value>` OR `let <identifier> = <value>`
- **Manual Review**: Yes (requires analysis of reassignment)

#### Namespace Pattern
- **Search**: `makerjs.` (in code body)
- **Replace**: `photon.`
- **Manual Review**: No (global find/replace)

**Validation Rules**:
- Pattern must be valid regex
- Replacement must produce valid JavaScript syntax
- Pattern must not match unintended code

## State Transitions

### Example File Migration States

```
[Pending] → [Analyzed] → [Migrated] → [Verified] → [Complete]
    ↓           ↓            ↓            ↓
  [Error]   [Error]      [Error]      [Failed]
```

**State Descriptions**:

1. **Pending**: File identified for migration, not yet processed
2. **Analyzed**: File scanned for syntax patterns, transformation plan created
3. **Migrated**: File content updated with new syntax
4. **Verified**: File tested for syntax validity and functional equivalence
5. **Complete**: File successfully migrated and verified
6. **Error**: Syntax error or file access issue (can retry from any state)
7. **Failed**: Verification failed, functional behavior changed (requires manual intervention)

## Transformation Rules

### Rule 1: Import Statement Transformation

**Condition**: File contains `require()` statement importing makerjs

**Actions**:
1. Locate import statement (typically line 1)
2. Replace with ES6 import syntax
3. Update namespace from `makerjs` to `photon`
4. Remove internal path references

**Example**:
```javascript
// Before
var makerjs = require('./../target/js/node.maker.js');

// After
import * as photon from 'photon';
```

### Rule 2: Export Statement Transformation

**Condition**: File contains `module.exports` statement

**Actions**:
1. Locate export statement (typically last line)
2. Replace with ES6 export default syntax
3. Preserve exported identifier

**Example**:
```javascript
// Before
module.exports = smile;

// After
export default smile;
```

### Rule 3: Variable Declaration Transformation

**Condition**: File contains `var` declarations

**Actions**:
1. Identify all `var` declarations
2. Analyze if variable is reassigned
3. Replace with `const` if never reassigned
4. Replace with `let` if reassigned
5. Maintain block scoping

**Example**:
```javascript
// Before
var circle = new makerjs.paths.Circle([0, 0], 10);
var counter = 0;
counter = counter + 1;

// After
const circle = new photon.paths.Circle([0, 0], 10);
let counter = 0;
counter = counter + 1;
```

### Rule 4: Namespace Reference Transformation

**Condition**: File contains `makerjs.` references

**Actions**:
1. Find all occurrences of `makerjs.`
2. Replace with `photon.`
3. Verify no false positives (e.g., in strings or comments)

**Example**:
```javascript
// Before
this.paths = {
  head: new makerjs.paths.Circle([0, 0], 27)
};

// After
this.paths = {
  head: new photon.paths.Circle([0, 0], 27)
};
```

### Rule 5: MetaParameters Preservation

**Condition**: File contains `functionName.metaParameters` definition

**Actions**:
1. Preserve metaParameters array exactly as-is
2. No transformation needed (already uses modern syntax)

**Example**:
```javascript
// No change needed
smile.metaParameters = [
  { title: "smile span", type: "range", min: 0, max: 90, value: 45 }
];
```

## Verification Model

### Verification Check

**Description**: A test to ensure migration success

**Attributes**:
- **checkType** (enum): `syntax` | `imports` | `variables` | `namespace` | `functional`
- **filePath** (string): File being checked
- **status** (enum): `pass` | `fail` | `pending`
- **errorMessage** (string): Description if check fails

**Check Types**:

1. **Syntax Check**: File parses without syntax errors
2. **Import Check**: Zero `require()` statements remain
3. **Variable Check**: Zero `var` declarations remain
4. **Namespace Check**: Zero `makerjs` references remain (except in comments)
5. **Functional Check**: File executes and produces expected output

## Data Constraints

### File-Level Constraints

- File size must be < 100KB (all examples are well under this)
- File must be UTF-8 encoded
- File must have .js, .ts, or .html extension
- File must be tracked in git

### Migration Constraints

- Migration must be idempotent (running twice produces same result)
- Migration must not modify file timestamps unnecessarily
- Migration must preserve file permissions
- Migration must maintain git history

### Verification Constraints

- All checks must pass before migration is considered complete
- Functional verification must compare output to baseline
- Verification must run in isolated environment (no side effects)

## Edge Cases

### Edge Case 1: Complex Variable Scoping

**Scenario**: Variable declared with `var` in outer scope, reassigned in inner scope

**Handling**: Convert to `let` at declaration site, preserve scoping behavior

### Edge Case 2: Commented-Out Code

**Scenario**: File contains commented code with old syntax

**Handling**: Leave comments as-is, only transform active code

### Edge Case 3: String Literals Containing "makerjs"

**Scenario**: String or comment contains the word "makerjs"

**Handling**: Only transform actual code references, not strings or comments

### Edge Case 4: Multiple Imports

**Scenario**: File imports multiple dependencies

**Handling**: Transform makerjs import, preserve other imports

### Edge Case 5: No Export Statement

**Scenario**: Playground model files may not have explicit exports

**Handling**: Only transform if export exists, don't add exports where none exist

## Summary

This data model defines the structure of files being migrated and the transformation rules to apply. The migration is a deterministic syntax transformation with clear validation criteria. No persistent data storage is required - all changes are file-based.

**Key Metrics**:
- 28 files to migrate
- 4 transformation patterns per file (average)
- 5 verification checks per file
- 100% success rate required
