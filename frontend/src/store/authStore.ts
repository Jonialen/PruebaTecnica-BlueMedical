// src/store/authStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { authService } from '@services/auth.service';
import type { User, LoginCredentials, RegisterData } from '@models/auth.types';

interface AuthStore {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  initAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.login(credentials);
          const { user, token } = response.data;
          
          authService.saveAuthData(token, user);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Error al iniciar sesión',
          });
          throw error;
        }
      },

      // Register
      register: async (data) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.register(data);
          const { user, token } = response.data;
          
          authService.saveAuthData(token, user);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Error al registrar usuario',
          });
          throw error;
        }
      },

      // Logout
      logout: () => {
        authService.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Initialize auth from localStorage
      initAuth: () => {
        const { token, user } = authService.getAuthData();
        
        if (token && user) {
          set({
            user,
            token,
            isAuthenticated: true,
          });
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    { name: 'AuthStore' }
  )
);