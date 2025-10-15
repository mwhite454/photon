---
ai_summary: 'Creating a wireframe and using expansion may save you a lot of work.
  We will demonstrate by creating a wireframe of a truss:'
category: General
description: 'Creating a wireframe and using expansion may save you a lot of work.
  We will demonstrate by creating a wireframe of a truss:'
difficulty: intermediate
keywords:
- export
- general
- javascript
- models
- paths
- svg
- wireframe
primary_topic: wireframe
source: docs/_snippets/wireframe.html
tags:
- intermediate
- wireframe
- general
title: Wireframe
---

!!! warning "Known Issue - API Not Yet Available"
    Some examples on this page use `model.expandPaths()` which is **not yet available** in `@7syllable/photon-core@0.18.1`. 
    
    This function existed in the original maker.js but has not yet been ported to photon/core. 
    
    **Status**: See [GitHub Issue #3](https://github.com/mwhite454/photon/issues/3) for updates.
    
    Examples using `expandPaths()` will not execute until this function is restored.

Creating a wireframe and using expansion may save you a lot of work. We will demonstrate by creating a wireframe of a truss:

## Examples

```javascript
import { exporter, model, models, point } from '@7syllable/photon-core';
//create a simple truss
function trussWireframe(w, h) {
this.models = {
frame: new models.ConnectTheDots(true, [ [0, h], [w, 0], [0, 0] ])
};
const angled = this.models.frame.paths.ShapeLine1;
const bracepoints = [
[0, 0],
point.middle(angled, 1/3),
[w/2 , 0],
point.middle(angled, 2/3)
];
this.models.brace = new models.ConnectTheDots(false, bracepoints);
}
const truss = new trussWireframe(200, 50);
const svg = exporter.toSVG(truss);
document.write(svg);
```

Next we will expand the paths:

```javascript
import { exporter, model, models, point } from '@7syllable/photon-core';
//expand a truss wireframe
function trussWireframe(w, h) {
this.models = {
frame: new models.ConnectTheDots(true, [ [0, h], [w, 0], [0, 0] ])
};
const angled = this.models.frame.paths.ShapeLine1;
const bracepoints = [
[0, 0],
point.middle(angled, 1/3),
[w/2 , 0],
point.middle(angled, 2/3)
];
this.models.brace = new models.ConnectTheDots(false, bracepoints);
}
const truss = new trussWireframe(200, 50);
const expansion = model.expandPaths(truss, 3, 1);
const svg = exporter.toSVG(expansion);
document.write(svg);
```
