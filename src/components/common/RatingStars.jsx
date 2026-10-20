import { Star } from 'lucide-react';
import cn from '@/utils/cn';
import { formatCount } from '@/utils/format';

const SIZE_MAP = { xs: 11, sm: 13, md: 16, lg: 20 };

function Stars({ size, className }) {
  return (
    <span className={cn('flex', className)} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          fill="currentColor"
          className="flex-none"
        />
      ))}
    </span>
  );
}

/**
 * Star rating with a partial-fill overlay, e.g. 4.3 -> 86% gold.
 * @param {{rating?: number, count?: number, size?: 'xs'|'sm'|'md'|'lg', withCount?: boolean}} props
 */
export default function RatingStars({ rating = 0, count, size = 'md', withCount = false, className }) {
  const px = SIZE_MAP[size] ?? size;
  const clamped = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span
        className="relative inline-flex"
        role="img"
        aria-label={`Rated ${clamped.toFixed(1)} out of 5 stars`}
      >
        <Stars size={px} className="text-slate-300 dark:text-slate-600" />
        <span
          className="absolute inset-0 overflow-hidden text-amber-400"
          style={{ width: `${(clamped / 5) * 100}%` }}
        >
          <Stars size={px} />
        </span>
      </span>
      {withCount && count != null && (
        <span className="text-xs text-slate-500 dark:text-slate-400">({formatCount(count)})</span>
      )}
    </span>
  );
}
