export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/__tests__/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  
  // Configuración para evitar problemas de memoria y timeout
  maxWorkers: '50%', // Usar 50% de CPUs disponibles
  workerIdleMemoryLimit: '512MB',
  testTimeout: 10000, // 10 segundos por test
  
  // Mejorar rendimiento
  maxConcurrency: 5,
  
  // Limpiar mocks automáticamente
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  
  // Verbose para mejor debugging
  verbose: true,
  
  // Detectar handles abiertos que impidan que Jest termine
  detectOpenHandles: true,
  forceExit: true, // Forzar salida después de los tests
};