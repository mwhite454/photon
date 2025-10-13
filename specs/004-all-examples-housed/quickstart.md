# Quickstart: Modernize Examples and Playground Models

**Feature**: 004-all-examples-housed  
**Date**: 2025-10-12  
**Estimated Time**: 2-3 hours for complete migration

## Overview

This guide walks you through migrating all 28 example and playground model files from legacy JavaScript (CommonJS, var) to modern ES6+ syntax (import/export, const/let). The migration is straightforward and follows a test-driven approach.

## Prerequisites

- [x] Node.js 18.x or higher installed
- [x] Git repository cloned and on branch `004-all-examples-housed`
- [x] Dependencies installed (`npm install`)
- [x] Baseline tests passing (`npm test`)

## Quick Reference

**Files to Update**: 28 total
- 23 files in `packages/photon/examples/`
- 5 files in `packages/playground/models/`

**Transformations**:
1. `require()` → `import * as photon from 'photon'`
2. `module.exports` → `export default`
3. `var` → `const` or `let`
4. `makerjs` → `photon`

## Step-by-Step Guide

### Phase 1: Setup Verification (15 minutes)

#### 1.1 Create Verification Scripts

Create the verification directory:
```bash
mkdir -p specs/004-all-examples-housed/verification
```

Create `verify-imports.sh`:
```bash
cat > specs/004-all-examples-housed/verification/verify-imports.sh << 'EOF'
#!/bin/bash
# Verify all files use ES6 imports

EXAMPLES_DIR="packages/photon/examples"
PLAYGROUND_DIR="packages/playground/models"
FAILED=0

echo "Checking imports..."

for file in $EXAMPLES_DIR/*.js $EXAMPLES_DIR/*.ts $PLAYGROUND_DIR/*.js; do
  if [ -f "$file" ]; then
    if grep -q "require(" "$file" 2>/dev/null; then
      echo "✗ $file - Found require()"
      FAILED=1
    else
      echo "✓ $file - ES6 imports only"
    fi
  fi
done

exit $FAILED
EOF

chmod +x specs/004-all-examples-housed/verification/verify-imports.sh
```

Create `verify-var-usage.sh`:
```bash
cat > specs/004-all-examples-housed/verification/verify-var-usage.sh << 'EOF'
#!/bin/bash
# Verify all files use const/let

EXAMPLES_DIR="packages/photon/examples"
PLAYGROUND_DIR="packages/playground/models"
FAILED=0

echo "Checking variable declarations..."

for file in $EXAMPLES_DIR/*.js $EXAMPLES_DIR/*.ts $PLAYGROUND_DIR/*.js; do
  if [ -f "$file" ]; then
    if grep -q "^var " "$file" 2>/dev/null || grep -q " var " "$file" 2>/dev/null; then
      echo "✗ $file - Found var declaration"
      FAILED=1
    else
      echo "✓ $file - const/let only"
    fi
  fi
done

exit $FAILED
EOF

chmod +x specs/004-all-examples-housed/verification/verify-var-usage.sh
```

Create `verify-namespace.sh`:
```bash
cat > specs/004-all-examples-housed/verification/verify-namespace.sh << 'EOF'
#!/bin/bash
# Verify all files use photon namespace

EXAMPLES_DIR="packages/photon/examples"
PLAYGROUND_DIR="packages/playground/models"
FAILED=0

echo "Checking namespace references..."

for file in $EXAMPLES_DIR/*.js $EXAMPLES_DIR/*.ts $PLAYGROUND_DIR/*.js; do
  if [ -f "$file" ]; then
    # Check for makerjs in code (not in comments)
    if grep -v "^//" "$file" | grep -v "^\s*//" | grep -q "makerjs" 2>/dev/null; then
      echo "✗ $file - Found makerjs reference"
      FAILED=1
    else
      echo "✓ $file - photon namespace only"
    fi
  fi
done

exit $FAILED
EOF

chmod +x specs/004-all-examples-housed/verification/verify-namespace.sh
```

Create `verify-all.sh`:
```bash
cat > specs/004-all-examples-housed/verification/verify-all.sh << 'EOF'
#!/bin/bash
# Run all verification checks

echo "=== Photon Examples Modernization Verification ==="
echo "Date: $(date)"
echo ""

FAILED=0

echo "[1/3] Verifying ES6 imports..."
./specs/004-all-examples-housed/verification/verify-imports.sh
if [ $? -ne 0 ]; then FAILED=1; fi
echo ""

echo "[2/3] Verifying const/let usage..."
./specs/004-all-examples-housed/verification/verify-var-usage.sh
if [ $? -ne 0 ]; then FAILED=1; fi
echo ""

echo "[3/3] Verifying photon namespace..."
./specs/004-all-examples-housed/verification/verify-namespace.sh
if [ $? -ne 0 ]; then FAILED=1; fi
echo ""

if [ $FAILED -eq 0 ]; then
  echo "=== ✓ ALL CHECKS PASSED ==="
else
  echo "=== ✗ VERIFICATION FAILED ==="
fi

exit $FAILED
EOF

chmod +x specs/004-all-examples-housed/verification/verify-all.sh
```

#### 1.2 Run Baseline Verification

This should fail (confirming files need migration):
```bash
./specs/004-all-examples-housed/verification/verify-all.sh
```

Expected output: All checks should fail, showing which files need updating.

### Phase 2: Pilot Migration (30 minutes)

Start with 3 simple examples to validate the approach.

#### 2.1 Migrate smile.js

Open `packages/photon/examples/smile.js` and apply transformations:

**Before**:
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
    { title: "smile span", type: "range", min: 0, max: 90, value: 45 },
    { title: "toothiness", type: "range", min: 0, max: 1, step: 0.5, value: 3 },
    { title: "droopiness", type: "range", min: -10, max: 20, step: 1, value: 8 },
    { title: "daintyness", type: "range", min: 2, max: 30, step: 1, value: 20 },
    { title: "gazyness", type: "range", min: 0.5, max: 10, step: .5, value: 4 },
    { title: "headyness", type: "range", min: 0.5, max: 20, step: .5, value: 8 }
];

module.exports = smile;
```

**After**:
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
    { title: "smile span", type: "range", min: 0, max: 90, value: 45 },
    { title: "toothiness", type: "range", min: 0, max: 1, step: 0.5, value: 3 },
    { title: "droopiness", type: "range", min: -10, max: 20, step: 1, value: 8 },
    { title: "daintyness", type: "range", min: 2, max: 30, step: 1, value: 20 },
    { title: "gazyness", type: "range", min: 0.5, max: 10, step: .5, value: 4 },
    { title: "headyness", type: "range", min: 0.5, max: 20, step: .5, value: 8 }
];

export default smile;
```

#### 2.2 Migrate spiral.js and Text.js

Apply the same pattern to these simpler examples.

#### 2.3 Verify Pilot Files

```bash
./specs/004-all-examples-housed/verification/verify-all.sh
```

Should show 3 files passing, 25 files failing.

### Phase 3: Bulk Migration (60 minutes)

#### 3.1 Migrate Remaining JavaScript Examples

For each file in `packages/photon/examples/*.js`:

1. **Replace import**: `require(...)` → `import * as photon from 'photon'`
2. **Replace namespace**: All `makerjs.` → `photon.`
3. **Replace variables**: `var` → `const` (or `let` if reassigned)
4. **Replace export**: `module.exports =` → `export default`

**Files to migrate** (20 remaining):
- Rimbox.js
- combine.js
- dependExample_forBrowser.js
- dependExample_forNode.js
- fillets.js
- filletstar.js
- logo.js
- m.js
- polygonstackbox.js
- skatedeck.js
- starbox.js
- testpanel.js
- textOnChain.js
- textOnPath.js
- tubeclamp.js
- ventgrid.js
- ventgridcircle.js

**Tip**: Use find/replace in your editor:
- Find: `var makerjs = require('./../target/js/node.maker.js');`
- Replace: `import * as photon from 'photon';`

Then:
- Find: `makerjs\.` (regex)
- Replace: `photon.`

Then manually review each `var` declaration.

#### 3.2 Migrate TypeScript Examples

For `ventgrid.ts` and `ventgridcircle.ts`:

Same transformations as JavaScript files. TypeScript compiler will validate.

#### 3.3 Migrate HTML Example

For `dependExample.html`:

Update any references to "makerjs" in comments or inline scripts.

#### 3.4 Verify After Each Batch

Run verification after every 5-10 files:
```bash
./specs/004-all-examples-housed/verification/verify-all.sh
```

### Phase 4: Playground Models (30 minutes)

#### 4.1 Migrate Playground Models

For each file in `packages/playground/models/*.js`:

Apply the same transformations. Note: These files may not have exports.

**Files to migrate** (5 total):
- basic-shapes.js
- gear-wheel.js
- rpi-case.js
- simple-square.js
- smiley-face.js

**Example** (basic-shapes.js):

**Before**:
```javascript
var makerjs = require('makerjs');

this.paths = {
    circle: new makerjs.paths.Circle([0, 50], 20),
    line: new makerjs.paths.Line([0, 0], [50, 0]),
    arc: new makerjs.paths.Arc([0, 0], 30, 0, 90)
};
```

**After**:
```javascript
import * as photon from 'photon';

this.paths = {
    circle: new photon.paths.Circle([0, 50], 20),
    line: new photon.paths.Line([0, 0], [50, 0]),
    arc: new photon.paths.Arc([0, 0], 30, 0, 90)
};
```

### Phase 5: Final Verification (15 minutes)

#### 5.1 Run Complete Verification

```bash
./specs/004-all-examples-housed/verification/verify-all.sh
```

Expected output:
```
=== Photon Examples Modernization Verification ===
[1/3] Verifying ES6 imports...
✓ PASSED - All files use ES6 import syntax

[2/3] Verifying const/let usage...
✓ PASSED - All files use const/let declarations

[3/3] Verifying photon namespace...
✓ PASSED - All files reference photon namespace

=== ✓ ALL CHECKS PASSED ===
```

#### 5.2 Run Build

```bash
npm run build
```

Should complete without errors.

#### 5.3 Run Tests

```bash
npm test
```

All existing tests should pass.

#### 5.4 Manual Playground Check

Start the playground:
```bash
npm start
```

Load each playground model and verify it renders correctly.

### Phase 6: Commit and PR (15 minutes)

#### 6.1 Review Changes

```bash
git status
git diff packages/photon/examples/
git diff packages/playground/models/
```

#### 6.2 Commit Changes

```bash
git add packages/photon/examples/
git add packages/playground/models/
git add specs/004-all-examples-housed/verification/
git commit -m "feat: modernize examples and playground models to ES6+

- Update all 28 files to use ES6 import/export syntax
- Replace var with const/let following best practices
- Update makerjs namespace references to photon
- Add verification scripts for automated checking

Closes #004"
```

#### 6.3 Create Pull Request

```bash
git push origin 004-all-examples-housed
```

Create PR with description:
```markdown
## Modernize Examples and Playground Models

Updates all example and playground model files to use modern ES6+ JavaScript syntax.

### Changes
- ✅ 28 files migrated (23 examples + 5 playground models)
- ✅ All files use ES6 import/export syntax
- ✅ All files use const/let (no var)
- ✅ All files reference photon namespace (not makerjs)
- ✅ Verification scripts added for CI/CD

### Verification
All verification checks pass:
- Import verification: ✓
- Variable declaration verification: ✓
- Namespace verification: ✓
- Build: ✓
- Tests: ✓
- Playground: ✓

### Breaking Changes
None - purely syntactic transformation, no functional changes.
```

## Troubleshooting

### Issue: File still has require()

**Solution**: Check for multiple require statements or conditional requires. Update all instances.

### Issue: Unsure if variable should be const or let

**Solution**: Default to `let` if unsure. ESLint will warn if it can be `const`.

### Issue: Build fails after migration

**Solution**: Check for syntax errors. Run `npm run build` and review error messages.

### Issue: Playground model doesn't render

**Solution**: Check browser console for errors. Verify import statement is correct.

### Issue: TypeScript compilation errors

**Solution**: Ensure TypeScript files use proper import syntax. Check tsconfig.json module setting.

## Success Checklist

- [ ] All 28 files migrated
- [ ] Verification scripts created and passing
- [ ] Build completes without errors
- [ ] Tests pass
- [ ] Playground models render correctly
- [ ] Changes committed and pushed
- [ ] Pull request created

## Time Estimates

- Setup: 15 minutes
- Pilot migration: 30 minutes
- Bulk migration: 60 minutes
- Playground models: 30 minutes
- Verification: 15 minutes
- Commit/PR: 15 minutes

**Total: 2-3 hours**

## Next Steps

After this feature is complete:
1. Monitor for any issues reported by users
2. Update documentation to reference modern syntax
3. Consider adding ESLint rules to prevent var usage in future
4. Consider adding pre-commit hooks for verification

## References

- [Feature Specification](./spec.md)
- [Research Document](./research.md)
- [Migration Contract](./contracts/migration-contract.md)
- [Verification Scripts Contract](./contracts/verification-scripts.md)
