#!/usr/bin/env node
// Scans newDocs/, updates frontmatter (id/title/summary) where missing,
// infers edges from markdown links, and writes newDocs/doc-graph.json

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "newDocs");
const OUT = path.join(ROOT, "doc-graph.json");

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

function parseFrontmatter(content) {
  if (!content.startsWith("---")) return { fm: null, body: content };
  const parts = content.split("\n");
  // find second '---'
  let end = -1;
  for (let i = 1; i < parts.length; i++) {
    if (parts[i].trim() === "---") {
      end = i;
      break;
    }
  }
  if (end === -1) return { fm: null, body: content };
  const fmLines = parts.slice(1, end);
  const fm = {};
  for (const line of fmLines) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (m) {
      const key = m[1];
      let val = m[2];
      // handle simple arrays like [a, b]
      if (val.startsWith("[") && val.endsWith("]")) {
        try {
          fm[key] = JSON.parse(val.replace(/'/g, '"'));
        } catch (e) {
          fm[key] = val;
        }
      } else {
        // strip surrounding quotes
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        fm[key] = val;
      }
    }
  }
  const body = parts.slice(end + 1).join("\n");
  return { fm, body };
}

function buildFrontmatter(fm) {
  const lines = ["---"];
  for (const key of Object.keys(fm)) {
    const val = fm[key];
    if (Array.isArray(val)) lines.push(`${key}: ${JSON.stringify(val)}`);
    else if (typeof val === "string") {
      // escape newlines
      const safe = val.indexOf("\n") === -1 ? val : val.replace(/\n/g, " ");
      lines.push(`${key}: "${safe.replace(/"/g, '\\"')}"`);
    } else lines.push(`${key}: ${String(val)}`);
  }
  lines.push("---\n");
  return lines.join("\n");
}

function summarize(body) {
  // find first paragraph (non-empty line block after trimming headings)
  const lines = body.split("\n");
  let i = 0;
  // skip leading blank lines and headings
  while (i < lines.length) {
    const t = lines[i].trim();
    if (t === "" || t.startsWith("#")) {
      i++;
      continue;
    }
    break;
  }
  const out = [];
  while (i < lines.length) {
    const t = lines[i].trim();
    if (t === "") break;
    out.push(t);
    i++;
  }
  const text = out.join(" ");
  if (!text) return "";
  return text.length > 240 ? text.slice(0, 237) + "..." : text;
}

function slugFromPath(p) {
  const rel = path.relative(ROOT, p).replace(/\\/g, "/");
  const noext = rel.replace(/\.md$/i, "");
  return "makerjs." + noext.replace(/\//g, ".");
}

function inferLinks(body, fromPath) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let m;
  while ((m = regex.exec(body)) !== null) {
    const text = m[1];
    const href = m[2];
    // consider only local markdown links or relative paths
    if (href.startsWith("http") || href.startsWith("#")) continue;
    // normalize relative
    const resolved = path.resolve(path.dirname(fromPath), href.split("#")[0]);
    if (fs.existsSync(resolved) && resolved.endsWith(".md")) {
      links.push({ text, href: resolved });
    } else {
      // some links point to docs anchors like /docs/basic-drawing/#Paths - ignore
    }
  }
  return links;
}

function main() {
  const files = walk(ROOT);
  const nodes = [];
  const edges = [];

  // first pass: read and update frontmatter if needed
  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const { fm, body } = parseFrontmatter(raw);
    const meta = fm || {};
    // title
    if (!meta.title) {
      // try to find first H1 or H2
      const m = body.match(/^#{1,2}\s*(.+)/m);
      if (m) meta.title = m[1].trim();
      else meta.title = path.basename(file, ".md");
    }
    // id
    if (!meta.id) meta.id = slugFromPath(file);
    // summary
    if (!meta.summary) {
      const s = summarize(body);
      meta.summary = s || meta.title;
    }
    if (!meta.tags) meta.tags = [];

    // rebuild file with new frontmatter
    const newFm = buildFrontmatter(meta);
    const newContent = newFm + body.trimStart();
    fs.writeFileSync(file, newContent, "utf8");

    nodes.push({
      id: meta.id,
      title: meta.title,
      path: path.relative(process.cwd(), file),
      summary: meta.summary,
      tags: meta.tags,
    });
  }

  // second pass: infer edges from links
  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const { fm, body } = parseFrontmatter(raw);
    const meta = fm || {};
    const links = inferLinks(body, file);
    for (const l of links) {
      const targetId = slugFromPath(l.href);
      // heuristic: if link text contains 'example' or 'demo' or 'play', mark example-of
      const text = (l.text || "").toLowerCase();
      const type = /example|demo|play|try/.test(text)
        ? "example-of"
        : "references";
      edges.push({ from: meta.id, to: targetId, type, text: l.text });
    }
  }

  const out = { nodes, edges };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2), "utf8");
  console.log(
    "Wrote",
    OUT,
    "with",
    nodes.length,
    "nodes and",
    edges.length,
    "edges"
  );
}

main();
