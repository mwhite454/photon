---
title: "Units"
source: "docs/_snippets/units.html"
id: "makerjs.snippets.units"
summary: "Paths are unitless. Models may specify `units` (e.g., `makerjs.unitType.Inch`, `makerjs.unitType.Centimeter`, `makerjs.unitType.Millimeter`). You can also specify units during export or convert units with `makerjs.model.convertUnits(mode..."
tags: []
---
Paths are unitless. Models may specify `units` (e.g., `makerjs.unitType.Inch`, `makerjs.unitType.Centimeter`, `makerjs.unitType.Millimeter`). You can also specify units during export or convert units with `makerjs.model.convertUnits(modelToScale, units)`.

Example mixing units: set `this.units = makerjs.unitType.Centimeter` on a model and convert nested models with `makerjs.model.convertUnits`.