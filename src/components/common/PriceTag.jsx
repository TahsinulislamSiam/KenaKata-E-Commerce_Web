import cn from '@/utils/cn';
import { formatPrice, getDiscountPercent } from '@/utils/format';

const SIZES = {
  sm: { price: 'text-base', old: 'text-xs' },
  md: { price: 'text-lg', old: 'text-sm' },
  lg: { price: 'text-3xl', old: 'text-base' },
};

/**
 * Discounted price + struck-through original + "-12%" pill.
 * Falls back to a single price when there is no discount.
 */
export default function PriceTag({ price, discountPrice, size = 'md', showBadge = true, className }) {
  const sizes = SIZES[size] ?? SIZES.md;
  const hasDiscount = discountPrice != null && discountPrice < price;
  const percent = getDiscountPercent(price, discountPrice);

  return (
    <span className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-0.5', className)}>
      <span
        className={cn(
          'font-semibold text-slate-900 dark:text-white',
          !hasDiscount && size === 'lg' && 'text-2xl',
          sizes.price
        )}
      >
        {formatPrice(hasDiscount ? discountPrice : price)}
      </span>
      {hasDiscount && (
        <>
          <span className={cn('text-slate-400 line-through dark:text-slate-500', sizes.old)}>
            {formatPrice(price)}
          </span>
          {showBadge && percent > 0 && (
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              -{percent}%
            </span>
          )}
        </>
      )}
    </span>
  );
}
