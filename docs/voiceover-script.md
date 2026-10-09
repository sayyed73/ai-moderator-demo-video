# Voiceover script (~60 s, comfortable pace ≈ 2.3 words/second)

The video works without sound. Record your own narration (or generate it with a tool you are licensed to use). Do not reuse third-party audio.

**1 · Problem (0–6 s)**
Great products deserve great service. But the messages keep coming, from every direction.

**2 · Unified inbox (6–14 s)**
InboxPilot brings Messenger, Instagram and WhatsApp into one workspace, so every customer conversation is in one place.

**3 · Conversation (14–29 s)**
A customer asks about a hoodie. The assistant checks the merchant's product information, confirms the size is in stock, and shows the right product. When the customer is ready to buy, it collects the delivery details, no forms, just a conversation.

**4 · Order approval (29–41 s)**
The conversation becomes an order, ready for your review. You see exactly what was chosen and what it costs, and nothing moves forward until you approve it.

**5 · Human takeover (41–50 s)**
Some requests need a person. When a customer asks for an exception, you're alerted. Take over with one click, and automated replies pause.

**6 · Overview (50–56 s)**
And a clear overview shows every conversation, who's handling it, and which orders are approved.

**7 · Closing (56–60 s)**
InboxPilot: AI-assisted conversations, human-controlled orders. More time for your business. This is a product concept.

## Fitting a real recording
1. Save as `public/audio/voiceover.mp3`, set `voiceover.enabled: true` in `src/config/audio.ts`.
2. Listen in `npm run dev`. Where a section runs long, increase that scene in `sceneSeconds` (`src/config/timing.ts`) and shift its in-scene events; where it runs short, reduce it.
3. `startAtSeconds` delays the narration start.
