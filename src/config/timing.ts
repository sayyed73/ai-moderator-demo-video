import {video} from './video';

/**
 * SINGLE SOURCE OF TRUTH for timing.
 * Change scene lengths in SECONDS below; start frames and the total
 * duration are derived automatically. Default total = 60 s.
 */
export const sceneSeconds = {
  problem: 6,
  unifiedInbox: 8,
  conversation: 15,
  orderApproval: 12,
  humanTakeover: 9,
  overview: 6,
  closing: 4,
} as const;

export type SceneKey = keyof typeof sceneSeconds;

/** Order in which scenes play. */
export const sceneOrder: SceneKey[] = [
  'problem',
  'unifiedInbox',
  'conversation',
  'orderApproval',
  'humanTakeover',
  'overview',
  'closing',
];

/** Seconds -> frames at the configured frame rate. */
export const sec = (seconds: number) => Math.round(seconds * video.fps);

type SceneTiming = {from: number; duration: number};

export const scenes = (() => {
  let cursor = 0;
  const out = {} as Record<SceneKey, SceneTiming>;
  for (const key of sceneOrder) {
    const duration = sec(sceneSeconds[key]);
    out[key] = {from: cursor, duration};
    cursor += duration;
  }
  return out;
})();

export const TOTAL_FRAMES = sceneOrder.reduce((sum, key) => sum + scenes[key].duration, 0);

/**
 * In-scene events, in SECONDS RELATIVE TO THE START OF THAT SCENE.
 * If you shorten a scene, move its events earlier too (keep them < scene length).
 */
const e = {
  problem: {
    headlineIn: 0.3,
    cards: [1.1, 2.0, 2.9], // when each scattered message lands
    headlineOut: 5.4,
  },
  unifiedInbox: {
    cardsToList: [0.0, 1.5], // scattered cards fly into the list [start, end]
    shellIn: 0.2,
    headlineIn: 0.5,
    selectRow: 3.0,
    zoomStart: 3.6,
    zoomEnd: 5.0,
    panelHighlight: 5.2,
    exit: 7.5,
  },
  conversation: {
    phoneIn: 0.0,
    customer1: 0.9,
    typing1: [2.8, 4.0], // typing indicator [show, hide]
    assistant1: 4.0,
    inventoryTag: 5.0,
    productCard: 6.2,
    customer2: 9.0,
    typing2: [10.0, 11.0],
    assistant2: 11.0,
    toDelivery: 13.3, // chat collapses into the "Delivery details received" state
  },
  orderApproval: {
    phoneOut: [0.0, 1.1],
    headlineIn: 0.5,
    subtextIn: 1.0,
    cardIn: 0.6,
    cursorStart: 3.4,
    cursorAtButton: 5.4,
    click: 5.9,
    approved: 6.0,
    highlight: 2.4,
    exit: 11.4,
  },
  humanTakeover: {
    headlineIn: 0.2,
    customerMsg: 1.0,
    aiPreparing: [2.0, 5.3],
    attention: 2.6,
    cursorStart: 3.2,
    cursorAtButton: 4.6,
    click: 5.2,
    takeover: 5.3,
    exit: 8.5,
  },
  overview: {
    headlineIn: 0.2,
    tiles: [0.7, 1.0, 1.3, 1.6],
    countUp: [1.4, 2.6],
    highlight: 3.1,
    exit: 5.5,
  },
  closing: {
    compositionIn: 0.1,
    wordmark: 0.2,
    headline: 0.8,
    subtext: 1.4,
    footer: 2.0,
  },
};

/** Same events, converted to frames (still relative to the scene). */
const toFrames = <T,>(v: T): T =>
  (Array.isArray(v)
    ? v.map(toFrames)
    : typeof v === 'number'
      ? sec(v)
      : v && typeof v === 'object'
        ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, toFrames(x)]))
        : v) as T;

export const t = toFrames(e);

/** Short fade at scene edges (frames). */
export const FADE_FRAMES = sec(0.4);
