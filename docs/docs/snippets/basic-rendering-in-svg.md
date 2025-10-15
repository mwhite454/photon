---
ai_summary: 'Call the exporter.toSVG function and pass your path as a parameter:'
category: General
description: 'Call the exporter.toSVG function and pass your path as a parameter:'
difficulty: intermediate
keywords:
- basic
- export
- general
- javascript
- paths
- photon
- photon/core
- rendering
- svg
primary_topic: svg
source: docs/_snippets/basic-rendering-in-svg.html
tags:
- intermediate
- svg
- general
title: Basic Rendering In Svg
---
Call the **exporter.toSVG** function and pass your path as a parameter:


## Examples

```javascript
//renders a line
import { exporter } from '@7syllable/photon-core';
const line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
const svg = exporter.toSVG(line);
document.write(svg);
```

You may also call **exporter.toSVG** with an array of paths as a parameter:

```javascript
//renders a line and a circle
import { exporter } from '@7syllable/photon-core';
const line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
const circle = {
type: 'circle',
origin: [0, 0],
radius: 50
};
const pathArray = [ line, circle ];
const svg = exporter.toSVG(pathArray);
document.write(svg);
```
