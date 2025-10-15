---
ai_summary: All paths in a drawing are atomic elements of either line, arc, or circle.
  Paths may happen to touch each other or they may not.
category: General
description: All paths in a drawing are atomic elements of either line, arc, or circle.
  Paths may happen to touch each other or they may not.
difficulty: intermediate
keywords:
- drawing
- export
- general
- independence
- javascript
- path
- paths
- photon
- photon/core
- svg
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
source: docs/_snippets/path-independence.html
tags:
- paths
- general
- intermediate
title: Path Independence
---
All paths in a drawing are atomic elements of either line, arc, or circle. Paths may happen to touch each other or they may not.
When any two paths have the same endpoint, this is called a **chain**. A chain can continue with any number of paths that meet end to end.
If the chain begins and ends at the same point, this is called an **endless chain**.

Chains are an important concept that we will build upon, yet they are not a thing that you specify in your code.
Rather, chains are "found" by Maker.js when it processes your drawing model.
Paths in your drawing model are independent elements which may be added, modified or deleted by you or another developer.
As you work with paths, bear in mind that you are also implicitly working with chains.


## Examples

```javascript
//render a model that nas no chains
import { exporter, paths } from '@7syllable/photon-core';
const model = {
paths: {
"h1": new paths.Line([0, 10], [30, 10]),
"h2": new paths.Line([0, 20], [30, 20]),
"v1": new paths.Line([10, 0], [10, 30]),
"v2": new paths.Line([20, 0], [20, 30])
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```
```javascript
//render a model with paths that form a chain
import { exporter, paths } from '@7syllable/photon-core';
const model = {
paths: {
"0": new paths.Line([0, 0], [100, 0]),
"1": new paths.Line([100, 0], [100, 100]),
"2": new paths.Line([100, 100], [200, 100])
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```
```javascript
//render a model with paths that form an endless chain
import { exporter, paths } from '@7syllable/photon-core';
const model = {
paths: {
"v": new paths.Line([0, 0], [0, 100]),
"h": new paths.Line([0, 0], [100, 0]),
"arc":new paths.Arc([0, 0], 100, 0, 90)
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
