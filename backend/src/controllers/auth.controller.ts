// auth.controller.ts (src/controllers/auth.controller.ts)

import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/auth.service.js'
import { toUserResponse } from '../dtos/user.dto.js'
import { asyncHandler } from '../middlewares/error.middleware.js'

/**
 * Controlador para gestionar las operaciones de autenticación (registro y login).
 */
export const AuthController = {
  /**
   * @route POST /api/register
   * @description Registra un nuevo usuario en el sistema.
   * @param {Request} req - El objeto de solicitud de Express.
   * @param {Response} res - El objeto de respuesta de Express.
   * @param {NextFunction} next - La función para pasar al siguiente middleware.
   * @returns {Response} - Una respuesta JSON con el usuario creado y un token de autenticación.
   */
  register: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, email, password } = req.body
      const result = await AuthService.register(name, email, password)

      return res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: {
          user: toUserResponse(result.user),
          token: result.token
        }
      })
    }
  ),

  /**
   * @route POST /api/login
   * @description Autentica a un usuario y le proporciona un token.
   * @param {Request} req - El objeto de solicitud de Express.
   * @param {Response} res - El objeto de respuesta de Express.
   * @param {NextFunction} next - La función para pasar al siguiente middleware.
   * @returns {Response} - Una respuesta JSON con los datos del usuario y un token de autenticación.
   */
  login: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const result = await AuthService.login(email, password)

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: toUserResponse(result.user),
        token: result.token
      }
    })
  })
}
