/**
 * Resolve internal links in the built HTML. Exits 1 on a broken link.
 * External http(s) links are listed, not fetched.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function pageUrl(file) {
  const rel = path.relative(dist, file).replaceAll(path.sep, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}`;
  if (rel.endsWith(".html")) return `/${rel.slice(0, -".html".length)}`;
  return `/${rel}`;
}

function fileFor(urlPath) {
  if (urlPath === "/") return [path.join(dist, "index.html")];
  const clean = urlPath.replace(/^\//, "");
  return [
    path.join(dist, `${clean}.html`),
    path.join(dist, clean, "index.html"),
    path.join(dist, clean),
  ];
}

const files = await walk(dist);
const idsByPage = new Map();
const pages = new Set();

for (const file of files) {
  const html = await readFile(file, "utf8");
  const url = pageUrl(file);
  pages.add(url);
  const ids = new Set();
  for (const match of html.matchAll(/\sid="([^"]+)"/g)) ids.add(match[1]);
  idsByPage.set(url, ids);
}

const errors = [];
const externals = new Set();
const checked = new Set();

function extract(html) {
  const refs = [];
  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) refs.push(match[1]);
  for (const match of html.matchAll(/\ssrcset="([^"]+)"/g)) {
    for (const part of match[1].split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url) refs.push(url);
    }
  }
  return refs;
}

for (const file of files) {
  const html = await readFile(file, "utf8");
  const from = pageUrl(file);
  for (const ref of extract(html)) {
    if (ref.startsWith("mailto:") || ref.startsWith("data:")) continue;
    if (ref.startsWith("http://") || ref.startsWith("https://")) {
      externals.add(ref.split("?")[0]);
      continue;
    }
    if (ref.startsWith("mailto:")) continue;
    const [pathPart, hash] = ref.split("#");
    const target = pathPart === "" ? from : pathPart.startsWith("/") ? pathPart : path.posix.normalize(path.posix.join(from, pathPart));
    const key = `${from} -> ${ref}`;
    if (checked.has(key)) continue;
    checked.add(key);
    const candidates = fileFor(target === "" ? "/" : target);
    let found = null;
    for (const candidate of candidates) {
      try {
        const info = await stat(candidate);
        if (info.isFile()) {
          found = candidate;
          break;
        }
      } catch {
        /* try next */
      }
    }
    if (!found) {
      errors.push(`${key} (missing file)`);
      continue;
    }
    if (hash) {
      const page = pageUrl(found);
      const ids = idsByPage.get(page);
      if (!ids || !ids.has(hash)) errors.push(`${key} (missing #${hash} on ${page})`);
    }
  }
}

const required = ["/", "/book", "/press", "/privacy", "/thanks", "/404"];
for (const page of required) {
  if (!pages.has(page)) errors.push(`missing page ${page}`);
}

console.log(`pages ${pages.size}: ${[...pages].sort().join(", ")}`);
console.log(`internal refs checked: ${checked.size}`);
console.log("external origins:");
for (const url of [...externals].sort()) console.log("  " + url);
if (errors.length) {
  console.error("\nBroken links:");
  for (const error of errors) console.error("  " + error);
  process.exit(1);
}
console.log("internal links ok");
