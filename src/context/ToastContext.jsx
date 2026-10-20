import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Info, XCircle } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message, type = 'info') => {
      const id = ++idRef.current;
      // keep at most 4 on screen
      setToasts((list) => [...list, { id, message, type }].slice(-4));
      setTimeout(() => dismiss(id), 3800);
      return id;
    },
    [dismiss]
  );

  const api = useMemo(
    () => ({
      show,
      dismiss,
      success: (message) => show(message, 'success'),
      error: (message) => show(message, 'error'),
      info: (message) => show(message, 'info'),
    }),
    [show, dismiss]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Live region for screen readers */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed right-3 top-20 z-[70] flex w-[min(22rem,calc(100vw-1.5rem))] flex-col gap-2 sm:right-4"
      >
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] ?? ICONS.info;
          const accent =
            toast.type === 'success'
              ? 'border-emerald-500'
              : toast.type === 'error'
                ? 'border-red-500'
                : 'border-brand-500';
          return (
            <div
              key={toast.id}
              role="status"
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border-l-4 bg-white p-3 shadow-soft ring-1 ring-slate-200 animate-slide-in-right dark:bg-slate-800 dark:ring-slate-700 ${accent}`}
            >
              <Icon
                size={18}
                className={
                  toast.type === 'success'
                    ? 'mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400'
                    : toast.type === 'error'
                      ? 'mt-0.5 shrink-0 text-red-600 dark:text-red-400'
                      : 'mt-0.5 shrink-0 text-brand-600 dark:text-brand-400'
                }
              />
              <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-100">
                {toast.message}
              </p>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path
                    d="M18 6 6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
