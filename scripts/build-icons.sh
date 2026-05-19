#!/bin/sh
# Regenerate every branded image derivative from the canonical source logo
# at src/assets/switchmessage-logo.png. Replace that file and re-run
# `npm run icons` to refresh the whole set.
#
# Outputs:
#   src/assets/switchmessage-icon.png   — bubbles-only, transparent bg (header)
#   public/favicon.png               — 32x32, transparent bg (browser tab)
#   public/apple-touch-icon.png      — 180x180, white bg (iOS home screen)
#   public/og-image.png              — 1200x630 social card
#
# Requires ImageMagick 7 (`magick`).

set -eu

cd "$(dirname "$0")/.."

SRC="src/assets/switchmessage-logo.png"
if [ ! -f "$SRC" ]; then
  echo "Error: $SRC not found. Put the source PNG there first." >&2
  exit 1
fi

# System TrueType files. ImageMagick on macOS doesn't auto-resolve font names
# unless a fontconfig setup is present, so we point at the .ttf files
# directly. Adjust paths if you move this script to Linux.
FONT_REG="/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD="/System/Library/Fonts/Supplemental/Arial Bold.ttf"
for f in "$FONT_REG" "$FONT_BOLD"; do
  if [ ! -f "$f" ]; then
    echo "Error: font not found at $f" >&2
    exit 1
  fi
done

echo "→ src/assets/switchmessage-icon.png (transparent, trimmed)"
# Crop wordmark off the top, knock out the white background, trim to tight
# bounding box, then add a small transparent border for breathing room.
magick "$SRC" \
  -crop 500x400+0+0 +repage \
  -fuzz 5% -transparent white \
  -trim +repage \
  -bordercolor none -border 20 \
  -strip \
  src/assets/switchmessage-icon.png

echo "→ public/favicon.png (32x32, transparent)"
magick src/assets/switchmessage-icon.png \
  -resize 32x32 -strip \
  public/favicon.png

echo "→ public/apple-touch-icon.png (180x180, white bg)"
# Older iOS rendered transparent areas as black; flattening over white avoids
# that and matches the rounded-square aesthetic iOS applies on top.
magick src/assets/switchmessage-icon.png \
  -background white -alpha remove -alpha off \
  -resize 180x180 -strip \
  public/apple-touch-icon.png

echo "→ public/og-image.png (1200x630 social card)"
# Full logo (with wordmark) centred near the top; tagline and domain stacked
# below in muted gray and HubSpot orange.
magick -size 1200x630 xc:white \
  \( "$SRC" -resize x440 \) -gravity north -geometry +0+50 -composite \
  -font "$FONT_REG"  -pointsize 32 -fill '#475569' \
  -gravity south -annotate +0+100 'Sync iMessages straight into HubSpot CRM' \
  -font "$FONT_BOLD" -pointsize 24 -fill '#ff7a59' \
  -gravity south -annotate +0+50  'docs.switchmessage.com' \
  -strip \
  public/og-image.png

echo
echo "Done. Sizes:"
ls -lh src/assets/switchmessage-icon.png \
       public/favicon.png \
       public/apple-touch-icon.png \
       public/og-image.png
