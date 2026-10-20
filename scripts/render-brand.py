"""Landscape OG card, favicon set, and placeholder monogram PNGs."""

from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets-src" / "cover.jpg"
FONT_DIR = Path("/tmp/sc-fonts")
FONT_DIR.mkdir(exist_ok=True)


def static_font(src: Path, weight: float, dest: Path) -> None:
    if dest.exists():
        return
    font = TTFont(src)
    inst = instantiateVariableFont(font, {"wght": weight}, inplace=False)
    inst.save(dest)


static_font(ROOT / "public/fonts/cormorant-garamond-latin.woff2", 500, FONT_DIR / "cormorant-500.ttf")
static_font(ROOT / "public/fonts/cormorant-garamond-latin.woff2", 600, FONT_DIR / "cormorant-600.ttf")
static_font(ROOT / "public/fonts/geist-latin.woff2", 500, FONT_DIR / "geist-500.ttf")

SERIF = str(FONT_DIR / "cormorant-500.ttf")
SERIF_SEMI = str(FONT_DIR / "cormorant-600.ttf")
SANS = str(FONT_DIR / "geist-500.ttf")

GOLD = (198, 166, 107, 255)
INK = (16, 17, 19, 255)
PAPER = (238, 232, 220, 255)
MUTED = (170, 166, 159, 255)


def draw_mark(size: int, color, background=None) -> Image.Image:
    mode = "RGBA"
    img = Image.new(mode, (size, size), background if background else (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    inset = max(2, round(size * 0.08))
    stroke = max(2, round(size * 0.035))
    draw.rectangle([inset, inset, size - inset - 1, size - inset - 1], outline=color, width=stroke)
    font = ImageFont.truetype(SERIF_SEMI, int(size * 0.62))
    letter = "S"
    box = draw.textbbox((0, 0), letter, font=font)
    x = (size - (box[2] - box[0])) / 2 - box[0]
    y = (size - (box[3] - box[1])) / 2 - box[1] - size * 0.02
    draw.text((x, y), letter, font=font, fill=color)
    return img


def og_card() -> None:
    width, height = 1200, 630
    canvas = Image.new("RGB", (width, height), INK[:3])
    cover = Image.open(SRC).convert("RGB")
    cover_h = height - 48
    cover_w = round(cover_h * cover.width / cover.height)
    cover = cover.resize((cover_w, cover_h), Image.Resampling.LANCZOS)
    canvas.paste(cover, (width - cover_w - 28, 24))

    draw = ImageDraw.Draw(canvas)
    kicker = ImageFont.truetype(SANS, 22)
    title = ImageFont.truetype(SERIF, 78)
    sub = ImageFont.truetype(SERIF, 32)
    draw.text((64, 150), "IN DEVELOPMENT  ·  PC", font=kicker, fill=GOLD[:3])
    draw.text((64, 210), "Sovereign Call:", font=title, fill=PAPER[:3])
    draw.text((64, 300), "Origins", font=title, fill=GOLD[:3])
    lines = [
        "Two soldiers. Two competing visions",
        "of order. One galaxy approaching",
        "collapse.",
    ]
    y = 420
    for line in lines:
        draw.text((64, y), line, font=sub, fill=MUTED[:3])
        y += 42
    out = ROOT / "public" / "og" / "home.jpg"
    canvas.save(out, format="JPEG", quality=76, optimize=True)
    print("og", canvas.size, out.stat().st_size)


def favicons() -> None:
    base = draw_mark(512, GOLD, INK)
    base.resize((180, 180), Image.Resampling.LANCZOS).save(ROOT / "public" / "apple-touch-icon.png")
    base.resize((32, 32), Image.Resampling.LANCZOS).save(ROOT / "public" / "favicon-32.png")
    base.resize((16, 16), Image.Resampling.LANCZOS).save(ROOT / "public" / "favicon-16.png")
    base.save(
        ROOT / "public" / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    draw_mark(512, GOLD, None).save(ROOT / "public" / "images" / "logo-mark-dark.png")
    draw_mark(512, INK, None).save(ROOT / "public" / "images" / "logo-mark-light.png")


if __name__ == "__main__":
    og_card()
    favicons()
