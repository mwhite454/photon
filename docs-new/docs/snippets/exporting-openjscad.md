---
title: Exporting Openjscad
source: docs/_snippets/exporting-openjscad.html
---

---
title: OpenJScad
---

#### Simple export

Call `makerjs.exporter.toOpenJsCad(model)` passing your model.
This function returns a string of JavaScript code executable within [an OpenJsCad environment](https://joostn.github.io/OpenJsCad/).

#### Advanced options

Call `makerjs.exporter.toOpenJsCad(model, options)` passing your model and an options object.

See the [API documentation for OpenJsCad export options](/docs/api/interfaces/makerjs.exporter.iopenjscadoptions.html#content)
