import {useCurrentFrame} from 'remotion';
import {brand} from '../config/brand';

/** Three bouncing dots (frame-driven). */
export const TypingIndicator: React.FC<{align?: 'left' | 'right'; variant?: 'plain' | 'tint'}> = ({align = 'left', variant = 'plain'}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        alignSelf: align === 'right' ? 'flex-end' : 'flex-start',
        display: 'flex',
        gap: 9,
        padding: '22px 26px',
        borderRadius: 30,
        background: variant === 'tint' ? brand.colors.accentTint : brand.colors.surface,
        border: `1.5px solid ${variant === 'tint' ? 'transparent' : brand.colors.border}`,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: brand.colors.textMuted,
            opacity: 0.45 + 0.55 * Math.max(0, Math.sin(frame / 4 - i * 0.9)),
            translate: `0 ${-6 * Math.max(0, Math.sin(frame / 4 - i * 0.9))}px`,
          }}
        />
      ))}
    </div>
  );
};
