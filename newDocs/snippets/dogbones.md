---
title: "Dogbone Fillets"
source: "docs/_snippets/dogbones.html"
id: "makerjs.snippets.dogbones"
summary: "Dogbone fillets clear the apex of interior corners for CNC tooling. Use `makerjs.path.dogbone(lineA, lineB, radius)` between two lines that meet at a point. The function clips the two lines and returns an arc to clear the corner (or `nul..."
tags: []
---
Dogbone fillets clear the apex of interior corners for CNC tooling. Use `makerjs.path.dogbone(lineA, lineB, radius)` between two lines that meet at a point. The function clips the two lines and returns an arc to clear the corner (or `null` if impossible).

There is also a `makerjs.models.Dogbone(width, height, radius, style?, bottomless?)` model with corner styles and an optional "bottomless" mode for tongue-and-groove shapes.

```javascript
var arc1 = makerjs.path.dogbone(model.paths.line1, model.paths.line2, 1);
model.paths.arc1 = arc1;
```