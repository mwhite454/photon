---
ai_summary: Expanding a model's path will surround every path, which sometimes can
  mean there is an inner and an outer surrounding chain. If you only want the ...
category: General
description: Expanding a model's path will surround every path, which sometimes can
  mean there is an inner and an outer surrounding chain. If you only want the ...
difficulty: intermediate
keywords:
- export
- general
- javascript
- models
- outlining
- svg
primary_topic: outlining
source: docs/_snippets/outlining.html
tags:
- intermediate
- general
- outlining
title: Outlining
---
Expanding a model's path will surround every path, which sometimes can mean there is an inner and an outer surrounding chain. If you only want the outer surrounding chain, use
[makerjs.model.outline](/docs/api/modules/makerjs.model.md#outline):

```javascript
//outline a star model
const m = require('makerjs');
const star = m.model.rotate(new m.models.Star(5, 100), 18);
const outline = m.model.outline(star, 10);
const model = {
models: {
star: star,
outline: outline
}
};
const svg = m.exporter.toSVG(model);
document.write(svg);
```
