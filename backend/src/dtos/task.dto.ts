// task.dto.ts (src/dtos/task.dto.ts)

/**
 * Data Transfer Object (DTO) para la creación de una nueva tarea.
 * Define la estructura de datos esperada al crear una tarea.
 */
export interface CreateTaskDto {
  title: string
  description?: string
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
}

/**
 * Data Transfer Object (DTO) para la actualización de una tarea existente.
 * Define los campos que se pueden actualizar en una tarea. Todos son opcionales.
 */
export interface UpdateTaskDto {
  title?: string
  description?: string
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
}

/**
 * Data Transfer Object (DTO) para la respuesta de una tarea.
 * Define la estructura de datos que se enviará al cliente.
 */
export interface TaskResponseDto {
  id: number
  title: string
  description: string | null
  status: string
  userId: number
  createdAt: Date | null
  updatedAt: Date | null
}

/**
 * Convierte un objeto de tarea (generalmente de la base de datos) a un TaskResponseDto.
 * Esto asegura que solo los datos necesarios y seguros se expongan al cliente.
 * @param {any} task - El objeto de tarea a transformar.
 * @returns {TaskResponseDto} - El DTO de la tarea.
 */
export const toTaskResponse = (task: any): TaskResponseDto => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  userId: task.userId,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt
})

/**
 * Convierte una lista de objetos de tarea a una lista de TaskResponseDto.
 * @param {any[]} tasks - La lista de tareas a transformar.
 * @returns {TaskResponseDto[]} - La lista de DTOs de tareas.
 */
export const toTaskListResponse = (tasks: any[]): TaskResponseDto[] =>
  tasks.map(toTaskResponse)
