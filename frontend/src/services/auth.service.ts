// auth.service.ts (src/services/auth.service.ts)

import api from "@api/axios";
import type { LoginCredentials, RegisterData, AuthResponse } from "@models/auth.types";

/**
 * Servicio para gestionar la autenticación de usuarios.
 * 
 * Proporciona métodos para iniciar sesión, registrarse, cerrar sesión y manejar el token de autenticación.
 */
export const authService = {
    /**
     * Inicia sesión en la aplicación.
     * @param {LoginCredentials} credentials - Las credenciales de inicio de sesión (email y contraseña).
     * @returns {Promise<AuthResponse>} La respuesta de la API de autenticación.
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>("/login", credentials);
        return data;
    },

    /**
     * Registra un nuevo usuario.
     * @param {RegisterData} userData - Los datos del nuevo usuario (nombre, email y contraseña).
     * @returns {Promise<AuthResponse>} La respuesta de la API de autenticación.
     */
    async register(userData: RegisterData): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>("/register", userData);
        return data;
    },

    /**
     * Cierra la sesión del usuario eliminando el token del almacenamiento local.
     */
    async logout(): Promise<void> {
        localStorage.removeItem("token");
    },

    /**
     * Obtiene el token de autenticación almacenado.
     * @returns {string | null} El token de autenticación o `null` si no existe.
     */
    getStoredToken(): string | null {
        return localStorage.getItem("token");
    },

    /**
     * Almacena el token de autenticación.
     * @param {string} token - El token de autenticación a almacenar.
     */
    setStoredToken(token: string): void {
        localStorage.setItem("token", token);
    }
};
