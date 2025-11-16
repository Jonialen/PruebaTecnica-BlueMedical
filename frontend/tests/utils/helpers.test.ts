// tests/utils/helpers.test.ts
import { describe, it, expect } from 'vitest'
import {
  capitalize,
  formatStatus,
  truncate,
  extractErrorMessage,
} from '@utils/helpers'

describe('Helpers', () => {
  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('WORLD')).toBe('World')
    })

    it('handles empty string', () => {
      expect(capitalize('')).toBe('')
    })
  })

  describe('formatStatus', () => {
    it('formats task status correctly', () => {
      expect(formatStatus('PENDING')).toBe('pending')
      expect(formatStatus('IN_PROGRESS')).toBe('in progress')
      expect(formatStatus('COMPLETED')).toBe('completed')
    })
  })

  describe('truncate', () => {
    it('truncates long text', () => {
      const text = 'This is a very long text that needs to be truncated'
      expect(truncate(text, 20)).toBe('This is a very long ...')
    })

    it('does not truncate short text', () => {
      const text = 'Short text'
      expect(truncate(text, 20)).toBe('Short text')
    })
  })

  describe('extractErrorMessage', () => {
    it('extracts message from string', () => {
      expect(extractErrorMessage('Error message')).toBe('Error message')
    })

    it('extracts message from axios error', () => {
      const axiosError = {
        response: {
          data: {
            message: 'API Error',
          },
        },
      }
      expect(extractErrorMessage(axiosError)).toBe('API Error')
    })

    it('extracts message from error object', () => {
      const error = new Error('Something went wrong')
      expect(extractErrorMessage(error)).toBe('Something went wrong')
    })

    it('returns default message for unknown error', () => {
      expect(extractErrorMessage(null)).toBe('Ha ocurrido un error inesperado')
      expect(extractErrorMessage(undefined)).toBe('Ha ocurrido un error inesperado')
      expect(extractErrorMessage({})).toBe('Ha ocurrido un error inesperado')
    })
  })
})