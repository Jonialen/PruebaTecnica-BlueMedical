// src/__tests__/services/auth.service.test.ts

import { describe, it, expect, jest, beforeEach } from '@jest/globals';

const mockFindByEmail = jest.fn();
const mockCreateUser = jest.fn();
const mockHashPassword = jest.fn();
const mockComparePassword = jest.fn();
const mockGenerateToken = jest.fn();

jest.unstable_mockModule('../../repositories/user.repository.js', () => ({
  UserRepository: {
    findByEmail: mockFindByEmail,
    create: mockCreateUser,
  },
}));

jest.unstable_mockModule('../../utils/bcrypt.js', () => ({
  hashPassword: mockHashPassword,
  comparePassword: mockComparePassword,
}));

jest.unstable_mockModule('../../utils/jwt.js', () => ({
  generateToken: mockGenerateToken,
  verifyToken: jest.fn(),
}));

const { AuthService } = await import('../../services/auth.service.js');
const { AppError } = await import('../../middlewares/error.middleware.js');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = 'mock-jwt-token';

      mockFindByEmail.mockResolvedValue(null);
      mockHashPassword.mockResolvedValue('hashedPassword');
      mockCreateUser.mockResolvedValue(mockUser);
      mockGenerateToken.mockReturnValue(mockToken);

      const result = await AuthService.register('Test User', 'test@example.com', 'password123');

      expect(result).toEqual({
        user: mockUser,
        token: mockToken,
      });
      expect(mockFindByEmail).toHaveBeenCalledWith('test@example.com');
      expect(mockHashPassword).toHaveBeenCalledWith('password123');
      expect(mockCreateUser).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      const existingUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Existing User',
        password: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindByEmail.mockResolvedValue(existingUser);

      await expect(
        AuthService.register('Test User', 'test@example.com', 'password123')
      ).rejects.toThrow(new AppError(409, 'User already exists'));
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = 'mock-jwt-token';

      mockFindByEmail.mockResolvedValue(mockUser);
      mockComparePassword.mockResolvedValue(true);
      mockGenerateToken.mockReturnValue(mockToken);

      const result = await AuthService.login('test@example.com', 'password123');

      expect(result).toEqual({
        user: mockUser,
        token: mockToken,
      });
      expect(mockComparePassword).toHaveBeenCalledWith('password123', 'hashedPassword');
    });

    it('should throw error if user not found', async () => {
      mockFindByEmail.mockResolvedValue(null);

      await expect(
        AuthService.login('nonexistent@example.com', 'password123')
      ).rejects.toThrow(new AppError(401, 'Invalid credentials'));
    });

    it('should throw error if password is invalid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindByEmail.mockResolvedValue(mockUser);
      mockComparePassword.mockResolvedValue(false);

      await expect(
        AuthService.login('test@example.com', 'wrongpassword')
      ).rejects.toThrow(new AppError(401, 'Invalid credentials'));
    });
  });
});