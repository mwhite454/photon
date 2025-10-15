---
ai_summary: Many CNC tools are not able to cut a sharp interior corner. The way to
  clear the apex of an interior corner is by encompassing the corner with a ci...
category: General
description: Many CNC tools are not able to cut a sharp interior corner. The way to
  clear the apex of an interior corner is by encompassing the corner with a ci...
difficulty: intermediate
keywords:
- cnc
- dogbones
- export
- general
- javascript
- models
- paths
- photon
- photon/core
- svg
primary_topic: dogbones
source: docs/_snippets/dogbones.html
tags:
- intermediate
- general
- dogbones
title: Dogbones
---
Many CNC tools are not able to cut a sharp interior corner. The way to clear the apex of an interior corner is by encompassing the corner with a circular cut known as a dogbone fillet.
Use [path.dogbone](/docs/api/modules/path.md#dogbone) to round a corner at the junction between two lines.
This function will only work for two lines which must meet at one point. It will clip the two lines that you pass it, and will return a new arc path which clears the corner where the lines meet.
It will return null if a dogbone fillet cannot be created at the radius you specify.


## Examples

```javascript
//dogbone fillet between lines.
import { exporter, models, path, paths } from 'photon/core';
const model = {
paths: {
line1: new paths.Line([0, 0], [0, 5]),
line2: new paths.Line([0, 5], [10, 5])
}
};
//create dogbone fillet
const arc1 = path.dogbone(model.paths.line1, model.paths.line2, 1);
//add the fillet to the model
model.paths.arc1 = arc1;
const svg = exporter.toSVG(model);
document.write(svg);
```

#### Dogbone models

If you need a rectangle with dogbones at each corner, you can use
[models.Dogbone(width, height, radius*, optional style, optional bottomless*)](api/classes/models.dogbone.md#constructor).
There are a 3 styles of a Dogbone model:

* 0 : (default) rounded
* -1 : horizontal
* -1 : vertical

Dogbone model corner styles:

```javascript
//dogbone corner styles.
import { exporter, models, path, paths } from 'photon/core';
const dogbones = {
models: {
round: new models.Dogbone(100,50, 5, 0),
horizontal: new models.Dogbone(100,50, 5, -1),
vertical: new models.Dogbone(100,50, 5, 1)
}
};
dogbones.models.horizontal.origin = [115, 0];
dogbones.models.vertical.origin = [230, 0];
const svg = exporter.toSVG(dogbones);
document.write(svg);
```

Making them bottomless is useful for creating [tongue-and-groove shapes](/playground/index.md?script=tongue-and-groove):

```javascript
//bottomless dogbones.
import { exporter, models, path, paths } from 'photon/core';
const dogbones = {
models: {
O: new models.Dogbone(100,50, 5, 0, true),
horizontal: new models.Dogbone(100,50, 5, -1, true),
vertical: new models.Dogbone(100,50, 5, 1, true)
}
};
dogbones.models.horizontal.origin = [115, 0];
dogbones.models.vertical.origin = [230, 0];
const svg = exporter.toSVG(dogbones);
document.write(svg);
```
