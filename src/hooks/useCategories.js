import { useEffect, useState } from 'react';
import * as api from '@/services/api';

// Module-level cache so Navbar, CategoryStrip, SearchBar and MobileDrawer
// all share a single request.
let cache = null;

export default function useCategories() {
  const [categories, setCategories] = useState(cache);

  useEffect(() => {
    if (cache) {
      setCategories(cache);
      return undefined;
    }
    let cancelled = false;
    api.getCategories().then((data) => {
      cache = data;
      if (!cancelled) setCategories(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return categories ?? [];
}
