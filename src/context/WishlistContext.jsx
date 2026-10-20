import { createContext, useContext, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '@/utils/constants';
import { getStoredJSON, setStoredJSON } from '@/utils/storage';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => getStoredJSON(STORAGE_KEYS.wishlist, []));

  const write = (next) => {
    setIds(next);
    setStoredJSON(STORAGE_KEYS.wishlist, next);
  };

  const has = (id) => ids.includes(id);

  /** Toggle a product. Returns true when it is now in the wishlist. */
  const toggle = (id) => {
    const nowIn = !ids.includes(id);
    write(nowIn ? [...ids, id] : ids.filter((x) => x !== id));
    return nowIn;
  };

  const remove = (id) => write(ids.filter((x) => x !== id));
  const clear = () => write([]);

  const value = useMemo(() => ({ ids, count: ids.length, has, toggle, remove, clear }), [ids]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
