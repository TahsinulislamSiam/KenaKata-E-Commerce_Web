import { Compass, Search } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <p className="text-7xl font-black text-brand-200 dark:text-brand-900" aria-hidden="true">
          404
        </p>
        <EmptyState
          icon={<Compass size={30} aria-hidden="true" />}
          title="We can't find that page"
          description="The link may be broken, or the product may have moved. Let's get you back to shopping."
          className="mt-6 border-none bg-transparent p-0 dark:bg-transparent"
        >
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex h-11 items-center rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              Go home
            </Link>
            <Link
              to="/products"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              <Search size={15} aria-hidden="true" /> Browse products
            </Link>
          </div>
        </EmptyState>
      </div>
    </div>
  );
}
