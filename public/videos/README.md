# Hero background video

Currently holds a **placeholder demo clip** — a slow zoom/pan over two of the
site's own real product photos (hero-photo.webp, hero-portrait.webp), crossfaded
together with ffmpeg. It's not real footage, just a stand-in so the background-
video feature can be seen in action before real video exists. Replace both
files with genuine footage whenever it's available — same two filenames,
nothing else changes.

The homepage hero looks for `hero-loop.mp4` and `hero-loop.webm` here (both,
so the browser can use whichever it supports — see below). If both are
missing, the hero falls back to the still photo (with a slow zoom of its own)
automatically — nothing breaks, nothing needs to change in code.

## Expected filenames

| Filename | Content |
|---|---|
| `hero-loop.mp4` | H.264 — the format that plays on essentially every real browser (Chrome, Edge, Safari, Firefox, iOS, Android). |
| `hero-loop.webm` | VP9 — a fallback for the handful of Linux/Chromium builds that ship without H.264 support for licensing reasons. |

Both should be the same clip; only the codec differs. A short, silent,
seamlessly-looping clip of the plant floor or a recliner in motion — the kind
of ambient background footage a visitor watches for a few seconds without
needing sound or controls.

## Preparing the files

Background hero video should be:
- **Muted** — it autoplays, and browsers block autoplay-with-sound anyway.
- **Short and seamless** — 6–15 seconds, cut to loop cleanly (matching first/last frame helps).
- **Compressed** — aim under 4–6 MB. Example with ffmpeg:

```bash
ffmpeg -i yourclip.mov -vf "scale=1920:-2" -an -c:v libx264 \
  -crf 28 -preset slow -movflags +faststart hero-loop.mp4

ffmpeg -i yourclip.mov -vf "scale=1920:-2" -an -c:v libvpx-vp9 \
  -crf 32 -b:v 0 hero-loop.webm
```

`-an` strips any audio track (it would never play anyway, and it bloats the file).
