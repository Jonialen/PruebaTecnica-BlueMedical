// src/__tests__/utils/bcrypt.test.ts

import { describe, it, expect } from '@jest/globals';
import { hashPassword, comparePassword } from '../../utils/bcrypt.js';

describe('Bcrypt Utils', () => {
  describe('hashPassword', () => {
    it('should hash a password successfully', async () => {
      const password = 'test123456';
      const hashed = await hashPassword(password);
      
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(0);
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'test123456';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching password and hash', async () => {
      const password = 'test123456';
      const hashed = await hashPassword(password);
      const result = await comparePassword(password, hashed);
      
      expect(result).toBe(true);
    });

    it('should return false for non-matching password', async () => {
      const password = 'test123456';
      const wrongPassword = 'wrong123456';
      const hashed = await hashPassword(password);
      const result = await comparePassword(wrongPassword, hashed);
      
      expect(result).toBe(false);
    });

    it('should return false for invalid hash', async () => {
      const password = 'test123456';
      const invalidHash = 'invalid-hash';
      
      await expect(comparePassword(password, invalidHash)).rejects.toThrow();
    });
  });
});