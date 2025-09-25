---
title: "Order of chain links"
source: "docs/_snippets/chain-order.html"
id: "makerjs.snippets.chain-order"
summary: "The order of `links` in a chain is arbitrary and not guaranteed to be stable across JS runtimes. If you need to reverse a chain use `makerjs.chain.reverse(chain)`."
tags: []
---
The order of `links` in a chain is arbitrary and not guaranteed to be stable across JS runtimes. If you need to reverse a chain use `makerjs.chain.reverse(chain)`.

For endless chains you can shift which link is considered the beginning with `makerjs.chain.cycle(chain, amount)` or set a known start with `makerjs.chain.startAt(chain, routeKey)`.

To test if a chain is clockwise, use `makerjs.measure.isChainClockwise(chain)` (returns `null` if a link is a circle).