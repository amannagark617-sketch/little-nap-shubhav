# Campaign banner creative

Three slots for the homepage's rotating promotional banner
(`src/components/CampaignCarousel.tsx`, content in `src/data/campaigns.ts`).

Each file is checked for automatically — drop it in with the exact name below
and the placeholder disappears on the next load, no code change needed.

| File | Slide | Recommended size |
|---|---|---|
| `oem-programme.webp` | "Build your range on our line" (OEM/private label) | 1400 × 1000 |
| `reserved-range.webp` | "Introducing the Reserved range" | 1400 × 1000 |
| `cinema-seating.webp` | "Seating built for the whole run" | 1400 × 1000 |

Aspect ratio is 4:3. To add, remove or reorder slides, edit the `campaigns`
array in `src/data/campaigns.ts` — the carousel and its dots update
automatically to match.
