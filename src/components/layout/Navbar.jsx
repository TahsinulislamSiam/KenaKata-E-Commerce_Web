import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Heart,
  LogIn,
  LogOut,
  Menu,
  Moon,
  MapPin,
  Package,
  Receipt,
  ShoppingCart,
  Sun,
  User,
} from 'lucide-react';
import cn from '@/utils/cn';
import Logo from '@/components/common/Logo';
import SearchBar from '@/components/layout/SearchBar';
import MobileDrawer from '@/components/layout/MobileDrawer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';
import useCategories from '@/hooks/useCategories';
import useOnClickOutside from '@/hooks/useOnClickOutside';

/** Sticky top bar: logo, search, account menu, wishlist, cart, dark-mode toggle. */
export default function Navbar() {
  const categories = useCategories();
  const { user, isAuthenticated, logout } = useAuth();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { isDark, toggle: toggleTheme } = useTheme();
  const toast = useToast();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useOnClickOutside(accountRef, () => setAccountOpen(false), accountOpen);

  useEffect(() => {
    if (!accountOpen) return undefined;
    const onEscape = (e) => e.key === 'Escape' && setAccountOpen(false);
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [accountOpen]);

  const handleLogout = () => {
    setAccountOpen(false);
    logout();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const initials = user?.name
    ?.split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const accountLinks = [
    { to: '/account', label: 'Your Account', icon: User },
    { to: '/account?tab=orders', label: 'Order History', icon: Receipt },
    { to: '/account?tab=wishlist', label: 'Wishlist', icon: Heart },
    { to: '/cart', label: 'Your Cart', icon: ShoppingCart },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-900 shadow-soft dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4">
          {/* Mobile: open drawer */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="-ml-1 rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
          >
            <Menu size={22} aria-hidden="true" />
          </button>

          {/* Logo */}
          <Link to="/" aria-label="KenaKata home" className="shrink-0">
            <Logo size={38} responsiveWord className="text-white" wordClassName="text-white" />
          </Link>

          {/* Deliver-to (desktop) */}
          <div className="hidden items-center gap-1.5 rounded-lg px-2 py-1 text-white/90 transition hover:bg-white/10 lg:flex">
            <MapPin size={17} className="text-accent-400" aria-hidden="true" />
            <span className="leading-tight">
              <span className="block text-[11px] text-slate-300">Deliver to</span>
              <span className="block text-xs font-bold">Dhaka 1213</span>
            </span>
          </div>

          {/* Search (desktop/tablet) */}
          <SearchBar categories={categories} className="hidden md:flex md:max-w-2xl md:flex-1 lg:max-w-3xl" />

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
              className="rounded-lg p-2 text-white transition hover:bg-white/10"
            >
              {isDark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
            </button>

            {/* Account menu */}
            <div ref={accountRef} className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                aria-controls="account-menu"
                className="hidden items-center gap-1 rounded-lg px-2 py-1.5 text-white transition hover:bg-white/10 sm:flex"
              >
                {isAuthenticated ? (
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-500 text-xs font-black text-brand-950">
                    {initials || 'U'}
                  </span>
                ) : (
                  <User size={19} aria-hidden="true" />
                )}
                <span className="hidden leading-tight lg:block">
                  <span className="block text-[11px] text-slate-300">
                    {isAuthenticated ? 'Hello' : 'Hello, sign in'}
                  </span>
                  <span className="block max-w-[8rem] truncate text-xs font-bold">
                    {isAuthenticated ? user.name : 'Account & Lists'}
                  </span>
                </span>
                <ChevronDown size={13} aria-hidden="true" />
              </button>

              {/* Mobile: plain icon */}
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                aria-label="Account menu"
                aria-expanded={accountOpen}
                className="rounded-lg p-2 text-white transition hover:bg-white/10 sm:hidden"
              >
                <User size={20} aria-hidden="true" />
              </button>

              {accountOpen && (
                <div
                  id="account-menu"
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl bg-white p-2 shadow-card-hover ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
                >
                  {!isAuthenticated ? (
                    <div className="p-2">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Sign in for the best experience.
                      </p>
                      <Link
                        to="/login"
                        onClick={() => setAccountOpen(false)}
                        role="menuitem"
                        className="mt-2 flex h-9 w-full items-center justify-center rounded-lg bg-accent-500 text-sm font-semibold text-brand-950 transition hover:bg-accent-400"
                      >
                        <LogIn size={15} className="mr-1.5" aria-hidden="true" /> Sign in
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setAccountOpen(false)}
                        role="menuitem"
                        className="mt-2 flex h-9 w-full items-center justify-center rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-700 dark:border-slate-600 dark:text-slate-200"
                      >
                        Create account
                      </Link>
                    </div>
                  ) : (
                    <div className="border-b border-slate-100 p-3 dark:border-slate-700">
                      <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  )}

                  <ul className="py-1">
                    {accountLinks.map(({ to, label, icon: Icon }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          role="menuitem"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                          <Icon size={16} className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {isAuthenticated && (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-lg border-t border-slate-100 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-950/40"
                    >
                      <LogOut size={16} aria-hidden="true" /> Sign out
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/account?tab=wishlist"
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative rounded-lg p-2 text-white transition hover:bg-white/10"
            >
              <Heart size={20} aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className="relative rounded-lg p-2 text-white transition hover:bg-white/10"
            >
              <ShoppingCart size={21} aria-hidden="true" />
              <span
                className={cn(
                  'absolute -right-0.5 -top-0.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full px-1 text-[10px] font-bold leading-none',
                  cartCount > 0 ? 'bg-accent-500 text-brand-950' : 'bg-white/25 text-white'
                )}
              >
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Search (mobile) */}
        <div className="px-3 pb-2.5 md:hidden">
          <SearchBar categories={categories} />
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
