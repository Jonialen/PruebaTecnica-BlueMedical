// src/store/useAuthStore.ts - Fixed for web
import { create } from 'zustand';
import { authService } from '@services/auth.service';
import { User } from '@models';
import { Platform } from "react-native";

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
  clearError: () => void;
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

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  isInitialized: false,

  clearError: () => set({ error: null }),

  initialize: async () => {
    try {
      const token = await authService.getStoredToken();
      console.log('Token initialized:', token ? 'exists' : 'null');
      set({ token, isInitialized: true });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isInitialized: true });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      console.log('Login attempt for:', email);
      const response = await authService.login({ email, password });

      if (response.status === 'success') {
        const { token, user } = response.data;
        console.log('Login successful, saving token');
        await authService.setStoredToken(token);
        
        // Force state update
        set({ 
          token, 
          user, 
          loading: false,
          error: null 
        });
        
        console.log('Auth state updated:', { hasToken: !!token, hasUser: !!user });
        return true;
      }

      set({ error: response.message, loading: false });
      return false;
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      console.error('Login error:', msg);
      set({ error: msg, loading: false });
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      console.log('Register attempt for:', email);
      const response = await authService.register({ name, email, password });

      if (response.status === 'success') {
        const { user, token } = response.data;
        console.log('Register successful, saving token');
        await authService.setStoredToken(token);
        
        // Force state update
        set({ 
          token, 
          user, 
          loading: false,
          error: null 
        });
        
        console.log('Auth state updated:', { hasToken: !!token, hasUser: !!user });
        return true;
      }

      set({ error: response.message, loading: false });
      return false;
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      console.error('Register error:', msg);
      set({ error: msg, loading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      console.log('Logout initiated');
      await authService.logout();
      
      // Clear state immediately
      set({ 
        user: null, 
        token: null,
        error: null,
        loading: false 
      });
      
      console.log('Logout complete, state cleared');

      // Reload page on web to reset everything
      if (Platform.OS === "web") {
        console.log('Reloading web page');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear state even if there's an error
      set({ 
        user: null, 
        token: null,
        error: null,
        loading: false 
      });
      
      if (Platform.OS === "web") {
        window.location.href = '/';
      }
    }
  },
}));