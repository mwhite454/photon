---
title: "DXF"
source: "docs/_snippets/exporting-dxf.html"
id: "makerjs.snippets.exporting-dxf"
summary: "Call `makerjs.exporter.toDXF(model)` to export DXF (returns a string). Layers named with reserved color names will get automatic stroke colors. You can pass options like `units`, `fontSize`, and `layerOptions` to control rendering."
tags: []
---
Call `makerjs.exporter.toDXF(model)` to export DXF (returns a string). Layers named with reserved color names will get automatic stroke colors. You can pass options like `units`, `fontSize`, and `layerOptions` to control rendering.

Advanced options include per-layer `layerOptions` (color, fontSize) and export-level `units` and `fontSize`.