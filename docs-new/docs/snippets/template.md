---
ai_summary: import { models, paths, exporter } from 'photon/core';
category: General
description: import { models, paths, exporter } from 'photon/core';
difficulty: intermediate
keywords:
- export
- general
- javascript
- models
- paths
- photon
- photon/core
- svg
- template
primary_topic: template
source: docs/_snippets/template.html
tags:
- intermediate
- template
- general
title: Template
---
Example:

```javascript
import { models, paths, exporter } from 'photon/core';
// Your code here
const svg = exporter.toSVG(yourModel);
document.write(svg);
```
[try it in JsFiddle ⇗](https://jsfiddle.net/danmarshall//)
