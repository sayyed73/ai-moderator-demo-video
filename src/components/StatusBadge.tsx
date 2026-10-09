import {brand, derived, fontFamily} from '../config/brand';

export type BadgeKind = 'pending' | 'approved' | 'attention' | 'ai' | 'human';

const styles: Record<BadgeKind, {bg: string; fg: string}> = {
  pending: {bg: brand.colors.warningTint, fg: brand.colors.warning},
  approved: {bg: brand.colors.accentTint, fg: derived.accentDark},
  attention: {bg: brand.colors.dangerTint, fg: brand.colors.danger},
  ai: {bg: brand.colors.accentTint, fg: derived.accentDark},
  human: {bg: brand.colors.text, fg: brand.colors.background},
};

/** Coloured status pill. `kind` picks the colours, `label` the text (see src/config/content.ts). */
export const StatusBadge: React.FC<{kind: BadgeKind; label: string; size?: number}> = ({kind, label, size = 24}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.35,
      padding: `${size * 0.3}px ${size * 0.7}px`,
      borderRadius: brand.radii.pill,
      background: styles[kind].bg,
      color: styles[kind].fg,
      fontFamily,
      fontSize: size,
      fontWeight: 700,
      whiteSpace: 'nowrap',
    }}
  >
    <div style={{width: size * 0.4, height: size * 0.4, borderRadius: '50%', background: styles[kind].fg}} />
    {label}
  </div>
);
