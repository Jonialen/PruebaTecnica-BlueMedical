// src/api/endpoints.ts
const ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/register',
    LOGIN: '/api/login',
  },
  TASKS: {
    LIST: '/api/tasks',
    CREATE: '/api/tasks',
    GET: (id: number) => `/api/tasks/${id}`,
    UPDATE: (id: number) => `/api/tasks/${id}`,
    DELETE: (id: number) => `/api/tasks/${id}`,
  },
};

export default ENDPOINTS;