// Global app constants. Money values are in Bangladeshi Taka (৳).
export const CURRENCY = '৳';

export const FREE_SHIPPING_THRESHOLD = 2000; // ৳
export const SHIPPING_FEE = 80; // ৳
export const TAX_RATE = 0.05; // 5% VAT

export const PAGE_SIZE = 12;
export const MAX_QUANTITY = 10;

export const RATING_FILTERS = [4, 3, 2, 1];

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Avg. Customer Review' },
  { value: 'newest', label: 'Newest Arrivals' },
];

export const STORAGE_KEYS = {
  cart: 'kenakata:cart',
  savedForLater: 'kenakata:saved-for-later',
  wishlist: 'kenakata:wishlist',
  auth: 'kenakata:auth',
  users: 'kenakata:users',
  orders: 'kenakata:orders',
  theme: 'kenakata:theme',
};

export const DELIVERY_OPTIONS = [
  {
    id: 'standard',
    label: 'Standard Delivery',
    detail: 'Delivered within 3-5 business days',
    fee: SHIPPING_FEE,
  },
  {
    id: 'express',
    label: 'Express Delivery',
    detail: 'Delivered within 1-2 business days',
    fee: 180,
  },
  {
    id: 'pickup',
    label: 'Store Pickup',
    detail: 'Collect from KenaKata hub, Banani (within 24 hours)',
    fee: 0,
  },
];

export const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', detail: 'Visa, Mastercard, AMEX' },
  { id: 'bkash', label: 'bKash', detail: 'Pay instantly with bKash' },
  { id: 'cod', label: 'Cash on Delivery', detail: 'Pay when you receive the order' },
];
