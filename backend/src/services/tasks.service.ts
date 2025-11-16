// tasks.service.ts (src/services/tasks.service.ts)

import { TaskRepository } from '../repositories/task.repository.js'
import { AppError } from '../middlewares/error.middleware.js'
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto.js'

/**
 * Servicio para manejar la lógica de negocio de las tareas.
 * Contiene la lógica para listar, crear, actualizar, eliminar y obtener tareas.
 */
export const TaskService = {
  /**
   * Lista las tareas de un usuario, con opción de filtrar por estado.
   * @param {number} userId - El ID del usuario.
   * @param {string} [status] - El estado por el cual filtrar (opcional).
   * @returns {Promise<any[]>} - Una lista de tareas.
   * @throws {AppError} Si el estado proporcionado no es válido.
   */
  list: async (userId: number, status?: string) => {
    const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED']

    if (status && !validStatuses.includes(status)) {
      throw new AppError(400, 'Invalid status filter')
    }

    return TaskRepository.findAllByUser(userId, status)
  },

  /**
   * Crea una nueva tarea para un usuario.
   * @param {number} userId - El ID del usuario que crea la tarea.
   * @param {CreateTaskDto} data - Los datos de la tarea a crear.
   * @returns {Promise<any>} - La tarea creada.
   */
  create: async (userId: number, data: CreateTaskDto) => {
    return TaskRepository.create({
      ...data,
      userId,
      status: data.status || 'PENDING'
    })
  },

  /**
   * Actualiza una tarea existente.
   * @param {number} id - El ID de la tarea a actualizar.
   * @param {number} userId - El ID del usuario que realiza la acción.
   * @param {UpdateTaskDto} data - Los datos a actualizar.
   * @returns {Promise<any>} - La tarea actualizada.
   * @throws {AppError} Si la tarea no se encuentra o el usuario no tiene permisos.
   */
  update: async (id: number, userId: number, data: UpdateTaskDto) => {
    const task = await TaskRepository.findById(id)

    if (!task) {
      throw new AppError(404, 'Task not found')
    }

    if (task.userId !== userId) {
      throw new AppError(403, "You don't have permission to update this task")
    }

    return TaskRepository.update(id, data)
  },

  /**
   * Elimina una tarea.
   * @param {number} id - El ID de la tarea a eliminar.
   * @param {number} userId - El ID del usuario que realiza la acción.
   * @returns {Promise<any>} - El resultado de la operación de eliminación.
   * @throws {AppError} Si la tarea no se encuentra o el usuario no tiene permisos.
   */
  remove: async (id: number, userId: number) => {
    const task = await TaskRepository.findById(id)

    if (!task) {
      throw new AppError(404, 'Task not found')
    }

    if (task.userId !== userId) {
      throw new AppError(403, "You don't have permission to delete this task")
    }

    return TaskRepository.remove(id)
  },

  /**
   * Obtiene una tarea por su ID.
   * @param {number} id - El ID de la tarea.
   * @param {number} userId - El ID del usuario que realiza la acción.
   * @returns {Promise<any>} - La tarea encontrada.
   * @throws {AppError} Si la tarea no se encuentra o el usuario no tiene permisos.
   */
  getById: async (id: number, userId: number) => {
    const task = await TaskRepository.findById(id)

    if (!task) {
      throw new AppError(404, 'Task not found')
    }

    if (task.userId !== userId) {
      throw new AppError(403, "You don't have permission to view this task")
    }

    return task
  }
}
