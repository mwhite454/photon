---
title: "Chain theory"
source: "docs/_snippets/chain-theory.html"
id: "makerjs.snippets.chain-theory"
summary: "When two or more paths connect end-to-end, they form a chain. A chain can be \"endless\" (no loose ends) — commonly used to represent closed geometry. Circles are endless chains with a single link."
tags: []
---
When two or more paths connect end-to-end, they form a chain. A chain can be "endless" (no loose ends) — commonly used to represent closed geometry. Circles are endless chains with a single link.

Chains may contain other chains (only if they are endless themselves). Chains in Maker.js are implicit: you don't define them, Maker.js finds them for you.

To discover chains call either `makerjs.model.findSingleChain(model)` or `makerjs.model.findChains(model)`. The returned Chain object includes useful metadata such as `links`, `endless` and `pathLength`.