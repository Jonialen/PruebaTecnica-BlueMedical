// auth.types.ts (src/types/auth.types.ts)

/**
 * Interfaz que define la estructura de un objeto de usuario.
 */
export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Interfaz para las credenciales de inicio de sesión.
 */
export interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * Interfaz para los datos de registro de un nuevo usuario.
 */
export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

/**
 * Interfaz para la respuesta de la API de autenticación.
 */
export interface AuthResponse {
    status: string;
    message: string;
    data: {
        user: User;
        token: string;
    };
}

/**
 * Interfaz que define el estado de autenticación en el store.
 */
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}