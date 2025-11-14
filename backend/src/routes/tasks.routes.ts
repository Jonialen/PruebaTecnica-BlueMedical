import { Router } from "express";
import { TaskController } from "../controllers/tasks.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
    createTaskValidator,
    updateTaskValidator,
    taskIdValidator,
} from "../validators/task.validator.js";

const router: Router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// GET /api/tasks - Listar tareas (con filtro opcional por status)
router.get("/", TaskController.list);

// GET /api/tasks/:id - Obtener tarea por ID
router.get("/:id", taskIdValidator, validate, TaskController.getById);

// POST /api/tasks - Crear nueva tarea
router.post("/", createTaskValidator, validate, TaskController.create);

// PUT /api/tasks/:id - Actualizar tarea
router.put("/:id", updateTaskValidator, validate, TaskController.update);

// DELETE /api/tasks/:id - Eliminar tarea
router.delete("/:id", taskIdValidator, validate, TaskController.remove);

export default router;