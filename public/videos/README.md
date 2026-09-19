# Hero background video

This folder is **intentionally empty except for this file**.

The homepage hero looks for `hero-loop.mp4` here. If it's missing, the hero
falls back to the still photo (with a slow zoom) automatically — nothing
breaks, nothing needs to change in code. Drop the file in and it plays on
the next build.

## Expected filename

| Filename | Content |
|---|---|
| `hero-loop.mp4` | A short, silent, seamlessly-looping clip of the plant floor or a recliner in motion — the kind of ambient background footage a visitor watches for a few seconds without needing sound or controls. |

## Preparing the file

Background hero video should be:
- **Muted** — it autoplays, and browsers block autoplay-with-sound anyway.
- **Short and seamless** — 6–15 seconds, cut to loop cleanly (matching first/last frame helps).
- **Compressed** — aim under 4–6 MB. Example with ffmpeg:

```bash
ffmpeg -i yourclip.mov -vf "scale=1920:-2" -an -c:v libx264 \
  -crf 28 -preset slow -movflags +faststart hero-loop.mp4
```

`-an` strips any audio track (it would never play anyway, and it bloats the file).
