---
title: "SVG"
source: "docs/_snippets/exporting-svg.html"
id: "makerjs.snippets.exporting-svg"
summary: "Call `makerjs.exporter.toSVG(model)` to get an SVG string. Two modes: Path-only (default) which emits one `<path>` per layer containing combined path data; or Separate mode which outputs SVG elements per primitive. Several options exist ..."
tags: []
---
Call `makerjs.exporter.toSVG(model)` to get an SVG string. Two modes: Path-only (default) which emits one `<path>` per layer containing combined path data; or Separate mode which outputs SVG elements per primitive. Several options exist (`useSvgPathOnly`, `accuracy`, `annotate`, `className`, `cssStyle`, `fill`, `fillRule`, `fontSize`, `layerOptions`, `origin`, `scale`, `stroke`, `strokeWidth`, `svgAttrs`, `units`, `viewbox`).

Path-only mode supports SVG `fill` and `fillRule` for closed geometries.