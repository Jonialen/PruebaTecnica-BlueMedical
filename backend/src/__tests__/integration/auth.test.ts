// src/__tests__/integration/auth.test.ts

import { describe, it, expect, jest, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import { prisma } from '../../prisma/client.js';

// Mock de Prisma
jest.mock('../../prisma/client.js', () => ({
  prisma: {
    users: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  },
}));

describe('Auth Integration Tests', () => {
  beforeAll(async () => {
    // Setup si es necesario
  });

  afterAll(async () => {
    // Cleanup
    jest.clearAllMocks();
  });

  describe('POST /api/register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: '$2b$10$hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.users.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.users.create as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.user.email).toBe('test@example.com');
      expect(response.body.data.token).toBeDefined();
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          name: 'Test User',
          email: 'invalid-email',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });

    it('should return 400 for short password', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: '123',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });

    it('should return 400 for missing name', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });
  });

  describe('POST /api/login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: '$2b$10$hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.token).toBeDefined();
    });

    it('should return 400 for invalid email format', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'invalid-email',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });

    it('should return 400 for missing password', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });
  });
});