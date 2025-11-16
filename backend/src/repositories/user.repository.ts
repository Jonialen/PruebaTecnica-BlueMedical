// user.repository.ts (src/repositories/user.repository.ts)

import { prisma } from '../prisma/client.js'
import { RegisterUserDto } from '../dtos/user.dto.js'

/**
 * Repositorio para gestionar las operaciones de la entidad `User` en la base de datos.
 * Abstrae las consultas a la base de datos relacionadas con los usuarios.
 */
export const UserRepository = {
  /**
   * Busca un usuario por su dirección de correo electrónico.
   * @param {string} email - El email del usuario a buscar.
   * @returns {Promise<any | null>} - Una promesa que resuelve en el usuario encontrado o null.
   */
  findByEmail: async (email: string) =>
    prisma.users.findUnique({ where: { email } }),

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {RegisterUserDto} data - Los datos del usuario a crear.
   * @returns {Promise<any>} - Una promesa que resuelve en el usuario creado.
   */
  create: async (data: RegisterUserDto) => prisma.users.create({ data })
}

