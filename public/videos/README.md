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

## Header logo animation

`header-logo.webm` is the client's own logo reveal clip — a genuinely
transparent VP9 WebM (a real alpha channel, not a solid-color background),
played by `HeaderLogo.tsx` in place of the static header logo. It autoplays
on load, replays itself after a 20-second pause, and replays again whenever
the logo is clicked. There's no MP4 sibling: H.264 doesn't carry alpha in
browsers, so a browser that can't play alpha WebM gets the plain static
`Logo` instead of a version with a solid background box.

**This file must never be re-encoded, cropped, or compressed with the
ffmpeg build in this environment.** It doesn't actually support VP9 alpha:
it will tag output as `alpha_mode: 1` and even name the pixel format
`yuva420p`, but decoding that same output always comes back fully opaque —
verified by round-tripping a known-transparent frame through it. The
current file was confirmed to have real working transparency by rendering
it in an actual Chromium instance (Playwright) and screenshotting it over a
solid color, since ffmpeg's own frame extraction can't be trusted to show
it correctly either. If a new cut of this animation is ever needed, get it
pre-exported as alpha WebM from whatever tool made the original (After
Effects, or similar) and drop it in as-is — do not pipe it through ffmpeg
here, and re-verify with the same browser-render test before trusting it.
