import { create } from 'zustand';
import { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
}));