# Editing guide

Open the preview with `npm run dev`; edits to source files update it instantly. Re-render to produce a new MP4 (`npm run render`). **An exported MP4 never updates itself.**

## Change the accent colour
`src/config/brand.ts` → `colors.accent` (e.g. `'#00897B'`) and the matching light shade `colors.accentTint`. Buttons, badges, bubbles, highlights, the logo tile and glows follow automatically.

## Rename the product / merchant / tagline
`src/config/brand.ts` → `productName`, `merchantName`, `tagline`. The closing copy in `src/config/content.ts` is separate text; edit it there if you want it to change too.

## Replace the logo
Put your file in `public/logos/` and set `brand.logo.src`.
- `mode: 'tinted'` (default): expects a **single-colour glyph with transparent background**; it is drawn in white on an accent-coloured tile, so it follows the accent.
- `mode: 'original'`: shows your file exactly as it is (use for full-colour logos).

## Replace the product image
Put an image (SVG/PNG/JPG) in `public/images/` and change `products.hoodie.image` in `src/data/demo.ts`. Square images work best.

## Edit chat messages and customers
`src/data/demo.ts`: `purchaseChat` (scene 3 messages), `takeoverChat` (scene 5), `inbox` (list previews), `customers`. The three scattered messages in scene 1 are the inbox previews of the customers listed in `problemCustomerIds`. Keep messages short; the phone fits about five bubbles.

## Edit headlines, labels and buttons
`src/config/content.ts`.

## Prices, stock and currency
- Prices are in **minor units**: `priceMinor: 4900` = 49.00. Delivery: `demoOrder.deliveryMinor`. The totals are calculated; never type a total.
- Stock per size: `products.hoodie.variants`. The chat's "12 in stock" comes from there.
- Currency: `src/config/video.ts` → `currency: 'USD' | 'EUR' | 'GBP'` (and `locale`). This changes only **formatting** (symbol, separators). It does not convert exchange rates, so 4900 stays "49" in every currency – change the prices themselves in `demo.ts` if needed.
- The overview counts are derived from the inbox and order data automatically.

## Scene duration
`src/config/timing.ts` → `sceneSeconds`. Start frames and total length are derived. Events inside a scene (message timing, cursor clicks…) are in seconds *relative to that scene* in the `e` object below it; if you shorten a scene, move its events earlier so they stay inside it.

## Sound: music, effects and narration
Music and soft UI sound effects are **on by default** (`src/config/audio.ts`). They are original, synthesised by `scripts/make-audio.py` (no licences, no network). Re-run `python3 scripts/make-audio.py` after editing its tempo/chords. Switch layers with `enabled`, adjust `volume`, or drop in your own `public/audio/music.mp3`. Sound effects are placed from `timing.ts` events (see `src/components/SfxLayer.tsx`), so they follow scene timing changes.

### Add narration
1. Record or generate narration with a tool you are licensed to use (script: `docs/voiceover-script.md`). Free option on a Mac: `say -v Samantha -f narration.txt -o narration.aiff && ffmpeg -i narration.aiff public/audio/voiceover.mp3`. Or record yourself.
2. Save it as `public/audio/voiceover.mp3` and set `voiceover.enabled: true` in `src/config/audio.ts` (adjust `volume`, `startAtSeconds`). Lower `music.volume` to about 0.15 so it never covers the voice.
3. Check the preview. If the recording is longer or shorter than a scene, edit `sceneSeconds` and the scene's event times in `timing.ts`. Total length = sum of the seven scene lengths.
If an enabled file is missing it is skipped, so rendering never fails because of audio.

## Preview and render again
```bash
npm run dev              # live preview
npm run render:preview   # quick check  -> out/preview.mp4
npm run render           # final        -> out/inboxpilot-demo.mp4
npm run still            # one frame    -> out/still.png (change --frame in package.json)
```
If Chrome cannot be downloaded: `npm run render -- --browser-executable=/path/to/chromium`.

## Other notes
- Fonts: `public/fonts` + `brand.fonts` (Inter, SIL OFL licence in `Inter-LICENSE.txt`).
- Rule of thumb: copy → `content.ts`, data → `demo.ts`, look → `brand.ts`, time → `timing.ts`.
