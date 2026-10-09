import {brand, fontFamily} from '../config/brand';
import {ChannelId, channels} from '../data/demo';

export const ChannelDot: React.FC<{channel: ChannelId; size?: number}> = ({channel, size = 14}) => (
  <div style={{width: size, height: size, borderRadius: '50%', background: brand.channelColors[channel]}} />
);

/** Small pill naming the channel (Messenger / Instagram / WhatsApp). */
export const ChannelChip: React.FC<{channel: ChannelId; size?: number}> = ({channel, size = 22}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.4,
      padding: `${size * 0.25}px ${size * 0.6}px`,
      borderRadius: brand.radii.pill,
      background: brand.colors.surfaceSoft,
      border: `1.5px solid ${brand.colors.border}`,
      fontFamily,
      fontSize: size,
      fontWeight: 600,
      color: brand.colors.text,
      whiteSpace: 'nowrap',
    }}
  >
    <ChannelDot channel={channel} size={size * 0.55} />
    {channels[channel].label}
  </div>
);
