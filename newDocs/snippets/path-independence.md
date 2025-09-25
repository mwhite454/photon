---
title: "Path independence and Chains"
source: "docs/_snippets/path-independence.html"
id: "makerjs.snippets.path-independence"
summary: "Paths are atomic elements (line, arc, circle). When two paths meet at the same endpoint they form a chain. Chains may be endless (closed) or open. Chains are discovered by Maker.js; you don't explicitly define them."
tags: []
---
Paths are atomic elements (line, arc, circle). When two paths meet at the same endpoint they form a chain. Chains may be endless (closed) or open. Chains are discovered by Maker.js; you don't explicitly define them.

Keep in mind that manipulating paths implicitly affects chains when paths are added, modified, or removed.