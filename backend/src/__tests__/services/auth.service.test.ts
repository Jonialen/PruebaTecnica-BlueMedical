// src/__tests__/services/auth.service.test.ts

import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { AuthService } from '../../services/auth.service.js';
import { UserRepository } from '../../repositories/user.repository.js';
import { AppError } from '../../middlewares/error.middleware.js';
import * as bcryptUtils from '../../utils/bcrypt.js';
import * as jwtUtils from '../../utils/jwt.js';

// Mock de los módulos
jest.mock('../../repositories/user.repository.js');
jest.mock('../../utils/bcrypt.js');
jest.mock('../../utils/jwt.js');

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

      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcryptUtils.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
      (UserRepository.create as jest.Mock).mockResolvedValue(mockUser);
      (jwtUtils.generateToken as jest.Mock).mockReturnValue(mockToken);

      const result = await AuthService.register('Test User', 'test@example.com', 'password123');

      expect(result).toEqual({
        user: mockUser,
        token: mockToken,
      });
      expect(UserRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcryptUtils.hashPassword).toHaveBeenCalledWith('password123');
      expect(UserRepository.create).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      const existingUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Existing User',
      };

      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(existingUser);

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

      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcryptUtils.comparePassword as jest.Mock).mockResolvedValue(true);
      (jwtUtils.generateToken as jest.Mock).mockReturnValue(mockToken);

      const result = await AuthService.login('test@example.com', 'password123');

      expect(result).toEqual({
        user: mockUser,
        token: mockToken,
      });
      expect(bcryptUtils.comparePassword).toHaveBeenCalledWith('password123', 'hashedPassword');
    });

    it('should throw error if user not found', async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(
        AuthService.login('nonexistent@example.com', 'password123')
      ).rejects.toThrow(new AppError(401, 'Invalid credentials'));
    });

    it('should throw error if password is invalid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcryptUtils.comparePassword as jest.Mock).mockResolvedValue(false);

      await expect(
        AuthService.login('test@example.com', 'wrongpassword')
      ).rejects.toThrow(new AppError(401, 'Invalid credentials'));
    });
  });
});