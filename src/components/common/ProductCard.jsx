import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, PackageX, ShoppingCart, Zap } from 'lucide-react';
import cn from '@/utils/cn';
import RatingStars from '@/components/common/RatingStars';
import PriceTag from '@/components/common/PriceTag';
import { Button } from '@/components/common/Button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { formatCount } from '@/utils/format';

function StockNote({ stock }) {
  if (stock <= 0) {
    return (
      <span className="text-xs font-semibold text-red-600 dark:text-red-400">Out of stock</span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">
        Only {stock} left
      </span>
    );
  }
  return <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">In stock</span>;
}

function Badge({ product }) {
  const hasDeal = product.badges.includes('deal');
  const hasBest = product.badges.includes('bestseller');
  const isNew = product.badges.includes('new');

  return (
    <div className="pointer-events-none absolute left-2 top-2 z-10 flex flex-col items-start gap-1">
      {hasDeal && (
        <span className="rounded-md bg-accent-500 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-950 shadow">
          Deal
        </span>
      )}
      {hasBest && (
        <span className="rounded-md bg-brand-800 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white shadow">
          Best seller
        </span>
      )}
      {isNew && (
        <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white shadow">
          New
        </span>
      )}
    </div>
  );
}

/**
 * The core product tile — used by grids, rows, search results and related items.
 * `layout="list"` renders the wide variant used by the list toggle.
 */
function ProductCard({ product, layout = 'grid', className }) {
  const cart = useCart();
  const wishlist = useWishlist();
  const toast = useToast();

  const inWishlist = wishlist.has(product.id);
  const soldOut = product.stock <= 0;
  const to = `/product/${product.id}`;

  const handleWishlist = () => {
    const nowIn = wishlist.toggle(product.id);
    toast.info(nowIn ? 'Saved to wishlist' : 'Removed from wishlist');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (soldOut) return;
    const qty = cart.addItem(product.id, 1);
    if (qty) toast.success(`Added to cart: ${product.title}`);
  };

  const media = (
    <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
      <Badge product={product} />
      <img
        src={product.images[0]}
        alt={product.title}
        loading="lazy"
        className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {soldOut && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
          <span className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-800">
            <PackageX size={14} aria-hidden="true" /> Out of stock
          </span>
        </div>
      )}
    </div>
  );

  const wishlistButton = (
    <button
      type="button"
      onClick={handleWishlist}
      aria-label={inWishlist ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
      aria-pressed={inWishlist}
      className={cn(
        'absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 shadow ring-1 ring-slate-200 transition hover:scale-110 dark:bg-slate-800/90 dark:ring-slate-700',
        inWishlist && 'text-red-500'
      )}
    >
      <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} aria-hidden="true" />
    </button>
  );

  const info = (
    <>
      <p className="text-xs font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
        {product.brand}
      </p>
      <Link
        to={to}
        className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-slate-800 transition group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-300"
      >
        {product.title}
      </Link>
      <div className="mt-1.5 flex items-center gap-1.5">
        <RatingStars rating={product.rating} size="sm" />
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatCount(product.reviewCount)}
        </span>
      </div>
      <PriceTag price={product.price} discountPrice={product.discountPrice} className="mt-2" />
      <div className="mt-1">
        <StockNote stock={product.stock} />
      </div>
    </>
  );

  if (layout === 'list') {
    return (
      <article className="group relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-3 transition hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900 sm:gap-6 sm:p-4">
        <div className="w-28 shrink-0 sm:w-44">
          <Link to={to} tabIndex={-1} aria-hidden="true">
            {media}
          </Link>
          {wishlistButton}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          {info}
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
            <Button
              variant="accent"
              size="sm"
              onClick={handleAddToCart}
              disabled={soldOut}
              className="ml-auto"
            >
              {soldOut ? (
                'Unavailable'
              ) : (
                <>
                  <ShoppingCart size={15} aria-hidden="true" /> Add to cart
                </>
              )}
            </Button>
            <Link
              to={to}
              className="hidden text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300 sm:inline"
            >
              View details
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900">
      <Link to={to} className="block">
        {media}
      </Link>
      {wishlistButton}
      <div className="flex flex-1 flex-col p-3">
        {info}
        <div className="mt-auto pt-3">
          <Button
            variant="accent"
            size="sm"
            onClick={handleAddToCart}
            disabled={soldOut}
            className="w-full"
          >
            {soldOut ? (
              'Unavailable'
            ) : product.badges.includes('deal') ? (
              <>
                <Zap size={15} aria-hidden="true" /> Grab deal
              </>
            ) : (
              <>
                <ShoppingCart size={15} aria-hidden="true" /> Add to cart
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
