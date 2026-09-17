"""Visuels pour le carrousel « Website Design » (Canva) : mockup laptop +
mobile, pages entières, tranches de défilement, collages d'écrans.

Usage : python scripts/presse.py   →  public/presse/*.png|jpg
Source : shots/full-site.png, shots/full-site-mobile.png, shots/fold-*.png
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

OUT = Path("public/presse")
OUT.mkdir(parents=True, exist_ok=True)
BROWN = (58, 44, 36)
NIGHT = (28, 26, 25)

desk = Image.open("shots/full-site.png").convert("RGB")
mob = Image.open("shots/full-site-mobile.png").convert("RGB")
fold = Image.open("shots/fold-site.png").convert("RGB")
fold_m = Image.open("shots/fold-site-mobile.png").convert("RGB")


def rounded(im: Image.Image, radius: int) -> Image.Image:
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, im.width - 1, im.height - 1), radius, fill=255)
    out = im.convert("RGBA")
    out.putalpha(mask)
    return out


def shadow(canvas: Image.Image, box: tuple[int, int, int, int], radius: int, blur: int = 40, alpha: int = 110) -> None:
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).rounded_rectangle(box, radius, fill=(0, 0, 0, alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    canvas.alpha_composite(layer)


# ---- 1. Pages entières (JPEG, poids raisonnable) ----
desk.save(OUT / "site-desktop.jpg", quality=82, optimize=True)
mob.save(OUT / "site-mobile.jpg", quality=82, optimize=True)
fold.save(OUT / "hero-desktop.jpg", quality=86)
fold_m.save(OUT / "hero-mobile.jpg", quality=86)

# ---- 2. Mockup laptop + mobile (transparent) ----
W, H = 2160, 2000
canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
# laptop : écran 1600 × 1000 + bordure + base
sw, sh = 1560, 975
sx, sy = 120, 300
bezel = 22
shadow(canvas, (sx - bezel, sy - bezel + 30, sx + sw + bezel, sy + sh + bezel + 40), 36, blur=70, alpha=55)
frame = Image.new("RGBA", (sw + 2 * bezel, sh + 2 * bezel), NIGHT + (255,))
frame = rounded(frame, 30)
canvas.alpha_composite(frame, (sx - bezel, sy - bezel))
screen = fold.resize((sw, sh), Image.Resampling.LANCZOS)
canvas.alpha_composite(rounded(screen, 8), (sx, sy))
base = Image.new("RGBA", (sw + 2 * bezel + 160, 34), (40, 37, 35, 255))
base = rounded(base, 17)
canvas.alpha_composite(base, (sx - bezel - 80, sy + sh + bezel))
notch = Image.new("RGBA", (220, 10), (70, 66, 62, 255))
canvas.alpha_composite(rounded(notch, 5), (sx + sw // 2 - 110, sy + sh + bezel + 2))
# mobile : 480 × 1040, chevauche le laptop en bas à droite
pw, ph = 470, 1020
px, py = W - pw - 90, H - ph - 60
pb = 16
shadow(canvas, (px - pb, py - pb + 24, px + pw + pb, py + ph + pb), 70, blur=60, alpha=60)
pframe = rounded(Image.new("RGBA", (pw + 2 * pb, ph + 2 * pb), NIGHT + (255,)), 74)
canvas.alpha_composite(pframe, (px - pb, py - pb))
# écran mobile : recadré en haut (header + hero)
ms = fold_m.crop((0, 0, 390, int(390 * ph / pw))).resize((pw, ph), Image.Resampling.LANCZOS)
canvas.alpha_composite(rounded(ms, 58), (px, py))
island = rounded(Image.new("RGBA", (150, 34), NIGHT + (255,)), 17)
canvas.alpha_composite(island, (px + pw // 2 - 75, py + 22))
canvas.save(OUT / "mockup-laptop-mobile.png", optimize=True)

# ---- 3. Tranches de défilement desktop (4 × ~2456 px) ----
n = 4
step = desk.height // n
for i in range(n):
    top = i * step
    bottom = desk.height if i == n - 1 else (i + 1) * step
    desk.crop((0, top, desk.width, bottom)).save(OUT / f"scroll-{i + 1}.jpg", quality=82, optimize=True)

# ---- 4. Collages d'écrans (2 × 1080 × 1350, transparents) ----
# Découpes de sections (y en px sur la page desktop 1440)
def find_rows(im: Image.Image, x: int, rgb: tuple[int, int, int], y0: int, y1: int, tol: int = 8):
    p = im.load()
    rows = [y for y in range(y0, y1, 4) if all(abs(p[x, y][k] - rgb[k]) < tol for k in range(3))]
    return (rows[0], rows[-1]) if rows else None


def crop_section(y0: int, y1: int, w: int = 1440) -> Image.Image:
    return desk.crop((0, y0, w, y1))


sections = {
    "hero": crop_section(0, 900),
    "about": crop_section(900, 1560),
    "categories": crop_section(1560, 2350),
    "whyus": crop_section(2350, 3000),
    "chocolats": crop_section(3000, 3980),
    "coffrets": crop_section(3980, 4780),
    "gourmandises": crop_section(4780, 5560),
    "temoignages": crop_section(5560, 6380),
    "journal": crop_section(6380, 7150),
    "contact": crop_section(7150, 8000),
    "cta": crop_section(8330, 8700),
    "footer": crop_section(8700, desk.height),
}
for name, im in sections.items():
    im.save(OUT / f"section-{name}.jpg", quality=84, optimize=True)


def card(im: Image.Image, width: int, angle: float = -12.0) -> Image.Image:
    ratio = width / im.width
    small = im.resize((width, int(im.height * ratio)), Image.Resampling.LANCZOS)
    small = rounded(small, 14)
    # ombre
    pad = 60
    layer = Image.new("RGBA", (small.width + 2 * pad, small.height + 2 * pad), (0, 0, 0, 0))
    sh_ = Image.new("RGBA", small.size, (0, 0, 0, 55))
    layer.alpha_composite(rounded(sh_, 14), (pad + 6, pad + 20))
    layer = layer.filter(ImageFilter.GaussianBlur(30))
    layer.alpha_composite(small, (pad, pad))
    return layer.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)


def collage(items: list[tuple[str, int, int, int]], name: str) -> None:
    cv = Image.new("RGBA", (1080, 1350), (0, 0, 0, 0))
    for key, width, x, y in items:
        c = card(sections[key], width)
        cv.alpha_composite(c, (x, y))
    cv.save(OUT / f"collage-{name}.png", optimize=True)


collage(
    [
        ("chocolats", 620, -140, -80),
        ("temoignages", 560, 560, 120),
        ("categories", 640, 180, 520),
        ("hero", 620, -120, 900),
        ("cta", 520, 640, 980),
    ],
    "1",
)
collage(
    [
        ("coffrets", 640, -160, -60),
        ("about", 540, 560, 60),
        ("contact", 620, 120, 480),
        ("gourmandises", 600, -140, 900),
        ("footer", 540, 620, 940),
    ],
    "2",
)
print("ok", sorted(p.name for p in OUT.iterdir()))
