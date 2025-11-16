// src/__tests__/setup.ts
import { jest, beforeAll, afterAll, afterEach } from '@jest/globals';

// Timeout global para tests (10 segundos)
jest.setTimeout(10000);

// Configurar variables de entorno para testing
process.env.JWT_SECRET = 'test-secret-key-for-testing-only';
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'mysql://test:test@localhost:3306/test_db';

// Mock de console para evitar ruido en los tests
const originalConsole = { ...console };

beforeAll(() => {
  // Silenciar logs en tests (opcional)
  // Descomenta si quieres silenciar completamente
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    // Mantener error para ver fallos importantes
    error: console.error,
  };
});


// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

afterAll(() => {
  // Restaurar console si fue mockeado
  global.console = originalConsole;
  
  // Limpiar todos los timers
  jest.clearAllTimers();
  jest.useRealTimers();
});

/**
 * Función auxiliar para esperar un tiempo específico
 * Útil para tests asíncronos
 */
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock de un token JWT válido para tests
 */
export const mockValidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.4Adcj0vfLwEuXPDf4nZLc_-qRrpBCZvJ3PqN_j_8h8Y';

/**
 * Mock de datos de usuario para tests
 */
export const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  password: '$2b$10$abcdefghijklmnopqrstuvwxyz', // Hash de bcrypt mock
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
};

/**
 * Mock de datos de tarea para tests
 */
export const mockTask = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  status: 'PENDING' as const,
  userId: 1,
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
};