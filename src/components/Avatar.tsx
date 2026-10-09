import {brand, fontFamily} from '../config/brand';
import {ChannelId} from '../data/demo';
import {ChannelDot} from './ChannelChip';

const tints = ['#E7DDF7', '#FBE3D2', '#D9ECF8', '#F7E1E8', '#E5EFCF'];

/** Initials avatar, optional channel dot in the corner. Colour is derived from the name (deterministic). */
export const Avatar: React.FC<{name: string; size?: number; channel?: ChannelId}> = ({name, size = 56, channel}) => {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  const tint = tints[name.length % tints.length];
  return (
    <div style={{position: 'relative', width: size, height: size, flexShrink: 0}}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: tint,
          color: brand.colors.text,
          fontFamily,
          fontWeight: 700,
          fontSize: size * 0.38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {initials}
      </div>
      {channel && (
        <div style={{position: 'absolute', right: -3, bottom: -3, padding: 3, background: brand.colors.surface, borderRadius: '50%'}}>
          <ChannelDot channel={channel} size={size * 0.26} />
        </div>
      )}
    </div>
  );
};
