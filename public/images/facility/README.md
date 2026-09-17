# Facility photographs

This folder is **intentionally empty except for this file**.

The site's facility gallery looks for the filenames below. Any that are missing
are skipped silently at runtime — the gallery simply shows fewer cards, and
nothing appears broken. Drop the files in and they appear on the next build.

## Expected filenames

| Filename | Photograph |
|---|---|
| `production-hall.webp` | The sewing and production hall — rows of machines under the yellow pillars, blue epoxy floor |
| `showroom-recliners.webp` | Showroom floor, single recliners across the wood flooring |
| `showroom-wide.webp` | Showroom wide view — sofas and recliners against the wood panelling |
| `showroom-panorama.webp` | Panoramic row of recliners across the showroom |
| `proud-moments.webp` | The "Proud Moments" corridor — the framed achievements and awards wall |

`.jpg` and `.png` also work; edit `src/data/facility.ts` if you change an
extension.

## Preparing the files

Roughly 1600 px on the long edge is plenty. To convert and resize in one step:

```bash
npx sharp-cli --input yourphoto.jpg --output production-hall.webp \
  resize 1600 --withoutEnlargement -- webp --quality 82
```

Or drop the originals into `scripts/_source/facility/` and run `npm run images`,
which handles sizing and conversion for you.
