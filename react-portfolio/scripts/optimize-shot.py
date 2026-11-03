#!/usr/bin/env python3
"""Turn a full-page screenshot into the portfolio shot size.

Other project images are 1440x900, cropped from the top of the homepage.
This writes WebP at that size, and an optional phone shot for entries that
set imageMobile.

  python3 scripts/optimize-shot.py snijadwalin \
    --desktop ~/screenshots/after-snijadwalin.png \
    --mobile ~/screenshots/after-snijadwalin-mobile.png

Then on the work entry:

  image: "/work/snijadwalin.webp",
  imageMobile: "/work/snijadwalin-mobile.webp",
"""

import argparse
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "work"
DESKTOP = (1440, 900)
# Phone shots are taller than the 16:10 desktop frame, so the headline stays intact.
MOBILE = (780, 1387)


def frame(source, size):
    image = Image.open(source).convert("RGB")
    width, height = size
    scale = width / image.width
    resized = image.resize((width, max(height, round(image.height * scale))), Image.Resampling.LANCZOS)
    return resized.crop((0, 0, width, height))


def save(image, path):
    image.save(path, format="WEBP", quality=82, method=6)
    print(f"{path.relative_to(ROOT)} {image.size[0]}x{image.size[1]} {path.stat().st_size}")


def main():
    parser = argparse.ArgumentParser(description="Optimize a project screenshot for the portfolio.")
    parser.add_argument("slug")
    parser.add_argument("--desktop", required=True, type=Path)
    parser.add_argument("--mobile", type=Path)
    args = parser.parse_args()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    save(frame(args.desktop, DESKTOP), OUT_DIR / f"{args.slug}.webp")
    if args.mobile:
        save(frame(args.mobile, MOBILE), OUT_DIR / f"{args.slug}-mobile.webp")


if __name__ == "__main__":
    main()
