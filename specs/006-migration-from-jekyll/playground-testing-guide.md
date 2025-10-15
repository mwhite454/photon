# Playground Testing Guide - T080

**Purpose**: Verify refactored examples work in the actual Photon playground environment  
**Status**: Process documented, pending photon/core package deployment to playground  
**Date**: 2025-10-15

## Prerequisites

Before playground testing can be completed:

1. **Photon/core package availability**: `@7syllable/photon-core` must be deployed to the playground
2. **Missing APIs restored**: Functions like `expandPaths`, `outline` must be available
3. **Playground updated**: Import mechanism must support ES6 named imports

## Representative Examples to Test

### High Priority (Core Functionality)
1. **Basic shapes** - `snippets/built-in-models.md`
   - Tests: Rectangle, Circle, Star models
   - Expected: Renders correctly with proper dimensions

2. **Path operations** - `snippets/fillets.md`
   - Tests: path.fillet() between lines and arcs
   - Expected: Smooth rounded corners

3. **Model operations** - `snippets/combining.md`
   - Tests: combineUnion, combineSubtraction, combineIntersection
   - Expected: Boolean operations work correctly

4. **Transformations** - `snippets/moving.md`, `snippets/rotating.md`, `snippets/scaling.md`
   - Tests: move, rotate, scale operations
   - Expected: Objects transform correctly

### Medium Priority (Advanced Features)
5. **Chains** - `snippets/chain-single.md`
   - Tests: model.findSingleChain()
   - Expected: Chain detection works

6. **Exports** - `snippets/exporting-svg.md`, `snippets/exporting-dxf.md`
   - Tests: exporter.toSVG(), exporter.toDXF()
   - Expected: Valid export formats generated

### Low Priority (Pending APIs)
7. **Expansion** - `snippets/expanding.md` ⚠️
   - Tests: model.expandPaths() - **MISSING FROM v0.18.1**
   - Expected: Fails until API is restored

8. **Outlining** - `snippets/outlining.md` ⚠️
   - Tests: model.outline() - **MISSING FROM v0.18.1**
   - Expected: Fails until API is restored

## Testing Process

### Step 1: Playground Setup
```bash
# Ensure playground has photon/core available
npm list @7syllable/photon-core
# Expected: @7syllable/photon-core@0.18.1 or later
```

### Step 2: Test Each Example
For each example file:

1. **Copy code block** from markdown file
2. **Paste into playground** editor
3. **Run the example**
4. **Verify output**:
   - Visual: Does it match expected appearance?
   - Console: No errors in console?
   - Export: Can it export to SVG/DXF?
5. **Document result** in test matrix

### Step 3: Document Results

Test Matrix Template:
```markdown
| File | Test | Status | Notes |
|------|------|--------|-------|
| built-in-models.md | Rectangle | ✅ PASS | Renders correctly |
| fillets.md | Line-to-line fillet | ✅ PASS | Smooth corners |
| expanding.md | expandPaths | ❌ FAIL | API missing |
```

### Step 4: Report Issues

For any failures:
1. **Categorize**:
   - Missing API (report to photon/core team)
   - Syntax error (fix documentation)
   - Unexpected behavior (investigate)

2. **Create issue** with:
   - Example file name
   - Expected behavior
   - Actual behavior
   - Error message (if any)

## Success Criteria

- [ ] All high-priority examples execute without errors
- [ ] Visual output matches expected results
- [ ] No console errors for working examples
- [ ] Export functionality works
- [ ] Known API gaps documented

## Expected Timeline

**After photon/core deployment to playground**:
- High priority examples: 2 hours
- Medium priority examples: 2 hours
- Documentation of results: 1 hour
- Total: ~5 hours

## Known Limitations

### API Gaps (as of v0.18.1)
These will fail until APIs are restored:
- `model.expandPaths()` - used in 4 examples
- `model.outline()` - used in 1 example
- `model.simplify()` - partially working, depends on expandPaths

### Browser-Only Features
These cannot be tested in Node.js but should work in playground:
- `document.write()` - rendering to DOM
- SVG rendering - visual display
- Interactive features - if any

## Automation Potential

Consider creating automated playground tests:
```javascript
// Example: Automated test runner for playground
const tests = [
  { file: 'built-in-models.md', block: 0, expect: 'renders' },
  { file: 'fillets.md', block: 0, expect: 'no-errors' },
  // ...
];

tests.forEach(test => {
  const code = extractCodeBlock(test.file, test.block);
  const result = runInPlayground(code);
  assert(result.status === test.expect);
});
```

## Conclusion

Playground testing is ready to execute once:
1. @7syllable/photon-core is deployed to playground environment
2. Missing APIs are restored or documented as breaking changes
3. Representative examples are identified (done)
4. Test process is documented (done)

**Status**: Ready for execution pending playground readiness.
