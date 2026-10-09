# InboxPilot – concept demo video

An editable, 60-second animated product demo (1080 × 1350, 4:5 portrait, 30 fps) for **InboxPilot**, a *proposed* AI customer-support and social-commerce platform. Everything shown is fictional sample data; the product does not exist yet. Built with React, TypeScript and [Remotion](https://www.remotion.dev).

## Quick start

Requirements: Node.js 18+ (tested on 22) and npm.

```bash
npm install        # once
npm run dev        # opens the Remotion preview (Studio) in your browser
```

| Command | What it does | Output |
| --- | --- | --- |
| `npm run dev` | Live preview with timeline | – |
| `npm run typecheck` | TypeScript check | – |
| `npm run render:preview` | Half-size, smaller full-length preview | `out/preview.mp4` |
| `npm run render` | Full-resolution H.264 MP4 | `out/inboxpilot-demo.mp4` |
| `npm run still` | One representative frame (approved order) | `out/still.png` |

> Editing source code does **not** change an MP4 you already exported. Re-run `npm run render` after every change.

## Where to change things

| I want to change… | Open |
| --- | --- |
| Accent colour, other colours, fonts, logo path, corner radii, shadows, product/merchant name | `src/config/brand.ts` |
| Headlines, button labels, closing copy, "Concept demo" label | `src/config/content.ts` |
| Customer names, chat messages, product, prices, stock, order, counts | `src/data/demo.ts` |
| Scene lengths, when things happen inside a scene | `src/config/timing.ts` |
| Size, fps, locale, currency formatting, safe margins | `src/config/video.ts` |
| Music, sound effects, voiceover | `src/config/audio.ts` |

Full step-by-step instructions: [`docs/editing-guide.md`](docs/editing-guide.md). Other docs: [`docs/storyboard.md`](docs/storyboard.md), [`docs/voiceover-script.md`](docs/voiceover-script.md), [`docs/github-setup.md`](docs/github-setup.md).

## Project layout

```
src/config/        editable settings (brand, content, timing, video, audio)
src/data/demo.ts   fictional customers, chats, products, orders
src/scenes/        the seven scenes
src/components/    reusable UI pieces (phone, dashboard, chat bubble, cards…)
src/lib/           currency formatting, animation helpers, layout constants, fonts
public/            fonts, logos, images, audio (local assets only)
docs/              storyboard, voiceover script, guides
out/               rendered files (git-ignored)
references/        local-only reference material (git-ignored)
```

## Common problems

- **"Host not in allowlist" / Chrome download fails** – Remotion downloads its own headless Chrome the first time. If your network blocks it, install Chrome/Chromium and add `--browser-executable=/path/to/chrome` to the command, e.g. `npm run render -- --browser-executable=/usr/bin/chromium`.
- **Fonts look different** – fonts load from `public/fonts` (Inter, OFL licence). If you change `brand.fonts.files`, make sure the file paths exist.
- **`Composition not found`** – you changed `id` in `src/config/video.ts`; update the ID in the scripts in `package.json` too.
- **Render is slow / runs out of memory** – use `npm run render -- --concurrency=2`.
- **Text clipped after editing copy** – shorten the text or reduce font size in the component; check several frames in the preview.
- **Sound missing** – check `enabled` flags in `src/config/audio.ts` and that the files exist in `public/audio/`. Audio plays in `npm run dev` after you press play (browsers block autoplay).
