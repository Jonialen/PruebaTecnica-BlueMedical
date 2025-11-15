// frontend/src/hooks/useAuthStore.ts
import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@services/auth.service";
import { extractErrorMessage } from "@utils/helpers";
import type { User } from "@models/auth.types";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: authService.getStoredToken(),
  loading: false,
  error: null,

  async login(email, password) {
    set({ loading: true, error: null });
    try {
      const response = await authService.login({ email, password });

      if (response.status === "success") {
        const { token, user } = response.data;
        authService.setStoredToken(token);
        set({ token, user, loading: false });
        toast.success(response.message || "Inicio de sesión exitoso ✨");
        return true;
      }

      set({ error: response.message, loading: false });
      toast.error(response.message || "Error al iniciar sesión");
      return false;
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      set({ error: msg, loading: false });
      toast.error(msg);
      return false;
    }
  },

  async register(name, email, password) {
    set({ loading: true, error: null });
    try {
      const response = await authService.register({ name, email, password });

      if (response.status === "success") {
        const { user, token } = response.data;
        authService.setStoredToken(token);
        set({ token, user, loading: false });
        toast.success(response.message || "Registro exitoso");
        return true;
      }

      set({ error: response.message, loading: false });
      toast.error(response.message || "Error al registrar usuario");
      return false;
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      set({ error: msg, loading: false });
      toast.error(msg);
      return false;
    }
  },

  logout() {
    authService.logout();
    set({ user: null, token: null });
    toast.info("Sesión cerrada");
  },
}));