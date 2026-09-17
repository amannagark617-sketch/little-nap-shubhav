# Asset pipeline

The site's photography was extracted from the corporate deck
(`Little_Nap_Subhav_4.pdf`), which was the only source available.

## What is committed

`public/images/**` — the optimised WebP files the site actually serves (~1.2 MB
in total). **These are the source of truth.** Nothing at runtime depends on the
scripts in this folder.

`scripts/_source/` is git-ignored: it holds ~27 MB of intermediate PNG renders
and is only needed if you re-run the pipeline.

## The scripts

- `build-images.mjs` (`npm run images`) — resizes and converts everything in
  `scripts/_source` into sized WebP under `public/images`.
- `extract-logo.mjs` — lifts the chair mark off the navy cover artwork by
  clearing the backdrop around its rounded corners, producing
  `public/images/brand/mark.png`.

## Replacing the photography

The deck images are roughly 300–700 px on their longest edge — fine at the sizes
the site uses them, but they will not survive being blown up. When studio
photography becomes available:

1. Drop the new files into `public/images/products/` using the **same
   filenames** (`crown.webp`, `milan.webp`, …). Nothing else needs to change.
2. If a new photo has a noticeably different aspect ratio, update
   `imageAspect` for that range in `src/data/products.ts`. Single seats are
   currently `4 / 5`, motion sofas `4 / 3`, sofa beds `16 / 10`.

Suggested capture sizes: products 1440 px on the long edge, factory photos
1800 px wide, hero 2400 × 1600.

## The logo

Only a raster lockup existed, baked onto the deck's navy cover. The site
therefore pairs the extracted chair mark with the wordmark set as live text
(`src/components/Logo.tsx`), which stays sharp at any size and is readable by
search engines.

If an official vector logo exists, replacing `public/images/brand/mark.png` with
an SVG and adjusting `Logo.tsx` is a ten-minute job.
