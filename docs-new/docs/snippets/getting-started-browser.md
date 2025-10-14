---
title: Getting Started Browser
source: docs/_snippets/getting-started-browser.html
---

Download the browser-based version of Maker.js, then upload it to your website:

<http:// photon/core.org/target/js/browser.photon/core>

Or you can link to it:

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
import { models, paths, exporter } from 'photon/core';

// Or import all (if needed)
// import * as photon from 'photon/core';
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
import { models, paths, exporter } from 'photon/core';

// Or import all (if needed)
// import * as photon from 'photon/core';
```
