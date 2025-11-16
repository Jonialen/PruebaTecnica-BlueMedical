// auth.middleware.ts (src/middlewares/auth.middleware.ts)

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './error.middleware.js'

/**
 * Middleware para verificar la autenticación del usuario a través de un token JWT.
 * Extrae el token del encabezado 'Authorization', lo verifica y adjunta los datos
 * decodificados del usuario al objeto `req` para su uso en rutas protegidas.
 *
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @param {NextFunction} next - La función para pasar al siguiente middleware.
 * @throws {AppError} Si no se proporciona un token o si el token es inválido.
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Obtiene el encabezado 'Authorization'
  const authHeader = req.headers.authorization

  // Verifica si el encabezado existe
  if (!authHeader) {
    throw new AppError(401, 'Authentication token was not provided')
  }

  // El token debe tener el formato "Bearer <token>"
  const token = authHeader.split(' ')[1]

  // Verifica si el token existe después de hacer split
  if (!token) {
    throw new AppError(401, 'Missing or malformed token')
  }

  try {
    // Verifica el token usando el secreto
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    // Adjunta el payload decodificado (datos del usuario) a la solicitud
    ;(req as any).user = decoded
    // Continúa con el siguiente middleware o controlador
    next()
  } catch (err) {
    // Si jwt.verify falla (token inválido, expirado, etc.), pasa el error al manejador global
    next(err)
  }
}
