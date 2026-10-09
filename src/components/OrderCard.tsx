import {Img, staticFile} from 'remotion';
import {brand, derived, fontFamily} from '../config/brand';
import {content} from '../config/content';
import {channelOf} from './helpers';
import {demoOrder, orderTotals, products, customers} from '../data/demo';
import {formatCurrency} from '../lib/formatCurrency';
import {easeInOut, progress} from '../lib/timeline';
import {Avatar} from './Avatar';
import {ChannelChip} from './ChannelChip';
import {StatusBadge} from './StatusBadge';

export const ORDER_CARD = {w: 860, h: 700, pad: 36, buttonH: 92};
/** Centre of the "Approve order" button relative to the card's top-left. */
export const ORDER_BUTTON_CENTER = {x: ORDER_CARD.w / 2, y: ORDER_CARD.h - ORDER_CARD.pad - ORDER_CARD.buttonH / 2};

type Props = {approved: boolean; pressed?: boolean; /** frames since approval (status badge pops) */ badgeAge?: number};

const Row: React.FC<{label: string; value: string; strong?: boolean}> = ({label, value, strong}) => (
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: strong ? 44 : 30, fontWeight: strong ? 800 : 500, color: strong ? brand.colors.text : brand.colors.textMuted}}>
    <span>{label}</span>
    <span style={{color: brand.colors.text, fontWeight: strong ? 800 : 700}}>{value}</span>
  </div>
);

/** Dashboard order card. Everything shown is read from src/data/demo.ts. */
export const OrderCard: React.FC<Props> = ({approved, pressed, badgeAge}) => {
  const totals = orderTotals();
  const line = demoOrder.lines[0];
  const product = products[line.productId];
  const customer = customers[demoOrder.customerId];
  return (
    <div
      style={{
        width: ORDER_CARD.w,
        height: ORDER_CARD.h,
        padding: ORDER_CARD.pad,
        boxSizing: 'border-box',
        borderRadius: brand.radii.lg,
        background: brand.colors.surface,
        border: `1.5px solid ${brand.colors.border}`,
        boxShadow: brand.shadows.card,
        fontFamily,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em'}}>
          {content.order.title} {demoOrder.id}
        </div>
        <div style={{scale: String(1 + 0.16 * Math.sin(Math.PI * progress(badgeAge ?? 99, 0, 16, easeInOut))), transformOrigin: 'right center'}}>
          <StatusBadge kind={approved ? 'approved' : 'pending'} label={approved ? content.order.statusApproved : content.order.statusPending} size={28} />
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 20}}>
        <Avatar name={customer.name} size={52} />
        <div style={{fontSize: 30, fontWeight: 700}}>{customer.name}</div>
        <ChannelChip channel={channelOf(demoOrder.customerId)} size={22} />
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 24, margin: '24px 0', padding: '20px 0', borderTop: `1.5px solid ${brand.colors.border}`, borderBottom: `1.5px solid ${brand.colors.border}`}}>
        <div style={{width: 120, height: 120, borderRadius: brand.radii.sm, background: brand.colors.accentTint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Img src={staticFile(product.image)} style={{width: 104, height: 104}} />
        </div>
        <div style={{flex: 1}}>
          <div style={{fontSize: 34, fontWeight: 700, lineHeight: 1.15}}>{product.name}</div>
          <div style={{fontSize: 27, color: brand.colors.textMuted, marginTop: 6, fontWeight: 500}}>
            {content.order.sizeLabel} {line.size} · {content.order.quantityLabel} {line.quantity}
          </div>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10, flex: 1}}>
        <Row label={content.order.itemLabel} value={formatCurrency(totals.itemsMinor)} />
        <Row label={content.order.deliveryLabel} value={formatCurrency(totals.deliveryMinor)} />
        <Row label={content.order.totalLabel} value={formatCurrency(totals.totalMinor)} strong />
      </div>
      <div
        style={{
          height: ORDER_CARD.buttonH,
          borderRadius: brand.radii.md,
          background: approved ? brand.colors.accentTint : brand.colors.accent,
          color: approved ? derived.accentDark : brand.colors.onAccent,
          fontSize: 34,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          scale: pressed && !approved ? '0.975' : '1',
          boxShadow: approved ? 'none' : `0 10px 24px ${derived.accentGlow}`,
        }}
      >
        {approved ? `✓  ${content.order.approvedButton}` : content.order.approveButton}
      </div>
    </div>
  );
};
