// Pure filtering / sorting / pagination logic, kept out of the service layer so it can
// be deleted the day the real API does the querying server-side.
const matchesSearch = (product, needle) => {
  const haystack = [product.title, product.brand, product.category, product.description]
    .join(' ')
    .toLowerCase();
  return needle.split(/\s+/).every((word) => haystack.includes(word));
};

const discountedPrice = (p) => p.discountPrice ?? p.price;

/** Deterministic "featured" score: deals & bestsellers first, then rating. */
const featuredScore = (p) =>
  (p.badges?.includes('bestseller') ? 4 : 0) +
  (p.badges?.includes('deal') ? 3 : 0) +
  (p.badges?.includes('new') ? 1 : 0) +
  p.rating / 10;

const sorters = {
  'price-asc': (a, b) => discountedPrice(a) - discountedPrice(b),
  'price-desc': (a, b) => discountedPrice(b) - discountedPrice(a),
  'rating-desc': (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  featured: (a, b) => featuredScore(b) - featuredScore(a),
};

/**
 * Filter, sort and paginate a product list.
 * Supported params: q, category, brand, minPrice, maxPrice, minRating,
 * inStockOnly, sort, page, limit, ids.
 * Returns { items, total, page, totalPages, hasMore }.
 */
export function queryProducts(allProducts, params = {}) {
  const {
    q,
    category,
    brand,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    sort = 'featured',
    page = 1,
    limit = 12,
    ids,
  } = params;

  let result = Array.isArray(allProducts) ? [...allProducts] : [];

  if (Array.isArray(ids)) {
    const wanted = new Set(ids.map(String));
    result = result.filter((p) => wanted.has(String(p.id)));
  }
  if (q && q.trim()) result = result.filter((p) => matchesSearch(p, q.trim().toLowerCase()));
  if (category) {
    const cats = Array.isArray(category) ? category : [category];
    result = result.filter((p) => cats.includes(p.category));
  }
  if (Array.isArray(brand) && brand.length) {
    result = result.filter((p) => brand.includes(p.brand));
  } else if (typeof brand === 'string' && brand) {
    result = result.filter((p) => p.brand === brand);
  }
  if (Number.isFinite(Number(minPrice)) && minPrice !== '' && minPrice != null) {
    result = result.filter((p) => discountedPrice(p) >= Number(minPrice));
  }
  if (Number.isFinite(Number(maxPrice)) && maxPrice !== '' && maxPrice != null) {
    result = result.filter((p) => discountedPrice(p) <= Number(maxPrice));
  }
  if (Number(minRating)) result = result.filter((p) => p.rating >= Number(minRating));
  if (inStockOnly) result = result.filter((p) => p.stock > 0);

  result.sort(sorters[sort] || sorters.featured);

  const total = result.length;
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.max(1, Number(limit) || 12);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const items = result.slice((safePage - 1) * safeLimit, safePage * safeLimit);

  return {
    items,
    total,
    page: safePage,
    totalPages,
    hasMore: safePage * safeLimit < total,
  };
}

/** Distinct brands present in a (optionally category-scoped) product list. */
export function collectBrands(allProducts, category) {
  const source = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;
  return [...new Set(source.map((p) => p.brand))].sort((a, b) => a.localeCompare(b));
}

/** Min/max discounted price across a list — used to seed the price range filter. */
export function getPriceRange(allProducts, category) {
  const source = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;
  if (!source.length) return { min: 0, max: 0 };
  const prices = source.map((p) => p.discountPrice ?? p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
