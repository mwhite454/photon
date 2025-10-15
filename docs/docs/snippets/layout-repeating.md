---
ai_summary: Maker.js provides several functions which will clone your paths or models
  and repeat them in various layouts.
category: Layout
description: Maker.js provides several functions which will clone your paths or models
  and repeat them in various layouts.
difficulty: intermediate
keywords:
- export
- javascript
- layout
- models
- paths
- repeating
- svg
prerequisites:
- Intermediate Drawing
primary_topic: layouts
related:
- Layout on Path
- Layout on Chain
- Repeating Layouts
- Intermediate Drawing
source: docs/_snippets/layout-repeating.html
tags:
- intermediate
- layout
- layouts
title: Layout Repeating
---
Maker.js provides several functions which will clone your paths or models and repeat them in various layouts.

#### Columns

Call [makerjs.layout.cloneToColumn(path or model, count, [optional] margin)](/docs/api/modules/makerjs.layout.html#clonetocolumn) to repeatedly clone and layout in a column.
The interval will be the height of the path's or model's bounding box. Extra vertical margin is optional.

## Examples

```javascript
import { exporter, layout, model, models } from '@7syllable/photon-core';
//Grooves for a finger joint
const dogbone = new models.Dogbone(50, 20, 2, -1, false);
const grooves = layout.cloneToColumn(dogbone, 5, 20);
document.write(exporter.toSVG(grooves));
```

#### Rows

Call [makerjs.layout.cloneToRow(path or model, count, [optional] margin)](/docs/api/modules/makerjs.layout.html#clonetorow) to repeatedly clone and layout in a row.
The interval will be the width of the path's or model's bounding box. Extra horizontal margin is optional.
```javascript
import { exporter, layout, model, models } from '@7syllable/photon-core';
//grill of ovals
const oval = new models.Oval(20, 150);
const grill = layout.cloneToRow(oval, 12, 20);
document.write(exporter.toSVG(grill));
```

#### Grid

Call [makerjs.layout.cloneToGrid(path or model, xcount, ycount, [optional] margin)](/docs/api/modules/makerjs.layout.html#clonetogrid) to repeatedly clone and layout in a grid.
The interval will be the path's or model's bounding box. Extra margin is optional.
```javascript
import { exporter, layout, model, models } from '@7syllable/photon-core';
//grill of rounded squares
const roundSquare = new models.RoundRectangle(20, 20, 4);
const grid = layout.cloneToGrid(roundSquare, 11, 5, 5);
document.write(exporter.toSVG(grid));
```

#### Brick

Call [makerjs.layout.cloneToBrick(path or model, xcount, ycount, [optional] margin)](/docs/api/modules/makerjs.layout.html#clonetobrick) to repeatedly clone and layout in a brick wall format.
The interval will be the path's or model's bounding box. Extra margin is optional.
```javascript
import { exporter, layout, model, models } from '@7syllable/photon-core';
//brick wall
const brick = new models.Rectangle(20, 8);
const wall = layout.cloneToBrick(brick, 8, 7, 2);
document.write(exporter.toSVG(wall));
```

#### Honeycomb

Call [makerjs.layout.cloneToHoneycomb(path or model, xcount, ycount, [optional] margin)](/docs/api/modules/makerjs.layout.html#clonetohoneycomb) to repeatedly clone and layout in a honeycomb format.
The interval will be the path's or model's bounding hexagon. Extra margin is optional.
```javascript
import { exporter, layout, model, models } from '@7syllable/photon-core';
//Honeycomb
const star = model.rotate(new models.Star(6, 50, 0, 2), 30);
const pattern = layout.cloneToHoneycomb(star, 8, 5, 30);
document.write(exporter.toSVG(pattern));
```

#### Radial

Call [makerjs.layout.cloneToRadial(path or model, count, angleInDegrees, [optional] rotationOrigin)](/docs/api/modules/makerjs.layout.html#clonetoradial) to repeatedly clone and layout in a radial format.
```javascript
import { exporter, layout, model, models } from '@7syllable/photon-core';
//spinner
const rect = model.move(new models.Rectangle(30, 10), [40, -5]);
const spinner = layout.cloneToRadial(rect, 16, 22.5);
document.write(exporter.toSVG(spinner));
```

## Related Topics

- [Layout on Path](../index.md)
- [Layout on Chain](../index.md)
- [Repeating Layouts](../index.md)
- [Intermediate Drawing](../index.md)
