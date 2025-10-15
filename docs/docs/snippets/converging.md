---
ai_summary: To make lines meet at their slope intersection point, use path.converge.
category: General
description: To make lines meet at their slope intersection point, use path.converge.
difficulty: intermediate
keywords:
- converging
- export
- general
- javascript
- models
- paths
- photon
- photon/core
- svg
primary_topic: converging
source: docs/_snippets/converging.html
tags:
- intermediate
- general
- converging
title: Converging
---
To make lines meet at their slope intersection point, use [path.converge](../api/modules/core_path.html#converge).
This function will only work with lines, it will not work with arcs.

The converge function will try to use the end of the line that is closest to the convergence point. If you need to specify which ends of your lines should be converged,
pass two additional boolean values. The boolean value is true to use the line's origin, false to use the end.

Converge example:

```javascript
//converge lines
import { cloneObject, exporter, path, paths } from '@7syllable/photon-core';
const model = {
origin: [0, 0],
paths: {
line1: new paths.Line([0, 0], [10, 5]),
line2: new paths.Line([0, 10], [10, 4]),
line3: new paths.Line([1, 0], [5, -2])
}
};
const clone1 = cloneObject(model);
clone1.origin = [10, 0];
const clone2 = cloneObject(model);
clone2.origin = [20, 0];
path.converge(clone1.paths.line1, clone1.paths.line2);
path.converge(clone1.paths.line1, clone1.paths.line3);
path.converge(clone2.paths.line1, clone2.paths.line2, false, true);
path.converge(clone2.paths.line1, clone2.paths.line3, true, false);
const svg = exporter.toSVG({ models: { before: clone1, after: model, x: clone2 } });
document.write(svg);
```
