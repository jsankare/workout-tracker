import { create } from 'zustand';
import { AuthState } from '../types/auth';

interface AuthStore extends AuthState {
  setAuth: (auth: Partial<AuthState>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  setAuth: (auth) => set((state) => ({ ...state, ...auth })),
  logout: () => set({ user: null, token: null, isAuthenticated: false, isLoading: false }),
}));