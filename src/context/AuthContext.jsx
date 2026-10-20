import { createContext, useContext, useMemo, useState } from 'react';
import * as api from '@/services/api';
import { STORAGE_KEYS } from '@/utils/constants';
import { getStoredJSON, removeStored, setStoredJSON } from '@/utils/storage';

const AuthContext = createContext(null);

/** Fake auth backed by localStorage — swap the api.* calls for real JWT handling later. */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getStoredJSON(STORAGE_KEYS.auth, null));

  const persist = (next) => {
    setSession(next);
    if (next) setStoredJSON(STORAGE_KEYS.auth, next);
    else removeStored(STORAGE_KEYS.auth);
  };

  const login = async (email, password) => {
    const result = await api.login({ email, password });
    persist(result);
    return result.user;
  };

  const register = async (payload) => {
    const result = await api.register(payload);
    persist(result);
    return result.user;
  };

  const logout = () => persist(null);

  /** Merge fields into the current user (profile, addresses, ...). */
  const updateUser = (partial) => {
    if (!session) return null;
    const next = { ...session, user: { ...session.user, ...partial } };
    persist(next);
    return next.user;
  };

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.user),
      login,
      register,
      logout,
      updateUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
