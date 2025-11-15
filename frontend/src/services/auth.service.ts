// frontend/src/services/auth.service.ts
import api from "@api/axios";
import type { LoginCredentials, RegisterData, AuthResponse } from "@models/auth.types";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/login", credentials);
    return data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/register", userData);
    return data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem("token");
  },

  getStoredToken(): string | null {
    return localStorage.getItem("token");
  },

  setStoredToken(token: string): void {
    localStorage.setItem("token", token);
  }
};