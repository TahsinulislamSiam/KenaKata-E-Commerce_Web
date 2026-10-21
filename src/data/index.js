// Central mock database.
// Everything here is swapped out later by hitting the real MERN API (see src/services/api.js).
import categories from './categories.json';
import coupons from './coupons.json';
import users from './users.json';
import electronics from './products/electronics.json';
import fashion from './products/fashion.json';
import home from './products/home.json';
import books from './products/books.json';
import beauty from './products/beauty.json';
import sports from './products/sports.json';
import { buildProductImages, buildCategoryImage } from './illustrations';
import { PRODUCT_ART, CATEGORY_ART } from './artMap';

const rawProducts = [
  ...electronics,
  ...fashion,
  ...home,
  ...books,
  ...beauty,
  ...sports,
];

/**
 * Replace the placeholder `images` with on-theme illustrations that match each
 * product (see illustrations.js). When a real API arrives, its CDN URLs are
 * used as-is and this hydration becomes a no-op.
 */
export const products = rawProducts.map((product) => {
  const artKey = PRODUCT_ART[product.id];
  return artKey ? { ...product, images: buildProductImages(artKey) } : product;
});

/** Categories with illustration-based tile images. */
export const hydratedCategories = categories.map((category) => ({
  ...category,
  image: buildCategoryImage(CATEGORY_ART[category.id] ?? 'phone'),
}));

const productById = new Map(products.map((p) => [String(p.id), p]));

/** Look up a single product by id (returns a copy or null). */
export function findProductById(id) {
  const product = productById.get(String(id));
  return product ? { ...product } : null;
}

export { coupons, users };
