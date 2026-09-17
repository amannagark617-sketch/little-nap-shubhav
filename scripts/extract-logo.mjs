/**
 * The logo only exists baked onto the navy cover artwork of the corporate deck.
 *
 * Rather than key the whole lockup (the small "SUBHAV INDIA PVT. LTD." line is
 * dark-on-dark and does not survive it), we lift out just the mark — the black
 * rounded plate carrying the gold chair — which separates cleanly from the navy
 * backdrop. The wordmark beside it is set as live text in Logo.tsx, so it stays
 * crisp at any size and is readable by search engines and screen readers.
 *
 * Output: public/images/brand/mark.png (transparent corners, any background).
 */
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(root, '_source', 'logo.png')
const OUT = path.join(root, '..', 'public', 'images', 'brand', 'mark.png')

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info

const at = (x, y) => {
  const i = (y * width + x) * channels
  return [data[i], data[i + 1], data[i + 2]]
}
/** The plate is near-black; the navy backdrop never gets this dark. */
const isPlate = (r, g, b) => r < 30 && g < 30 && b < 46 && b - r < 22
/** Gold chair pixels, so the bounding box can never clip the mark. */
const isGold = (r, g, b) => r > 110 && r > b + 45 && g > b + 15

// --- find the plate by density ----------------------------------------------
// The wordmark and the "SUBHAV INDIA PVT. LTD." line also contain dark pixels,
// so a plain bounding box over dark pixels would swallow them. The plate is the
// only *solid* region, so we keep rows and columns that are mostly plate.
const searchW = Math.floor(width * 0.45)

const colCount = new Array(searchW).fill(0)
const rowCount = new Array(height).fill(0)
for (let y = 0; y < height; y++) {
  for (let x = 0; x < searchW; x++) {
    const [r, g, b] = at(x, y)
    if (isPlate(r, g, b) || isGold(r, g, b)) {
      colCount[x]++
      rowCount[y]++
    }
  }
}

/** Longest run of indices whose count clears `ratio` of that axis's maximum. */
function solidSpan(counts, ratio) {
  const threshold = Math.max(...counts) * ratio
  let best = [0, -1]
  let start = -1
  for (let i = 0; i <= counts.length; i++) {
    const on = i < counts.length && counts[i] >= threshold
    if (on && start === -1) start = i
    if (!on && start !== -1) {
      if (i - 1 - start > best[1] - best[0]) best = [start, i - 1]
      start = -1
    }
  }
  return best
}

const [cx0, cx1] = solidSpan(colCount, 0.55)
const [ry0, ry1] = solidSpan(rowCount, 0.55)

const pad = 3
const x0 = Math.max(0, cx0 - pad)
const y0 = Math.max(0, ry0 - pad)
const x1 = Math.min(width - 1, cx1 + pad)
const y1 = Math.min(height - 1, ry1 + pad)
const w = x1 - x0 + 1
const h = y1 - y0 + 1

// --- crop, then clear the navy that shows around the plate's rounded corners --
const crop = await sharp(data, { raw: { width, height, channels } })
  .extract({ left: x0, top: y0, width: w, height: h })
  .raw()
  .toBuffer()

// Backdrop can only survive in the plate's four rounded corners, so restrict
// clearing to that band. Without this, JPEG noise inside the black plate gets
// punched out as speckles.
const band = Math.round(Math.min(w, h) * 0.2)
let cleared = 0
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const nearCorner = (x < band || x >= w - band) && (y < band || y >= h - band)
    if (!nearCorner) continue
    const i = (y * w + x) * channels
    const r = crop[i]
    const g = crop[i + 1]
    const b = crop[i + 2]
    if (isPlate(r, g, b) || isGold(r, g, b)) continue
    if (b > r + 10 && b > g + 4) {
      // Navy backdrop or its anti-aliased rim against the plate.
      const t = Math.min(1, (b - Math.max(r, g)) / 18)
      crop[i + 3] = Math.round(255 * (1 - t))
      if (t >= 1) cleared++
    }
  }
}

await sharp(crop, { raw: { width: w, height: h, channels } })
  .png({ compressionLevel: 9 })
  .toFile(OUT)

console.log(`mark.png ${w}x${h} — ${cleared} backdrop pixels cleared`)
