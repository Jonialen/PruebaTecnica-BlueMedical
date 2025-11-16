// auth.validator.ts (src/validators/auth.validator.ts)

import { body } from 'express-validator'

/**
 * Conjunto de validaciones para el endpoint de registro de usuarios.
 * Utiliza `express-validator` para asegurar que los datos de entrada son correctos.
 */
export const registerValidator = [
  // El nombre no debe estar vacío.
  body('name').notEmpty().withMessage('Name is required'),

  // El email debe ser un correo electrónico válido.
  body('email').isEmail().withMessage('Valid email required'),

  // La contraseña debe tener al menos 6 caracteres.
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
]

/**
 * Conjunto de validaciones para el endpoint de inicio de sesión.
 */
export const loginValidator = [
  // El email debe ser un correo electrónico válido.
  body('email').isEmail().withMessage('A valid email is required'),

  // La contraseña no debe estar vacía.
  body('password').notEmpty().withMessage('Password is required')
]

