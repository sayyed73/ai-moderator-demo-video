import {brand, fontFamily} from '../config/brand';
import {CustomerId, customers, inbox} from '../data/demo';
import {SCATTER_CARD_W} from '../lib/layout';
import {Avatar} from './Avatar';
import {ChannelChip} from './ChannelChip';

/** Incoming-message card used in the "too many messages" scene (natural width 640 px). */
export const MessageCard: React.FC<{customerId: CustomerId; text?: string}> = ({customerId, text}) => {
  const c = customers[customerId];
  const message = text ?? inbox.find((i) => i.customerId === customerId)?.preview ?? '';
  return (
    <div
      style={{
        width: SCATTER_CARD_W,
        boxSizing: 'border-box',
        display: 'flex',
        gap: 22,
        padding: 26,
        alignItems: 'center',
        borderRadius: brand.radii.lg,
        background: brand.colors.surface,
        border: `1.5px solid ${brand.colors.border}`,
        boxShadow: brand.shadows.float,
        fontFamily,
      }}
    >
      <Avatar name={c.name} size={72} channel={c.channel} />
      <div style={{display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <span style={{fontSize: 26, fontWeight: 700, color: brand.colors.text}}>{c.name}</span>
          <ChannelChip channel={c.channel} size={20} />
        </div>
        <div style={{fontSize: 32, fontWeight: 600, lineHeight: 1.2, color: brand.colors.text}}>{message}</div>
      </div>
    </div>
  );
};
