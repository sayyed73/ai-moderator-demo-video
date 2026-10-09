import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {brand, derived} from '../config/brand';

/** Warm ivory background with two slow, soft accent glows (frame-driven, deterministic). */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const a = Math.sin(frame / 150) * 40;
  const b = Math.cos(frame / 180) * 40;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.background,
        backgroundImage: [
          `radial-gradient(900px 700px at ${15 + a / 10}% ${8 + b / 10}%, ${derived.accentGlow}, transparent 70%)`,
          `radial-gradient(800px 700px at ${90 - b / 10}% ${95 - a / 10}%, ${brand.colors.accentTint}, transparent 70%)`,
        ].join(','),
      }}
    />
  );
};
