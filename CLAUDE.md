# CLAUDE.md – project conventions

Editable 60 s Remotion concept demo for the fictional "InboxPilot" (React + TypeScript, npm). All data is fictional; keep the "Concept demo • Sample data" label visible. Never invent testimonials, results or partnerships. No backend, real AI, payments, auth or social integrations.

## Configuration separation (keep it)
- `src/config/brand.ts` – names, colours, fonts, logo, radii, shadows. Components must read colours from here (use `derived` for accent-based shades). No hardcoded brand hex in components.
- `src/config/content.ts` – all audience-facing UI text and headlines.
- `src/data/demo.ts` – all fictional data. Money in minor units; totals are calculated (`orderTotals`). Counts are derived (`overviewCounts`). Don't duplicate data in components.
- `src/config/timing.ts` – single source of truth for scene lengths (seconds). Start frames and total derive from it. In-scene events are relative to their scene.
- `src/config/video.ts` – composition ID, size, fps, locale, currency (formatting only). `package.json` scripts use the ID `ProductDemo`.
- `src/config/audio.ts` – optional audio, disabled by default; missing files must never break rendering.

## Animation rules
Frame-driven only (`useCurrentFrame`, `interpolate`, helpers in `src/lib/timeline.ts`). No CSS transitions/animations, wall-clock timers or unseeded randomness. Keep one focal point at a time. Scenes must not overlap in a way that shortens the 60 s total (no TransitionSeries overlap).

## Visual direction (preserve)
Warm ivory background, charcoal text, teal accent, white cards with soft borders/shadows, bold headlines (Inter), floating panels, phone mockup, masked reveals, restrained springs, cursor + click feedback, highlight outlines. Original illustrations only (SVG hoodie, own logo). Min text ~20 px at 1080 wide. Don't copy any reference video; `references/` is local-only and git-ignored.

## Commands
`npm run dev | typecheck | render:preview | render | still`. Outputs go to `out/` (ignored). Run `npm run typecheck` before finishing. In sandboxes without Chrome download, add `--browser-executable=<path>`.
