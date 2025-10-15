---
ai_summary: Call makerjs.exporter.toOpenJsCad(model) passing your model.
category: Exporting
description: Call makerjs.exporter.toOpenJsCad(model) passing your model.
difficulty: advanced
keywords:
- cad
- export
- exporting
- javascript
- openjscad
prerequisites:
- Basic Drawing
primary_topic: exporting
related:
- Exporting DXF
- Basic Drawing
- SVG Styling
- Exporting PDF
source: docs/_snippets/exporting-openjscad.html
tags:
- advanced
- exporting
title: Exporting Openjscad
---
#### Simple export

Call `makerjs.exporter.toOpenJsCad(model)` passing your model.
This function returns a string of JavaScript code executable within [an OpenJsCad environment](https://joostn.github.io/OpenJsCad/).

#### Advanced options

Call `makerjs.exporter.toOpenJsCad(model, options)` passing your model and an options object.

See the [API documentation for OpenJsCad export options](../api/interfaces/makerjs.exporter.iopenjscadoptions.html#content)

## Related Topics

- [Exporting DXF](../index.md)
- [Basic Drawing](../index.md)
- [SVG Styling](../index.md)
- [Exporting PDF](../index.md)
