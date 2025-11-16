import axios from 'axios';
import { storage } from '@/services/storage.service';
import { Platform } from 'react-native';

const isWeb = Platform.OS === "web";

let API_URL = '';

if (isWeb) {
  API_URL = 'http://localhost:3001/api';

} else {
  API_URL = 'http://192.168.0.5:3001/api';
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor usa storage universal
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await storage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error reading token from storage:', error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor para manejar 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await storage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
