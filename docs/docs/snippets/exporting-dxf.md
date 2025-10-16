---
ai_summary: Call makerjs.exporter.toDXF(model) passing your model. This function returns
  a string of DXF.
category: Exporting
description: Call makerjs.exporter.toDXF(model) passing your model. This function
  returns a string of DXF.
difficulty: advanced
keywords:
- drawing
- export
- exporting
- paths
prerequisites:
- Basic Drawing
primary_topic: exporting
related:
- Exporting DXF
- Basic Drawing
- SVG Styling
- Exporting PDF
source: docs/_snippets/exporting-dxf.html
tags:
- advanced
- exporting
title: Exporting Dxf
---
#### Simple export

Call `makerjs.exporter.toDXF(model)` passing your model. This function returns a string of DXF.

If your drawing has layers with names that match the following reserved color names,
paths on that layer will have a stroke color automatically:

aqua, black, blue, fuchsia, green, gray, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow

#### Captions

A [caption](/docs/intermediate-drawing/index.md#captions) will inherit the `layerOptions` that are applied to its model's layer name unless overridden by the anchor layer.

#### Advanced options

You may override the default export behavior by calling `makerjs.exporter.toDXF(model, options)` and passing an options object.
The options object has these properties:

| property | values / effects |
| --- | --- |
| [units](../converted/api/interfaces/core_exporter.idxfrenderoptions.md#units) | [Maker.js unit type](../api/index.html#unittype) - unit system (default: extracted from drawing. If unit system is not in drawing or not passed, it will use DXF default of inches) |
| [fontSize](../converted/api/interfaces/core_exporter.idxfrenderoptions.md#fontsize) | number - font size of captions (default: 9). The font size is in the same unit system as the `units` property. |
| [layerOptions](../converted/api/interfaces/core_exporter.idxfrenderoptions.md#layeroptions) | object map - keys are the layer names, values are an object with these properties:  | property | values | | --- | --- | | [color](../converted/api/interfaces/core_exporter.idxflayeroptions.md#color) | number - [Maker.js color](../api/modules/core_exporter.html#colors) | | [fontSize](../converted/api/interfaces/core_exporter.idxflayeroptions.md#fontsize) | number - font size of captions. The font size is in the same unit system as the `units` property. | |

## Related Topics

- [Exporting DXF](../index.md)
- [Basic Drawing](../index.md)
- [SVG Styling](../index.md)
- [Exporting PDF](../index.md)
