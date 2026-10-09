import {AbsoluteFill, Freeze, useCurrentFrame} from 'remotion';
import {brand, fontFamily} from '../config/brand';
import {content} from '../config/content';
import {t} from '../config/timing';
import {selectedCustomerId, takeoverCustomerId} from '../data/demo';
import {DashboardShell} from '../components/DashboardShell';
import {Headline} from '../components/Headline';
import {InboxPanels} from '../components/InboxPanels';
import {Wordmark} from '../components/LogoMark';
import {PhoneConversation} from '../components/PhoneConversation';
import {INBOX} from '../lib/layout';
import {easeOut, progress} from '../lib/timeline';

const at = t.closing;
const DASH_SCALE = 0.62;
const PHONE_SCALE = 0.5;

/** Scene 7 - wordmark, phone + dashboard, closing line and a calm hold. */
export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const comp = progress(frame, at.compositionIn, 30, easeOut);
  const mark = progress(frame, at.wordmark, 20, easeOut);
  const footer = progress(frame, at.footer, 20, easeOut);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 64, top: 90, opacity: mark, translate: `0 ${(1 - mark) * 20}px`}}>
        <Wordmark size={72} />
      </div>
      <div style={{position: 'absolute', left: 64, top: 210, width: 952}}>
        <Headline text={content.closing.headline} at={at.headline} size={80} subtext={content.closing.subtext} subtextAt={at.subtext} />
      </div>
      <div style={{position: 'absolute', left: 64, top: 650, opacity: comp, translate: `0 ${(1 - comp) * 60}px`, scale: String(DASH_SCALE), transformOrigin: '0 0'}}>
        <DashboardShell width={INBOX.w} height={INBOX.h} section={content.inbox.listTitle}>
          <InboxPanels selectedId={selectedCustomerId} humanIds={[takeoverCustomerId]} />
        </DashboardShell>
      </div>
      <div style={{position: 'absolute', left: 664, top: 615, opacity: comp, translate: `0 ${(1 - comp) * 90}px`, scale: String(PHONE_SCALE), transformOrigin: '0 0'}}>
        <Freeze frame={t.conversation.assistant2 + 30}>
          <PhoneConversation />
        </Freeze>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1218, textAlign: 'center', fontFamily, fontSize: 26, fontWeight: 600, color: brand.colors.textMuted, opacity: footer}}>
        {content.closing.footer}
      </div>
    </AbsoluteFill>
  );
};
