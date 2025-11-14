// src/api/axios.config.ts
import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from '@models/api.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

// Crear instancia de axios
export const api = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request - agregar token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor de response - manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Error de red
    if (!error.response) {
      return Promise.reject({
        status: 'error',
        message: 'Error de conexión. Verifica tu conexión a internet.',
      });
    }

    const { status, data } = error.response;

    // Token expirado o inválido
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      
      return Promise.reject({
        status: 'error',
        message: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
      });
    }

    // Error de validación (400)
    if (status === 400 && data.errors) {
      return Promise.reject({
        status: 'error',
        message: 'Error de validación',
        errors: data.errors,
      });
    }

    // Otros errores
    return Promise.reject({
      status: 'error',
      message: data.message || 'Ocurrió un error inesperado',
    });
  }
);

export default api;