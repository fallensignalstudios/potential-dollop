"""Trace the official emblem and write the SVG, favicons, and home share image.

The source PNG at public/press/emblem.png is never modified.
"""

from __future__ import annotations

import statistics
import subprocess
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "press" / "emblem.png"
PRESS_SVG = ROOT / "public" / "press" / "emblem.svg"
FAVICON_SVG = ROOT / "public" / "favicon.svg"
FONT_DIR = Path("/tmp/sc-fonts")
FONT_DIR.mkdir(exist_ok=True)

# Site background and the title gold already used for "Origins".
INK = (16, 17, 19, 255)
TITLE = (238, 232, 220, 255)
TITLE_GOLD = (198, 166, 107, 255)
MUTED = (170, 166, 159, 255)


def static_font(src: Path, weight: float, dest: Path) -> None:
    if dest.exists():
        return
    font = TTFont(src)
    inst = instantiateVariableFont(font, {"wght": weight}, inplace=False)
    inst.save(dest)


def sampled_gold(image: Image.Image) -> tuple[int, int, int]:
    px = image.load()
    w, h = image.size
    samples = []
    for y in range(0, h, 3):
        for x in range(0, w, 3):
            r, g, b = px[x, y][:3]
            if r > 160 and r > b + 40:
                samples.append((r, g, b))
    if not samples:
        raise SystemExit("no gold pixels found in the emblem")
    return tuple(int(statistics.median(c[i] for c in samples)) for i in range(3))


def content_mask(image: Image.Image) -> Image.Image:
    """1-bit mask, white where the emblem is. Threshold sits between charcoal and gold."""
    rgb = image.convert("RGB")
    px = rgb.load()
    w, h = rgb.size
    mask = Image.new("1", (w, h), 0)
    mp = mask.load()
    minx, miny, maxx, maxy = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            if px[x, y][0] > 100:
                mp[x, y] = 1
                minx, miny = min(minx, x), min(miny, y)
                maxx, maxy = max(maxx, x), max(maxy, y)
    pad = 8
    box = (max(0, minx - pad), max(0, miny - pad), min(w, maxx + pad + 1), min(h, maxy + pad + 1))
    return mask.crop(box)


def trace(mask: Image.Image, gold: tuple[int, int, int]) -> tuple[str, str, int, int]:
    work = Path("/tmp/emblem-build")
    work.mkdir(exist_ok=True)
    # Potrace traces black pixels. Invert so the emblem, not the field, is traced.
    inv = mask.convert("L").point(lambda p: 0 if p > 127 else 255).convert("1")
    pbm = work / "mask.pbm"
    inv.save(pbm)
    svg_path = work / "trace.svg"
    subprocess.check_call(
        [
            "potrace",
            str(pbm),
            "-s",
            "-o",
            str(svg_path),
            "--flat",
            "-t",
            "0",
            "-a",
            "1.2",
            "-O",
            "0.05",
        ]
    )
    raw = svg_path.read_text()
    fill = "#%02x%02x%02x" % gold
    raw = raw.replace('fill="#000000"', f'fill="{fill}"')
    start = raw.index("<g ")
    end = raw.index("</svg>")
    group = raw[start:end].strip()
    width = mask.width
    height = mask.height
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'width="{width}" height="{height}">\n'
        f"{group}\n"
        "</svg>\n"
    ), group, width, height


def favicon_svg(group: str, width: int, height: int) -> str:
    side = height
    x = (side - width) / 2
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {side} {side}">\n'
        f'<rect width="{side}" height="{side}" fill="#101113"/>\n'
        f'<svg x="{x:.2f}" y="0" width="{width}" height="{height}" viewBox="0 0 {width} {height}">\n'
        f"{group}\n"
        "</svg>\n"
        "</svg>\n"
    )


def render_svg(svg: Path, width: int, height: int, dest: Path) -> None:
    script = f"""
import sharp from "sharp";
import {{ readFileSync }} from "fs";
const svg = readFileSync({str(svg)!r});
await sharp(svg).resize({width}, {height}, {{ fit: "fill" }}).png().toFile({str(dest)!r});
"""
    subprocess.check_call(["node", "--input-type=module", "-e", script], cwd=ROOT)


def square_icon(emblem: Image.Image, size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), INK)
    pad = max(1, round(size * 0.08))
    avail = size - pad * 2
    scale = min(avail / emblem.width, avail / emblem.height)
    tw, th = max(1, round(emblem.width * scale)), max(1, round(emblem.height * scale))
    resized = emblem.resize((tw, th), Image.Resampling.LANCZOS)
    canvas.alpha_composite(resized, ((size - tw) // 2, (size - th) // 2))
    return canvas


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"missing source {SOURCE}")
    before = SOURCE.read_bytes()
    image = Image.open(SOURCE).convert("RGB")
    gold = sampled_gold(image)
    mask = content_mask(image)
    svg, group, width, height = trace(mask, gold)
    PRESS_SVG.write_text(svg)
    FAVICON_SVG.write_text(favicon_svg(group, width, height))

    raster = Path("/tmp/emblem-build/emblem.png")
    render_svg(PRESS_SVG, width, height, raster)
    emblem = Image.open(raster).convert("RGBA")

    icons = {
        512: ROOT / "public" / "favicon-512.png",
        192: ROOT / "public" / "favicon-192.png",
        180: ROOT / "public" / "apple-touch-icon.png",
        32: ROOT / "public" / "favicon-32.png",
        16: ROOT / "public" / "favicon-16.png",
    }
    master = square_icon(emblem, 512)
    for size, dest in icons.items():
        icon = master if size == 512 else master.resize((size, size), Image.Resampling.LANCZOS)
        icon.convert("RGB").save(dest, format="PNG", optimize=True)
    master.convert("RGB").save(
        ROOT / "public" / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    static_font(ROOT / "public/fonts/cormorant-garamond-latin.woff2", 500, FONT_DIR / "cormorant-500.ttf")
    static_font(ROOT / "public/fonts/geist-latin.woff2", 500, FONT_DIR / "geist-500.ttf")
    og_card(emblem, ImageFont.truetype(str(FONT_DIR / "cormorant-500.ttf"), 84), ImageFont.truetype(str(FONT_DIR / "geist-500.ttf"), 22))

    if SOURCE.read_bytes() != before:
        raise SystemExit("source PNG was modified")
    print("gold", "#%02x%02x%02x" % gold)
    print("svg", PRESS_SVG.stat().st_size)
    print("og", (ROOT / "public/og/home.jpg").stat().st_size)


def og_card(emblem: Image.Image, title_font: ImageFont.FreeTypeFont, kicker_font: ImageFont.FreeTypeFont) -> None:
    width, height = 1200, 630
    canvas = Image.new("RGB", (width, height), INK[:3])
    target_h = 500
    target_w = round(target_h * emblem.width / emblem.height)
    mark = emblem.resize((target_w, target_h), Image.Resampling.LANCZOS)
    canvas.paste(mark, (72, (height - target_h) // 2), mark)
    draw = ImageDraw.Draw(canvas)
    x = 72 + target_w + 64
    draw.text((x, 168), "Sovereign Call:", font=title_font, fill=TITLE[:3])
    draw.text((x, 268), "Origins", font=title_font, fill=TITLE_GOLD[:3])
    draw.text((x, 400), "In development · PC (Steam) · Coming soon", font=kicker_font, fill=MUTED[:3])
    out = ROOT / "public" / "og" / "home.jpg"
    canvas.save(out, format="JPEG", quality=76, optimize=True)


if __name__ == "__main__":
    main()
