import {ReactNode} from 'react';
import {brand, fontFamily} from '../config/brand';
import {LogoMark} from './LogoMark';
import {Avatar} from './Avatar';

export const DASH_BAR = 76;

type Props = {
  width: number;
  height: number;
  children: ReactNode;
  /** Small section label shown in the top bar, e.g. "Inbox". */
  section?: string;
};

/** Merchant dashboard window: top bar (logo, product, merchant) + content area. */
export const DashboardShell: React.FC<Props> = ({width, height, children, section}) => (
  <div
    style={{
      width,
      height,
      borderRadius: brand.radii.lg,
      background: brand.colors.surface,
      border: `1.5px solid ${brand.colors.border}`,
      boxShadow: brand.shadows.float,
      overflow: 'hidden',
      fontFamily,
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        height: DASH_BAR,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 26px',
        borderBottom: `1.5px solid ${brand.colors.border}`,
        background: brand.colors.surfaceSoft,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <LogoMark size={40} />
        <span style={{fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', color: brand.colors.text}}>{brand.productName}</span>
        {section && <span style={{fontWeight: 600, fontSize: 24, color: brand.colors.textMuted, marginLeft: 8}}>/ {section}</span>}
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <span style={{fontWeight: 600, fontSize: 22, color: brand.colors.textMuted}}>{brand.merchantName}</span>
        <Avatar name={brand.merchantName} size={40} />
      </div>
    </div>
    <div style={{position: 'relative', height: height - DASH_BAR}}>{children}</div>
  </div>
);
