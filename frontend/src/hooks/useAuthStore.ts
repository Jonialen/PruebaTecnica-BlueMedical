// useAuthStore.ts (src/hooks/useAuthStore.ts)

import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@services/auth.service";
import { extractErrorMessage } from "@utils/helpers";
import type { User } from "@models/auth.types";

/**
 * Interfaz que define el estado y las acciones del store de autenticación.
 */
interface AuthState {
    /** El usuario autenticado. */
    user: User | null;
    /** El token de autenticación. */
    token: string | null;
    /** Indica si hay una operación de autenticación en curso. */
    loading: boolean;
    /** El último mensaje de error. */
    error: string | null;
    /**
     * Inicia sesión en la aplicación.
     * @param {string} email - El correo electrónico del usuario.
     * @param {string} password - La contraseña del usuario.
     * @returns {Promise<boolean>} `true` si el inicio de sesión fue exitoso, `false` en caso contrario.
     */
    login: (email: string, password: string) => Promise<boolean>;
    /**
     * Registra un nuevo usuario.
     * @param {string} name - El nombre del usuario.
     * @param {string} email - El correo electrónico del usuario.
     * @param {string} password - La contraseña del usuario.
     * @returns {Promise<boolean>} `true` si el registro fue exitoso, `false` en caso contrario.
     */
    register: (name: string, email: string, password: string) => Promise<boolean>;
    /** Cierra la sesión del usuario. */
    logout: () => void;
}

/**
 * Hook de Zustand para gestionar el estado de autenticación.
 * 
 * Proporciona el estado del usuario, el token, el estado de carga y los errores,
 * así como las acciones para iniciar sesión, registrarse y cerrar sesión.
 */
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: authService.getStoredToken(), // Inicializa el token desde el almacenamiento local.
    loading: false,
    error: null,

    async login(email, password) {
        set({ loading: true, error: null });
        try {
            const response = await authService.login({ email, password });

            if (response.status === "success") {
                const { token, user } = response.data;
                authService.setStoredToken(token); // Almacena el token.
                set({ token, user, loading: false });
                toast.success(response.message || "Inicio de sesión exitoso");
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
                authService.setStoredToken(token); // Almacena el token.
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
        authService.logout(); // Limpia el token del almacenamiento local.
        set({ user: null, token: null });
        toast.info("Sesión cerrada");
    },
}));
