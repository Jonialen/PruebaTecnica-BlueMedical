// user.dto.ts (src/dtos/user.dto.ts)

/**
 * Data Transfer Object (DTO) para el registro de un nuevo usuario.
 */
export interface RegisterUserDto {
  name: string
  email: string
  password: string
}

/**
 * Data Transfer Object (DTO) para el login de un usuario.
 */
export interface LoginUserDto {
  email: string
  password: string
}

/**
 * Data Transfer Object (DTO) para la respuesta de un usuario.
 * Contiene los datos públicos del usuario que se envían al cliente.
 */
export interface UserResponseDto {
  id: number
  name: string
  email: string
  createdAt: Date | null
  updatedAt: Date | null
}

/**
 * Data Transfer Object (DTO) para la respuesta de autenticación.
 * Combina los datos del usuario con el token de acceso.
 */
export interface AuthResponseDto {
  user: UserResponseDto
  token: string
}

/**
 * Convierte un objeto de usuario (de la base de datos) a un UserResponseDto.
 * Esto garantiza que no se expongan datos sensibles como la contraseña.
 * @param {any} user - El objeto de usuario a transformar.
 * @returns {UserResponseDto} - El DTO del usuario.
 */
export const toUserResponse = (user: any): UserResponseDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
})
