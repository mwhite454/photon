---
title: "STL"
source: "docs/_snippets/exporting-stl.html"
id: "makerjs.snippets.exporting-stl"
summary: "To export STL you'll need the `openjscad-csg` library. In the browser you can load `csg.js` and `formats.js` (or use a worker). In Node.js `npm install openjscad-csg` and then `fs.writeFileSync('star.stl', makerjs.exporter.toSTL(model))`."
tags: []
---
To export STL you'll need the `openjscad-csg` library. In the browser you can load `csg.js` and `formats.js` (or use a worker). In Node.js `npm install openjscad-csg` and then `fs.writeFileSync('star.stl', makerjs.exporter.toSTL(model))`.

Call `makerjs.exporter.toSTL(model, options)` for advanced options.