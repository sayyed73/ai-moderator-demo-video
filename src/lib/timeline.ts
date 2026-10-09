import {Easing, interpolate} from 'remotion';
import {FADE_FRAMES} from '../config/timing';

/** Smooth "expo-out" feel used for most entrances. */
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** 0 -> 1 between `start` and `start + duration` (frames), clamped. */
export const progress = (
  frame: number,
  start: number,
  duration: number,
  easing: (n: number) => number = easeOut,
) =>
  interpolate(frame, [start, start + Math.max(1, duration)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

/** Opacity for a scene wrapper: short fade in at the start / out at the end. */
export const sceneOpacity = (
  frame: number,
  duration: number,
  opts: {fadeIn?: boolean; fadeOut?: boolean} = {fadeIn: true, fadeOut: true},
) => {
  const a = opts.fadeIn ? progress(frame, 0, FADE_FRAMES, easeInOut) : 1;
  const b = opts.fadeOut ? 1 - progress(frame, duration - FADE_FRAMES, FADE_FRAMES, easeInOut) : 1;
  return Math.min(a, b);
};

export type CursorKey = {frame: number; x: number; y: number};

/** Position along a list of cursor keyframes (linear time, eased per segment). */
export const pathAt = (frame: number, keys: CursorKey[]) => {
  const frames = keys.map((k) => k.frame);
  const opts = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut} as const;
  return {
    x: interpolate(frame, frames, keys.map((k) => k.x), opts),
    y: interpolate(frame, frames, keys.map((k) => k.y), opts),
  };
};

/** Linear interpolation helper between two numbers by 0..1. */
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
