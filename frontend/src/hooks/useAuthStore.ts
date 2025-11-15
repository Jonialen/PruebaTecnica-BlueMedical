import { create } from "zustand";
import api from "../api/axios";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
}

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
  token: localStorage.getItem("token"),
  loading: false,
  error: null,

  // --- LOGIN ---
  async login(email, password) {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/login", { email, password });

      // Casos del backend (status: success | error)
      if (data.status === "success") {
        const { token, user } = data.data;
        localStorage.setItem("token", token);
        set({ token, user, loading: false });
        toast.success(data.message || "Inicio de sesión exitoso ✨");
        return true;
      }

      // Caso manejado: status === "error"
      set({ error: data.message, loading: false });
      toast.error(data.message || "Error al iniciar sesión");
      return false;
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "No se pudo iniciar sesión";
      set({ error: msg, loading: false });
      toast.error(msg);
      return false;
    }
  },

  // --- REGISTER ---
  async register(name, email, password) {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/register", {
        name,
        email,
        password,
      });

      if (data.status === "success") {
        const { user, token } = data.data;
        localStorage.setItem("token", token);
        set({ token, user, loading: false });
        toast.success(data.message || "Registro exitoso");
        return true;
      }

      // Respuesta con status: "error"
      set({ error: data.message, loading: false });
      toast.error(data.message || "Error al registrar usuario");
      return false;
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "No se pudo registrar usuario";
      set({ error: msg, loading: false });
      toast.error(msg);
      return false;
    }
  },

  // --- LOGOUT ---
  logout() {
    localStorage.removeItem("token");
    set({ user: null, token: null });
    toast.info("Sesión cerrada");
  },
}));