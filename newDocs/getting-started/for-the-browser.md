---
title: "For the browser"
source: "docs/_snippets/getting-started-browser.html"
id: "makerjs.getting-started.for-the-browser"
summary: "Download the browser-based version of Maker.js and upload it to your website:"
tags: []
---
Download the browser-based version of Maker.js and upload it to your website:

https://maker.js.org/target/js/browser.maker.js

Or include it via a script tag:

```html
<script
  src="https://maker.js.org/target/js/browser.maker.js"
  type="text/javascript"
></script>
```

To work with Bezier Curves, include Bezier.js by Pomax:

```html
<script
  src="https://pomax.github.io/bezierjs/bezier.js"
  type="text/javascript"
></script>
```

To work with fonts, include Opentype.js:

```html
<script
  src="https://opentype.js.org/dist/opentype.js"
  type="text/javascript"
></script>
```

Then in your JavaScript (browser bundlers may differ), get a reference to Maker.js:

```js
var makerjs = require("makerjs");
```

Including via CDN (alternative):

```html
<script src="https://cdn.jsdelivr.net/npm/makerjs@0/target/js/browser.maker.js"></script>
```

And corresponding CDN versions of Bezier.js and Opentype.js:

```html
<script src="https://cdn.jsdelivr.net/npm/bezier-js@2/bezier.js"></script>
<script src="https://cdn.jsdelivr.net/npm/opentype.js@0/dist/opentype.js"></script>
```
