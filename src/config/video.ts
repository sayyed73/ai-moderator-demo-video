/**
 * Video format settings.
 * NOTE: npm scripts in package.json refer to the composition ID "ProductDemo".
 * If you change `id`, change it in package.json too.
 */
export const video = {
  id: 'ProductDemo',
  width: 1080, // 1080 x 1350 = 4:5 portrait
  height: 1350,
  fps: 30,
  locale: 'en-US',
  /**
   * 'USD' | 'EUR' | 'GBP'. This only changes how amounts are *formatted*
   * (symbol, separators). It does NOT convert exchange rates: 4900 minor
   * units stays "49", whatever the currency. Edit prices in src/data/demo.ts.
   */
  currency: 'USD' as 'USD' | 'EUR' | 'GBP',
  /** Keep important content inside these margins (px). */
  safeMargin: {x: 64, top: 96, bottom: 120},
};
