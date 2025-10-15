# Breaking Changes: maker.js → @7syllable/photon-core

**Date Identified**: 2025-10-15  
**During**: Documentation migration validation (spec 006)  
**GitHub Issue**: [#3 - Missing APIs in @7syllable/photon-core](https://github.com/mwhite454/photon/issues/3)

---

## Summary

Three documented functions from the original maker.js library are **missing or non-functional** in the published `@7syllable/photon-core@0.18.1` package, causing 5 code examples to fail.

---

## Missing Functions

### 1. `model.expandPaths()` ⚠️ HIGH PRIORITY

**Status**: ❌ Not present in package  
**Impact**: 4 code examples fail  
**Original**: Existed in maker.js  

**Affected Files**:
- `docs/snippets/expanding.md` (2 examples)
- `docs/snippets/wireframe.md` (1 example)
- `docs/snippets/simplifying.md` (1 example)

**Function Signature**:
```javascript
model.expandPaths(modelToExpand, distance, joints?)
```

**Purpose**: Expands paths to simulate stroke thickness with optional joint styles (0=round, 1=pointed).

**Example**:
```javascript
import { model, models } from '@7syllable/photon-core';

const star = new models.Star(5, 100);
const expanded = model.expandPaths(star, 10);        // Round joints
const beveled = model.expandPaths(star, 10, 1);      // Pointed joints
```

**Error**:
```
TypeError: model.expandPaths is not a function
```

---

### 2. `model.outline()` ⚠️ MEDIUM PRIORITY

**Status**: ❌ Not present in package  
**Impact**: 1 code example fails  
**Original**: Existed in maker.js

**Affected Files**:
- `docs/snippets/outlining.md` (1 example)

**Function Signature**:
```javascript
model.outline(modelToOutline, distance, joints?)
```

**Purpose**: Creates an outline around a model with specified distance and optional joint styles.

**Example**:
```javascript
import { model, models } from '@7syllable/photon-core';

const star = new models.Star(5, 100);
const outline = model.outline(star, 10);
```

**Error**:
```
TypeError: model.outline is not a function
```

---

### 3. `model.simplify()` ⚠️ LOW PRIORITY

**Status**: ⚠️ Present but non-functional (missing dependencies)  
**Impact**: 1 code example fails  
**Original**: Existed in maker.js

**Affected Files**:
- `docs/snippets/simplifying.md` (1 example)

**Function Signature**:
```javascript
model.simplify(modelToSimplify)
```

**Purpose**: Simplifies paths by merging collinear segments.

**Issue**: Function exists in package but examples that combine it with `expandPaths()` fail because `expandPaths()` is missing.

**Example**:
```javascript
import { model, models } from '@7syllable/photon-core';

const truss = new models.ConnectTheDots(/* ... */);
const expansion = model.expandPaths(truss, 3, 1);  // ❌ Fails here
model.originate(expansion);
model.simplify(expansion);
```

---

## Validation Evidence

**Validator**: `scripts/migration/validation/example_validator.py`  
**Package**: `@7syllable/photon-core@0.18.1` (installed from npm)  
**Date**: 2025-10-15  
**Report**: `validation-examples.json`

**Failure Statistics**:
- Total code blocks: 225
- Missing API failures: 55 (24%)
- Specifically `expandPaths`/`outline`: 5 examples

---

## User Impact

### For Documentation Users
- ❌ Cannot run 5 documented examples
- ❌ Examples throw `TypeError: ... is not a function`
- ❌ Confusing experience ("docs say it works but it doesn't")

### For Maker.js Migrants
- ❌ Features worked in maker.js but missing in photon/core
- ❌ Breaking change not documented in migration guide
- ❌ May block migration for users who depend on these features

### For Package Users
- ❌ Reduced feature set compared to maker.js
- ❌ Documentation doesn't match package reality
- ❌ Trust issues with documentation accuracy

---

## Root Cause Analysis

### Why Are These Missing?

**Hypothesis 1**: Functions not yet ported from maker.js to photon/core
- maker.js was a large codebase
- Some functions may not have been migrated during initial fork

**Hypothesis 2**: Functions intentionally removed
- May have had dependencies or complexity issues
- Could have been deemed low-priority for initial release

**Hypothesis 3**: Functions in different module
- May exist under different namespace or import path
- Documentation may need updating rather than code

**Next Step**: Review photon/core source code to confirm

---

## Recommended Solutions

### Option 1: Restore Functions (RECOMMENDED) ✅

**Action**:
1. Review maker.js source for `expandPaths()` and `outline()`
2. Port to photon/core or implement equivalents
3. Add unit tests
4. Publish updated package (v0.18.2 or v0.19.0)

**Timeline**: 1-2 weeks  
**Effort**: Medium  

**Pros**:
- ✅ Maintains backward compatibility
- ✅ Documentation stays accurate
- ✅ Full feature parity with maker.js

**Cons**:
- ⏰ Takes development time
- 🔧 May need dependency updates

---

### Option 2: Update Documentation

**Action**:
1. Mark affected examples as "Legacy - maker.js only"
2. Add migration notes explaining gaps
3. Remove or deprecate affected documentation

**Timeline**: 1-2 days  
**Effort**: Low

**Pros**:
- ⚡ Quick fix
- 📝 Honest about capabilities

**Cons**:
- ❌ Loses maker.js features
- ❌ Breaking change for migrants
- ❌ Reduces package value

---

### Option 3: Temporary Workarounds

**Action**:
1. Add "Known Issues" warnings to documentation
2. Provide alternative approaches where possible
3. Set user expectations

**Timeline**: Few hours  
**Effort**: Very low

**Pros**:
- ⚡ Immediate action possible
- 📢 Transparent communication

**Cons**:
- 🚫 Doesn't fix the problem
- ⏳ Only a stopgap measure

---

## Action Plan

### Immediate (This Week) ⚡

- [X] Create GitHub issue to track (#3)
- [X] Document breaking changes in this file
- [ ] Add warning banners to affected documentation pages:
  ```markdown
  > **⚠️ Known Issue**: This example uses `model.expandPaths()` which is not yet available in 
  > `@7syllable/photon-core@0.18.1`. See [issue #3](https://github.com/mwhite454/photon/issues/3) 
  > for status and workarounds.
  ```
- [ ] Update `docs/migration/api-mapping.md` with missing function notes
- [ ] Update `docs/migration/migration-faq.md` with "What functions are missing?" section

### Short-term (1-2 Weeks) 🔧

- [ ] Review maker.js source code for missing functions
- [ ] Assess porting effort and dependencies
- [ ] Implement or port `expandPaths()` and `outline()`
- [ ] Write unit tests for restored functions
- [ ] Update package version and publish
- [ ] Remove warning banners from documentation

### Validation (After Fix) ✅

- [ ] Re-run `example_validator.py` on all docs
- [ ] Verify affected examples pass
- [ ] Test in playground environment
- [ ] Update validation reports
- [ ] Close GitHub issue #3

---

## Communication Plan

### Users Who Need to Know

1. **Documentation contributors** - Need to know which examples don't work
2. **Maker.js migrants** - Need to know about missing features
3. **Package users** - Need to know about API gaps
4. **Issue reporters** - May have filed bugs about these functions

### Channels

- [X] GitHub issue #3 created
- [ ] Add to README.md "Known Issues" section
- [ ] Add to migration guide
- [ ] Update CHANGELOG.md when fixed
- [ ] Consider blog post or announcement when restored

---

## Related Documentation

- **Migration Summary**: `specs/006-migration-from-jekyll/MIGRATION-SUMMARY.md`
- **Validation Report**: `specs/006-migration-from-jekyll/validation-summary.md`
- **Validation Results**: `validation-examples.json`
- **API Mapping**: `docs/migration/api-mapping.md`
- **GitHub Issue**: https://github.com/mwhite454/photon/issues/3

---

## Status Updates

### 2025-10-15 - Initial Discovery
- ✅ Identified missing functions during validation
- ✅ Created GitHub issue #3
- ✅ Documented breaking changes
- 📋 Next: Add documentation warnings

---

## Notes for Developers

### Where to Find Original Code

**maker.js Repository** (archived):
- URL: https://github.com/Microsoft/maker.js
- Files to check:
  - `src/core/model.ts` - Look for `expandPaths()`, `outline()`, `simplify()`
  - `src/core/path.ts` - Related path utilities
  - Test files for usage examples

### Implementation Considerations

1. **Dependencies**: Check what other functions these depend on
2. **Performance**: Original functions may need optimization
3. **Edge Cases**: Review test files for edge case handling
4. **Breaking Changes**: Ensure API compatibility with maker.js
5. **Documentation**: Update API docs when implemented

---

**Last Updated**: 2025-10-15  
**Responsible**: Migration team  
**Priority**: High
