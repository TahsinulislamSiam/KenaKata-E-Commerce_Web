import { CreditCard, RotateCcw, ShieldCheck, Truck } from 'lucide-react';

const ITEMS = [
  { icon: Truck, title: 'Free delivery', detail: 'On orders over ৳2,000' },
  { icon: RotateCcw, title: '7-day returns', detail: 'Easy, no-questions refunds' },
  { icon: ShieldCheck, title: '100% authentic', detail: 'Genuine products guaranteed' },
  { icon: CreditCard, title: 'Pay your way', detail: 'bKash, Nagad, cards & COD' },
];

/** Trust/USP strip shown on the home page. */
export default function PromoStrip() {
  return (
    <section
      aria-label="Why shop at KenaKata"
      className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-6 sm:px-6 lg:grid-cols-4"
    >
      {ITEMS.map(({ icon: Icon, title, detail }) => (
        <div
          key={title}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900 sm:p-4"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            <Icon size={19} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-slate-900 dark:text-white">
              {title}
            </span>
            <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
              {detail}
            </span>
          </span>
        </div>
      ))}
    </section>
  );
}
