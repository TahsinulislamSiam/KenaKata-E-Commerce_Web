import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { buildArtImage } from '@/data/illustrations';
import { HERO_ART } from '@/data/artMap';

const SLIDES = [
  {
    id: 'electronics',
    eyebrow: 'Mega Electronics Sale',
    title: 'Up to 40% off gadgets',
    subtitle: 'Phones, laptops, audio and wearables from the brands you trust.',
    cta: 'Shop Electronics',
    href: '/products?category=electronics&sort=price-asc',
    from: 'from-brand-900',
    to: 'to-brand-700',
  },
  {
    id: 'fashion',
    eyebrow: 'New Season, New You',
    title: 'Fresh fashion finds',
    subtitle: 'Kurtis, denim, sneakers and more — starting from just ৳999.',
    cta: 'Shop Fashion',
    href: '/products?category=fashion',
    from: 'from-slate-900',
    to: 'to-brand-900',
  },
  {
    id: 'home',
    eyebrow: 'Refresh Your Home',
    title: 'Home & kitchen upgrades',
    subtitle: 'Air fryers, bedding, sofas and decor picks your family will love.',
    cta: 'Shop Home',
    href: '/products?category=home',
    from: 'from-brand-800',
    to: 'to-accent-700',
  },
  {
    id: 'delivery',
    eyebrow: 'KenaKata Promise',
    title: 'Free delivery over ৳2,000',
    subtitle: 'bKash, Nagad, cards or cash on delivery — pay your way, 7-day returns.',
    cta: 'Start Shopping',
    href: '/products',
    from: 'from-accent-600',
    to: 'to-accent-800',
  },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Auto-advancing hero banner with arrows, dots and full keyboard support. */
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const go = useCallback((next) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return undefined;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5500);
    return () => clearInterval(timerRef.current);
  }, [paused, index]);

  const slide = SLIDES[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      className="mx-auto max-w-7xl px-4 pt-5 sm:px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative h-[22rem] overflow-hidden rounded-3xl shadow-soft sm:h-[20rem] md:h-[22rem] lg:h-[24rem]">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <div className={`relative h-full w-full bg-gradient-to-br ${s.from} ${s.to} `}>
              {/* Floating product illustration chips (right half) */}
              <div
                className="absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center gap-4 md:flex"
                aria-hidden="true"
              >
                {(HERO_ART[s.id] ?? []).map((key, chipIndex) => (
                  <div
                    key={key}
                    className="rounded-2xl bg-white/95 p-2 shadow-card-hover ring-1 ring-white/40 dark:bg-slate-900/90"
                    style={{
                      transform: `rotate(${(chipIndex - 1) * 7}deg) translateY(${
                        chipIndex === 1 ? '-18px' : '10px'
                      })`,
                    }}
                  >
                    <img
                      src={buildArtImage(key, 'ivory')}
                      alt=""
                      className="h-24 w-24 rounded-xl object-cover lg:h-32 lg:w-32"
                    />
                  </div>
                ))}
              </div>

              <div className="relative flex h-full flex-col justify-center gap-3 px-6 text-white sm:px-10 md:w-3/5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-accent-300">
                  {s.eyebrow}
                </p>
                <h2 className="max-w-md text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {s.title}
                </h2>
                <p className="max-w-sm text-sm text-white/85 sm:text-base">{s.subtitle}</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Link
                    to={s.href}
                    tabIndex={i === index ? 0 : -1}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent-500 px-5 text-sm font-bold text-brand-950 shadow-soft transition hover:bg-accent-400 active:scale-[0.98]"
                  >
                    {s.cta} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link
                    to="/products"
                    tabIndex={i === index ? 0 : -1}
                    className="inline-flex h-11 items-center rounded-xl border border-white/40 px-5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Browse all
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-accent-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
