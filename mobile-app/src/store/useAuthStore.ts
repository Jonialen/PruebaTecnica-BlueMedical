// src/store/useAuthStore.ts
import { create } from 'zustand';
import { authService } from '@services/auth.service';
import { User } from '@models';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const extractErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  
  if (error && typeof error === 'object') {
    const err = error as Record<string, unknown>;
    
    if (err.response && typeof err.response === 'object') {
      const response = err.response as Record<string, unknown>;
      if (response.data && typeof response.data === 'object') {
        const data = response.data as Record<string, unknown>;
        if (typeof data.message === 'string') return data.message;
      }
    }
    
    if (typeof err.message === 'string') return err.message;
  }
  
  return 'Ha ocurrido un error inesperado';
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  isInitialized: false,

  initialize: async () => {
    try {
      const token = await authService.getStoredToken();
      set({ token, isInitialized: true });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isInitialized: true });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.login({ email, password });

      if (response.status === 'success') {
        const { token, user } = response.data;
        await authService.setStoredToken(token);
        set({ token, user, loading: false });
        return true;
      }

      set({ error: response.message, loading: false });
      return false;
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      set({ error: msg, loading: false });
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.register({ name, email, password });

      if (response.status === 'success') {
        const { user, token } = response.data;
        await authService.setStoredToken(token);
        set({ token, user, loading: false });
        return true;
      }

      set({ error: response.message, loading: false });
      return false;
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      set({ error: msg, loading: false });
      return false;
    }
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, token: null });
  },
}));