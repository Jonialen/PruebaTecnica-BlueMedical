// task.validator.ts (src/validators/task.validator.ts)

import { body, param } from 'express-validator'

/**
 * Conjunto de validaciones para la creación de una nueva tarea.
 */
export const createTaskValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Title must be between 3 and 255 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Description cannot exceed 5000 characters'),

  body('status')
    .optional()
    .isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Status must be PENDING, IN_PROGRESS, or COMPLETED')
]

/**
 * Conjunto de validaciones para la actualización de una tarea existente.
 */
export const updateTaskValidator = [
  param('id').isInt().withMessage('Task ID must be a valid integer'),

  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty if provided')
    .isLength({ min: 3, max: 255 })
    .withMessage('Title must be between 3 and 255 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Description cannot exceed 5000 characters'),

  body('status')
    .optional()
    .isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Status must be PENDING, IN_PROGRESS, or COMPLETED')
]

/**
 * Validación para asegurar que el ID de la tarea en los parámetros de la URL es un entero válido.
 */
export const taskIdValidator = [
  param('id').isInt().withMessage('Task ID must be a valid integer')
]
