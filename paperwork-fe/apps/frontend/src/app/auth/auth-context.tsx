import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { User } from '../types/identity';
import { users } from '../mock-data/users';

export type AuthContextValue = {
  user: User;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // MVP/demo: static user. Later this comes from real auth.
  const value = useMemo<AuthContextValue>(() => ({ user: users[0] }), []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
