import {DASH_BAR} from '../components/DashboardShell';

/** Scene 1 -> 2 shared geometry: scattered message cards (canvas pixels). */
export const SCATTER_CARD_W = 640;
export const SCATTER_POSES = [
  {x: 60, y: 430, rot: -4},
  {x: 340, y: 690, rot: 3},
  {x: 100, y: 950, rot: -2},
];
/** Faint background cards that make the inbox feel busy (fade out at the end of scene 1). */
export const GHOST_POSES = [
  {x: 520, y: 600, rot: 6, scale: 0.78},
  {x: 20, y: 840, rot: -6, scale: 0.72},
];

/** Unified inbox geometry (px). Shell is placed at (INBOX.x, INBOX.y) on the canvas. */
export const INBOX = {
  x: 48,
  y: 372,
  w: 984,
  h: 880,
  listW: 330,
  convW: 390,
  custW: 264,
  listHeader: 84,
  rowH: 110,
  rowPad: 6,
};

/** Top-left of inbox row `i`, in canvas pixels. */
export const inboxRowOrigin = (i: number) => ({
  x: INBOX.x + 10,
  y: INBOX.y + DASH_BAR + INBOX.listHeader + i * INBOX.rowH + INBOX.rowPad,
});
export const INBOX_ROW_W = INBOX.listW - 20;

/** Phone position in scene 3 (and its frozen hand-off in scene 4). */
export const PHONE_POS = {x: 64, y: 70};
