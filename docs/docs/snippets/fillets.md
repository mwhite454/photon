---
ai_summary: 'Fillets are round corners where two paths meet. Maker.js provides two
  types of fillets:'
category: General
description: 'Fillets are round corners where two paths meet. Maker.js provides two
  types of fillets:'
difficulty: intermediate
keywords:
- export
- fillets
- general
- javascript
- paths
- photon
- photon/core
- svg
primary_topic: fillets
related:
- Dogbones
- Chains
- Chain Fillet
source: docs/_snippets/fillets.html
tags:
- intermediate
- general
- fillets
title: Fillets
---
Fillets are round corners where two paths meet. Maker.js provides two types of fillets:
traditional fillets and [dogbone fillets](#Dogbone%20Fillets).

#### Traditional fillet

Rounding a corner can add strength to your part, as well as make it faster to print.
Using [path.fillet](../api/modules/core_path.html#fillet) you can round a corner at the junction between two lines, two arcs, or a line and an arc.
This function will clip the two paths that you pass it, and will return a new arc path which fits between the clipped ends. The paths must meet at one point,
this is how it determines which ends of the paths to clip. You also provide a radius of the fillet. If the fillet cannot be created this function will return null.


## Examples

```javascript
//fillet between lines
import { exporter, path, paths } from '@7syllable/photon-core';
const model = {
paths: {
line1: new paths.Line([0, 20], [30, 10]),
line2: new paths.Line([10, 0], [30, 10])
}
};
//create a fillet
const arc = path.fillet(model.paths.line1, model.paths.line2, 2);
//add the fillet to the model
model.paths.arc = arc;
const svg = exporter.toSVG(model);
document.write(svg);
```
```javascript
//fillet between arcs
import { exporter, path, paths } from '@7syllable/photon-core';
const model = {
paths: {
arc1: new paths.Arc([0, 50], 50, 270, 0),
arc2: new paths.Arc([100, 50], 50, 180, 270)
}
};
//create a fillet
const arc = path.fillet(model.paths.arc1, model.paths.arc2, 2);
//add the fillet to the model
model.paths.arc = arc;
const svg = exporter.toSVG(model);
document.write(svg);
```
```javascript
//fillet between line and arc (or arc and line!)
import { exporter, path, paths } from '@7syllable/photon-core';
const model = {
paths: {
arc: new paths.Arc([0, 50], 50, 270, 0),
line: new paths.Line([50, 50], [50, 0])
}
};
//create a fillet
const arc2 = path.fillet(model.paths.arc, model.paths.line, 2);
//add the fillet to the model
model.paths.arc2 = arc2;
const svg = exporter.toSVG(model);
document.write(svg);
```

## Related Topics

- [Dogbones](../index.md)
- [Chains](../index.md)
- [Chain Fillet](../index.md)
