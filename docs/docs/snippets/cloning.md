---
ai_summary: Models and paths are simple JavaScript objects, so they are easy to clone
  in a way that is standard to JavaScript. Maker.js provides a few function...
category: General
description: Models and paths are simple JavaScript objects, so they are easy to clone
  in a way that is standard to JavaScript. Maker.js provides a few function...
difficulty: intermediate
keywords:
- cloning
- export
- general
- javascript
- models
- paths
- photon
- photon/core
- svg
primary_topic: cloning
related:
- Moving
- Scaling
- Rotating
source: docs/_snippets/cloning.html
tags:
- intermediate
- general
- cloning
title: Cloning
---
Models and paths are simple JavaScript objects, so they are easy to clone in a way that is standard to JavaScript. Maker.js provides a few functions for cloning:

* [cloneObject](../api/index.html#cloneobject) - clones a model, or any other object.
* [path.clone](../api/modules/core_path.html#clone) - clones a path (quicker than cloneObject)
* [point.clone](../api/modules/core_point.html#clone) - clones a point (quicker than cloneObject)

Cloning is useful in many situations. For example, if you need many copies of a model for rotation:

```javascript
//clone and rotate
import { angle, cloneObject, exporter, model, path, paths, point } from '@7syllable/photon-core';
function sawtooth(numTeeth, r1, rd, offset) {
const a = 360 / numTeeth;
const a1 = 90 - a / 2;
const r2 = r1 + rd;
const p1 = point.fromPolar(angle.toRadians(a1), r1);
const p2 = point.rotate(p1, a, [0, 0]);
const p3 = [-offset, r2];
this.paths = {
outer: new paths.Arc(p1, p3, r2 / 4, false, false),
inner: new paths.Arc(p2, p3, r1 / 4, false, false)
};
}
const wheel = { models: {} };
const numTeeth = 30;
const tooth = new sawtooth(numTeeth, 100, 20, 10);
for (const i = 0; i < numTeeth; i++ ) {
const clone = cloneObject(tooth);
const a = 360 / numTeeth;
model.rotate(clone, a \* i, [0, 0]);
wheel.models[i] = clone;
}
const svg = exporter.toSVG(wheel);
document.write(svg);
```

## Related Topics

- [Moving](../index.md)
- [Scaling](../index.md)
- [Rotating](../index.md)
