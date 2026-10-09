import {Img, staticFile} from 'remotion';
import {brand, derived, fontFamily} from '../config/brand';
import {content} from '../config/content';
import {Product, stockFor} from '../data/demo';
import {formatCurrency} from '../lib/formatCurrency';

type Props = {product: Product; size: string; width?: number; showStock?: boolean};

/** Product card shown inside the chat: image, name, size, stock and price. */
export const ProductCard: React.FC<Props> = ({product, size, width = 500, showStock = true}) => (
  <div
    style={{
      width,
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      padding: 20,
      borderRadius: brand.radii.md,
      background: brand.colors.surface,
      border: `1.5px solid ${brand.colors.border}`,
      boxShadow: brand.shadows.card,
      boxSizing: 'border-box',
      fontFamily,
    }}
  >
    <div style={{width: 140, height: 140, borderRadius: brand.radii.sm, background: brand.colors.accentTint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
      <Img src={staticFile(product.image)} style={{width: 124, height: 124}} />
    </div>
    <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
      <div style={{fontSize: 28, fontWeight: 700, lineHeight: 1.15, color: brand.colors.text}}>{product.name}</div>
      <div style={{fontSize: 24, fontWeight: 500, color: brand.colors.textMuted}}>
        Size {size}
        {showStock && stockFor(product, size) > 0 ? ` · ${content.chat.inStockLabel}` : ''}
      </div>
      <div style={{fontSize: 34, fontWeight: 800, color: derived.accentDark}}>{formatCurrency(product.priceMinor)}</div>
    </div>
  </div>
);
