// error.middleware.ts (src/middlewares/error.middleware.ts)

import { Request, Response, NextFunction } from 'express'

/**
 * Clase de error personalizada para manejar errores operacionales de la aplicación.
 * Permite especificar un código de estado HTTP y un mensaje claro.
 */
export class AppError extends Error {
  /**
   * @param {number} statusCode - Código de estado HTTP del error.
   * @param {string} message - Mensaje descriptivo del error.
   * @param {boolean} isOperational - Indica si es un error operacional conocido (vs. un error de programación).
   */
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

/**
 * Wrapper para controladores asíncronos de Express.
 * Captura cualquier error que ocurra en una función asíncrona y lo pasa
 * al siguiente middleware de manejo de errores (errorHandler).
 *
 * @param {Function} fn - La función de controlador asíncrona.
 * @returns {Function} - Una nueva función que maneja la promesa y los errores.
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/**
 * Middleware global para el manejo de errores en Express.
 * Centraliza todos los errores de la aplicación, los clasifica y envía
 * una respuesta JSON estandarizada y amigable al cliente.
 *
 * @param {any} err - El objeto de error.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @param {NextFunction} next - La función para pasar al siguiente middleware.
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDevelopment = process.env.NODE_ENV !== 'production'

  // 1. Errores personalizados de la aplicación (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(isDevelopment && { stack: err.stack })
    })
  }

  // 2. Errores de JWT (jsonwebtoken)
  if (err.name === 'TokenExpiredError') {
    return res
      .status(403)
      .json({ status: 'error', message: 'Token has expired' })
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ status: 'error', message: 'Invalid token' })
  }
  if (err.name === 'NotBeforeError') {
    return res
      .status(400)
      .json({ status: 'error', message: 'Token is not active yet' })
  }

  // 3. Errores comunes de MySQL
  if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
    return res.status(409).json({
      status: 'error',
      message: 'Duplicate entry',
      detail: err.sqlMessage
    })
  }
  if (err.errno === 1451) {
    return res.status(409).json({
      status: 'error',
      message: 'Operation not allowed due to foreign key constraint',
      detail: err.sqlMessage
    })
  }
  if (err.errno === 1452) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid reference: foreign key constraint failed',
      detail: err.sqlMessage
    })
  }
  if (err.errno === 1364) {
    return res.status(400).json({
      status: 'error',
      message: 'A required field is missing a value',
      detail: err.sqlMessage
    })
  }
  if (err.errno === 1048) {
    return res.status(400).json({
      status: 'error',
      message: 'A required column cannot be null',
      detail: err.sqlMessage
    })
  }
  if (err.errno === 1146) {
    return res.status(500).json({
      status: 'error',
      message: 'Database table not found',
      detail: err.sqlMessage
    })
  }

  // 4. Errores de CORS
  if (err.message === 'Not allowed by CORS') {
    return res
      .status(403)
      .json({ status: 'error', message: 'CORS policy: Origin not allowed' })
  }

  // 5. Errores de servidor desconocidos
  console.error('INTERNAL ERROR:', err)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    ...(isDevelopment && { error: err.message, stack: err.stack })
  })
}

