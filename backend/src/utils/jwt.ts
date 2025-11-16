// jwt.ts (src/utils/jwt.ts)

import jwt from 'jsonwebtoken'

/**
 * El secreto utilizado para firmar y verificar los tokens JWT.
 * Se obtiene de las variables de entorno, con un valor por defecto para desarrollo.
 * @type {string}
 */
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

/**
 * Genera un nuevo token JWT.
 * @param {object} payload - Los datos que se incluirán en el token (ej. id y email del usuario).
 * @returns {string} - El token JWT generado, con una expiración de 1 día.
 */
export const generateToken = (payload: object): string =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })

/**
 * Verifica la validez de un token JWT.
 * @param {string} token - El token JWT a verificar.
 * @returns {any} - El payload decodificado si el token es válido.
 * @throws {JsonWebTokenError} Si el token es inválido o ha expirado.
 */
export const verifyToken = (token: string): any => jwt.verify(token, JWT_SECRET)