---
title: "Expanding paths"
source: "docs/_snippets/expanding.html"
id: "makerjs.snippets.expanding"
summary: "Expand a path to produce a surrounding closed geometry with `makerjs.path.expand(path, distance)`. You can expand all paths in a model with `makerjs.model.expandPaths(model, distance, [jointCorners])` where `jointCorners` controls corner..."
tags: []
---
Expand a path to produce a surrounding closed geometry with `makerjs.path.expand(path, distance)`. You can expand all paths in a model with `makerjs.model.expandPaths(model, distance, [jointCorners])` where `jointCorners` controls corner style (0 rounded, 1 pointed, 2 beveled).

```javascript
var star = m.model.rotate(new m.models.Star(5, 100), 18);
var expanded = m.model.expandPaths(star, 10);
```