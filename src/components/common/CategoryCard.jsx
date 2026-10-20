import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import cn from '@/utils/cn';

/** Home-page category tile (image + name + product count). */
export default function CategoryCard({ category, className }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900',
        className
      )}
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={category.image}
          alt={`${category.name} category`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
            {category.name}
          </p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {category.productCount} products
          </p>
        </div>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-hover:bg-accent-500 group-hover:text-white dark:bg-brand-950 dark:text-brand-300">
          <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
