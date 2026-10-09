import {video} from '../config/video';

/**
 * Format an amount given in MINOR units (cents/pence) using the currency and
 * locale from src/config/video.ts. Whole amounts drop the decimals ($49, not $49.00).
 * This is formatting only - it never converts between currencies.
 */
export const formatCurrency = (
  amountMinor: number,
  currency: string = video.currency,
  locale: string = video.locale,
): string => {
  const major = amountMinor / 100;
  const whole = amountMinor % 100 === 0;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(major);
};
