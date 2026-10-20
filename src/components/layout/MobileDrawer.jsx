import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Heart,
  Home,
  LogIn,
  LogOut,
  Moon,
  Package,
  Receipt,
  ShoppingCart,
  Sun,
  User,
  X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';
import useCategories from '@/hooks/useCategories';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';

/** Slide-in navigation drawer for mobile (menu button in the navbar). */
export default function MobileDrawer({ open, onClose }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { isDark, toggle: toggleTheme } = useTheme();
  const toast = useToast();
  const categories = useCategories();
  const location = useLocation();
  const panelRef = useRef(null);

  useLockBodyScroll(open);

  // Close on route change + Escape, and focus the panel when it opens
  useEffect(() => {
    if (!open) return undefined;
    const onEscape = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEscape);
    panelRef.current?.focus();
    return () => document.removeEventListener('keydown', onEscape);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, location.pathname]);

  const handleLogout = () => {
    logout();
    onClose();
    toast.success('Signed out successfully');
  };

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/account', label: 'Your Account', icon: User },
    { to: '/account?tab=orders', label: 'Order History', icon: Receipt },
    { to: '/account?tab=wishlist', label: 'Wishlist', icon: Heart, badge: wishlistCount },
    { to: '/cart', label: 'Cart', icon: ShoppingCart, badge: count },
  ];

  return (
    <div
      className={`fixed inset-0 z-[60] md:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-slate-950/60 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-label="Navigation menu"
        tabIndex={-1}
        className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-slate-900 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 bg-brand-900 px-4 py-3 text-white dark:border-slate-700 dark:bg-slate-950">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-500 text-sm font-black">
              K
            </span>
            <span className="text-lg font-extrabold tracking-tight">KenaKata</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 transition hover:bg-white/10"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          {!isAuthenticated && (
            <div className="mb-4 rounded-xl bg-brand-50 p-4 dark:bg-brand-950">
              <p className="text-sm font-bold text-brand-900 dark:text-brand-200">
                Hello, guest
              </p>
              <Link
                to="/login"
                onClick={onClose}
                className="mt-2 inline-flex h-9 items-center rounded-lg bg-accent-500 px-4 text-sm font-semibold text-white transition hover:bg-accent-600"
              >
                Sign in
              </Link>
            </div>
          )}

          <ul className="space-y-1">
            {links.map(({ to, label, icon: Icon, badge }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Icon size={18} className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                  {badge > 0 && (
                    <span className="rounded-full bg-accent-500 px-2 py-0.5 text-[11px] font-bold text-white">
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t border-slate-200 px-3 pt-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:border-slate-700">
            Shop by category
          </p>
          <ul className="mt-2 space-y-1">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/products?category=${category.id}`}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-slate-200 p-3 dark:border-slate-700">
          <button
            type="button"
            onClick={() => {
              toggleTheme();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isDark ? (
              <Sun size={18} className="text-amber-500" aria-hidden="true" />
            ) : (
              <Moon size={18} className="text-brand-600" aria-hidden="true" />
            )}
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              <LogOut size={18} aria-hidden="true" />
              Sign out ({user?.name})
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
