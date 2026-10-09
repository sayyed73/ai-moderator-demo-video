import {useCurrentFrame} from 'remotion';
import {brand, derived, fontFamily} from '../config/brand';
import {content} from '../config/content';
import {t} from '../config/timing';
import {customers, products, purchaseChat, purchaseMessages} from '../data/demo';
import {easeInOut, easeOut, progress} from '../lib/timeline';
import {Avatar} from './Avatar';
import {ChatBubble} from './ChatBubble';
import {PhoneMockup} from './PhoneMockup';
import {ProductCard} from './ProductCard';
import {TypingIndicator} from './TypingIndicator';

const at = t.conversation;

const DeliveryReceived: React.FC<{p: number}> = ({p}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: p,
      pointerEvents: 'none',
    }}
  >
    <div
      style={{
        width: 470,
        padding: '44px 36px',
        borderRadius: brand.radii.lg,
        background: brand.colors.surface,
        border: `1.5px solid ${brand.colors.border}`,
        boxShadow: brand.shadows.float,
        textAlign: 'center',
        scale: String(0.9 + p * 0.1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
      }}
    >
      <div style={{width: 96, height: 96, borderRadius: '50%', background: brand.colors.accent, color: brand.colors.onAccent, fontSize: 56, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</div>
      <div style={{fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12}}>{content.chat.deliveryReceivedTitle}</div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8, fontSize: 28, fontWeight: 600, color: derived.accentDark}}>
        {content.chat.deliveryReceivedFields.map((f) => (
          <div key={f}>✓ {f}</div>
        ))}
      </div>
      <div style={{fontSize: 24, color: brand.colors.textMuted, fontWeight: 500}}>{content.chat.deliveryReceivedHint}</div>
    </div>
  </div>
);

/** The customer's phone chat (scene 3). Frame is relative to the scene start. */
export const PhoneConversation: React.FC = () => {
  const frame = useCurrentFrame();
  const m = purchaseMessages();
  const customer = customers[purchaseChat.customerId];
  const product = products[purchaseChat.productId];
  const collapse = progress(frame, at.toDelivery, 20, easeInOut);
  const typing1 = frame >= at.typing1[0] && frame < at.typing1[1];
  const typing2 = frame >= at.typing2[0] && frame < at.typing2[1];
  const card = progress(frame, at.productCard, 22, easeOut);

  return (
    <PhoneMockup>
      <div style={{position: 'relative', width: '100%', height: '100%', fontFamily, color: brand.colors.text}}>
        {/* header */}
        <div style={{height: 104, display: 'flex', alignItems: 'center', gap: 16, padding: '0 28px', borderBottom: `1.5px solid ${brand.colors.border}`, background: brand.colors.surface}}>
          <Avatar name={brand.merchantName} size={58} />
          <div>
            <div style={{fontSize: 30, fontWeight: 800}}>{brand.merchantName}</div>
            <div style={{fontSize: 22, color: brand.colors.textMuted, fontWeight: 500}}>via {customer.channel === 'instagram' ? 'Instagram' : customer.channel}</div>
          </div>
        </div>
        {/* messages */}
        <div style={{position: 'absolute', top: 104, left: 0, right: 0, bottom: 104, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 18, opacity: 1 - collapse, scale: String(1 - collapse * 0.06), filter: `blur(${collapse * 6}px)`}}>
          {frame >= at.customer1 && <ChatBubble text={m.customer1} variant="accent" align="right" age={frame - at.customer1} fontSize={30} maxWidth={440} />}
          {typing1 && <TypingIndicator />}
          {frame >= at.assistant1 && <ChatBubble text={m.assistant1} variant="plain" align="left" age={frame - at.assistant1} fontSize={30} maxWidth={440} label={`${content.chat.assistantName} · ${content.chat.aiTag}`} />}
          {frame >= at.productCard && (
            <div style={{opacity: card, clipPath: `inset(0 ${(1 - card) * 100}% 0 0 round 20px)`, translate: `0 ${(1 - card) * 14}px`}}>
              <ProductCard product={product} size={purchaseChat.requestedSize} width={520} />
            </div>
          )}
          {frame >= at.customer2 && <ChatBubble text={m.customer2} variant="accent" align="right" age={frame - at.customer2} fontSize={30} />}
          {typing2 && <TypingIndicator />}
          {frame >= at.assistant2 && <ChatBubble text={m.assistant2} variant="plain" align="left" age={frame - at.assistant2} fontSize={30} maxWidth={440} />}
        </div>
        {/* input bar */}
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 104, padding: '0 24px', display: 'flex', alignItems: 'center', background: brand.colors.surface, borderTop: `1.5px solid ${brand.colors.border}`}}>
          <div style={{flex: 1, height: 62, borderRadius: brand.radii.pill, border: `1.5px solid ${brand.colors.border}`, background: brand.colors.surfaceSoft, display: 'flex', alignItems: 'center', padding: '0 26px', fontSize: 26, color: brand.colors.textMuted}}>
            {content.chat.inputPlaceholder}
          </div>
        </div>
        <DeliveryReceived p={collapse} />
      </div>
    </PhoneMockup>
  );
};
