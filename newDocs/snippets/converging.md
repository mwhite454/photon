---
title: "Converging lines"
source: "docs/_snippets/converging.html"
id: "makerjs.snippets.converging"
summary: "Use `makerjs.path.converge(lineA, lineB, [useOriginA], [useOriginB])` to make lines meet at their slope intersection point. It only works with lines (not arcs)."
tags: []
---
Use `makerjs.path.converge(lineA, lineB, [useOriginA], [useOriginB])` to make lines meet at their slope intersection point. It only works with lines (not arcs).

The optional booleans let you specify which ends of the lines to use (true = origin, false = end).

```javascript
makerjs.path.converge(clone1.paths.line1, clone1.paths.line2);
makerjs.path.converge(clone2.paths.line1, clone2.paths.line2, false, true);
```