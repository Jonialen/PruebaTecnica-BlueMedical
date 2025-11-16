// tasks.routes.ts (src/routes/tasks.routes.ts)

import { Router } from 'express'
import { TaskController } from '../controllers/tasks.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validation.middleware.js'
import {
  createTaskValidator,
  updateTaskValidator,
  taskIdValidator
} from '../validators/task.validator.js'

/**
 * Enrutador para las operaciones CRUD de las tareas.
 * Todas las rutas definidas aquí están protegidas y requieren autenticación.
 */
const router: Router = Router()

// Aplica el middleware de autenticación a todas las rutas de este enrutador.
router.use(authMiddleware)

/**
 * @route GET /api/tasks
 * @description Lista todas las tareas del usuario autenticado. Permite filtrar por estado.
 * @controller TaskController.list
 */
router.get('/', TaskController.list)

/**
 * @route GET /api/tasks/:id
 * @description Obtiene una tarea específica por su ID.
 * @middleware taskIdValidator - Valida que el ID de la tarea sea un número.
 * @middleware validate - Procesa el resultado de la validación.
 * @controller TaskController.getById
 */
router.get('/:id', taskIdValidator, validate, TaskController.getById)

/**
 * @route POST /api/tasks
 * @description Crea una nueva tarea.
 * @middleware createTaskValidator - Valida los datos de la nueva tarea.
 * @middleware validate - Procesa el resultado de la validación.
 * @controller TaskController.create
 */
router.post('/', createTaskValidator, validate, TaskController.create)

/**
 * @route PUT /api/tasks/:id
 * @description Actualiza una tarea existente.
 * @middleware updateTaskValidator - Valida los datos para la actualización y el ID.
 * @middleware validate - Procesa el resultado de la validación.
 * @controller TaskController.update
 */
router.put('/:id', updateTaskValidator, validate, TaskController.update)

/**
 * @route DELETE /api/tasks/:id
 * @description Elimina una tarea.
 * @middleware taskIdValidator - Valida que el ID de la tarea sea un número.
 * @middleware validate - Procesa el resultado de la validación.
 * @controller TaskController.remove
 */
router.delete('/:id', taskIdValidator, validate, TaskController.remove)

export default router
