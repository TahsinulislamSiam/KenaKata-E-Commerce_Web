import { useEffect } from 'react';

/** Prevents background scrolling while a drawer/modal is open. */
export default function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}
