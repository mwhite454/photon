# Verification Scripts Contract

**Feature**: 004-all-examples-housed  
**Date**: 2025-10-12  
**Type**: Automated Verification Specification

## Overview

This contract defines the behavior and interface for automated verification scripts that validate the migration of example files. These scripts will be used in CI/CD and manual verification workflows.

## Script 1: verify-imports.sh

### Purpose
Verify that all example and playground files use ES6 import syntax with zero CommonJS require() statements remaining.

### Interface

**Location**: `specs/004-all-examples-housed/verification/verify-imports.sh`

**Usage**:
```bash
./verify-imports.sh [--directory <path>] [--verbose]
```

**Arguments**:
- `--directory <path>`: Optional. Directory to check (defaults to both examples and playground)
- `--verbose`: Optional. Show detailed output for each file

**Exit Codes**:
- `0`: Success - all files use ES6 imports
- `1`: Failure - one or more files contain require() statements
- `2`: Error - invalid arguments or directory not found

### Behavior

**Checks**:
1. Scan all .js and .ts files in target directories
2. Search for `require(` pattern in each file
3. Exclude matches in comments (lines starting with `//` or within `/* */`)
4. Exclude matches in strings (within quotes)
5. Report any violations found

**Output Format** (normal mode):
```
Checking imports in packages/photon/examples/...
✓ smile.js - ES6 imports only
✓ spiral.js - ES6 imports only
✗ combine.js - Found require() on line 1

Checking imports in packages/playground/models/...
✓ basic-shapes.js - ES6 imports only

Summary: 27/28 files passed, 1 file failed
FAILED: Files still using require()
```

**Output Format** (verbose mode):
```
Checking: packages/photon/examples/smile.js
  Line 1: import * as photon from 'photon';
  ✓ No require() statements found

Checking: packages/photon/examples/combine.js
  Line 1: var makerjs = require('./../target/js/node.maker.js');
  ✗ Found require() statement
```

### Success Criteria
- Zero files contain `require(` outside of comments/strings
- All files have at least one `import` statement (or no imports needed)

## Script 2: verify-var-usage.sh

### Purpose
Verify that all example and playground files use const/let declarations with zero var statements remaining.

### Interface

**Location**: `specs/004-all-examples-housed/verification/verify-var-usage.sh`

**Usage**:
```bash
./verify-var-usage.sh [--directory <path>] [--verbose]
```

**Arguments**:
- `--directory <path>`: Optional. Directory to check
- `--verbose`: Optional. Show detailed output for each file

**Exit Codes**:
- `0`: Success - all files use const/let
- `1`: Failure - one or more files contain var declarations
- `2`: Error - invalid arguments or directory not found

### Behavior

**Checks**:
1. Scan all .js and .ts files in target directories
2. Search for `var ` pattern (with space) in each file
3. Exclude matches in comments
4. Exclude matches in strings
5. Report any violations found

**Output Format** (normal mode):
```
Checking variable declarations in packages/photon/examples/...
✓ smile.js - const/let only
✓ spiral.js - const/let only
✗ combine.js - Found var on line 5

Summary: 27/28 files passed, 1 file failed
FAILED: Files still using var declarations
```

**Output Format** (verbose mode):
```
Checking: packages/photon/examples/smile.js
  Line 13: const mouth = new photon.models.OvalArc(...);
  ✓ No var declarations found

Checking: packages/photon/examples/combine.js
  Line 5: var star1 = new makerjs.models.Oval(50, 100);
  ✗ Found var declaration
```

### Success Criteria
- Zero files contain `var ` outside of comments/strings
- All variable declarations use `const` or `let`

## Script 3: verify-namespace.sh

### Purpose
Verify that all example and playground files reference the 'photon' namespace with zero 'makerjs' references remaining in code.

### Interface

**Location**: `specs/004-all-examples-housed/verification/verify-namespace.sh`

**Usage**:
```bash
./verify-namespace.sh [--directory <path>] [--allow-comments] [--verbose]
```

**Arguments**:
- `--directory <path>`: Optional. Directory to check
- `--allow-comments`: Optional. Allow 'makerjs' in comments (default: true)
- `--verbose`: Optional. Show detailed output for each file

**Exit Codes**:
- `0`: Success - all files use photon namespace
- `1`: Failure - one or more files contain makerjs references
- `2`: Error - invalid arguments or directory not found

### Behavior

**Checks**:
1. Scan all .js, .ts, and .html files in target directories
2. Search for `makerjs` pattern (case-sensitive) in each file
3. Exclude matches in comments if `--allow-comments` is set
4. Exclude matches in strings (within quotes)
5. Report any violations found

**Output Format** (normal mode):
```
Checking namespace references in packages/photon/examples/...
✓ smile.js - photon namespace only
✓ spiral.js - photon namespace only
✗ combine.js - Found 'makerjs' on lines 1, 7, 13, 23, 28, 35

Summary: 27/28 files passed, 1 file failed
FAILED: Files still referencing 'makerjs'
```

**Output Format** (verbose mode):
```
Checking: packages/photon/examples/smile.js
  Line 8: head: new photon.paths.Circle([0, 0], 27),
  Line 9: rightEye: new photon.paths.Circle([10, heady], gaze),
  ✓ No makerjs references found

Checking: packages/photon/examples/combine.js
  Line 1: var makerjs = require('./../target/js/node.maker.js');
  Line 7: makerjs.model.walkPaths(star1, function (modelContext, pathId, path) {
  ✗ Found makerjs references
```

### Success Criteria
- Zero files contain `makerjs` in active code
- All namespace references use `photon`
- Comments may contain 'makerjs' for historical context (if --allow-comments)

## Script 4: verify-all.sh

### Purpose
Run all verification scripts in sequence and provide comprehensive report.

### Interface

**Location**: `specs/004-all-examples-housed/verification/verify-all.sh`

**Usage**:
```bash
./verify-all.sh [--verbose] [--fail-fast]
```

**Arguments**:
- `--verbose`: Optional. Show detailed output from all checks
- `--fail-fast`: Optional. Stop on first failure

**Exit Codes**:
- `0`: Success - all verifications passed
- `1`: Failure - one or more verifications failed
- `2`: Error - script execution error

### Behavior

**Execution Order**:
1. Run verify-imports.sh
2. Run verify-var-usage.sh
3. Run verify-namespace.sh
4. Generate summary report

**Output Format**:
```
=== Photon Examples Modernization Verification ===
Date: 2025-10-12 23:41:00
Files checked: 28 (23 examples + 5 playground models)

[1/3] Verifying ES6 imports...
✓ PASSED - All files use ES6 import syntax

[2/3] Verifying const/let usage...
✓ PASSED - All files use const/let declarations

[3/3] Verifying photon namespace...
✓ PASSED - All files reference photon namespace

=== VERIFICATION COMPLETE ===
Status: ✓ ALL CHECKS PASSED
Files: 28/28 passed
Time: 2.3 seconds

Ready for commit.
```

**Failure Output**:
```
=== Photon Examples Modernization Verification ===
Date: 2025-10-12 23:41:00
Files checked: 28 (23 examples + 5 playground models)

[1/3] Verifying ES6 imports...
✗ FAILED - 3 files still using require()
  - packages/photon/examples/combine.js
  - packages/photon/examples/logo.js
  - packages/playground/models/rpi-case.js

[2/3] Verifying const/let usage...
✓ PASSED - All files use const/let declarations

[3/3] Verifying photon namespace...
✗ FAILED - 3 files still referencing makerjs
  - packages/photon/examples/combine.js
  - packages/photon/examples/logo.js
  - packages/playground/models/rpi-case.js

=== VERIFICATION FAILED ===
Status: ✗ 2/3 CHECKS FAILED
Files: 25/28 passed, 3 failed
Time: 2.1 seconds

Run with --verbose for details.
```

### Success Criteria
- All sub-scripts return exit code 0
- All 28 files pass all checks

## Integration with CI/CD

### GitHub Actions Integration

**Workflow File**: `.github/workflows/examples-verification.yml`

```yaml
name: Examples Verification

on:
  push:
    branches:
      - 004-all-examples-housed
  pull_request:
    branches:
      - main

jobs:
  verify-examples:
    name: Verify Examples Modernization
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Make verification scripts executable
        run: chmod +x specs/004-all-examples-housed/verification/*.sh
      
      - name: Run verification suite
        run: ./specs/004-all-examples-housed/verification/verify-all.sh --verbose
```

### Pre-commit Hook

**Location**: `.git/hooks/pre-commit` (optional)

```bash
#!/bin/bash
# Verify examples before commit

if git diff --cached --name-only | grep -E "packages/(photon/examples|playground/models)"; then
  echo "Detected changes to examples, running verification..."
  ./specs/004-all-examples-housed/verification/verify-all.sh
  exit $?
fi
```

## Error Messages

### Clear Error Messages

**Import Verification**:
```
ERROR: Found require() statement in smile.js:1
  var makerjs = require('./../target/js/node.maker.js');
  
Expected ES6 import:
  import * as photon from 'photon';
```

**Variable Verification**:
```
ERROR: Found var declaration in combine.js:5
  var star1 = new makerjs.models.Oval(50, 100);
  
Expected const or let:
  const star1 = new photon.models.Oval(50, 100);
```

**Namespace Verification**:
```
ERROR: Found makerjs reference in logo.js:13
  makerjs.model.walkPaths(star1, function (modelContext, pathId, path) {
  
Expected photon namespace:
  photon.model.walkPaths(star1, function (modelContext, pathId, path) {
```

## Performance Requirements

- Single file check: < 10ms
- Full suite (28 files): < 3 seconds
- Memory usage: < 50MB
- No temporary files created

## Maintenance

### Script Updates

When adding new verification checks:
1. Create new script following naming convention: `verify-<check-name>.sh`
2. Update `verify-all.sh` to include new check
3. Update this contract document
4. Update CI/CD workflow if needed

### Version Compatibility

- Bash 4.0+
- Standard Unix tools: grep, awk, sed
- Works on: Linux, macOS, Windows (Git Bash/WSL)

## References

- Migration Contract: [migration-contract.md](./migration-contract.md)
- Feature Specification: [spec.md](../spec.md)
- Similar verification: `.github/workflows/rebrand-verification.yml`
