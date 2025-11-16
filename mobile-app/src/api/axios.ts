import axios from 'axios';
import { storage } from '@/services/storage.service';
import { Platform } from 'react-native';

const isWeb = Platform.OS === "web";

const API_URL = isWeb
  ? process.env.EXPO_PUBLIC_BACKEND_URL_LOCAL
  : process.env.EXPO_PUBLIC_BACKEND_URL_PHONE;

console.log('API Configuration:', {
  platform: Platform.OS,
  apiUrl: API_URL,
  isWeb
});

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await storage.getItem('token');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Request with token:', config.method?.toUpperCase(), config.url);
      } else {
        console.log('Request without token:', config.method?.toUpperCase(), config.url);
      }
    } catch (error) {
      console.error('Error reading token from storage:', error);
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response success:', response.config.url, response.status);
    return response;
  },
  async (error) => {
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });

    if (error.response?.status === 401) {
      console.log('401 Unauthorized, clearing token');
      await storage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;