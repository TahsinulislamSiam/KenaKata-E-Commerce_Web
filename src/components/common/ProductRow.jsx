import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cn from '@/utils/cn';
import SectionHeader from '@/components/common/SectionHeader';
import ProductCard from '@/components/common/ProductCard';
import { ProductRowSkeleton } from '@/components/common/Skeleton';

/**
 * Horizontally scrolling product carousel with snap + arrow buttons (desktop).
 * @param {{title: string, subtitle?: string, products?: Array, loading?: boolean,
 *          seeAllHref?: string, className?: string}} props
 */
export default function ProductRow({ title, subtitle, products = [], loading, seeAllHref, className }) {
  const trackRef = useRef(null);

  const scrollBy = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(el.clientWidth * 0.8, 240), behavior: 'smooth' });
  };

  if (loading) return <ProductRowSkeleton />;
  if (!products.length) return null;

  return (
    <section className={cn('mx-auto w-full max-w-7xl px-4 py-6', className)} aria-label={title}>
      <SectionHeader title={title} subtitle={subtitle} href={seeAllHref} />

      <div className="group/row relative mt-4">
        {/* Desktop scroll arrows */}
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label={`Scroll ${title} backwards`}
          className="absolute -left-3 top-1/3 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-soft ring-1 ring-slate-200 transition hover:text-brand-700 md:flex md:opacity-0 md:group-hover/row:opacity-100 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label={`Scroll ${title} forwards`}
          className="absolute -right-3 top-1/3 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-soft ring-1 ring-slate-200 transition hover:text-brand-700 md:flex md:opacity-0 md:group-hover/row:opacity-100 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>

        <div
          ref={trackRef}
          className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-2 sm:gap-4"
          tabIndex={0}
          role="region"
          aria-label={`${title} products`}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[47%] min-w-[150px] flex-none snap-start sm:w-[210px] lg:w-[232px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
