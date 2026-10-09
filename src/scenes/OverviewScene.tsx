import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {brand, derived, fontFamily} from '../config/brand';
import {content} from '../config/content';
import {t} from '../config/timing';
import {channels, overviewCounts} from '../data/demo';
import {ChannelDot} from '../components/ChannelChip';
import {DashboardShell} from '../components/DashboardShell';
import {Headline} from '../components/Headline';
import {Highlight} from '../components/Highlight';
import {easeInOut, easeOut, mix, progress} from '../lib/timeline';

const at = t.overview;
const SHELL = {x: 64, y: 400, w: 952, h: 850};
const TILE = {w: 428, h: 214};

type TileProps = {label: string; from: number; to: number; index: number; highlight?: boolean};

const Tile: React.FC<TileProps> = ({label, from, to, index, highlight}) => {
  const frame = useCurrentFrame();
  const enter = progress(frame, at.tiles[index], 22, easeOut);
  const count = progress(frame, at.countUp[0], at.countUp[1] - at.countUp[0], easeInOut);
  const value = Math.round(mix(from, to, count));
  const changed = from !== to;
  const pop = changed ? 1 + 0.1 * Math.sin(Math.PI * progress(frame, at.countUp[1] - 6, 14)) : 1;
  return (
    <div style={{position: 'relative', width: TILE.w, height: TILE.h, opacity: enter, translate: `0 ${(1 - enter) * 30}px`}}>
      <div style={{width: '100%', height: '100%', boxSizing: 'border-box', padding: '28px 32px', borderRadius: brand.radii.md, background: brand.colors.surface, border: `1.5px solid ${brand.colors.border}`, boxShadow: brand.shadows.card, fontFamily}}>
        <div style={{fontSize: 28, fontWeight: 600, color: brand.colors.textMuted}}>{label}</div>
        <div style={{fontSize: 112, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginTop: 6, scale: String(pop), transformOrigin: 'left center', color: highlight ? derived.accentDark : brand.colors.text}}>{value}</div>
      </div>
      {highlight && <Highlight amount={progress(frame, at.highlight, 12)} inset={-8} />}
    </div>
  );
};

/** Scene 6 - overview tiles. Counts come from src/data/demo.ts and match the earlier scenes. */
export const OverviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const c = overviewCounts();
  const shellIn = progress(frame, 4, 26, easeOut);
  const channelIn = progress(frame, at.tiles[3] + 6, 24, easeOut);
  const o = content.overview;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 64, top: 96, width: 952}}>
        <Headline text={o.headline} at={at.headlineIn} size={80} />
      </div>
      <div style={{position: 'absolute', left: SHELL.x, top: SHELL.y, opacity: shellIn, translate: `0 ${(1 - shellIn) * 50}px`}}>
        <DashboardShell width={SHELL.w} height={SHELL.h} section={o.dashboardTitle}>
          <div style={{padding: 32, display: 'flex', flexWrap: 'wrap', gap: 24}}>
            {/* "from" values = state before the demo: every chat on AI, no approved orders */}
            <Tile index={0} label={o.openConversations} from={c.open} to={c.open} />
            <Tile index={1} label={o.aiHandling} from={c.open} to={c.ai} />
            <Tile index={2} label={o.humanHandling} from={0} to={c.human} highlight />
            <Tile index={3} label={o.ordersApproved} from={0} to={c.ordersApproved} highlight />
            <div style={{width: '100%', boxSizing: 'border-box', padding: '26px 32px', borderRadius: brand.radii.md, background: brand.colors.surface, border: `1.5px solid ${brand.colors.border}`, fontFamily, opacity: channelIn, translate: `0 ${(1 - channelIn) * 30}px`}}>
              <div style={{fontSize: 28, fontWeight: 600, color: brand.colors.textMuted, marginBottom: 14}}>{o.byChannel}</div>
              {c.byChannel.map((ch) => (
                <div key={ch.id} style={{display: 'flex', alignItems: 'center', gap: 18, height: 52, fontSize: 28, fontWeight: 600}}>
                  <ChannelDot channel={ch.id} size={18} />
                  <span style={{width: 170}}>{channels[ch.id].label}</span>
                  <div style={{flex: 1, height: 18, borderRadius: 9, background: brand.colors.surfaceSoft}}>
                    <div style={{width: `${(ch.count / c.open) * 100 * channelIn}%`, height: '100%', borderRadius: 9, background: brand.channelColors[ch.id]}} />
                  </div>
                  <span style={{width: 40, textAlign: 'right', fontWeight: 800}}>{ch.count}</span>
                </div>
              ))}
            </div>
          </div>
        </DashboardShell>
      </div>
    </AbsoluteFill>
  );
};
