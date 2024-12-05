import { Gender } from './user';

export interface User {
  id: string;
  email: string;
  name: string;
  weight?: number;
  height?: number;
  age?: number;
  gender?: Gender;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}