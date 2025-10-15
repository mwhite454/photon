---
ai_summary: 'To depend on Maker.js, run this from the command line:'
category: Getting Started
description: 'To depend on Maker.js, run this from the command line:'
difficulty: beginner
keywords:
- export
- getting
- getting-started
- javascript
- models
- node
- paths
- photon
- photon/core
- started
primary_topic: getting-started-node
source: docs/_snippets/getting-started-node.html
tags:
- getting-started-node
- getting-started
- beginner
title: Getting Started Node
---
To depend on Maker.js, run this from the command line:


## Examples

```bash
npm install makerjs --save
```

---

Then, in your JavaScript, import the modules you need:

```javascript
// Import specific modules (recommended)
import { models, paths, exporter } from '@7syllable/photon-core';

// Or import all (if needed)
// import * as photon from '@7syllable/photon-core';
```
