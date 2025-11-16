// task.repository.ts (src/repositories/task.repository.ts)

import { prisma } from '../prisma/client.js'
import { tasks_status } from '@prisma/client'
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto.js'

/**
 * Repositorio para gestionar las operaciones de la entidad `Task` en la base de datos.
 * Abstrae las consultas a la base de datos relacionadas con las tareas.
 */
export const TaskRepository = {
  /**
   * Busca todas las tareas de un usuario específico, con opción de filtrar por estado.
   * @param {number} userId - El ID del usuario.
   * @param {string} [status] - El estado por el cual filtrar las tareas (opcional).
   * @returns {Promise<any[]>} - Una promesa que resuelve en una lista de tareas.
   */
  findAllByUser: (userId: number, status?: string) => {
    const whereClause: any = { userId }

    if (status) {
      whereClause.status = status as tasks_status
    }

    return prisma.tasks.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    })
  },

  /**
   * Busca una tarea por su ID.
   * @param {number} id - El ID de la tarea.
   * @returns {Promise<any | null>} - Una promesa que resuelve en la tarea encontrada o null.
   */
  findById: (id: number) => prisma.tasks.findUnique({ where: { id } }),

  /**
   * Crea una nueva tarea en la base de datos.
   * @param {CreateTaskDto & { userId: number }} data - Los datos para la nueva tarea, incluyendo el ID del usuario.
   * @returns {Promise<any>} - Una promesa que resuelve en la tarea creada.
   */
  create: (data: CreateTaskDto & { userId: number }) =>
    prisma.tasks.create({ data }),

  /**
   * Actualiza una tarea existente.
   * @param {number} id - El ID de la tarea a actualizar.
   * @param {UpdateTaskDto} data - Los datos a actualizar.
   * @returns {Promise<any>} - Una promesa que resuelve en la tarea actualizada.
   */
  update: (id: number, data: UpdateTaskDto) =>
    prisma.tasks.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    }),

  /**
   * Elimina una tarea de la base de datos.
   * @param {number} id - El ID de la tarea a eliminar.
   * @returns {Promise<any>} - Una promesa que resuelve cuando la tarea ha sido eliminada.
   */
  remove: (id: number) => prisma.tasks.delete({ where: { id } })
}
