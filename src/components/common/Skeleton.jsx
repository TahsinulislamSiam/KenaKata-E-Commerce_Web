import cn from '@/utils/cn';

/** Base shimmer block. */
export function Skeleton({ className }) {
  return <div className={cn('skeleton rounded-lg', className)} aria-hidden="true" />;
}

/** Skeleton shaped like ProductCard (grid layout). */
export function ProductCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
      aria-hidden="true"
    >
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="mt-3 h-4 w-11/12" />
      <Skeleton className="mt-2 h-4 w-8/12" />
      <Skeleton className="mt-3 h-3 w-24" />
      <Skeleton className="mt-2 h-5 w-32" />
      <Skeleton className="mt-3 h-9 w-full rounded-lg" />
    </div>
  );
}

/** Skeleton for a whole horizontal product row. */
export function ProductRowSkeleton({ count = 6 }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6" aria-hidden="true">
      <Skeleton className="h-6 w-48" />
      <div className="mt-4 flex gap-4 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="hidden w-[200px] flex-none sm:block">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4 sm:hidden">
        <ProductCardSkeleton />
      </div>
    </section>
  );
}

/** Skeleton for the product detail page (gallery + info column). */
export function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6" aria-hidden="true">
      <Skeleton className="h-4 w-72" />
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="mt-3 flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-16 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-7 w-11/12" />
          <Skeleton className="h-7 w-8/12" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
