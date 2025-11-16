// src/services/auth.service.ts
import * as SecureStore from 'expo-secure-store';
import api from '@api/axios';
import { LoginCredentials, RegisterData, AuthResponse } from '@models';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/login', credentials);
    return data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/register', userData);
    return data;
  },

  async getStoredToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync('token');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  async setStoredToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync('token', token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },

  async logout(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('token');
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  },
};