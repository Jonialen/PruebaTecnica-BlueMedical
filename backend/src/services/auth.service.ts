// auth.service.ts (src/services/auth.service.ts)

import { UserRepository } from '../repositories/user.repository.js'
import { hashPassword, comparePassword } from '../utils/bcrypt.js'
import { generateToken } from '../utils/jwt.js'
import { AppError } from '../middlewares/error.middleware.js'

/**
 * Servicio para manejar la lógica de negocio de la autenticación.
 * Se encarga del registro y el inicio de sesión de usuarios.
 */
export const AuthService = {
  /**
   * Registra un nuevo usuario.
   * Verifica si el usuario ya existe, hashea la contraseña y crea el nuevo usuario.
   * Finalmente, genera un token de autenticación.
   *
   * @param {string} name - El nombre del usuario.
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} password - La contraseña del usuario en texto plano.
   * @returns {Promise<{user: any, token: string}>} - El usuario creado y un token JWT.
   * @throws {AppError} Si el usuario ya existe.
   */
  register: async (name: string, email: string, password: string) => {
    // Verificar si ya existe un usuario con el mismo email
    const existing = await UserRepository.findByEmail(email)
    if (existing) {
      throw new AppError(409, 'User already exists')
    }

    // Hashear la contraseña antes de guardarla
    const hashed = await hashPassword(password)

    // Crear el nuevo usuario en la base de datos
    const user = await UserRepository.create({
      name,
      email,
      password: hashed
    })

    // Generar un token de autenticación para el nuevo usuario
    const token = generateToken({ id: user.id, email: user.email })

    return { user, token }
  },

  /**
   * Autentica a un usuario.
   * Busca al usuario por su email, compara la contraseña proporcionada con la almacenada
   * y, si es válida, genera un token de autenticación.
   *
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} password - La contraseña del usuario en texto plano.
   * @returns {Promise<{user: any, token: string}>} - El usuario autenticado y un token JWT.
   * @throws {AppError} Si las credenciales son inválidas.
   */
  login: async (email: string, password: string) => {
    // Buscar al usuario por su email
    const user = await UserRepository.findByEmail(email)
    if (!user) throw new AppError(401, 'Invalid credentials')

    // Comparar la contraseña proporcionada con la hasheada en la base de datos
    const valid = await comparePassword(password, user.password)
    if (!valid) throw new AppError(401, 'Invalid credentials')

    // Generar un token de autenticación
    const token = generateToken({ id: user.id, email: user.email })

    return { user, token }
  }
}

