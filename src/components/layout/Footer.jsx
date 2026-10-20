import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Send, Twitter, Youtube } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';

const COLUMNS = [
  {
    title: 'Shop with Us',
    links: [
      { label: "Today's Deals", to: '/products?sort=price-asc' },
      { label: 'New Arrivals', to: '/products?sort=newest' },
      { label: 'Best Sellers', to: '/products?sort=rating-desc' },
      { label: 'All Categories', to: '/products' },
    ],
  },
  {
    title: 'Your Account',
    links: [
      { label: 'Your Account', to: '/account' },
      { label: 'Order History', to: '/account?tab=orders' },
      { label: 'Wishlist', to: '/account?tab=wishlist' },
      { label: 'Sign in', to: '/login' },
    ],
  },
  {
    title: 'Help & Support',
    links: [
      { label: 'Returns & Refunds', to: '/' },
      { label: 'Shipping Information', to: '/' },
      { label: 'Contact Us', to: '/' },
      { label: 'FAQ', to: '/' },
    ],
  },
  {
    title: 'KenaKata',
    links: [
      { label: 'About Us', to: '/' },
      { label: 'Careers', to: '/' },
      { label: 'Sell on KenaKata', to: '/' },
      { label: 'Terms & Privacy', to: '/' },
    ],
  },
];

const SOCIALS = [
  { label: 'KenaKata on Facebook', href: '#', icon: Facebook },
  { label: 'KenaKata on Instagram', href: '#', icon: Instagram },
  { label: 'KenaKata on Twitter', href: '#', icon: Twitter },
  { label: 'KenaKata on YouTube', href: '#', icon: Youtube },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success(`Subscribed! Deals will land in ${value}.`);
    setEmail('');
  };

  return (
    <footer className="mt-10 bg-brand-950 text-slate-300 dark:bg-slate-950">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <Mail size={18} className="text-accent-400" aria-hidden="true" />
              Get deals before everyone else
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Subscribe to the KenaKata newsletter — one email a week, no spam.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2" noValidate>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-slate-400 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/40"
            />
            <Button type="submit" variant="accent" size="md" className="shrink-0">
              Subscribe <Send size={15} aria-hidden="true" />
            </Button>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-500 text-base font-black text-white">
              K
            </span>
            <span className="text-xl font-extrabold tracking-tight text-white">KenaKata</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Your one-stop marketplace for electronics, fashion, home, books, beauty and sports —
            delivered anywhere in Bangladesh.
          </p>
          <div className="mt-4 flex gap-2">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-slate-300 transition hover:bg-accent-500 hover:text-white"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {column.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 transition hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-slate-400 sm:px-6 md:flex-row">
          <p>© {new Date().getFullYear()} KenaKata. Built as a frontend demo — not a real store.</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['bKash', 'Nagad', 'Visa', 'Mastercard', 'Cash on Delivery'].map((method) => (
              <span
                key={method}
                className="rounded-md bg-white/10 px-2 py-1 font-medium text-slate-300"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
