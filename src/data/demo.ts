/**
 * ALL fictional sample data lives here: customers, chats, products, orders, counts.
 * Money is stored in MINOR units (4900 = 49.00). Components never hardcode these values.
 */
import {formatCurrency} from '../lib/formatCurrency';

export type ChannelId = 'messenger' | 'instagram' | 'whatsapp';
export type Handling = 'ai' | 'human';

export const channels: Record<ChannelId, {label: string}> = {
  messenger: {label: 'Messenger'},
  instagram: {label: 'Instagram'},
  whatsapp: {label: 'WhatsApp'},
};

// ---------- Products & inventory ----------
export const products = {
  hoodie: {
    id: 'hoodie',
    name: 'Navy Everyday Hoodie',
    image: 'images/navy-hoodie.svg', // file in public/
    priceMinor: 4900,
    variants: [
      {size: 'S', stock: 3},
      {size: 'M', stock: 0},
      {size: 'L', stock: 12},
      {size: 'XL', stock: 4},
    ],
  },
};
export type Product = typeof products.hoodie;

export const stockFor = (product: Product, size: string) =>
  product.variants.find((v) => v.size === size)?.stock ?? 0;

// ---------- Customers & inbox ----------
export const customers = {
  maya: {id: 'maya', name: 'Maya Brooks', channel: 'instagram' as ChannelId, handle: '@maya.brooks', lastActive: 'Just now'},
  priya: {id: 'priya', name: 'Priya Nair', channel: 'messenger' as ChannelId, handle: 'Priya Nair', lastActive: '3 min ago'},
  leo: {id: 'leo', name: 'Leo Martins', channel: 'whatsapp' as ChannelId, handle: '+1 555 0142', lastActive: '6 min ago'},
  tom: {id: 'tom', name: 'Tom Becker', channel: 'instagram' as ChannelId, handle: '@tombecker', lastActive: '9 min ago'},
  hannah: {id: 'hannah', name: 'Hannah Cole', channel: 'messenger' as ChannelId, handle: 'Hannah Cole', lastActive: 'Just now'},
  jonas: {id: 'jonas', name: 'Jonas Weber', channel: 'whatsapp' as ChannelId, handle: '+1 555 0177', lastActive: '14 min ago'},
};
export type CustomerId = keyof typeof customers;

export type InboxItem = {
  customerId: CustomerId;
  preview: string;
  time: string;
  handling: Handling; // starting state; the takeover scene changes Hannah to 'human'
};

/** Order = list order in the inbox. */
export const inbox: InboxItem[] = [
  {customerId: 'maya', preview: 'Do you have the navy hoodie in large?', time: 'now', handling: 'ai'},
  {customerId: 'priya', preview: 'Is this available in medium?', time: '3m', handling: 'ai'},
  {customerId: 'leo', preview: 'How much is delivery?', time: '6m', handling: 'ai'},
  {customerId: 'tom', preview: 'Can I place an order?', time: '9m', handling: 'ai'},
  {customerId: 'hannah', preview: 'Hi! My order arrived yesterday.', time: '11m', handling: 'ai'},
  {customerId: 'jonas', preview: 'Thanks, that helps!', time: '14m', handling: 'ai'},
];

/** Which inbox customer is "selected" in the unified-inbox scene. */
export const selectedCustomerId: CustomerId = 'maya';
/** The three scattered messages of the problem scene (by customer). */
export const problemCustomerIds: CustomerId[] = ['priya', 'leo', 'tom'];
/** The customer whose conversation needs a human in the takeover scene. */
export const takeoverCustomerId: CustomerId = 'hannah';

// ---------- Scene 3: purchase chat ----------
export const purchaseChat = {
  customerId: 'maya' as CustomerId,
  requestedSize: 'L',
  quantity: 1,
  productId: 'hoodie' as keyof typeof products,
  customer1: 'Do you have the navy hoodie in large?',
  assistant1: (price: string) => `Yes—size L is available. It’s ${price}.`,
  customer2: 'I’ll take one.',
  assistant2: 'Great. Where should we send it?',
};

export const purchaseMessages = () => {
  const p = products[purchaseChat.productId];
  return {
    customer1: purchaseChat.customer1,
    assistant1: purchaseChat.assistant1(formatCurrency(p.priceMinor)),
    customer2: purchaseChat.customer2,
    assistant2: purchaseChat.assistant2,
  };
};

// ---------- Scene 4: order ----------
export const demoOrder = {
  id: '#1042',
  customerId: 'maya' as CustomerId,
  lines: [{productId: 'hoodie' as keyof typeof products, size: 'L', quantity: 1}],
  deliveryMinor: 500,
};

/** Totals are always calculated from the data above. */
export const orderTotals = (order = demoOrder) => {
  const itemsMinor = order.lines.reduce(
    (sum, l) => sum + products[l.productId].priceMinor * l.quantity,
    0,
  );
  return {itemsMinor, deliveryMinor: order.deliveryMinor, totalMinor: itemsMinor + order.deliveryMinor};
};

// ---------- Scene 5: human takeover ----------
export const takeoverChat = {
  customerId: takeoverCustomerId,
  /** Earlier message = the preview shown in the inbox list. */
  earlier: inbox.find((i) => i.customerId === takeoverCustomerId)?.preview ?? '',
  request: 'Can you make an exception to your return policy?',
};

// ---------- Scene 6: overview counts (derived) ----------
/** Counts AFTER the demo: Maya's order approved and Hannah moved to human handling. */
export const overviewCounts = () => {
  const handled = inbox.map((i) => (i.customerId === takeoverCustomerId ? 'human' : i.handling));
  const byChannel = (Object.keys(channels) as ChannelId[]).map((id) => ({
    id,
    count: inbox.filter((i) => customers[i.customerId].channel === id).length,
  }));
  return {
    open: inbox.length,
    ai: handled.filter((h) => h === 'ai').length,
    human: handled.filter((h) => h === 'human').length,
    ordersApproved: 1, // the one order approved in scene 4
    byChannel,
  };
};
