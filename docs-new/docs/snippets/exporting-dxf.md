---
title: Exporting Dxf
source: docs/_snippets/exporting-dxf.html
---

---
title: DXF
---

#### Simple export

Call `makerjs.exporter.toDXF(model)` passing your model. This function returns a string of DXF.

If your drawing has layers with names that match the following reserved color names,
paths on that layer will have a stroke color automatically:

aqua, black, blue, fuchsia, green, gray, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow

#### Captions

A [caption](/docs/intermediate-drawing/#Captions) will inherit the `layerOptions` that are applied to its model's layer name unless overridden by the anchor layer.

#### Advanced options

You may override the default export behavior by calling `makerjs.exporter.toDXF(model, options)` and passing an options object.
The options object has these properties:

| property | values / effects |
| --- | --- |
| [units](/docs/api/interfaces/makerjs.exporter.idxfrenderoptions.html#units) | [Maker.js unit type](/docs/api/index.html#unittype) - unit system (default: extracted from drawing. If unit system is not in drawing or not passed, it will use DXF default of inches) |
| [fontSize](/docs/api/interfaces/makerjs.exporter.idxfrenderoptions.html#fontsize) | number - font size of captions (default: 9). The font size is in the same unit system as the `units` property. |
| [layerOptions](/docs/api/interfaces/makerjs.exporter.idxfrenderoptions.html#layeroptions) | object map - keys are the layer names, values are an object with these properties:  | property | values | | --- | --- | | [color](/docs/api/interfaces/makerjs.exporter.idxflayeroptions.html#color) | number - [Maker.js color](/docs/api/modules/makerjs.exporter.html#colors) | | [fontSize](/docs/api/interfaces/makerjs.exporter.idxflayeroptions.html#fontsize) | number - font size of captions. The font size is in the same unit system as the `units` property. | |
