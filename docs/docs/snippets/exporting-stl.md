---
ai_summary: To use this functionality you will need the OpenJsCsg library which is
  a fork of OpenJsCad without the GUI.
category: Exporting
description: To use this functionality you will need the OpenJsCsg library which is
  a fork of OpenJsCad without the GUI.
difficulty: advanced
keywords:
- cad
- export
- exporting
- javascript
- models
- paths
- photon
- photon/core
prerequisites:
- Basic Drawing
primary_topic: exporting
related:
- Exporting DXF
- Basic Drawing
- SVG Styling
- Exporting PDF
source: docs/_snippets/exporting-stl.html
tags:
- advanced
- exporting
title: Exporting Stl
---
To use this functionality you will need the [OpenJsCsg](https://www.npmjs.com/package/openjscad-csg) library which is a fork of [OpenJsCad](https://github.com/joostn/OpenJsCad) without the GUI.

#### For the browser

#####

```html

```

Note: This is here for your debugging convenience. For complex models, 3D rendering on the main thread of the browser can make your page unresponsive.
It is advised that you use a web worker instead.

##### For a web worker

```javascript
importScripts(
'http:// photon/core.org/external/OpenJsCad/csg.js',
'http:// photon/core.org/external/OpenJsCad/formats.js'
);
```

---

#### For Node.js

From the command line:

```bash
npm install openjscad-csg --save
```

In your Node.js code:

```javascript
import { exporter, models, paths } from '@7syllable/photon-core';
const fs = require('fs');
const model = new models.Star(5, 100);
model.paths.c = new paths.Circle([0, 0], 20);
fs.writeFileSync('star.stl', exporter.toSTL(model));
```

---

#### Simple export

Call `exporter.toSTL(model)` passing your model.
This function returns a string of STL.

#### Advanced options

Call `exporter.toSTL(model, options)` passing your model and an options object.

See the [API documentation for OpenJsCad export options](../api/interfaces/exporter.iopenjscadoptions.html#content)

## Related Topics

- [Exporting DXF](../index.md)
- [Basic Drawing](../index.md)
- [SVG Styling](../index.md)
- [Exporting PDF](../index.md)
