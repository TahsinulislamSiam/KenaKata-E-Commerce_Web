import { CURRENCY } from './constants';

/** Format an amount as Bangladeshi Taka, e.g. 149999 -> "৳1,49,999" (lakh/crore grouping). */
export function formatPrice(amount) {
  const safe = Number.isFinite(Number(amount)) ? Number(amount) : 0;
  return CURRENCY + new Intl.NumberFormat('en-IN').format(Math.round(safe));
}

/** Discount percentage between original and discounted price, e.g. 84999 -> 74999 gives 12. */
export function getDiscountPercent(price, discountPrice) {
  if (!price || !discountPrice || discountPrice >= price) return 0;
  return Math.round((1 - discountPrice / price) * 100);
}

/** Compact review counts, e.g. 12845 -> "12.8k". */
export function formatCount(count) {
  const n = Number(count) || 0;
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

/** "2026-03-18" -> "18 Mar 2026". */
export function formatDate(isoString, opts = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-GB', opts).format(date);
}

/** Date a few days from now (used for mock delivery estimates). */
export function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}
