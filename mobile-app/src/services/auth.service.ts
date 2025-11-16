import api from "@api/axios";
import { storage } from "@services/storage.service";
import { LoginCredentials, RegisterData, AuthResponse } from "@models";

const TOKEN_KEY = "token";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/login", credentials);
    return data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/register", userData);
    return data;
  },

  async getStoredToken() {
    return await storage.getItem(TOKEN_KEY);
  },

  async setStoredToken(token: string) {
    await storage.setItem(TOKEN_KEY, token);
  },

  async logout() {
    await storage.removeItem(TOKEN_KEY);
  },
};
