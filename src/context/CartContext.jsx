import { createContext, useContext, useMemo, useState } from 'react';
import { findProductById } from '@/data';
import { MAX_QUANTITY, STORAGE_KEYS } from '@/utils/constants';
import { getStoredJSON, setStoredJSON } from '@/utils/storage';

const CartContext = createContext(null);

const clampQty = (product, qty) => {
  const max = Math.max(1, Math.min(product.stock, MAX_QUANTITY));
  return Math.min(Math.max(1, qty), max);
};

/**
 * Cart + "save for later". Stores only `{ id, qty, addedAt }` and hydrates the
 * product data from the (mock) catalog so the payload stays small.
 */
export function CartProvider({ children }) {
  const [rawItems, setRawItems] = useState(() => getStoredJSON(STORAGE_KEYS.cart, []));
  const [savedIds, setSavedIds] = useState(() => getStoredJSON(STORAGE_KEYS.savedForLater, []));

  const writeItems = (next) => {
    setRawItems(next);
    setStoredJSON(STORAGE_KEYS.cart, next);
  };
  const writeSaved = (next) => {
    setSavedIds(next);
    setStoredJSON(STORAGE_KEYS.savedForLater, next);
  };

  const items = useMemo(
    () =>
      rawItems
        .map((raw) => {
          const product = findProductById(raw.id);
          return product ? { ...raw, product } : null;
        })
        .filter(Boolean),
    [rawItems]
  );

  const savedItems = useMemo(
    () =>
      savedIds
        .map((id) => {
          const product = findProductById(id);
          return product ? { id, product } : null;
        })
        .filter(Boolean),
    [savedIds]
  );

  /** Add a product (id) with a quantity. Returns the resulting item qty, or null. */
  const addItem = (id, qty = 1) => {
    const product = findProductById(id);
    if (!product || product.stock < 1) return null;

    const existing = rawItems.find((i) => i.id === id);
    const nextQty = clampQty(product, (existing?.qty ?? 0) + qty);

    const next = existing
      ? rawItems.map((i) => (i.id === id ? { ...i, qty: nextQty } : i))
      : [...rawItems, { id, qty: nextQty, addedAt: Date.now() }];
    writeItems(next);

    if (savedIds.includes(id)) writeSaved(savedIds.filter((s) => s !== id));
    return nextQty;
  };

  const setQty = (id, qty) => {
    const product = findProductById(id);
    if (!product) return;
    const next = rawItems.map((i) => (i.id === id ? { ...i, qty: clampQty(product, qty) } : i));
    writeItems(next);
  };

  const removeItem = (id) => writeItems(rawItems.filter((i) => i.id !== id));

  const saveForLater = (id) => {
    writeItems(rawItems.filter((i) => i.id !== id));
    if (!savedIds.includes(id)) writeSaved([id, ...savedIds]);
  };

  const moveToCart = (id) => {
    writeSaved(savedIds.filter((s) => s !== id));
    if (!rawItems.some((i) => i.id === id)) {
      addItem(id, 1);
    }
  };

  const removeSaved = (id) => writeSaved(savedIds.filter((s) => s !== id));

  const clear = () => {
    writeItems([]);
    writeSaved([]);
  };

  const count = items.reduce((sum, item) => sum + item.qty, 0);

  const value = {
    items,
    savedItems,
    count,
    addItem,
    setQty,
    removeItem,
    saveForLater,
    moveToCart,
    removeSaved,
    clear,
    isEmpty: items.length === 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
