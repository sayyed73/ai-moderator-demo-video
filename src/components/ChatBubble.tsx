import {brand, derived, fontFamily} from '../config/brand';
import {easeOut, progress} from '../lib/timeline';

export type BubbleVariant = 'accent' | 'plain' | 'tint';

type Props = {
  text: string;
  variant: BubbleVariant;
  align: 'left' | 'right';
  /** Frames since this bubble appeared (undefined = fully visible). Drives the entrance. */
  age?: number;
  fontSize?: number;
  maxWidth?: number;
  /** Small caption above the bubble, e.g. "Store assistant · AI". */
  label?: string;
};

const colors: Record<BubbleVariant, {bg: string; fg: string; border: string}> = {
  accent: {bg: brand.colors.accent, fg: brand.colors.onAccent, border: 'transparent'},
  plain: {bg: brand.colors.surface, fg: brand.colors.text, border: brand.colors.border},
  tint: {bg: brand.colors.accentTint, fg: brand.colors.text, border: 'transparent'},
};

/** One chat message. Slides and fades in as `age` goes 0 -> ~14 frames. */
export const ChatBubble: React.FC<Props> = ({text, variant, align, age, fontSize = 28, maxWidth = 420, label}) => {
  const p = age === undefined ? 1 : progress(age, 0, 14, easeOut);
  const c = colors[variant];
  return (
    <div
      style={{
        alignSelf: align === 'right' ? 'flex-end' : 'flex-start',
        maxWidth,
        opacity: p,
        translate: `0 ${(1 - p) * 18}px`,
        scale: String(0.96 + p * 0.04),
        transformOrigin: align === 'right' ? 'bottom right' : 'bottom left',
        fontFamily,
      }}
    >
      {label && (
        <div style={{fontSize: Math.max(20, fontSize * 0.7), fontWeight: 600, color: variant === 'tint' ? derived.accentDark : brand.colors.textMuted, marginBottom: 6, textAlign: align}}>{label}</div>
      )}
      <div
        style={{
          background: c.bg,
          color: c.fg,
          border: `1.5px solid ${c.border}`,
          padding: `${fontSize * 0.5}px ${fontSize * 0.7}px`,
          borderRadius: fontSize * 0.85,
          borderBottomRightRadius: align === 'right' ? fontSize * 0.25 : fontSize * 0.85,
          borderBottomLeftRadius: align === 'left' ? fontSize * 0.25 : fontSize * 0.85,
          fontSize,
          fontWeight: 500,
          lineHeight: 1.32,
          boxShadow: variant === 'plain' ? '0 2px 6px rgba(24,32,30,0.05)' : 'none',
        }}
      >
        {text}
      </div>
    </div>
  );
};
