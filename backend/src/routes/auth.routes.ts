// auth.routes.ts (src/routes/auth.routes.ts)

import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import {
  registerValidator,
  loginValidator
} from '../validators/auth.validator.js'
import { validate } from '../middlewares/validation.middleware.js'

/**
 * Enrutador para las funcionalidades de autenticación.
 * Define las rutas para el registro y el inicio de sesión de usuarios.
 */
const router: Router = Router()

/**
 * @route POST /api/register
 * @description Ruta para registrar un nuevo usuario.
 * @middleware registerValidator - Valida los datos de entrada para el registro.
 * @middleware validate - Procesa los resultados de la validación.
 * @controller AuthController.register - Maneja la lógica de registro.
 */
router.post('/register', registerValidator, validate, AuthController.register)

/**
 * @route POST /api/login
 * @description Ruta para el inicio de sesión de un usuario.
 * @middleware loginValidator - Valida los datos de entrada para el login.
 * @middleware validate - Procesa los resultados de la validación.
 * @controller AuthController.login - Maneja la lógica de inicio de sesión.
 */
router.post('/login', loginValidator, validate, AuthController.login)

export default router
