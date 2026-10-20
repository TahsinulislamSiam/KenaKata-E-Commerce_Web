
import { products, categories, coupons, users as demoUsers, findProductById } from '@/data';
import { queryProducts, collectBrands, getPriceRange } from '@/utils/productQuery';
import { getStoredJSON, setStoredJSON } from '@/utils/storage';
import { STORAGE_KEYS } from '@/utils/constants';
import { addDays, formatPrice } from '@/utils/format';

/** Simulated network latency. */
const delay = (min = 250, max = 550) =>
  new Promise((resolve) => setTimeout(resolve, min + Math.random() * Math.max(0, max - min)));

/** Strip sensitive fields before returning a user object. */
const publicUser = ({ password, ...user }) => user;

// --------------------------------------------------------------------------
// Catalog
// --------------------------------------------------------------------------

/**
 * List products. Supports: q, category, brand[], minPrice, maxPrice, minRating,

 * @returns {Promise<{items: Array, total: number, page: number, totalPages: number, hasMore: boolean}>}
 */
export async function getProducts(params = {}) {
  await delay();
  return queryProducts(products, params);
}

/** Single product by id. Resolves to null when not found (never rejects). */
export async function getProductById(id) {
  await delay(150, 350);
  return findProductById(id);
}

/** Same-category products, excluding the current one. */
export async function getRelatedProducts(id, limit = 6) {
  await delay(150, 350);
  const current = findProductById(id);
  if (!current) return [];
  return queryProducts(products, {
    category: current.category,
    sort: 'rating-desc',
    limit,
  }).items.filter((p) => p.id !== current.id);
}

/** Categories with a product count attached (used by navbar, footer, home). */
export async function getCategories() {
  await delay(120, 300);
  return categories.map((category) => ({
    ...category,
    productCount: products.filter((p) => p.category === category.id).length,
  }));
}

/** Brands + price bounds for the filter sidebar of a category. */
export async function getFilterMeta(category) {
  await delay(120, 300);
  return {
    brands: collectBrands(products, category),
    priceRange: getPriceRange(products, category),
  };
}

/** Everything the home page needs in one call (hero rows). */
export async function getHomeData() {
  await delay(350, 650);
  const byDiscount = [...products].sort(
    (a, b) =>
      (b.price - b.discountPrice) / b.price - (a.price - a.discountPrice) / a.price
  );
  const bestSellers = products
    .filter((p) => p.badges.includes('bestseller'))
    .sort((a, b) => b.reviewCount - a.reviewCount);
  const recommended = [...products]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 12);
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12);

  return {
    categories: await getCategories(),
    deals: byDiscount.slice(0, 12),
    bestSellers: bestSellers.slice(0, 12),
    recommended,
    newArrivals,
  };
}

// --------------------------------------------------------------------------
// Coupons
// --------------------------------------------------------------------------

/** Validate a coupon against a subtotal; rejects with a friendly message. */
export async function validateCoupon(code, subtotal) {
  await delay(300, 600);
  const normalized = String(code || '').trim().toUpperCase();
  const coupon = coupons.find((c) => c.code === normalized);

  if (!coupon) {
    throw new Error(`"${normalized}" is not a valid coupon code.`);
  }
  if (subtotal < coupon.minOrder) {
    throw new Error(
      `${coupon.code} needs a minimum order of ${formatPrice(coupon.minOrder)}.`
    );
  }
  return { ...coupon };
}

// --------------------------------------------------------------------------
// Fake auth (stored in localStorage)
// --------------------------------------------------------------------------

const readRegisteredUsers = () => getStoredJSON(STORAGE_KEYS.users, []);

/**
 * @param {{email: string, password: string}} credentials
 * @returns {Promise<{token: string, user: object}>}
 */
export async function login({ email, password }) {
  await delay(500, 900);

  const normalizedEmail = String(email || '').trim().toLowerCase();
  const user =
    demoUsers.find((u) => u.email === normalizedEmail) ||
    readRegisteredUsers().find((u) => u.email === normalizedEmail);

  if (!user) throw new Error('No account found with this email address.');
  if (user.password !== password) throw new Error('Incorrect password. Please try again.');

  return {
    token: `fake-jwt.${btoa(`${user.id}:${Date.now()}`)}`,
    user: publicUser(user),
  };
}

/** Create a new account; rejects when the email is already taken. */
export async function register({ name, email, password }) {
  await delay(600, 1000);

  const normalizedEmail = String(email || '').trim().toLowerCase();
  const existing =
    demoUsers.find((u) => u.email === normalizedEmail) ||
    readRegisteredUsers().find((u) => u.email === normalizedEmail);

  if (existing) throw new Error('An account with this email already exists. Try logging in.');

  const user = {
    id: `u_${Date.now().toString(36)}`,
    name: String(name).trim(),
    email: normalizedEmail,
    password,
    phone: '',
    addresses: [],
  };

  setStoredJSON(STORAGE_KEYS.users, [...readRegisteredUsers(), user]);

  return {
    token: `fake-jwt.${btoa(`${user.id}:${Date.now()}`)}`,
    user: publicUser(user),
  };
}

// --------------------------------------------------------------------------
// Orders
// --------------------------------------------------------------------------

const generateOrderNumber = () => {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('');
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `KK-${date}-${suffix}`;
};

/**
 * "Place" an order: assigns an order number, persists it locally and
 * resolves with a confirmation payload.
 *
 * @param {{items: Array, address: object, delivery: object, payment: object,
 *          summary: object, customer: object}} order
 */
export async function placeOrder(order) {
  await delay(900, 1500);

  if (!order?.items?.length) throw new Error('Your cart is empty.');

  const placedOrder = {
    id: `ord_${Date.now().toString(36)}`,
    orderNumber: generateOrderNumber(),
    placedAt: new Date().toISOString(),
    estimatedDelivery: addDays(order.delivery?.id === 'express' ? 2 : 5),
    status: 'Confirmed',
    timeline: [
      { status: 'Confirmed', at: new Date().toISOString(), note: 'We received your order' },
      { status: 'Processing', at: null, note: 'Seller is preparing your items' },
      { status: 'Shipped', at: null, note: 'On the way to your address' },
      { status: 'Delivered', at: null, note: 'Handed over to you' },
    ],
    ...order,
  };

  const existing = getStoredJSON(STORAGE_KEYS.orders, []);
  setStoredJSON(STORAGE_KEYS.orders, [placedOrder, ...existing]);

  return {
    orderNumber: placedOrder.orderNumber,
    id: placedOrder.id,
    estimatedDelivery: placedOrder.estimatedDelivery,
    placedAt: placedOrder.placedAt,
  };
}

/** Current user's order history (newest first). */
export async function getOrders(userEmail) {
  await delay(250, 500);
  const orders = getStoredJSON(STORAGE_KEYS.orders, []);
  return orders.filter((o) => !userEmail || o.customer?.email === userEmail);
}

/** Single order by id — used by the order-details timeline. */
export async function getOrderById(orderId) {
  await delay(200, 400);
  const orders = getStoredJSON(STORAGE_KEYS.orders, []);
  return orders.find((o) => o.id === orderId || o.orderNumber === orderId) || null;
}
