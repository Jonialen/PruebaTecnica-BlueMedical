// src/__tests__/setup.ts

import { jest } from '@jest/globals';

// timeout global para tests
jest.setTimeout(10000);

// Mock de variables de entorno
process.env.JWT_SECRET = 'test-secret-key';
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'mysql://test:test@localhost:3306/test_db';

// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
});