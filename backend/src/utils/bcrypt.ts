// bcrypt.ts (src/utils/bcrypt.ts)

import bcrypt from 'bcrypt'

/**
 * Genera un hash de una contraseña utilizando bcrypt.
 * @param {string} password - La contraseña en texto plano a hashear.
 * @returns {Promise<string>} - Una promesa que resuelve en la contraseña hasheada.
 */
export const hashPassword = async (password: string) => {
  // El segundo argumento (10) es el "salt round", que determina la complejidad del hash.
  return bcrypt.hash(password, 10)
}

/**
 * Compara una contraseña en texto plano con un hash para verificar si coinciden.
 * @param {string} password - La contraseña en texto plano.
 * @param {string} hash - El hash de la contraseña almacenada.
 * @returns {Promise<boolean>} - Una promesa que resuelve en `true` si las contraseñas coinciden, de lo contrario `false`.
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}
