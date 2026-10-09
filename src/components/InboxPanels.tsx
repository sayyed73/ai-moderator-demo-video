import {brand, derived, fontFamily} from '../config/brand';
import {content} from '../config/content';
import {customers, CustomerId, inbox, products, purchaseChat, purchaseMessages, Handling} from '../data/demo';
import {INBOX} from '../lib/layout';
import {Avatar} from './Avatar';
import {ChannelChip} from './ChannelChip';
import {ChatBubble} from './ChatBubble';
import {StatusBadge} from './StatusBadge';
import {DASH_BAR} from './DashboardShell';

type Props = {
  /** null = nothing selected yet. */
  selectedId: CustomerId | null;
  /** 0..1 visibility of the conversation + customer columns. */
  detailAmount?: number;
  /** Opacity per inbox row (same order as `inbox` in demo.ts). Default: all visible. */
  rowOpacity?: number[];
  /** Customers currently under human handling (shown in the list). */
  humanIds?: CustomerId[];
};

const BODY_H = INBOX.h - DASH_BAR;

const Label: React.FC<{children: string}> = ({children}) => (
  <div style={{fontSize: 20, fontWeight: 600, color: brand.colors.textMuted, marginBottom: 4}}>{children}</div>
);

const List: React.FC<Props> = ({selectedId, rowOpacity, humanIds = []}) => (
  <div style={{width: INBOX.listW, height: BODY_H, borderRight: `1.5px solid ${brand.colors.border}`, boxSizing: 'border-box'}}>
    <div style={{height: INBOX.listHeader, padding: '0 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <span style={{fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em'}}>{content.inbox.listTitle}</span>
      <span style={{fontSize: 22, fontWeight: 600, color: brand.colors.textMuted}}>
        {inbox.length} {content.inbox.openSuffix}
      </span>
    </div>
    {inbox.map((item, i) => {
      const c = customers[item.customerId];
      const selected = item.customerId === selectedId;
      const handling: Handling = humanIds.includes(item.customerId) ? 'human' : item.handling;
      return (
        <div key={item.customerId} style={{height: INBOX.rowH, padding: `${INBOX.rowPad}px 10px`, boxSizing: 'border-box', opacity: rowOpacity?.[i] ?? 1}}>
          <div
            style={{
              height: '100%',
              borderRadius: brand.radii.md,
              background: selected ? brand.colors.accentTint : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '0 14px',
              boxSizing: 'border-box',
            }}
          >
            <Avatar name={c.name} size={52} channel={c.channel} />
            <div style={{flex: 1, minWidth: 0}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <span style={{fontSize: 24, fontWeight: 700, whiteSpace: 'nowrap'}}>{c.name.split(' ')[0]}</span>
                <span style={{fontSize: 20, color: brand.colors.textMuted, fontWeight: 500}}>{item.time}</span>
              </div>
              <div style={{fontSize: 21, color: handling === 'human' ? derived.accentDark : brand.colors.textMuted, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                {handling === 'human' ? content.takeover.humanHandling : item.preview}
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

const Conversation: React.FC<{selectedId: CustomerId}> = ({selectedId}) => {
  const c = customers[selectedId];
  const m = purchaseMessages();
  return (
    <div style={{width: INBOX.convW, height: BODY_H, borderRight: `1.5px solid ${brand.colors.border}`, boxSizing: 'border-box', display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: '18px 22px', borderBottom: `1.5px solid ${brand.colors.border}`, display: 'flex', flexDirection: 'column', gap: 10}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Avatar name={c.name} size={48} />
          <span style={{fontSize: 28, fontWeight: 800}}>{c.name}</span>
        </div>
        <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
          <ChannelChip channel={c.channel} size={20} />
          <StatusBadge kind="ai" label={content.takeover.aiHandling} size={20} />
        </div>
      </div>
      <div style={{flex: 1, padding: 22, display: 'flex', flexDirection: 'column', gap: 16, background: brand.colors.surfaceSoft}}>
        <ChatBubble text={m.customer1} variant="plain" align="left" fontSize={22} maxWidth={320} />
        <ChatBubble text={m.assistant1} variant="tint" align="right" fontSize={22} maxWidth={320} label={`${content.chat.assistantName} · ${content.chat.aiTag}`} />
      </div>
    </div>
  );
};

const CustomerPanel: React.FC<{selectedId: CustomerId}> = ({selectedId}) => {
  const c = customers[selectedId];
  const product = products[purchaseChat.productId];
  return (
    <div style={{width: INBOX.custW, height: BODY_H, padding: 22, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18}}>
      <div style={{fontSize: 22, fontWeight: 700, color: brand.colors.textMuted}}>{content.inbox.customerPanelTitle}</div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
        <Avatar name={c.name} size={92} channel={c.channel} />
        <div style={{fontSize: 28, fontWeight: 800}}>{c.name}</div>
        <div style={{fontSize: 21, color: brand.colors.textMuted, fontWeight: 500}}>{c.handle}</div>
      </div>
      <div>
        <Label>{content.inbox.channelLabel}</Label>
        <ChannelChip channel={c.channel} size={21} />
      </div>
      <div>
        <Label>{content.inbox.lastActiveLabel}</Label>
        <div style={{fontSize: 23, fontWeight: 600}}>{c.lastActive}</div>
      </div>
      <div>
        <Label>{content.inbox.handlingLabel}</Label>
        <StatusBadge kind="ai" label={content.takeover.aiHandling} size={21} />
      </div>
      <div>
        <Label>{content.inbox.interestLabel}</Label>
        <div style={{fontSize: 23, fontWeight: 600, lineHeight: 1.25}}>
          {product.name} · {purchaseChat.requestedSize}
        </div>
      </div>
    </div>
  );
};

/** The three columns of the unified inbox: list | selected conversation | customer panel. */
export const InboxPanels: React.FC<Props> = (props) => (
  <div style={{display: 'flex', fontFamily, color: brand.colors.text, height: BODY_H}}>
    <List {...props} />
    <div style={{display: 'flex', opacity: props.detailAmount ?? 1, translate: `${(1 - (props.detailAmount ?? 1)) * 24}px 0`}}>
      <Conversation selectedId={props.selectedId ?? 'maya'} />
      <CustomerPanel selectedId={props.selectedId ?? 'maya'} />
    </div>
  </div>
);
