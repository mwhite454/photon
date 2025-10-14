---
title: Exporting Svg
source: docs/_snippets/exporting-svg.html
---

---
title: SVG
---

#### Simple export

Call `makerjs.exporter.toSVG(model)` passing your model. This function returns a string of SVG.

If your drawing has layers with names that match the following reserved color names,
paths on that layer will have a stroke color automatically:

aqua, black, blue, fuchsia, green, gray, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow

#### Captions

[Captions](/docs/intermediate-drawing/#Captions) are added to an SVG group with a layer name of "captions".
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
| [useSvgPathOnly](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#usesvgpathonly) | * true (default) - Path-only mode * false - Separate mode |  |
| [accuracy](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#accuracy) | number - Exemplar number of decimal digits (default: .001) | Both |
| [annotate](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#annotate) | * true - Adds SVG `<text>` elements with the path id * false (default) | Separate |
| [className](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#className) | string - Class name | Both |
| [cssStyle](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#cssstyle) | string - CSS style | Both |
| [fill](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#fill) | string - CSS color (default: none) | Path-only |
| [fillRule](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#fillrule) | string - [SVG fill-rule](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule) (default: "evenodd")  * "evenodd" - Uses the [even-odd rule](https://en.wikipedia.org/wiki/Even%E2%80%93odd_rule) * "nonzero" - Uses the [non-zero rule](https://en.wikipedia.org/wiki/Nonzero-rule) (requires more computation) | Path-only |
| [fontSize](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#fontsize) | string - CSS font size + units (default: 9pt). For annotations and captions. | Both |
| [layerOptions](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#layeroptions) | object map - keys are the layer names, values are an object with these properties:  | property | values | | --- | --- | | [className](/docs/api/interfaces/makerjs.exporter.isvgelementrenderoptions.html#className) | string - Class name | | [cssStyle](/docs/api/interfaces/makerjs.exporter.isvgelementrenderoptions.html#cssstyle) | string - CSS style | | [fill](/docs/api/interfaces/makerjs.exporter.isvgelementrenderoptions.html#fill) | string - CSS color (default: none) | | [stroke](/docs/api/interfaces/makerjs.exporter.isvgelementrenderoptions.html#stroke) | string - CSS color (default: black) | | [strokeWidth](/docs/api/interfaces/makerjs.exporter.isvgelementrenderoptions.html#strokewidth) | string - SVG width + units (default: 0.25mm) | | Both |
| [origin](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#origin) | point - offset your drawing in the SVG coordinate space (default: null) | Separate |
| [scale](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#scale) | number - scale your drawing (default: 1) | Separate |
| [stroke](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#stroke) | string - CSS color (default: black) | Both |
| [strokeWidth](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#strokewidth) | string - SVG width + units (default: 0.25mm) | Both |
| [svgAttrs](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#svgattrs) | object map - attributes to add to the root svg tag | Both |
| [units](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#units) | [Maker.js unit type](/docs/api/index.html#unittype) (default - extracted from drawing. If unit system is not in drawing or not passed, it will use SVG default of pixels) | Both |
| [viewbox](/docs/api/interfaces/makerjs.exporter.isvgrenderoptions.html#viewbox) | * true (default) - use SVG viewbox, stretch drawing to fill the SVG element. * false - do not stretch drawing | Both |
