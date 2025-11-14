// src/services/auth.service.ts
import api from '@api/axios.config';
import ENDPOINTS from '@api/endpoints';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse 
} from '@models/auth.types';

export const authService = {
  /**
   * Registrar nuevo usuario
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  },

  /**
   * Iniciar sesión
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  /**
   * Guardar token y usuario en localStorage
   */
  saveAuthData: (token: string, user: AuthResponse['data']['user']): void => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Obtener datos guardados
   */
  getAuthData: (): { token: string | null; user: AuthResponse['data']['user'] | null } => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    return { token, user };
  },

  /**
   * Cerrar sesión
   */
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Verificar si hay sesión activa
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};