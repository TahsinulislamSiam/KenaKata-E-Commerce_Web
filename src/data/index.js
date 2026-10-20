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

/** All products from every category in one list (44 items). */
export const products = [...electronics, ...fashion, ...home, ...books, ...beauty, ...sports];

const productById = new Map(products.map((p) => [String(p.id), p]));

/** Look up a single product by id (returns a copy or null). */
export function findProductById(id) {
  const product = productById.get(String(id));
  return product ? { ...product } : null;
}

export { categories, coupons, users };
