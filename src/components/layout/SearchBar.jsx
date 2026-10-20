import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Loader2, Search, X } from 'lucide-react';
import cn from '@/utils/cn';
import { formatPrice } from '@/utils/format';
import * as api from '@/services/api';
import useDebounce from '@/hooks/useDebounce';
import useOnClickOutside from '@/hooks/useOnClickOutside';

/**
 * Search input with category scope, debounced live suggestions,
 * full keyboard support (Arrow keys / Enter / Escape) and URL sync.
 */
export default function SearchBar({ categories = [], className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);

  const [query, setQuery] = useState('');
  const [scope, setScope] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searching, setSearching] = useState(false);

  const debouncedQuery = useDebounce(query.trim(), 250);

  useOnClickOutside(containerRef, () => setOpen(false), open);

  // Keep the input in sync with the URL (?q= / ?category=)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('q') ?? '');
    setScope(params.get('category') ?? '');
    setOpen(false);
    setActiveIndex(-1);
  }, [location.search, location.pathname]);

  // Fetch suggestions after the debounce settles
  useEffect(() => {
    const q = debouncedQuery;
    if (q.length < 2) {
      setSuggestions([]);
      setSearching(false);
      return undefined;
    }
    let cancelled = false;
    setSearching(true);
    api
      .getProducts({ q, limit: 6 })
      .then((res) => {
        if (cancelled) return;
        setSuggestions(res.items);
        setActiveIndex(-1);
        setOpen(true);
      })
      .catch(() => {
        if (!cancelled) setSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setSearching(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const goSearch = (term) => {
    const params = new URLSearchParams();
    const q = (term ?? query).trim();
    if (q) params.set('q', q);
    if (scope) params.set('category', scope);
    const qs = params.toString();
    setOpen(false);
    setActiveIndex(-1);
    navigate(`/products${qs ? `?${qs}` : ''}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown' && suggestions.length) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp' && suggestions.length) {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (open && activeIndex >= 0 && suggestions[activeIndex]) {
        const product = suggestions[activeIndex];
        setOpen(false);
        navigate(`/product/${product.id}`);
      } else {
        goSearch();
      }
    } else if (event.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const showDropdown = open && (suggestions.length > 0 || searching);

  return (
    <form
      role="search"
      aria-label="Product search"
      ref={containerRef}
      onSubmit={(e) => {
        e.preventDefault();
        goSearch();
      }}
      className={cn('relative flex w-full', className)}
    >
      <div className="flex min-w-0 flex-1 items-stretch rounded-xl bg-white ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-accent-400">
        {/* Category scope dropdown */}
        <label className="relative hidden shrink-0 items-center sm:flex">
          <span className="sr-only">Search within category</span>
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="h-full cursor-pointer appearance-none border-r border-slate-200 bg-slate-100 py-0 pl-3 pr-7 text-xs font-semibold text-slate-600 outline-none hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            aria-hidden="true"
            className="pointer-events-none absolute right-2 text-slate-500"
          />
        </label>

        <input
          type="search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `search-suggestion-${activeIndex}` : undefined
          }
          aria-label="Search products"
          placeholder="Search KenaKata…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim().length < 2) setOpen(false);
          }}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setOpen(false);
            }}
            aria-label="Clear search"
            className="px-2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}

        <button
          type="submit"
          aria-label="Search"
          className="mr-1 my-1 grid w-10 shrink-0 place-items-center rounded-lg bg-accent-500 text-white transition hover:bg-accent-600 active:bg-accent-700"
        >
          {searching ? (
            <Loader2 size={17} className="animate-spin" aria-hidden="true" />
          ) : (
            <Search size={17} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Live suggestions */}
      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl bg-white shadow-card-hover ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          <ul id="search-suggestions" role="listbox" aria-label="Search suggestions" className="py-1">
            {suggestions.map((product, index) => (
              <li
                key={product.id}
                id={`search-suggestion-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  setOpen(false);
                  navigate(`/product/${product.id}`);
                }}
                className={cn(
                  'flex cursor-pointer items-center gap-3 px-3 py-2 transition',
                  index === activeIndex && 'bg-brand-50 dark:bg-slate-700'
                )}
              >
                <img
                  src={product.images[0]}
                  alt=""
                  loading="lazy"
                  className="h-10 w-10 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                    {product.title}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {product.brand}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-brand-700 dark:text-brand-300">
                  {formatPrice(product.discountPrice ?? product.price)}
                </span>
              </li>
            ))}
            {searching && suggestions.length === 0 && (
              <li className="px-3 py-3 text-sm text-slate-500">Searching…</li>
            )}
          </ul>
          {!searching && suggestions.length > 0 && (
            <button
              type="submit"
              className="w-full border-t border-slate-100 bg-slate-50 px-3 py-2.5 text-left text-sm font-semibold text-brand-700 transition hover:bg-brand-50 dark:border-slate-700 dark:bg-slate-900 dark:text-brand-300 dark:hover:bg-slate-700"
            >
              See all results for “{query.trim()}”
            </button>
          )}
        </div>
      )}
    </form>
  );
}
