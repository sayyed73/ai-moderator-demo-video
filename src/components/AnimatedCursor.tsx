import {useCurrentFrame} from 'remotion';
import {brand} from '../config/brand';
import {CursorKey, pathAt, progress} from '../lib/timeline';

/**
 * Mouse cursor that follows keyframes (scene-relative frames, canvas pixels).
 * The arrow tip sits exactly at (x, y). `clicks` = frames where a click happens.
 */
export const AnimatedCursor: React.FC<{keys: CursorKey[]; clicks?: number[]}> = ({keys, clicks = []}) => {
  const frame = useCurrentFrame();
  const {x, y} = pathAt(frame, keys);
  const appear = progress(frame, keys[0].frame, 10);
  const press = clicks.reduce((m, c) => Math.max(m, 1 - Math.min(1, Math.abs(frame - c - 3) / 4)), 0);
  const ripples = clicks.map((c) => progress(frame, c, 18));
  return (
    <>
      {clicks.map((c, i) =>
        ripples[i] > 0 && ripples[i] < 1 ? (
          <div
            key={c}
            style={{
              position: 'absolute',
              left: x - 40,
              top: y - 40,
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: `5px solid ${brand.colors.accent}`,
              opacity: 1 - ripples[i],
              scale: String(0.3 + ripples[i] * 0.9),
            }}
          />
        ) : null,
      )}
      <svg
        width={52}
        height={52}
        viewBox="0 0 32 32"
        style={{
          position: 'absolute',
          left: x - 3,
          top: y - 2,
          opacity: appear,
          scale: String(1 - press * 0.12),
          transformOrigin: '3px 2px',
          filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.25))',
        }}
      >
        <path d="M3 2 L3 24 L9 18.6 L13 28 L17.2 26.2 L13.2 17 L21 17 Z" fill={brand.colors.text} stroke="#fff" strokeWidth={1.6} strokeLinejoin="round" />
      </svg>
    </>
  );
};
