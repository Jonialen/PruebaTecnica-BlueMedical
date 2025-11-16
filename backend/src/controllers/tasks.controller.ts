// tasks.controller.ts (src/controllers/tasks.controller.ts)

import { Request, Response, NextFunction } from 'express'
import { TaskService } from '../services/tasks.service.js'
import { toTaskResponse, toTaskListResponse } from '../dtos/task.dto.js'
import { asyncHandler } from '../middlewares/error.middleware.js'

/**
 * Controlador para gestionar las operaciones CRUD de las tareas.
 */
export const TaskController = {
  /**
   * @route GET /api/tasks
   * @description Obtiene una lista de tareas para el usuario autenticado, con opción de filtro por estado.
   * @param {Request} req - El objeto de solicitud de Express.
   * @param {Response} res - El objeto de respuesta de Express.
   * @returns {Response} - Una lista de tareas.
   */
  list: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const { status } = req.query

    const tasks = await TaskService.list(user.id, status as string)

    res.json({
      status: 'success',
      data: {
        tasks: toTaskListResponse(tasks),
        count: tasks.length
      }
    })
  }),

  /**
   * @route POST /api/tasks
   * @description Crea una nueva tarea para el usuario autenticado.
   * @param {Request} req - El objeto de solicitud de Express.
   * @param {Response} res - El objeto de respuesta de Express.
   * @returns {Response} - La tarea recién creada.
   */
  create: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user
      const task = await TaskService.create(user.id, req.body)

      res.status(201).json({
        status: 'success',
        message: 'Task created successfully',
        data: {
          task: toTaskResponse(task)
        }
      })
    }
  ),

  /**
   * @route PUT /api/tasks/:id
   * @description Actualiza una tarea existente.
   * @param {Request} req - El objeto de solicitud de Express.
   * @param {Response} res - El objeto de respuesta de Express.
   * @returns {Response} - La tarea actualizada.
   */
  update: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user
      const taskId = Number(req.params.id)

      const task = await TaskService.update(taskId, user.id, req.body)

      res.json({
        status: 'success',
        message: 'Task updated successfully',
        data: {
          task: toTaskResponse(task)
        }
      })
    }
  ),

  /**
   * @route DELETE /api/tasks/:id
   * @description Elimina una tarea.
   * @param {Request} req - El objeto de solicitud de Express.
   * @param {Response} res - El objeto de respuesta de Express.
   * @returns {Response} - Un mensaje de confirmación.
   */
  remove: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user
      const taskId = Number(req.params.id)

      await TaskService.remove(taskId, user.id)

      res.status(200).json({
        status: 'success',
        message: 'Task deleted successfully'
      })
    }
  ),

  /**
   * @route GET /api/tasks/:id
   * @description Obtiene una tarea por su ID.
   * @param {Request} req - El objeto de solicitud de Express.
   * @param {Response} res - El objeto de respuesta de Express.
   * @returns {Response} - La tarea solicitada.
   */
  getById: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user
      const taskId = Number(req.params.id)

      const task = await TaskService.getById(taskId, user.id)

      res.json({
        status: 'success',
        data: {
          task: toTaskResponse(task)
        }
      })
    }
  )
}
