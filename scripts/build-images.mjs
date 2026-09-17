/**
 * One-off asset pipeline: converts the artwork extracted from the corporate
 * deck into sized WebP files served from /public/images.
 *
 * Run with `npm run images`. Source PNGs live in scripts/_source and are not
 * needed at runtime — only the generated WebP files are deployed.
 */
import sharp from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(root, '_source')
const OUT = path.join(root, '..', 'public', 'images')

/** Product shots are square-ish studio crops used in cards and the detail modal. */
const PRODUCT_WIDTH = 720
/** Factory photos sit in a 3-up gallery grid. */
const FACTORY_WIDTH = 900

async function convert(srcFile, outFile, width, opts = {}) {
  const pipeline = sharp(srcFile).resize({
    width,
    withoutEnlargement: true,
    fit: 'inside',
  })
  await pipeline.webp({ quality: opts.quality ?? 82, effort: 6 }).toFile(outFile)
}

async function run() {
  await mkdir(path.join(OUT, 'products'), { recursive: true })
  await mkdir(path.join(OUT, 'factory'), { recursive: true })
  await mkdir(path.join(OUT, 'brand'), { recursive: true })
  await mkdir(path.join(OUT, 'facility'), { recursive: true })

  // Optional: originals dropped into scripts/_source/facility are sized and
  // converted straight into public/images/facility.
  const facilityDir = path.join(SRC, 'facility')
  if (existsSync(facilityDir)) {
    for (const f of await readdir(facilityDir)) {
      if (!/\.(png|jpe?g|webp)$/i.test(f)) continue
      const out = f.replace(/\.[^.]+$/, '.webp')
      await convert(path.join(facilityDir, f), path.join(OUT, 'facility', out), 1600, { quality: 82 })
      console.log('facility:', out)
    }
  }

  const files = await readdir(SRC)
  let count = 0

  for (const f of files) {
    if (!f.endsWith('.png')) continue
    const base = f.replace(/\.png$/, '')
    if (base.startsWith('review-')) continue // QA renders, not shipped

    if (base.startsWith('product-')) {
      const name = base.replace('product-', '')
      await convert(path.join(SRC, f), path.join(OUT, 'products', `${name}.webp`), PRODUCT_WIDTH)
    } else if (base.startsWith('factory-')) {
      const name = base.replace('factory-', '')
      await convert(path.join(SRC, f), path.join(OUT, 'factory', `${name}.webp`), FACTORY_WIDTH)
    } else if (base === 'hero-portrait') {
      await convert(path.join(SRC, f), path.join(OUT, 'brand', 'hero-portrait.webp'), 1200, { quality: 88 })
    } else if (base === 'hero-arc') {
      await convert(path.join(SRC, f), path.join(OUT, 'brand', 'hero-arc.webp'), 1100, { quality: 86 })
    } else if (base === 'hero-photo') {
      await convert(path.join(SRC, f), path.join(OUT, 'brand', 'hero-photo.webp'), 1100, { quality: 86 })
    } else if (base === 'hero-recliner') {
      await convert(path.join(SRC, f), path.join(OUT, 'brand', 'hero-recliner.webp'), 1100, { quality: 86 })
    } else if (base === 'brand-banner') {
      await convert(path.join(SRC, f), path.join(OUT, 'brand', 'banner.webp'), 1600, { quality: 84 })
    } else if (base === 'logo') {
      await convert(path.join(SRC, f), path.join(OUT, 'brand', 'logo-original.webp'), 600, { quality: 90 })
    } else {
      continue
    }
    count++
  }
  console.log(`Generated ${count} WebP assets in public/images`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
