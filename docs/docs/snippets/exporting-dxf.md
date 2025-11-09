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

A [caption](../snippets/captions.md) will inherit the `layerOptions` that are applied to its model's layer name unless overridden by the anchor layer.

#### Advanced options

You may override the default export behavior by calling `makerjs.exporter.toDXF(model, options)` and passing an options object.
The options object has these properties:

| property | values / effects |
| --- | --- |
| [units](../converted/api/interfaces/core_dxf.IDXFRenderOptions.md#optionalunits) | DXF export unit system (defaults to inches when not specified). |
| [fontSize](../converted/api/interfaces/core_dxf.IDXFRenderOptions.md#optionalfontsize) | Number - font size of captions (default: 9). Uses the same unit system as `units`. |
| [layerOptions](../converted/api/interfaces/core_dxf.IDXFRenderOptions.md#optionallayeroptions) | Object map keyed by layer name with values described below. |

Layer option values:

| property | values |
| --- | --- |
| [color](../converted/api/interfaces/core_dxf.IDXFLayerOptions.md#color) | Number - see [Maker.js color map](../converted/api/variables/core_exporter.colors.md). |
| [fontSize](../converted/api/interfaces/core_dxf.IDXFLayerOptions.md#optionalfontsize) | Number - caption font size in the same unit system as `units`. |

## Related Topics

- [Exporting DXF](../index.md)
- [Basic Drawing](../index.md)
- [SVG Styling](../index.md)
- [Exporting PDF](../index.md)
