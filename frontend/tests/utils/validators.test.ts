// tests/utils/validators.test.ts
import { describe, it, expect } from 'vitest'
import {
  isValidEmail,
  isValidPassword,
  isValidTaskTitle,
  isValidName,
  validateLoginForm,
  validateRegisterForm,
} from '@utils/validators'

describe('Validators', () => {
  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true)
    })

    it('rejects invalid email formats', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('isValidPassword', () => {
    it('accepts passwords with minimum length', () => {
      expect(isValidPassword('123456')).toBe(true)
      expect(isValidPassword('password123')).toBe(true)
    })

    it('rejects passwords below minimum length', () => {
      expect(isValidPassword('12345')).toBe(false)
      expect(isValidPassword('')).toBe(false)
    })

    it('respects custom minimum length', () => {
      expect(isValidPassword('12345678', 8)).toBe(true)
      expect(isValidPassword('1234567', 8)).toBe(false)
    })
  })

  describe('isValidTaskTitle', () => {
    it('accepts valid task titles', () => {
      expect(isValidTaskTitle('Valid Title')).toBe(true)
      expect(isValidTaskTitle('A')).toBe(true)
    })

    it('rejects empty or whitespace-only titles', () => {
      expect(isValidTaskTitle('')).toBe(false)
      expect(isValidTaskTitle('   ')).toBe(false)
    })

    it('rejects titles over 255 characters', () => {
      const longTitle = 'a'.repeat(256)
      expect(isValidTaskTitle(longTitle)).toBe(false)
    })
  })

  describe('isValidName', () => {
    it('accepts valid names', () => {
      expect(isValidName('John Doe')).toBe(true)
      expect(isValidName('Ab')).toBe(true)
    })

    it('rejects names that are too short', () => {
      expect(isValidName('A')).toBe(false)
      expect(isValidName('')).toBe(false)
    })

    it('rejects names that are too long', () => {
      const longName = 'a'.repeat(101)
      expect(isValidName(longName)).toBe(false)
    })
  })

  describe('validateLoginForm', () => {
    it('returns null for valid credentials', () => {
      expect(validateLoginForm('test@example.com', '123456')).toBeNull()
    })

    it('returns error for missing email', () => {
      const error = validateLoginForm('', '123456')
      expect(error).toBe('El correo es requerido')
    })

    it('returns error for invalid email format', () => {
      const error = validateLoginForm('invalid-email', '123456')
      expect(error).toBe('Formato de correo inválido')
    })

    it('returns error for missing password', () => {
      const error = validateLoginForm('test@example.com', '')
      expect(error).toBe('La contraseña es requerida')
    })

    it('returns error for short password', () => {
      const error = validateLoginForm('test@example.com', '12345')
      expect(error).toBe('La contraseña debe tener al menos 6 caracteres')
    })
  })

  describe('validateRegisterForm', () => {
    it('returns null for valid data', () => {
      expect(validateRegisterForm('John Doe', 'test@example.com', '123456')).toBeNull()
    })

    it('returns error for missing name', () => {
      const error = validateRegisterForm('', 'test@example.com', '123456')
      expect(error).toBe('El nombre es requerido')
    })

    it('returns error for short name', () => {
      const error = validateRegisterForm('A', 'test@example.com', '123456')
      expect(error).toBe('El nombre debe tener entre 2 y 100 caracteres')
    })
  })
})