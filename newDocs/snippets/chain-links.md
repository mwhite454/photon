---
title: "Chain links"
source: "docs/_snippets/chain-links.html"
id: "makerjs.snippets.chain-links"
summary: "Each path in a chain is represented by a ChainLink wrapper object in the `links` array. The ChainLink tells how a path relates to the rest of the chain: each element connects to the next and previous element. For endless chains the last ..."
tags: []
---
Each path in a chain is represented by a ChainLink wrapper object in the `links` array. The ChainLink tells how a path relates to the rest of the chain: each element connects to the next and previous element. For endless chains the last element connects back to the first.

#### ChainLink object

The path itself is available on the `walkedPath` property (a `WalkPath` object).

#### Natural path flow

Maker.js path types: line, arc, circle. Circles have no endpoints and cannot join into chains. Lines and arcs can connect at endpoints and have a directional flow:

- line — flows from its origin to its end
- arc — flows from its startAngle to its endAngle (counter-clockwise)

A ChainLink's `reversed` property denotes the link's path flows opposite its natural flow to connect to neighbors.