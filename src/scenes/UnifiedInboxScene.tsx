import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {content} from '../config/content';
import {t} from '../config/timing';
import {inbox, problemCustomerIds, selectedCustomerId} from '../data/demo';
import {DASH_BAR, DashboardShell} from '../components/DashboardShell';
import {Headline} from '../components/Headline';
import {Highlight} from '../components/Highlight';
import {InboxPanels} from '../components/InboxPanels';
import {MessageCard} from '../components/MessageCard';
import {INBOX, INBOX_ROW_W, SCATTER_CARD_W, SCATTER_POSES, inboxRowOrigin} from '../lib/layout';
import {easeInOut, easeOut, mix, progress} from '../lib/timeline';

const at = t.unifiedInbox;

/** Scene 2 - scattered cards fly into one inbox, then the view zooms to the selected customer. */
export const UnifiedInboxScene: React.FC = () => {
  const frame = useCurrentFrame();
  const [flyStart, flyEnd] = at.cardsToList;
  const zoom = progress(frame, at.zoomStart, at.zoomEnd - at.zoomStart, easeInOut);
  const shellIn = progress(frame, at.shellIn, 24);
  const selected = frame >= at.selectRow;
  const rowOpacity = inbox.map((item, i) => {
    const flying = problemCustomerIds.indexOf(item.customerId);
    if (flying >= 0) return progress(frame, flyEnd - 4 + flying * 2, 10);
    return progress(frame, flyEnd - 14 + i * 3, 14);
  });
  const rowHighlight = progress(frame, at.selectRow, 10) * (1 - progress(frame, at.panelHighlight, 10));
  const panelHighlight = progress(frame, at.panelHighlight, 12);
  const headlineGone = progress(frame, at.zoomStart - 6, 12);

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 64, top: 100, width: 952, opacity: 1 - headlineGone}}>
        <Headline text={content.inbox.headline} at={at.headlineIn} size={76} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: INBOX.x,
          top: INBOX.y,
          opacity: shellIn,
          transformOrigin: '100% 0',
          scale: String(mix(1, 1.32, zoom)),
          translate: `0 ${mix(0, -250, zoom)}px`,
        }}
      >
        <DashboardShell width={INBOX.w} height={INBOX.h} section={content.inbox.listTitle}>
          <InboxPanels
            selectedId={selected ? selectedCustomerId : null}
            detailAmount={progress(frame, at.selectRow, 16)}
            rowOpacity={rowOpacity}
          />
          <div style={{position: 'absolute', left: 10, top: INBOX.listHeader + INBOX.rowPad, width: INBOX.listW - 20, height: INBOX.rowH - 12}}>
            <Highlight amount={rowHighlight} inset={-4} />
          </div>
          <div style={{position: 'absolute', left: INBOX.listW + INBOX.convW, top: 0, width: INBOX.custW, height: INBOX.h - DASH_BAR}}>
            <Highlight amount={panelHighlight} inset={4} radius={16} />
          </div>
        </DashboardShell>
      </div>
      {problemCustomerIds.map((id, i) => {
        const pose = SCATTER_POSES[i];
        const rowIndex = inbox.findIndex((x) => x.customerId === id);
        const row = inboxRowOrigin(rowIndex);
        const q = progress(frame, flyStart + i * 3, flyEnd - flyStart - i * 3, easeInOut);
        const fade = 1 - progress(frame, flyEnd - 2, 8);
        if (fade <= 0) return null;
        return (
          <div
            key={id}
            style={{
              position: 'absolute',
              left: mix(pose.x, row.x, q),
              top: mix(pose.y, row.y, q),
              rotate: `${mix(pose.rot, 0, q)}deg`,
              scale: String(mix(1, INBOX_ROW_W / SCATTER_CARD_W, q)),
              transformOrigin: '0 0',
              opacity: fade,
            }}
          >
            <MessageCard customerId={id} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
