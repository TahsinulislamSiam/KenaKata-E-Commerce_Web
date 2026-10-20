import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Menu } from 'lucide-react';
import cn from '@/utils/cn';
import MegaMenu from '@/components/layout/MegaMenu';
import useCategories from '@/hooks/useCategories';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const QUICK_LINKS = [
  { label: "Today's Deals", to: '/products?sort=price-asc' },
  { label: 'Best Sellers', to: '/products?sort=rating-desc' },
  { label: 'New Arrivals', to: '/products?sort=newest' },
];

/** Category strip below the navbar with an "All" mega-menu (desktop). */
export default function CategoryStrip() {
  const categories = useCategories();
  const [megaOpen, setMegaOpen] = useState(false);
  const stripRef = useRef(null);

  useOnClickOutside(stripRef, () => setMegaOpen(false), megaOpen);

  useEffect(() => {
    if (!megaOpen) return undefined;
    const onEscape = (e) => e.key === 'Escape' && setMegaOpen(false);
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [megaOpen]);

  return (
    <nav
      ref={stripRef}
      aria-label="Product categories"
      className="relative border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative mx-auto flex max-w-7xl items-center gap-1 px-2 sm:px-4">
        {/* Mega menu trigger (desktop) */}
        <button
          type="button"
          aria-expanded={megaOpen}
          aria-haspopup="true"
          aria-controls="mega-menu"
          onClick={() => setMegaOpen((v) => !v)}
          className={cn(
            'hidden shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition md:flex',
            megaOpen
              ? 'bg-brand-700 text-white'
              : 'text-slate-700 hover:bg-brand-50 hover:text-brand-800 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-brand-300'
          )}
        >
          <Menu size={16} aria-hidden="true" /> All
        </button>

        {/* Scrollable category links */}
        <div className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto py-1.5">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="shrink-0 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-brand-50 hover:text-brand-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-300 sm:text-sm"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Quick links (desktop) */}
        <div className="hidden shrink-0 items-center gap-4 pl-4 lg:flex">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="flex items-center gap-1 text-xs font-bold text-accent-600 transition hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
            >
              <LayoutGrid size={13} aria-hidden="true" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <MegaMenu
        id="mega-menu"
        categories={categories}
        onClose={() => setMegaOpen(false)}
      />
    </nav>
  );
}
