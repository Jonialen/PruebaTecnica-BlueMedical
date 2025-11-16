// src/__tests__/middlewares/auth.middleware.test.ts

import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

const mockVerifyToken = jest.fn();

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    verify: mockVerifyToken,
    sign: jest.fn(),
  },
  verify: mockVerifyToken,
  sign: jest.fn(),
}));

const { authMiddleware } = await import('../../middlewares/auth.middleware.js');

describe('Auth Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {};
    mockNext = jest.fn() as jest.MockedFunction<NextFunction>;
    jest.clearAllMocks();
  });

  it('should call next() with valid token', () => {
    const mockDecoded = { id: 1, email: 'test@example.com' };
    
    mockReq.headers = {
      authorization: 'Bearer valid-token',
    };

    mockVerifyToken.mockReturnValue(mockDecoded);

    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockVerifyToken).toHaveBeenCalledWith('valid-token', expect.any(String));
    expect((mockReq as any).user).toEqual(mockDecoded);
    expect(mockNext).toHaveBeenCalledWith();
  });

  it('should throw error when no authorization header', () => {
    mockReq.headers = {};

    expect(() => {
      authMiddleware(mockReq as Request, mockRes as Response, mockNext);
    }).toThrow('Authentication token was not provided');
  });

  it('should throw error when token is missing after Bearer', () => {
    mockReq.headers = {
      authorization: 'Bearer ',
    };

    expect(() => {
      authMiddleware(mockReq as Request, mockRes as Response, mockNext);
    }).toThrow('Missing or malformed token');
  });

  it('should call next with error for invalid token', () => {
    mockReq.headers = {
      authorization: 'Bearer invalid-token',
    };

    const error = new Error('Invalid token');
    error.name = 'JsonWebTokenError';
    
    mockVerifyToken.mockImplementation(() => {
      throw error;
    });

    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
      name: 'JsonWebTokenError',
    }));
  });

  it('should throw error when authorization header has wrong format', () => {
    mockReq.headers = {
      authorization: 'InvalidFormat',
    };

    expect(() => {
      authMiddleware(mockReq as Request, mockRes as Response, mockNext);
    }).toThrow('Missing or malformed token');
  });
});