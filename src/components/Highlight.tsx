import {useCurrentFrame} from 'remotion';
import {brand, derived} from '../config/brand';

/**
 * Accent outline that directs attention. Place inside a position:relative parent.
 * `amount` is 0..1 (use progress() from lib/timeline to fade it in).
 */
export const Highlight: React.FC<{amount: number; inset?: number; radius?: number}> = ({amount, inset = -10, radius = brand.radii.md}) => {
  const frame = useCurrentFrame();
  const pulse = (Math.sin(frame / 7) + 1) / 2;
  return (
    <div
      style={{
        position: 'absolute',
        inset,
        borderRadius: radius,
        border: `4px solid ${brand.colors.accent}`,
        boxShadow: `0 0 0 ${6 + pulse * 6}px ${derived.accentGlow}`,
        opacity: amount,
        pointerEvents: 'none',
      }}
    />
  );
};
