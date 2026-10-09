import {useCurrentFrame} from 'remotion';
import {content} from '../config/content';
import {t} from '../config/timing';
import {demoOrder, products, purchaseChat, stockFor} from '../data/demo';
import {PHONE_POS} from '../lib/layout';
import {easeOut, progress} from '../lib/timeline';
import {FloatingNote} from './FloatingNote';
import {PhoneConversation} from './PhoneConversation';

const at = t.conversation;

/** Scene 3 visual: the phone chat plus floating notes. Frame is relative to scene 3. */
export const ConversationStage: React.FC = () => {
  const frame = useCurrentFrame();
  const p = progress(frame, at.phoneIn, 26, easeOut);
  const product = products[purchaseChat.productId];
  const stock = stockFor(product, purchaseChat.requestedSize);
  const line = demoOrder.lines[0];
  const noteExit = 1 - progress(frame, at.toDelivery - 6, 12);
  const showInventory = frame >= at.inventoryTag && frame < at.customer2 + 40;
  const showDraft = frame >= at.assistant2;
  return (
    <>
      <div style={{position: 'absolute', left: PHONE_POS.x, top: PHONE_POS.y, opacity: p, translate: `0 ${(1 - p) * 90}px`, scale: String(0.95 + p * 0.05)}}>
        <PhoneConversation />
      </div>
      <div style={{position: 'absolute', left: 696, top: 470, opacity: noteExit}}>
        {showInventory && !showDraft && (
          <FloatingNote
            title={content.chat.inventoryCheckTitle}
            main={product.name}
            detail={`Size ${purchaseChat.requestedSize} · ${stock} ${content.chat.inStockLabel.toLowerCase()}`}
            footnote={content.chat.inventorySource}
            age={frame - at.inventoryTag}
          />
        )}
        {showDraft && (
          <FloatingNote
            title={content.chat.orderDraftTitle}
            main={`${line.quantity} × ${product.name}, ${line.size}`}
            detail={content.chat.orderDraftHint}
            age={frame - at.assistant2}
          />
        )}
      </div>
    </>
  );
};
