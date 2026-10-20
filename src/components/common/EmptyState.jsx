import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import cn from '@/utils/cn';

/**
 * Friendly empty state used by cart, wishlist, search results and 404.
 * @param {{icon?: React.ReactNode, title: string, description?: string,
 *          actionLabel?: string, actionTo?: string, onAction?: () => void}} props
 */
export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  className,
  children,
}) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900',
        className
      )}
    >
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
          {icon}
        </div>
      )}
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
      {children}
      {actionLabel && (actionTo || onAction) && (
        <div className="mt-6">
          {actionTo ? (
            <Link to={actionTo}>
              <Button variant="accent">{actionLabel}</Button>
            </Link>
          ) : (
            <Button variant="accent" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
