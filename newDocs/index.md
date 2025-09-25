---
title: "Create parametric CNC drawings using JavaScript"
source: "docs/index.html"
id: "makerjs.index"
summary: "Create line drawings using familiar constructs from geometry and drafting. Initially designated for CNC and laser cutters, Maker.js can also help you programmatically draw shapes for any purpose. It runs in both Node.js and web browsers."
tags: []
---
# Your compass and straightedge, in JavaScript.

Create line drawings using familiar constructs from geometry and drafting. Initially designated for CNC and laser cutters, Maker.js can also help you programmatically draw shapes for any purpose. It runs in both Node.js and web browsers.

## 2D and 3D export formats

2D Export formats: [DXF](https://maker.js.org/docs/api/modules/makerjs.exporter.html#todxf), [SVG](https://maker.js.org/docs/api/modules/makerjs.exporter.html#tosvg), [PDF](https://maker.js.org/docs/api/modules/makerjs.exporter.html#topdf), [Jscad CAG object](https://maker.js.org/docs/api/modules/makerjs.exporter.html#tojscadcag)

3D Export formats: [Jscad Script](https://maker.js.org/docs/api/modules/makerjs.exporter.html#tojscadscript), [Jscad CSG object](https://maker.js.org/docs/api/modules/makerjs.exporter.html#tojscadcsg), [STL](https://maker.js.org/docs/api/modules/makerjs.exporter.html#tojscadstl)

[Demos](https://maker.js.org/demos/) • [Documentation](https://maker.js.org/docs/)

![Sample animation](https://maker.js.org/images/anim-wheel.gif)

## Latest demos

(Thumbnails and demo links omitted in this Markdown export — see the live site or the `demos/` folder for interactive examples.)

## Core concepts

- [Paths](https://maker.js.org/docs/basic-drawing/#Paths) — The primitive elements of a drawing are lines, arcs, and circles.
- [Models](https://maker.js.org/docs/basic-drawing/#Models) — Groups of paths to compose a shape.
- [Layers](https://maker.js.org/docs/advanced-drawing/#Layers) — Organization of models, such as by color or tool type.
- [Chains](https://maker.js.org/docs/working-with-chains/#content) — A series of lines and arcs that connect end-to-end continuously.

Learn more in the [tutorial](https://maker.js.org/docs/basic-drawing/) or [API documentation](https://maker.js.org/docs/api/).

## Features (short)

- Drawings are a simple JavaScript object and can be serialized with JSON.
- Models can be required, modified, and re-exported.
- Models and paths can be scaled, distorted, measured, converted between unit systems, and combined with boolean operations.
- Find intersection points, traverse model trees, detect chains, and get points along paths or chains.

## Getting Started (excerpt)

### Try it now

Visit the [Maker.js Playground](https://maker.js.org/playground/) to edit and run JavaScript from your browser. Each demo opens in the playground so you can explore and modify the code.

### To use in a web browser

Download the browser-based version:

```
https://maker.js.org/target/js/browser.maker.js
```

Add a script tag to your HTML:

```html
<script
  src="https://maker.js.org/target/js/browser.maker.js"
  type="text/javascript"
></script>
```

You may also need additional libraries (see the full Getting Started page).

### To use via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/makerjs@0/target/js/browser.maker.js"></script>
```

### To use in Node.js

Install via npm:

```bash
npm install makerjs --save
```

In your code:

```js
var makerjs = require("makerjs");
```

---

(Full API references and demos are available on the site; this export omits interactive playground content.)
(Full API references and demos are available on the site; this export omits interactive playground content.)

---

## Linking for knowledge ingestion (recommended)

These Markdown files are now documents (not a website). For feeding into an Ollama knowledge set or similar retrieval-augmented systems, it's helpful to:

- make relationships between documents explicit and machine-readable (a small graph file or frontmatter fields),
- keep canonical doc IDs, titles, short summaries, and explicit outbound links (with relation types),
- include lightweight tags for filtering and retrieval.

Suggested conventions

- Use frontmatter in each Markdown file containing at least: `id`, `title`, `summary`, `tags`, `links` (outbound links). Example:

```yaml
---
id: makerjs.paths
title: Paths
summary: "Primitive drawing elements: lines, arcs, circles; builder utilities and examples."
tags: [basic-drawing, api, primitive]
links:
  - id: makerjs.points
    href: ../snippets/points.md
    type: related
  - id: makerjs.models
    href: ../snippets/models.md
    type: uses
source: docs/_snippets/paths.html
---
```

- Store a small machine-readable graph at `newDocs/doc-graph.json` (or `.yaml`) that lists nodes and typed edges. This file makes it easy to generate retrieval indexes, create embeddings with id->text mapping, and generate backlink context during ingestion.

Minimal graph schema (example):

```json
{
  "nodes": [
    {"id": "index", "title": "Create parametric CNC drawings using JavaScript", "path": "newDocs/index.md", "summary": "Overview of Maker.js and exports."},
    {"id": "makerjs.paths", "title": "Paths", "path": "newDocs/snippets/paths.md"},
    {"id": "makerjs.points", "title": "Points", "path": "newDocs/snippets/points.md"}
  ],
  "edges": [
    {"from": "index", "to": "makerjs.paths", "type": "introduces"},
    {"from": "makerjs.paths", "to": "makerjs.points", "type": "references"}
  ]
}
```

How this helps for Ollama / RAG ingestion

- During ingestion you can prefer to store both the document text and its node metadata (id, tags, summary). Use the graph to create "context windows" that include related nodes (neighbors/backlinks) when answering queries.
- Save one canonical path/id per document; avoid duplicate content ingestion under different ids unless you deduplicate.
- Include relation types (introduces, uses, example-of, expands, demonstrates) so the assistant can reason about why docs are related.

Next steps you can take

- If you like this format I can generate a complete `doc-graph.json` by scanning `newDocs/` and using frontmatter (or by inferring titles/links). That will produce a full, machine-readable graph you can feed into embedding/indexing pipelines.
- I can also add a small ingestion helper script (Node.js) that reads `newDocs/`, extracts frontmatter and text, and emits a JSONL suitable for embedding.

---

````
