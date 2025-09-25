---
title: "Fillets"
source: "docs/_snippets/fillets.html"
id: "makerjs.snippets.fillets"
summary: "Use `makerjs.path.fillet(pathA, pathB, radius)` to create a rounded corner between two paths (lines/arcs). It clips the two paths and returns an arc fitting between the clipped ends, or `null` if the fillet cannot be created. Works with ..."
tags: []
---
Use `makerjs.path.fillet(pathA, pathB, radius)` to create a rounded corner between two paths (lines/arcs). It clips the two paths and returns an arc fitting between the clipped ends, or `null` if the fillet cannot be created. Works with line-line, arc-arc, or line-arc combinations.