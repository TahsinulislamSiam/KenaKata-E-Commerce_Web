import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/** Large dropdown panel listing every category with its subcategories. */
export default function MegaMenu({ categories, onClose, id }) {
  return (
    <div
      id={id}
      className="absolute inset-x-0 top-full z-40 hidden border-t border-slate-200 bg-white shadow-card-hover dark:border-slate-700 dark:bg-slate-900 md:block"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-6 lg:grid-cols-4">
        {categories.map((category) => (
          <div key={category.id}>
            <Link
              to={`/products?category=${category.id}`}
              onClick={onClose}
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-800 hover:text-accent-600 dark:text-brand-300 dark:hover:text-accent-400"
            >
              {category.name}
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
            <ul className="mt-2 space-y-1.5">
              {category.subcategories.map((sub) => (
                <li key={sub}>
                  <Link
                    to={`/products?category=${category.id}`}
                    onClick={onClose}
                    className="text-sm text-slate-600 transition hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400"
                  >
                    {sub}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 bg-slate-50 py-3 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        Free delivery on orders over ৳2,000 · 7-day easy returns · 100% authentic products
      </div>
    </div>
  );
}
