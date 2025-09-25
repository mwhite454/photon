---
title: "Combining with Boolean operations"
source: "docs/_snippets/combining.html"
id: "makerjs.snippets.combining"
summary: "Combine models using `makerjs.model.combine(modelA, modelB, aInsideB, aOutsideB, bInsideA, bOutsideA)`."
tags: []
---
Combine models using `makerjs.model.combine(modelA, modelB, aInsideB, aOutsideB, bInsideA, bOutsideA)`.

Shortcuts:

- `makerjs.model.combineUnion`
- `makerjs.model.combineSubtraction`
- `makerjs.model.combineIntersection`

Example:

```javascript
makerjs.model.combineUnion(rect, oval);
makerjs.model.combineSubtraction(rect, oval);
makerjs.model.combineIntersection(rect, oval);
```

These functions return a new model with child models named `a` and `b` corresponding to the inputs.