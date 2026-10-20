/**
 * Download the live cover and portrait (if needed) and write AVIF/WebP/JPEG
 * derivatives, the landscape OG card, and the favicon set.
 *
 * Source URLs are the ones captured from sovereigncall.com on Oct 18, 2026.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "assets-src");
const imageDir = path.join(root, "public", "images");
const ogDir = path.join(root, "public", "og");

const coverUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SOVEREIGN%20CALL%20ORIGINS-FMHe4tQabAcc3wYk9SGW7XwtmgCjnW.jpg";
const portraitUrl = "https://sovereigncall.com/michael-vaylin-keyes-portrait.webp";

async function download(url, dest) {
  if (existsSync(dest) && (await stat(dest)).size > 1000) {
    console.log("have", path.basename(dest));
    return;
  }
  console.log("download", url);
  execFileSync("curl", ["-fsSL", "-o", dest, url], { stdio: "inherit" });
}

await mkdir(srcDir, { recursive: true });
await mkdir(imageDir, { recursive: true });
await mkdir(ogDir, { recursive: true });

const coverPath = path.join(srcDir, "cover.jpg");
const portraitPath = path.join(srcDir, "portrait.webp");
await download(coverUrl, coverPath);
await download(portraitUrl, portraitPath);

const cover = sharp(coverPath).rotate();
const meta = await cover.metadata();
console.log("cover", meta.width, meta.height, (await stat(coverPath)).size);

async function writeCover(width) {
  const pipeline = sharp(coverPath).rotate().resize({ width, withoutEnlargement: true });
  await pipeline.clone().avif({ quality: 42, effort: 6 }).toFile(path.join(imageDir, `cover-${width}.avif`));
  await pipeline.clone().webp({ quality: 64 }).toFile(path.join(imageDir, `cover-${width}.webp`));
  if (width === 800) {
    await pipeline.clone().jpeg({ quality: 68, mozjpeg: true }).toFile(path.join(imageDir, "cover-800.jpg"));
    await pipeline
      .clone()
      .jpeg({ quality: 72, mozjpeg: true })
      .toFile(path.join(ogDir, "book.jpg"));
  }
}

await writeCover(480);
await writeCover(800);

const portraitMeta = await sharp(portraitPath).metadata();
console.log("portrait", portraitMeta.width, portraitMeta.height);
await sharp(portraitPath)
  .resize({ width: 1000, withoutEnlargement: true })
  .webp({ quality: 68 })
  .toFile(path.join(imageDir, "portrait.webp"));
await sharp(portraitPath)
  .resize({ width: 1000, withoutEnlargement: true })
  .avif({ quality: 45, effort: 6 })
  .toFile(path.join(imageDir, "portrait.avif"));

execFileSync("python3", [path.join(root, "scripts", "render-emblem.py")], {
  stdio: "inherit",
  cwd: root,
});

const files = [
  "public/images/cover-480.avif",
  "public/images/cover-480.webp",
  "public/images/cover-800.avif",
  "public/images/cover-800.webp",
  "public/images/cover-800.jpg",
  "public/images/portrait.webp",
  "public/images/portrait.avif",
  "public/og/home.jpg",
  "public/og/book.jpg",
  "public/favicon.ico",
  "public/favicon-32.png",
  "public/apple-touch-icon.png",
];
for (const rel of files) {
  const size = (await stat(path.join(root, rel))).size;
  console.log(`${String(size).padStart(8)}  ${rel}`);
}
