// axios.ts (src/api/axios.ts)

import axios from "axios";

/**
 * Instancia de Axios configurada para la API.
 * 
 * Establece la URL base a partir de la variable de entorno `VITE_API_URL`
 * o usa un valor por defecto. Configura el tipo de contenido de las cabeceras.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
    headers: { "Content-Type": "application/json" },
});

/**
 * Interceptor de solicitudes de Axios.
 * 
 * Añade el token de autenticación (si existe en el `localStorage`)
 * a la cabecera `Authorization` de cada solicitud.
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
