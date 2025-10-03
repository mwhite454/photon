#!/usr/bin/env node
// Rebuild newDocs/doc-graph.json by mapping /docs/...#Anchor links to local newDocs markdown files.
// This script is non-destructive: it does NOT modify any .md files. It backs up the previous graph.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "newDocs");
const OUT = path.join(ROOT, "doc-graph.json");
const BACKUP = path.join(ROOT, "doc-graph.json.bak");

function walk(dir) {
  const res = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) res.push(...walk(p));
    else if (st.isFile() && p.endsWith(".md")) res.push(p);
  }
  return res;
}

function readFrontmatterAndBody(content) {
  if (!content.startsWith("---")) return { fm: {}, body: content };
  const parts = content.split("\n");
  let end = -1;
  for (let i = 1; i < parts.length; i++)
    if (parts[i].trim() === "---") {
      end = i;
      break;
    }
  if (end === -1) return { fm: {}, body: content };
  const fmLines = parts.slice(1, end);
  const fm = {};
  for (const line of fmLines) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (m) {
      const key = m[1];
      let val = m[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      fm[key] = val;
    }
  }
  const body = parts.slice(end + 1).join("\n");
  return { fm, body };
}

function slugifyAnchor(text) {
  if (!text) return "";
  // remove markdown, strip quotes
  let s = text.replace(/[`"']/g, "");
  s = s.replace(/\s+/g, "-");
  s = s.replace(/[^a-zA-Z0-9\-]/g, "").toLowerCase();
  s = s.replace(/\-+/g, "-").replace(/^-|-$/g, "");
  return s;
}

function mapDocsAnchorToLocal(href) {
  // href can be like /docs/basic-drawing/#Paths or /docs/advanced-drawing/#Layout on a path
  try {
    const url = href;
    if (!url.startsWith("/")) return null;
    // remove leading /docs/
    const parts = url.split("#");
    const pathPart = parts[0];
    const anchorPart = parts[1] || "";
    // try to map by anchor first: slugify anchor and check snippets
    if (anchorPart) {
      const slug = slugifyAnchor(anchorPart);
      const candidate = path.join(ROOT, "snippets", `${slug}.md`);
      if (fs.existsSync(candidate)) return candidate;
    }
    // else map by last path segment: e.g., /docs/basic-drawing/ -> basic-drawing/index.md
    const seg = pathPart.replace(/^\//, "").replace(/\/$/, "");
    const segParts = seg.split("/");
    // if path begins with docs, drop it
    if (segParts[0] === "docs") segParts.shift();
    if (segParts.length === 0) return path.join(ROOT, "index.md");
    // candidate 1: basic-drawing -> newDocs/basic-drawing/index.md
    const cand1 = path.join(ROOT, segParts.join("/"), "index.md");
    if (fs.existsSync(cand1)) return cand1;
    // candidate 2: last segment as snippet
    const last = segParts[segParts.length - 1];
    const cand2 = path.join(ROOT, "snippets", `${last}.md`);
    if (fs.existsSync(cand2)) return cand2;
    // candidate 3: last segment slugified
    const cand3 = path.join(ROOT, "snippets", `${slugifyAnchor(last)}.md`);
    if (fs.existsSync(cand3)) return cand3;
    return null;
  } catch (e) {
    return null;
  }
}

function inferLinksFromBody(body, fromPath) {
  const links = [];
  const mdRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m;
  while ((m = mdRegex.exec(body)) !== null) {
    const text = m[1];
    const href = m[2];
    if (!href) continue;
    // if absolute site link starting with /docs, attempt mapping
    if (href.startsWith("/docs")) {
      const mapped = mapDocsAnchorToLocal(href);
      if (mapped) links.push({ text, href, mapped });
      continue;
    }
    // relative links to local md
    if (
      href.startsWith("../") ||
      href.endsWith(".md") ||
      href.startsWith("./")
    ) {
      // resolve relative
      const resolved = path.resolve(path.dirname(fromPath), href.split("#")[0]);
      if (fs.existsSync(resolved) && resolved.endsWith(".md"))
        links.push({ text, href, mapped: resolved });
    }
  }
  return links;
}

function buildGraph() {
  const files = walk(ROOT);
  const nodes = [];
  const edges = [];

  // build nodes
  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const { fm, body } = readFrontmatterAndBody(raw);
    const id =
      fm.id ||
      "makerjs." +
        path
          .relative(ROOT, file)
          .replace(/\\/g, "/")
          .replace(/\.md$/i, "")
          .replace(/\//g, ".");
    const title = fm.title || path.basename(file, ".md");
    const summary =
      fm.summary ||
      (() => {
        // first non-empty paragraph
        const lines = body.split("\n");
        let i = 0;
        while (i < lines.length && lines[i].trim() === "") i++;
        const para = [];
        while (i < lines.length && lines[i].trim() !== "") {
          para.push(lines[i].trim());
          i++;
        }
        return (para.join(" ") || title).slice(0, 300);
      })();
    nodes.push({
      id,
      title,
      path: path.relative(process.cwd(), file),
      summary,
      tags: fm.tags || [],
    });
  }

  // create a lookup by file path -> id
  const pathToId = {};
  for (const n of nodes) pathToId[path.resolve(n.path)] = n.id;

  // infer edges by scanning bodies and mapping anchors
  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const { fm, body } = readFrontmatterAndBody(raw);
    const fromId =
      fm.id ||
      "makerjs." +
        path
          .relative(ROOT, file)
          .replace(/\\/g, "/")
          .replace(/\.md$/i, "")
          .replace(/\//g, ".");
    const links = inferLinksFromBody(body, file);
    for (const l of links) {
      const mapped = l.mapped;
      if (!mapped) continue;
      const targetPath = path.resolve(mapped);
      const targetId =
        pathToId[targetPath] ||
        "makerjs." +
          path
            .relative(ROOT, mapped)
            .replace(/\\/g, "/")
            .replace(/\.md$/i, "")
            .replace(/\//g, ".");
      const type = /example|demo|play|try/i.test(l.text)
        ? "example-of"
        : "references";
      edges.push({
        from: fromId,
        to: targetId,
        type,
        text: l.text,
        href: l.href,
      });
    }
  }

  return { nodes, edges };
}

function main() {
  if (fs.existsSync(OUT)) fs.copyFileSync(OUT, BACKUP);
  const graph = buildGraph();
  fs.writeFileSync(OUT, JSON.stringify(graph, null, 2), "utf8");
  console.log(
    "Wrote",
    OUT,
    "with",
    graph.nodes.length,
    "nodes and",
    graph.edges.length,
    "edges. Backup at",
    BACKUP
  );
}

main();
