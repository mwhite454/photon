# Quick Start: Functional Composition Implementation

**Feature**: 007 - Pipe/Compose + Cascade APIs  
**Estimated Time**: 2-3 days  
**Status**: Ready to Implement

## TL;DR

✅ **Good news**: Most code exists, just needs ES6+ modernization  
🎯 **Goal**: Add modern `pipe`/`compose` + modernize legacy `$` cascade  
⏱️ **Timeline**: 2-3 days (not weeks!)

## Prerequisites

- ✅ TypeScript 5.x knowledge
- ✅ Functional programming basics
- ✅ photon/core module structure understanding
- ✅ Jest testing experience

## What You're Building

**Two APIs, one goal** (chain geometric operations):

```typescript
// PRIMARY: Modern functional composition
import { pipe, compose, model, models } from 'photon/core';

const square = pipe(
  new models.Square(10),
  model.center,
  model.rotate(45)
);

// LEGACY: jQuery-style cascade (backward compat)
import { $, models } from 'photon/core';

const square = $(new models.Square(10))
  .center()
  .rotate(45)
  .$result;
```

## Implementation Roadmap

### Day 1: Pipe & Compose (PRIMARY API)

#### Morning: Implement (4 hours)

**File**: `packages/photon/src/core/functional.ts`

```typescript
// 1. Create file
// 2. Implement pipe with TypeScript overloads
export function pipe<T>(value: T): T;
export function pipe<T, A>(value: T, fn1: (x: T) => A): A;
export function pipe<T, A, B>(value: T, fn1: (x: T) => A, fn2: (x: A) => B): B;
// ... overloads for 3-10 args

export function pipe(value: any, ...fns: Function[]): any {
    return fns.reduce((acc, fn) => fn(acc), value);
}

// 3. Implement compose
export function compose<A>(...fns: Function[]): (x: A) => any {
    return (x: A) => fns.reduceRight((acc, fn) => fn(acc), x);
}

// 4. Export from core
// Add to packages/photon/src/core/index.ts
export { pipe, compose } from './functional.js';
```

**Tests**: `packages/photon/src/core/__tests__/functional.spec.ts`
- Follow contract: `contracts/functional-api.test.contract.md`
- TC-PIPE-001 through TC-PIPE-006
- TC-COMP-001 through TC-COMP-006
- Run TDD: Write failing tests first!

#### Afternoon: Test & Verify (3 hours)

```bash
# Run tests
npm test -- functional.spec.ts

# Verify TypeScript types
npm run type-check

# Test with model operations
npm test -- --grep "Integration"
```

**Checkpoint**: ✅ Pipe/compose working, all tests pass

### Day 2: Modernize Cascade (LEGACY API)

#### Morning: Modernize Cascade Class (3 hours)

**File**: `packages/photon/src/core/maker.ts` (lines 682-708)

**Changes needed**:

```typescript
// Before
class Cascade<T> implements ICascade {
    constructor(private _module: any, public $initial: T) {
        for (var methodName in this._module) this._shadow(methodName);
        // ^^^ var → const
        this.$result = $initial;
    }
    
    private _shadow(methodName: string) {
        var _this = this;
        // ^^^ var → remove (arrow function)
        this[methodName] = function () {
        // ^^^ function → arrow function
            return _this._apply(_this._module[methodName], arguments);
            //                                              ^^^^^^^^^ arguments → rest params
        }
    }
}

// After
class Cascade<T> implements ICascade {
    constructor(private _module: any, public $initial: T) {
        for (const methodName in this._module) this._shadow(methodName);
        this.$result = $initial;
    }
    
    private _shadow(methodName: string) {
        this[methodName] = (...args: any[]) => {
            return this._apply(this._module[methodName], args);
        };
    }
    
    private _apply(fn: Function, carriedArgs: any[]) {
        const args = [this.$result, ...carriedArgs];
        this.$result = fn(...args);
        return this;
    }
}
```

#### Afternoon: Uncomment Export & Test (3 hours)

**Uncomment lines 711-722**:

```typescript
export function $(modelContext: IModel): ICascadeModel;
export function $(pathContext: IPath): ICascadePath;
export function $(pointContext: IPoint): ICascadePoint;
export function $(context: any): ICascade {
    if (isModel(context)) {
        return new Cascade<IModel>(model, context);
    } else if (isPath(context)) {
        return new Cascade<IPath>(path, context);
    } else if (isPoint(context)) {
        return new Cascade<IPoint>(point, context);
    }
    throw new Error('Invalid context for cascade function');
}
```

**Tests**: `packages/photon/src/core/__tests__/cascade.spec.ts`
- Follow contract: `contracts/cascade-api.test.contract.md`
- TC-CASCADE-M-001 through TC-CASCADE-M-005 (Model)
- TC-CASCADE-P-001 through TC-CASCADE-P-003 (Path)
- TC-CASCADE-PT-001 through TC-CASCADE-PT-002 (Point)
- TC-CASCADE-T-001 through TC-CASCADE-T-004 (Type detection)
- TC-MOD-001 through TC-MOD-003 (ES6+ verification)

**Checkpoint**: ✅ Cascade modernized, all tests pass

### Day 3: Documentation & Polish

#### Morning: Documentation (2 hours)

**New File**: `docs-new/docs/snippets/functional-composition.md`

```markdown
# Functional Composition

Modern way to chain operations in photon/core.

## Pipe (Left-to-Right)

\`\`\`javascript
import { pipe, model, models } from 'photon/core';

const square = pipe(
  new models.Square(10),
  model.center,
  model.rotate(45)
);
\`\`\`

## Compose (Right-to-Left)

\`\`\`javascript
import { compose, model } from 'photon/core';

const centerAndRotate = compose(
  model.rotate(45),
  model.center
);

const square1 = centerAndRotate(new models.Square(10));
const square2 = centerAndRotate(new models.Rectangle(20, 10));
\`\`\`
```

**Update**: `docs-new/docs/snippets/$-function.md`
- Add note at top: "**Note**: This is the legacy cascade API. For new code, use [pipe/compose](functional-composition.md) instead."
- Keep all examples (they work!)

#### Afternoon: Integration & Performance (2 hours)

```bash
# Run full test suite
npm test

# Check coverage
npm run test:coverage

# Should be >95%

# Performance benchmarks
npm run benchmark

# Verify documentation examples
npm run docs:verify
```

#### Final: Pull Request Prep (1 hour)

**PR Checklist**:
- ✅ All tests pass (aim for 100% coverage)
- ✅ TypeScript compiles with no errors
- ✅ Documentation updated
- ✅ Examples execute correctly
- ✅ Performance benchmarks meet targets
- ✅ No breaking changes

## File Locations

```
packages/photon/src/core/
├── functional.ts              [NEW - pipe/compose]
├── maker.ts                    [MODIFY - modernize Cascade]
├── __tests__/
│   ├── functional.spec.ts     [NEW - pipe/compose tests]
│   └── cascade.spec.ts        [NEW - cascade tests]

docs-new/docs/snippets/
├── functional-composition.md   [NEW - pipe/compose docs]
└── $-function.md               [UPDATE - add legacy note]

specs/007-cascade-functions/
├── spec.md                     [EXISTS - feature spec]
├── plan.md                     [EXISTS - implementation plan]
├── research.md                 [EXISTS - investigation findings]
├── data-model.md               [EXISTS - data structures]
├── quickstart.md               [THIS FILE]
└── contracts/
    ├── functional-api.test.contract.md  [EXISTS - pipe/compose tests]
    └── cascade-api.test.contract.md     [EXISTS - cascade tests]
```

## Commands

```bash
# Setup
cd /Users/mykawhite/Documents/GitHub/photon/packages/photon

# Create functional.ts
touch src/core/functional.ts

# Run tests (TDD!)
npm test -- --watch functional.spec.ts

# Type check
npm run type-check

# Build
npm run build

# Run all tests
npm test

# Coverage
npm run test:coverage

# Lint
npm run lint
```

## Common Issues & Solutions

### Issue 1: Type Inference Not Working

**Symptom**: TypeScript errors on pipe/compose chains

**Solution**: Check overload order - most specific first

```typescript
// Wrong order
export function pipe(value: any, ...fns: Function[]): any;
export function pipe<T, A>(value: T, fn1: (x: T) => A): A;

// Correct order
export function pipe<T, A>(value: T, fn1: (x: T) => A): A;
export function pipe(value: any, ...fns: Function[]): any;
```

### Issue 2: Cascade Methods Not Available

**Symptom**: `Property 'center' does not exist on type 'Cascade'`

**Solution**: Ensure module is correctly passed to Cascade constructor

```typescript
// Check line 716
return new Cascade<IModel>(model, context);
//                          ^^^^^ Must be the model module, not the context
```

### Issue 3: Tests Fail on $reset

**Symptom**: `$result` not returning to `$initial`

**Solution**: Check that `$reset` actually resets (line 704-707)

```typescript
public $reset() {
    this.$result = this.$initial;
    return this;
}
```

## Tips for Success

1. **TDD is mandatory** - Write tests first per Constitution Principle I
2. **Use research.md** - All code locations documented
3. **Test contracts** - Copy test cases from contracts/
4. **Check existing modules** - model/path/point already work
5. **Performance matters** - Run benchmarks, target <5% overhead

## Success Checklist

Before considering done:

- [ ] All 50+ tests pass
- [ ] Coverage >95% (target 100%)
- [ ] TypeScript compiles with --strict
- [ ] Documentation examples execute
- [ ] Performance benchmarks pass
- [ ] No ESLint warnings
- [ ] All contracts satisfied
- [ ] Constitutional principles followed

## Next Steps After Implementation

1. Create PR with detailed description
2. Request review from maintainers
3. Address feedback
4. Merge to main
5. Update CHANGELOG.md
6. Consider blog post about functional composition in photon

## Questions?

See detailed documentation in:
- `spec.md` - Full feature specification
- `plan.md` - Detailed implementation plan
- `research.md` - Code investigation findings
- `data-model.md` - Data structures and relationships

**Ready to start?** Begin with Day 1 Morning - implement pipe/compose!
