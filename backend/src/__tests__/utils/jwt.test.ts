// src/__tests__/utils/jwt.test.ts

import { describe, it, expect } from '@jest/globals';
import { generateToken, verifyToken } from '../../utils/jwt.js';

describe('JWT Utils', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const payload = { id: 1, email: 'test@example.com' };
      const token = generateToken(payload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('should generate different tokens for different payloads', () => {
      const payload1 = { id: 1, email: 'test1@example.com' };
      const payload2 = { id: 2, email: 'test2@example.com' };
      
      const token1 = generateToken(payload1);
      const token2 = generateToken(payload2);
      
      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyToken', () => {
    it('should verify and decode a valid token', () => {
      const payload = { id: 1, email: 'test@example.com' };
      const token = generateToken(payload);
      const decoded = verifyToken(token);
      
      expect(decoded.id).toBe(payload.id);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.iat).toBeDefined();
      expect(decoded.exp).toBeDefined();
    });

    it('should throw error for invalid token', () => {
      const invalidToken = 'invalid.token.here';
      
      expect(() => verifyToken(invalidToken)).toThrow();
    });

    it('should throw error for malformed token', () => {
      const malformedToken = 'not-a-token';
      
      expect(() => verifyToken(malformedToken)).toThrow();
    });
  });
});