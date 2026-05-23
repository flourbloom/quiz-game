import { create } from 'zustand';
import type { AuthResponse } from '../types/auth';

interface AuthState {
  user: AuthResponse | null;
  setUser: (user: AuthResponse | null) => void;
  clearUser: () => void;
}

const AUTH_STORAGE_KEY = 'quiz-game-auth-user';

const readStoredUser = (): AuthResponse | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthResponse;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: readStoredUser(),
  setUser: (user) => {
    if (typeof window !== 'undefined') {
      if (user) {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    set({ user });
  },
  clearUser: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    set({ user: null });
  },
}));
