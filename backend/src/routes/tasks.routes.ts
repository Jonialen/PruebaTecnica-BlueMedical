import { Router } from "express";
import { TaskController } from "../controllers/tasks.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.use(authMiddleware);
router.get("/", TaskController.list);
router.post("/", TaskController.create);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.remove);

export default router;
