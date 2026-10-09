# Prompt to recreate this demo

Copy everything inside the block into a new session (empty folder, Git initialised). Edit only the `[BRACKETS]`.

````text
Build an editable 60-second animated product-demo video in this folder with React, TypeScript and Remotion (npm, committed lockfile; matching Remotion versions; install the official Remotion agent skills locally). Don't overwrite existing files. Work through to a rendered MP4 without asking for approval at each step; ask only if truly blocked.

VIDEO
- Concept demo for a proposed AI customer-support / social-commerce inbox for online merchants. Product: [InboxPilot]. Fictional merchant: [Northline Apparel]. English only, fictional data only, no invented testimonials, results or partnerships.
- 1080×1350 (4:5), 30 fps, exactly 60 s, ID "ProductDemo". Keep a small "Concept demo • Sample data" label visible all the time.
- Style: warm ivory background (#F6F3EC), charcoal text (#18201E), teal accent (#00897B, tint #DDF4EC), white cards, soft shadows, Inter font (local files), bold headlines, floating panels, phone mockup, masked text reveals, restrained springs, cursor clicks, highlight outlines. Original SVG logo and product illustration. Text at least ~20 px.
- Show interfaces reacting to actions, not title cards. All animation frame-driven (no CSS transitions, timers or randomness). Scenes must not overlap, so the total stays 60 s.

SCENES (seconds; headline in quotes)
1. 0–6 "Great products. Too many messages." Scattered cards: "Is this available in medium?" (Messenger), "How much is delivery?" (WhatsApp), "Can I place an order?" (Instagram).
2. 6–14 "Every conversation. One workspace." Cards fly into a dashboard (list, selected conversation, customer panel); zoom to the selected customer.
3. 14–29 Large phone chat. Customer: "Do you have the navy hoodie in large?" → typing dots → assistant: "Yes—size L is available. It's $49." → product card → "I'll take one." → "Great. Where should we send it?" → collapses to "Delivery details received". Floating notes show the inventory check and the order draft.
4. 29–41 "From conversation to order." / "You approve before it moves forward." Order card: Navy Everyday Hoodie, size L, qty 1, item $49, delivery $5, total $54, status Pending approval. Cursor clicks "Approve order" → Approved. Never show payment collected or shipped.
5. 41–50 "Automation, with you in control." Customer: "Can you make an exception to your return policy?" → "Needs your attention" → cursor clicks "Take over" → AI handling becomes Human handling; automated replies pause.
6. 50–56 "A clear view of every conversation." Count tiles (open, AI, human, orders approved) derived from the data and consistent with scenes 4–5; highlight the changed tiles; channel breakdown.
7. 56–60 Wordmark + phone + dashboard. "More time for your business." / "AI-assisted conversations. Human-controlled orders." / footer "Product concept • Prototype demonstration". Calm hold.

ARCHITECTURE (keep config separate; components read it, never duplicate it)
- src/config/brand.ts (names, colours, fonts, logo, radii, shadows; accent shades derived from the accent so changing it re-colours everything), content.ts (all UI text), timing.ts (scene seconds → derived start frames and total; in-scene events relative to the scene), video.ts (ID, size, fps, locale, currency USD/EUR/GBP, formatting only), audio.ts.
- src/data/demo.ts: all fictional customers, chats, products, stock, order. Money in minor units; totals and dashboard counts calculated.
- Entry: src/index.ts, src/Root.tsx, src/compositions/ProductDemo.tsx. Seven files in src/scenes/ (ProblemScene, UnifiedInboxScene, ConversationScene, OrderApprovalScene, HumanTakeoverScene, OverviewScene, ClosingScene). Small reusable components (PhoneMockup, DashboardShell, ChatBubble, ProductCard, OrderCard, Headline, StatusBadge, AnimatedCursor, ConceptLabel, etc.). src/lib: formatCurrency, timeline helpers.
- public/{images,logos,fonts,audio}; local-only references/ and out/ (git-ignored).
- Short comments showing what I can change.

AUDIO
- Original music and soft UI sound effects (click, pop, chime) synthesised by a script, timed from timing.ts. Voiceover support disabled until I add public/audio/voiceover.mp3. Missing audio must never break rendering. No paid or third-party audio.

SCRIPTS (verify each works)
dev, typecheck, render:preview (half size), render (H.264 → out/inboxpilot-demo.mp4), still (frame of the approved order).

DOCS
README.md, CLAUDE.md (conventions for future agents), docs/storyboard.md, docs/voiceover-script.md (~60 s, aligned to scenes), docs/editing-guide.md (accent colour, rename product, replace logo/image, edit chat, prices and currency, scene length, add narration, re-render; exported MP4 does not update from code changes; common errors), docs/github-setup.md (private repo, placeholder URL; do not create a remote or push).

PROCESS
Build config/data/components first, then all scenes. Typecheck, render the full preview, inspect frames from every scene (chat, order totals, takeover, closing) and fix clipping or readability problems. Then render the final MP4 and commit. If Chrome can't be downloaded, use an installed Chromium via --browser-executable. Only claim a render succeeded if the file exists. Finish with a short handover: what was created, the preview command, the video path, and the first files to edit.
````

## Tips
- To change the product, merchant, colours or scene text, edit only the bracketed parts and the SCENES block.
- For polish rounds, follow up with specific fixes ("scene 3 feels flat: add a gentle zoom on the product card").
- The voiceover is the one step that needs your own tool (see `docs/editing-guide.md`).
