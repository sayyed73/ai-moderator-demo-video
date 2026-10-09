import {brand, derived, fontFamily} from '../config/brand';
import {easeOut, progress} from '../lib/timeline';

type Props = {title: string; main: string; detail: string; footnote?: string; age: number; width?: number};

/** Small floating panel that explains what the assistant is doing behind the scenes. */
export const FloatingNote: React.FC<Props> = ({title, main, detail, footnote, age, width = 336}) => {
  const p = progress(age, 0, 20, easeOut);
  return (
    <div
      style={{
        width,
        boxSizing: 'border-box',
        padding: '24px 26px',
        borderRadius: brand.radii.md,
        background: brand.colors.surface,
        border: `1.5px solid ${brand.colors.border}`,
        boxShadow: brand.shadows.float,
        fontFamily,
        opacity: p,
        translate: `${(1 - p) * 40}px 0`,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{fontSize: 22, fontWeight: 700, color: derived.accentDark}}>{title}</div>
      <div style={{fontSize: 28, fontWeight: 800, lineHeight: 1.15, color: brand.colors.text}}>{main}</div>
      <div style={{fontSize: 24, fontWeight: 600, color: brand.colors.text, display: 'flex', alignItems: 'center', gap: 10}}>
        <span style={{width: 14, height: 14, borderRadius: '50%', background: brand.colors.accent, flexShrink: 0}} />
        {detail}
      </div>
      {footnote && <div style={{fontSize: 21, color: brand.colors.textMuted, fontWeight: 500}}>{footnote}</div>}
    </div>
  );
};
