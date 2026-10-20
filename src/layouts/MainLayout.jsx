import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import CategoryStrip from '@/components/layout/CategoryStrip';
import Footer from '@/components/layout/Footer';

function PageFallback() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-500 dark:text-slate-400"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-700" />
      <p className="text-sm font-medium">Loading…</p>
    </div>
  );
}

/** Shell for every route: skip-link, navbar, category strip, footer. */
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-50 dark:bg-slate-950">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-lg bg-white px-4 py-2 font-semibold text-brand-800 shadow-soft focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      <Navbar />
      <CategoryStrip />

      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
