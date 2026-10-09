import {AbsoluteFill, Freeze, useCurrentFrame} from 'remotion';
import {content} from '../config/content';
import {scenes, t} from '../config/timing';
import {AnimatedCursor} from '../components/AnimatedCursor';
import {ConversationStage} from '../components/ConversationStage';
import {DashboardShell} from '../components/DashboardShell';
import {Headline} from '../components/Headline';
import {Highlight} from '../components/Highlight';
import {ORDER_BUTTON_CENTER, ORDER_CARD, OrderCard} from '../components/OrderCard';
import {easeInOut, easeOut, mix, progress} from '../lib/timeline';

const at = t.orderApproval;
const SHELL = {x: 64, y: 400, w: 952, h: 850};
const CARD = {x: SHELL.x + (SHELL.w - ORDER_CARD.w) / 2, y: SHELL.y + 76 + (SHELL.h - 76 - ORDER_CARD.h) / 2};
const BUTTON = {x: CARD.x + ORDER_BUTTON_CENTER.x, y: CARD.y + ORDER_BUTTON_CENTER.y};

/** Scene 4 - the chat turns into a pending order; the merchant approves it. */
export const OrderApprovalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const out = progress(frame, at.phoneOut[0], at.phoneOut[1] - at.phoneOut[0], easeInOut);
  const shellIn = progress(frame, at.cardIn, 28, easeOut);
  const approved = frame >= at.approved;
  const pressed = frame >= at.click - 2 && frame < at.click + 5;
  const buttonHighlight = progress(frame, at.cursorAtButton - 8, 10) * (approved ? 0 : 1);

  return (
    <AbsoluteFill>
      {out < 1 && (
        <AbsoluteFill style={{opacity: 1 - out, scale: String(mix(1, 0.62, out)), translate: `${out * 120}px ${out * 160}px`, transformOrigin: '50% 50%'}}>
          <Freeze frame={scenes.conversation.duration - 1}>
            <ConversationStage />
          </Freeze>
        </AbsoluteFill>
      )}
      <div style={{position: 'absolute', left: 64, top: 96, width: 952}}>
        <Headline text={content.order.headline} at={at.headlineIn} subtext={content.order.subtext} subtextAt={at.subtextIn} size={80} />
      </div>
      <div style={{position: 'absolute', left: SHELL.x, top: SHELL.y, opacity: shellIn, translate: `0 ${(1 - shellIn) * 60}px`, scale: String(0.94 + shellIn * 0.06)}}>
        <DashboardShell width={SHELL.w} height={SHELL.h} section={content.order.sectionTitle}>
          <div style={{position: 'absolute', left: (SHELL.w - ORDER_CARD.w) / 2, top: (SHELL.h - 76 - ORDER_CARD.h) / 2}}>
            <OrderCard approved={approved} pressed={pressed} badgeAge={frame - at.approved} />
            <div style={{position: 'absolute', left: ORDER_CARD.pad, right: ORDER_CARD.pad, bottom: ORDER_CARD.pad, height: ORDER_CARD.buttonH}}>
              <Highlight amount={buttonHighlight} inset={-8} />
            </div>
          </div>
        </DashboardShell>
      </div>
      <AnimatedCursor
        keys={[
          {frame: at.cursorStart, x: 930, y: 800},
          {frame: at.cursorAtButton, x: BUTTON.x + 40, y: BUTTON.y + 6},
          {frame: at.click + 30, x: BUTTON.x + 40, y: BUTTON.y + 6},
        ]}
        clicks={[at.click]}
      />
    </AbsoluteFill>
  );
};
