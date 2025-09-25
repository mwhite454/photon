---
title: "Paths"
source: "docs/_snippets/paths.html"
id: "makerjs.snippets.paths"
summary: "A path is an object with mandatory properties like `type` and `origin`. Common path types:"
tags: []
---
A path is an object with mandatory properties like `type` and `origin`. Common path types:

- line: has `end` point
- circle: has `radius`
- arc: has `radius`, `startAngle`, `endAngle`

Example objects:

```javascript
var line = { type: 'line', origin: [0,0], end: [1,1] };
var circle = { type: 'circle', origin: [0,0], radius: 1 };
var arc = { type: 'arc', origin: [0,0], radius: 1, startAngle:0, endAngle:45 };
```

Property names are case-sensitive.