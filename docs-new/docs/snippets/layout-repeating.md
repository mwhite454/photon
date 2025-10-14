---
title: Layout Repeating
source: docs/_snippets/layout-repeating.html
---

---
title: Repeating layouts
---
Maker.js provides several functions which will clone your paths or models and repeat them in various layouts.

#### Columns

Call [makerjs.layout.cloneToColumn(path or model, count, [optional] margin)](/docs/api/modules/makerjs.layout.html#clonetocolumn) to repeatedly clone and layout in a column.
The interval will be the height of the path's or model's bounding box. Extra vertical margin is optional.
```javascript
//Grooves for a finger joint
var m = require('makerjs');
var dogbone = new m.models.Dogbone(50, 20, 2, -1, false);
var grooves = m.layout.cloneToColumn(dogbone, 5, 20);
document.write(m.exporter.toSVG(grooves));
```

#### Rows

Call [makerjs.layout.cloneToRow(path or model, count, [optional] margin)](/docs/api/modules/makerjs.layout.html#clonetorow) to repeatedly clone and layout in a row.
The interval will be the width of the path's or model's bounding box. Extra horizontal margin is optional.
```javascript
//grill of ovals
var m = require('makerjs');
var oval = new m.models.Oval(20, 150);
var grill = m.layout.cloneToRow(oval, 12, 20);
document.write(m.exporter.toSVG(grill));
```

#### Grid

Call [makerjs.layout.cloneToGrid(path or model, xcount, ycount, [optional] margin)](/docs/api/modules/makerjs.layout.html#clonetogrid) to repeatedly clone and layout in a grid.
The interval will be the path's or model's bounding box. Extra margin is optional.
```javascript
//grill of rounded squares
var m = require('makerjs');
var roundSquare = new m.models.RoundRectangle(20, 20, 4);
var grid = m.layout.cloneToGrid(roundSquare, 11, 5, 5);
document.write(m.exporter.toSVG(grid));
```

#### Brick

Call [makerjs.layout.cloneToBrick(path or model, xcount, ycount, [optional] margin)](/docs/api/modules/makerjs.layout.html#clonetobrick) to repeatedly clone and layout in a brick wall format.
The interval will be the path's or model's bounding box. Extra margin is optional.
```javascript
//brick wall
var m = require('makerjs');
var brick = new m.models.Rectangle(20, 8);
var wall = m.layout.cloneToBrick(brick, 8, 7, 2);
document.write(m.exporter.toSVG(wall));
```

#### Honeycomb

Call [makerjs.layout.cloneToHoneycomb(path or model, xcount, ycount, [optional] margin)](/docs/api/modules/makerjs.layout.html#clonetohoneycomb) to repeatedly clone and layout in a honeycomb format.
The interval will be the path's or model's bounding hexagon. Extra margin is optional.
```javascript
//Honeycomb
var m = require('makerjs');
var star = m.model.rotate(new m.models.Star(6, 50, 0, 2), 30);
var pattern = m.layout.cloneToHoneycomb(star, 8, 5, 30);
document.write(m.exporter.toSVG(pattern));
```

#### Radial

Call [makerjs.layout.cloneToRadial(path or model, count, angleInDegrees, [optional] rotationOrigin)](/docs/api/modules/makerjs.layout.html#clonetoradial) to repeatedly clone and layout in a radial format.
```javascript
//spinner
var m = require('makerjs');
var rect = m.model.move(new m.models.Rectangle(30, 10), [40, -5]);
var spinner = m.layout.cloneToRadial(rect, 16, 22.5);
document.write(m.exporter.toSVG(spinner));
```
