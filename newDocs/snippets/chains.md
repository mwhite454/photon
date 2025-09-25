---
title: "Finding chains and loose paths"
source: "docs/_snippets/chains.html"
id: "makerjs.snippets.chains"
summary: "You can find chains and also detect \"loose\" paths (paths not part of any chain). Maker.js calls your callback for each logical layer with `(chains, loose, layer)` so you can inspect the results."
tags: []
---
You can find chains and also detect "loose" paths (paths not part of any chain). Maker.js calls your callback for each logical layer with `(chains, loose, layer)` so you can inspect the results.

```javascript
m.model.findChains(x, function(chains, loose, layer) {
  console.log('found ' + chains.length + ' chain(s) and ' + loose.length + ' loose path(s) on layer ' + layer);
});
```

This is useful for diagnostics, layer-by-layer processing, or identifying unconnected geometry.