import {ReactNode} from 'react';
import {brand, fontFamily} from '../config/brand';

export const PHONE_W = 600;
export const PHONE_H = 1180;
const BEZEL = 14;
export const SCREEN_W = PHONE_W - BEZEL * 2;
export const SCREEN_H = PHONE_H - BEZEL * 2;
const STATUS_H = 64;

/** Phone frame. Children render inside the screen (572 x 1152 px, below a 64 px status bar). */
export const PhoneMockup: React.FC<{children: ReactNode}> = ({children}) => (
  <div
    style={{
      width: PHONE_W,
      height: PHONE_H,
      borderRadius: 84,
      background: '#14191A',
      padding: BEZEL,
      boxShadow: brand.shadows.phone,
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        position: 'relative',
        width: SCREEN_W,
        height: SCREEN_H,
        borderRadius: 70,
        background: brand.colors.surfaceSoft,
        overflow: 'hidden',
        fontFamily,
      }}
    >
      <div style={{height: STATUS_H, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 44px 0', fontWeight: 700, fontSize: 24, color: brand.colors.text}}>
        <span>9:41</span>
        <div style={{width: 130, height: 36, borderRadius: 20, background: '#14191A', position: 'absolute', left: '50%', top: 14, marginLeft: -65}} />
        <span style={{letterSpacing: 2}}>●●●</span>
      </div>
      <div style={{position: 'absolute', top: STATUS_H, left: 0, right: 0, bottom: 0}}>{children}</div>
    </div>
  </div>
);
