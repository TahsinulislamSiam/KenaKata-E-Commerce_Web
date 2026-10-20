import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import cn from '@/utils/cn';

/**
 * Section heading with an optional "See all" link.
 * @param {{title: string, subtitle?: string, href?: string, linkLabel?: string, as?: 'h2'|'h3'}} props
 */
export default function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel = 'See all',
  as: Heading = 'h2',
  className,
}) {
  return (
    <div className={cn('flex items-end justify-between gap-4', className)}>
      <div>
        <Heading className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
          {title}
        </Heading>
        {subtitle && (
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          to={href}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 transition hover:text-accent-600 dark:text-brand-300 dark:hover:text-accent-400"
        >
          {linkLabel}
          <ArrowRight size={15} aria-hidden="true" />
          <span className="sr-only">: {title}</span>
        </Link>
      )}
    </div>
  );
}
