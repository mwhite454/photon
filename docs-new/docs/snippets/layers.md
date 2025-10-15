---
ai_summary: Layers are a way of logically grouping your paths or models as you see
  fit. Simply add a layer property to any path or model object, with the name ...
category: General
description: Layers are a way of logically grouping your paths or models as you see
  fit. Simply add a layer property to any path or model object, with the name ...
difficulty: intermediate
keywords:
- export
- general
- javascript
- layers
- models
- paths
- photon
- photon/core
- svg
primary_topic: layers
source: docs/_snippets/layers.html
tags:
- intermediate
- layers
- general
title: Layers
---
Layers are a way of logically grouping your paths or models as you see fit. Simply add a `layer` property to any path or model object, with the name of the layer.
Every path within a model will automatically inherit its parent model's layer, unless it has its own layer property. As you can see in this example, a layer can transcend the logical grouping boundaries of models:


## Examples

```javascript
//render a round rectangle with arcs in their own layer
import { exporter, models } from 'photon/core';
const roundRect = new models.RoundRectangle(100, 50, 10);
roundRect.layer = "layer1";
roundRect.paths.BottomLeft.layer = "layer2";
roundRect.paths.BottomRight.layer = "layer2";
roundRect.paths.TopRight.layer = "layer2";
roundRect.paths.TopLeft.layer = "layer2";
const svg = exporter.toSVG(roundRect);
document.write(svg);
```
*Layers are not visible in this example but they logically exist to separate arcs from straight lines.*

A layer name can be any string. Furthermore, you can use a reserved color name from this list to get an automatic stroke color when your model is exported in DXF or SVG:

aqua, black, blue, fuchsia, green, gray, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow

```javascript
//render a round rectangle with arcs in their own color layer
import { exporter, models } from 'photon/core';
const roundRect = new models.RoundRectangle(100, 50, 10);
roundRect.layer = "layer1";
roundRect.paths.BottomLeft.layer = "red";
roundRect.paths.BottomRight.layer = "red";
roundRect.paths.TopRight.layer = "blue";
roundRect.paths.TopLeft.layer = "blue";
const svg = exporter.toSVG(roundRect);
document.write(svg);
```


---

Layers will be output during the export process in these formats:

* DXF - paths will be assigned to a DXF layer.
* SVG - in continuous mode, a new <path> element will be created for each layer.
