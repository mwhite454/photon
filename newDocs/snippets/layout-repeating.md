---
title: "Repeating layouts"
source: "docs/_snippets/layout-repeating.html"
id: "makerjs.snippets.layout-repeating"
summary: "Maker.js provides several functions which will clone your paths or models and repeat them in various layouts."
tags: []
---
Maker.js provides several functions which will clone your paths or models and repeat them in various layouts.

### Columns

Call `makerjs.layout.cloneToColumn(path or model, count, [optional] margin)` to repeatedly clone and layout in a column.

```javascript
//Grooves for a finger joint

var m = require('makerjs');

var dogbone = new m.models.Dogbone(50, 20, 2, -1, false);

var grooves = m.layout.cloneToColumn(dogbone, 5, 20);

document.write(m.exporter.toSVG(grooves));
```

### Rows

Call `makerjs.layout.cloneToRow(path or model, count, [optional] margin)` to repeatedly clone and layout in a row.

```javascript
//grill of ovals

var m = require('makerjs');

var oval = new m.models.Oval(20, 150);

var grill = m.layout.cloneToRow(oval, 12, 20);

document.write(m.exporter.toSVG(grill));
```

### Grid, Brick, Honeycomb, Radial

See the original snippet for examples of `cloneToGrid`, `cloneToBrick`, `cloneToHoneycomb`, and `cloneToRadial`.
