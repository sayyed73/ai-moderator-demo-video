import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {brand, derived, fontFamily} from '../config/brand';
import {content} from '../config/content';
import {t} from '../config/timing';
import {customers, takeoverChat} from '../data/demo';
import {AnimatedCursor} from '../components/AnimatedCursor';
import {Avatar} from '../components/Avatar';
import {ChannelChip} from '../components/ChannelChip';
import {ChatBubble} from '../components/ChatBubble';
import {DashboardShell} from '../components/DashboardShell';
import {Headline} from '../components/Headline';
import {Highlight} from '../components/Highlight';
import {StatusBadge} from '../components/StatusBadge';
import {TypingIndicator} from '../components/TypingIndicator';
import {easeOut, progress} from '../lib/timeline';

const at = t.humanTakeover;
const SHELL = {x: 64, y: 400, w: 952, h: 850};
const BODY_H = SHELL.h - 76;
const BANNER = {left: 32, right: 32, height: 150, bottom: 140};
const bannerTop = BODY_H - BANNER.bottom - BANNER.height;
const BUTTON = {w: 210, h: 68};
// Canvas position of the "Take over" button centre.
const BUTTON_CENTER = {
  x: SHELL.x + SHELL.w - BANNER.right - 28 - BUTTON.w / 2,
  y: SHELL.y + 76 + bannerTop + BANNER.height / 2,
};

const PauseIcon: React.FC = () => (
  <div style={{display: 'flex', gap: 7}}>
    {[0, 1].map((i) => (
      <div key={i} style={{width: 9, height: 28, borderRadius: 3, background: derived.accentDark}} />
    ))}
  </div>
);

/** Scene 5 - a sensitive request needs a human; the merchant takes over and AI replies pause. */
export const HumanTakeoverScene: React.FC = () => {
  const frame = useCurrentFrame();
  const customer = customers[takeoverChat.customerId];
  const taken = frame >= at.takeover;
  const attention = progress(frame, at.attention, 16, easeOut);
  const paused = progress(frame, at.takeover + 4, 16, easeOut);
  const preparing = frame >= at.aiPreparing[0] && frame < at.aiPreparing[1] && !taken;
  const pressed = frame >= at.click - 2 && frame < at.click + 5;
  const bannerHighlight = progress(frame, at.attention + 8, 10) * (taken ? 0 : 1);
  const shellIn = progress(frame, 4, 26, easeOut);

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 64, top: 96, width: 952}}>
        <Headline text={content.takeover.headline} at={at.headlineIn} size={80} />
      </div>
      <div style={{position: 'absolute', left: SHELL.x, top: SHELL.y, opacity: shellIn, translate: `0 ${(1 - shellIn) * 50}px`}}>
        <DashboardShell width={SHELL.w} height={SHELL.h} section={content.inbox.listTitle}>
          <div style={{fontFamily, color: brand.colors.text}}>
            {/* header */}
            <div style={{height: 104, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1.5px solid ${brand.colors.border}`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                <Avatar name={customer.name} size={62} />
                <div style={{fontSize: 34, fontWeight: 800}}>{customer.name}</div>
                <ChannelChip channel={customer.channel} size={22} />
              </div>
              <div style={{scale: String(1 + 0.14 * Math.sin(Math.PI * progress(frame - at.takeover, 0, 14))), transformOrigin: 'right center'}}>
                <StatusBadge kind={taken ? 'human' : 'ai'} label={taken ? content.takeover.humanHandling : content.takeover.aiHandling} size={26} />
              </div>
            </div>
            {/* messages */}
            <div style={{padding: '30px 32px', display: 'flex', flexDirection: 'column', gap: 20}}>
              <ChatBubble text={takeoverChat.earlier} variant="plain" align="left" fontSize={30} maxWidth={620} />
              {frame >= at.customerMsg && (
                <ChatBubble text={takeoverChat.request} variant="plain" align="left" age={frame - at.customerMsg} fontSize={30} maxWidth={620} />
              )}
              {preparing && (
                <div style={{alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8}}>
                  <div style={{fontSize: 22, fontWeight: 600, color: derived.accentDark}}>{content.takeover.aiPreparing}</div>
                  <TypingIndicator align="right" variant="tint" />
                </div>
              )}
            </div>
          </div>
          {/* attention banner -> paused card */}
          <div
            style={{
              position: 'absolute',
              left: BANNER.left,
              right: BANNER.right,
              top: bannerTop,
              height: BANNER.height,
              boxSizing: 'border-box',
              padding: '0 28px',
              borderRadius: brand.radii.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: taken ? brand.colors.accentTint : brand.colors.dangerTint,
              opacity: frame >= at.attention ? Math.max(attention, taken ? 1 : 0) : 0,
              translate: `0 ${(1 - attention) * 24}px`,
              fontFamily,
            }}
          >
            {!taken ? (
              <>
                <div style={{display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start'}}>
                  <StatusBadge kind="attention" label={content.takeover.attention} size={28} />
                  <div style={{fontSize: 25, fontWeight: 600, color: brand.colors.textMuted}}>{content.takeover.attentionHint}</div>
                </div>
                <div style={{width: BUTTON.w, height: BUTTON.h, borderRadius: brand.radii.pill, background: brand.colors.text, color: brand.colors.background, fontSize: 30, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', scale: pressed ? '0.95' : '1'}}>
                  {content.takeover.takeOverButton}
                </div>
              </>
            ) : (
              <div style={{display: 'flex', alignItems: 'center', gap: 22, opacity: paused}}>
                <PauseIcon />
                <div>
                  <div style={{fontSize: 32, fontWeight: 800, color: derived.accentDark}}>{content.takeover.pausedTitle}</div>
                  <div style={{fontSize: 25, fontWeight: 600, color: brand.colors.textMuted, marginTop: 4}}>{content.takeover.pausedHint}</div>
                </div>
              </div>
            )}
            {!taken && <Highlight amount={bannerHighlight} inset={-8} />}
          </div>
          {/* composer */}
          <div style={{position: 'absolute', left: 32, right: 32, bottom: 28, height: 84, display: 'flex', alignItems: 'center', gap: 20, fontFamily}}>
            <div style={{flex: 1, height: 84, borderRadius: brand.radii.pill, border: `1.5px solid ${taken ? brand.colors.accent : brand.colors.border}`, background: taken ? brand.colors.surface : brand.colors.surfaceSoft, display: 'flex', alignItems: 'center', padding: '0 32px', fontSize: 28, color: brand.colors.textMuted}}>
              {content.takeover.composerPlaceholder}
            </div>
            <div style={{fontSize: 24, fontWeight: 700, color: taken ? brand.colors.warning : derived.accentDark, background: taken ? brand.colors.warningTint : brand.colors.accentTint, padding: '14px 24px', borderRadius: brand.radii.pill, whiteSpace: 'nowrap'}}>
              {content.takeover.autoReplyLabel}: {taken ? content.takeover.autoReplyPaused : content.takeover.autoReplyOn}
            </div>
          </div>
        </DashboardShell>
      </div>
      <AnimatedCursor
        keys={[
          {frame: at.cursorStart, x: 900, y: 760},
          {frame: at.cursorAtButton, x: BUTTON_CENTER.x + 30, y: BUTTON_CENTER.y + 8},
          {frame: at.click + 40, x: BUTTON_CENTER.x + 30, y: BUTTON_CENTER.y + 8},
        ]}
        clicks={[at.click]}
      />
    </AbsoluteFill>
  );
};
