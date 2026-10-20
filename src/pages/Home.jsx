import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Grid3X3 } from 'lucide-react';
import HeroCarousel from '@/components/home/HeroCarousel';
import PromoStrip from '@/components/home/PromoStrip';
import SectionHeader from '@/components/common/SectionHeader';
import CategoryCard from '@/components/common/CategoryCard';
import ProductRow from '@/components/common/ProductRow';
import { Skeleton } from '@/components/common/Skeleton';
import { useAuth } from '@/context/AuthContext';
import { getHomeData } from '@/services/api';

function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
      ))}
    </div>
  );
}

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getHomeData()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const firstName = user?.name?.split(' ')[0];

  return (
    <>
      <HeroCarousel />

      {/* Category cards */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6" aria-labelledby="shop-by-category">
        <SectionHeader
          title="Shop by category"
          subtitle="Six departments, thousands of picks"
          href="/products"
          linkLabel="All products"
        />
        <span id="shop-by-category" className="sr-only">
          Shop by category
        </span>
        <div className="mt-4">
          {loading || !data ? (
            <CategoryGridSkeleton />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {data.categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      <PromoStrip />

      {/* Personalised greeting + product rows */}
      <div className="pb-4">
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-3 rounded-2xl bg-gradient-to-r from-brand-900 to-brand-700 px-5 py-4 text-white sm:flex-row sm:items-center dark:from-brand-950 dark:to-brand-800">
            <div>
              <p className="text-sm font-bold">
                {isAuthenticated ? `Welcome back, ${firstName} 👋` : 'New to KenaKata?'}
              </p>
              <p className="mt-0.5 text-xs text-white/80 sm:text-sm">
                {isAuthenticated
                  ? 'Picked for you based on what shoppers love right now.'
                  : 'Create an account to track orders, save addresses and build a wishlist.'}
              </p>
            </div>
            <Link
              to={isAuthenticated ? '/account' : '/register'}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-accent-500 px-4 text-sm font-bold text-white transition hover:bg-accent-400"
            >
              {isAuthenticated ? 'Your account' : 'Get started'}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <ProductRow
          title="Today's Deals"
          subtitle="Biggest discounts across the store, refreshed daily"
          products={data?.deals}
          loading={loading}
          seeAllHref="/products?sort=price-asc"
        />
        <ProductRow
          title="Best Sellers"
          subtitle="What everyone else is buying"
          products={data?.bestSellers}
          loading={loading}
          seeAllHref="/products?sort=rating-desc"
        />
        <ProductRow
          title="Recommended for you"
          subtitle={isAuthenticated ? `Because you shopped with us, ${firstName}` : 'Top-rated by KenaKata shoppers'}
          products={data?.recommended}
          loading={loading}
          seeAllHref="/products?sort=rating-desc"
        />
        <ProductRow
          title="New Arrivals"
          subtitle="Fresh stock, just landed"
          products={data?.newArrivals}
          loading={loading}
          seeAllHref="/products?sort=newest"
        />
      </div>

      {/* Category callout */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <Link
          to="/products"
          className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-brand-200 bg-brand-50 px-6 py-6 text-center transition hover:shadow-card-hover sm:flex-row sm:text-left dark:border-brand-900 dark:bg-brand-950"
        >
          <div>
            <h2 className="flex items-center justify-center gap-2 text-lg font-bold text-brand-900 dark:text-brand-100 sm:justify-start">
              <Grid3X3 size={19} className="text-accent-500" aria-hidden="true" />
              Explore the full catalogue
            </h2>
            <p className="mt-1 text-sm text-brand-700 dark:text-brand-300">
              44 products across 6 departments — filter by price, brand, rating and stock.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-brand-800 px-5 py-2.5 text-sm font-bold text-white transition group-hover:bg-brand-900 dark:bg-brand-700">
            Browse products <ArrowRight size={16} aria-hidden="true" />
          </span>
        </Link>
      </section>
    </>
  );
}
