// validation.middleware.ts (src/middlewares/validation.middleware.ts)

import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

/**
 * Middleware para procesar los resultados de las validaciones de `express-validator`.
 * Si hay errores de validación en la solicitud, los recopila y envía una
 * respuesta 400 (Bad Request) con un formato de error estructurado.
 * Si no hay errores, pasa el control al siguiente middleware.
 *
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @param {NextFunction} next - La función para pasar al siguiente middleware.
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  // Obtiene los errores de validación de la solicitud
  const errors = validationResult(req)

  // Si el array de errores no está vacío, significa que hubo fallos de validación
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      // Mapea los errores a un formato más limpio y consistente
      errors: errors.array().map(error => ({
        field: error.type === 'field' ? error.path : undefined,
        message: error.msg,
        value: error.type === 'field' ? error.value : undefined
      }))
    })
  }

  // Si no hay errores, continúa con la siguiente función en la cadena de middlewares
  next()
}
