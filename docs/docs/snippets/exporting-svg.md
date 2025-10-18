---
ai_summary: Call makerjs.exporter.toSVG(model) passing your model. This function returns
  a string of SVG.
category: Exporting
description: Call makerjs.exporter.toSVG(model) passing your model. This function
  returns a string of SVG.
difficulty: advanced
keywords:
- drawing
- export
- exporting
- models
- paths
- svg
prerequisites:
- Basic Drawing
primary_topic: exporting
related:
- Exporting DXF
- Basic Drawing
- SVG Styling
- Exporting PDF
source: docs/_snippets/exporting-svg.html
tags:
- advanced
- exporting
title: Exporting Svg
---
#### Simple export

Call `makerjs.exporter.toSVG(model)` passing your model. This function returns a string of SVG.

If your drawing has layers with names that match the following reserved color names,
paths on that layer will have a stroke color automatically:

aqua, black, blue, fuchsia, green, gray, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow

#### Captions

[Captions](../snippets/captions.md) are added to an SVG group with a layer name of "captions".
This layer name may be used to apply `layerOptions` that are common to all captions.
In addition, a caption will inherit the `layerOptions` that are applied to its model's layer name unless overridden by the anchor layer.

#### Advanced options

There are two main modes of SVG export: Path-only mode and Separate mode. Path-only mode is the default.

In Path-only mode, the SVG structure will have only one SVG `<path>` element per layer. (If you do not specify layers then you have one "null" layer).
This SVG `<path>` element will contain all of your model's path data. If your drawing contained any closed geometries from endless chains, you will be able to use SVG fill on these shapes.

In Separate mode, every model in your heirarchy is exported as an SVG `<g>` element containing that model's paths, each exported as an individual SVG element.
Lines will export as an SVG `<line>` element, circles will export as an SVG `<circle>` element, and arcs will export as an SVG `<path>` element.
Child models will become nested `<g>` elements. You will not be able to use SVG fill in any satisfactory way.

You may override the default export behavior by calling `makerjs.exporter.toSVG(model, options)` and passing an options object.
The options object has these properties:

| property | values / effects | mode avalability |
| --- | --- | --- |
| [useSvgPathOnly](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalusesvgpathonly) | *true (default)* - Path-only mode <br/> *false* - Separate mode |  |
| [accuracy](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalaccuracy) | number - Exemplar number of decimal digits (default: .001) | Both |
| [annotate](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalannotate) | *true* - Adds SVG `<text>` elements with the path id <br/> *false (default)* | Separate |
| [className](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalclassname) | string - Class name | Both |
| [cssStyle](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalcssstyle) | string - CSS style | Both |
| [fill](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalfill) | string - CSS color (default: none) | Path-only |
| [fillRule](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalfillrule) | string - [SVG fill-rule](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule) (default: "evenodd")<br/>- "evenodd" - Uses the [even-odd rule](https://en.wikipedia.org/wiki/Even%E2%80%93odd_rule)<br/>- "nonzero" - Uses the [non-zero rule](https://en.wikipedia.org/wiki/Nonzero-rule) (requires more computation) | Path-only |
| [fontSize](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalfontsize) | string - CSS font size + units (default: 9pt). For annotations and captions. | Both |
| [layerOptions](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionallayeroptions) | object map - keys are layer names, values are an object with properties described below. | Both |
| [origin](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalorigin) | point - offset your drawing in the SVG coordinate space (default: null) | Separate |
| [scale](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalscale) | number - scale your drawing (default: 1) | Separate |
| [stroke](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalstroke) | string - CSS color (default: black) | Both |
| [strokeWidth](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalstrokewidth) | string - SVG width + units (default: 0.25mm) | Both |
| [svgAttrs](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalsvgattrs) | object map - attributes to add to the root svg tag | Both |
| [units](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalunits) | [SVG unit conversion map](../converted/api/interfaces/core_svg-esm.SvgUnitConversion.md) (default - extracted from drawing. If unit system is not in drawing or not passed, SVG defaults to pixels.) | Both |
| [viewbox](../converted/api/interfaces/core_svg-esm.ISVGRenderOptions.md#optionalviewbox) | *true (default)* - use SVG viewbox, stretch drawing to fill the SVG element. <br/> *false* - do not stretch drawing | Both |

The `layerOptions` object value has the following properties:

* **[className](../converted/api/interfaces/core_svg-esm.ISVGElementRenderOptions.md#optionalclassname)**: string - Class name
* **[cssStyle](../converted/api/interfaces/core_svg-esm.ISVGElementRenderOptions.md#optionalcssstyle)**: string - CSS style
* **[fill](../converted/api/interfaces/core_svg-esm.ISVGElementRenderOptions.md#optionalfill)**: string - CSS color (default: none)
* **[stroke](../converted/api/interfaces/core_svg-esm.ISVGElementRenderOptions.md#optionalstroke)**: string - CSS color (default: black)
* **[strokeWidth](../converted/api/interfaces/core_svg-esm.ISVGElementRenderOptions.md#optionalstrokewidth)**: string - SVG width + units (default: 0.25mm)

## Related Topics

* [Exporting DXF](../index.md)
* [Basic Drawing](../index.md)
* [SVG Styling](../index.md)
* [Exporting PDF](../index.md)
