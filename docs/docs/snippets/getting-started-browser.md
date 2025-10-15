---
ai_summary: 'Download the browser-based version of Maker.js, then upload it to your
  website:'
category: Getting Started
description: 'Download the browser-based version of Maker.js, then upload it to your
  website:'
difficulty: beginner
keywords:
- browser
- export
- getting
- getting-started
- javascript
- models
- paths
- photon
- photon/core
- started
primary_topic: getting-started-browser
source: docs/_snippets/getting-started-browser.html
tags:
- getting-started
- getting-started-browser
- beginner
title: Getting Started Browser
---
Download the browser-based version of Maker.js, then upload it to your website:

<http:// photon/core.org/target/js/browser.photon/core>

Or you can link to it:


## Examples

```html

```
To work with Bezier Curves, you will also need a copy of [Bezier.js by Pomax](http://pomax.github.io/bezierjs/):
```html

```
To work with fonts, you will need both Bezier.js (above) and a copy of [Opentype.js by Frederik De Bleser](https://github.com/nodebox/opentype.js)
```html

```

---

Then, in your JavaScript, import the modules you need:

```javascript
// Import specific modules (recommended)
import { models, paths, exporter } from '@7syllable/photon-core';

// Or import all (if needed)
// import * as photon from '@7syllable/photon-core';
```

### Including via CDN

```html

```
To work with Bezier Curves, you will also need a copy of [Bezier.js by Pomax](http://pomax.github.io/bezierjs/):
```html

```
To work with fonts, you will need both Bezier.js (above) and a copy of [Opentype.js by Frederik De Bleser](https://github.com/nodebox/opentype.js)
```html

```

Then, in your JavaScript, import the modules you need:

```javascript
// Import specific modules (recommended)
import { models, paths, exporter } from '@7syllable/photon-core';

// Or import all (if needed)
// import * as photon from '@7syllable/photon-core';
```
