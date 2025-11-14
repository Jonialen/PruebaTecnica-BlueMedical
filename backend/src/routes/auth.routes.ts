import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import {
    registerValidator,
    loginValidator,
} from "../validators/auth.validator.js";
import { validate } from "../middlewares/validation.middleware.js";

const router: Router = Router();

// POST /api/register - Registro de usuario
router.post("/register", registerValidator, validate, AuthController.register);

// POST /api/login - Inicio de sesion
router.post("/login", loginValidator, validate, AuthController.login);

export default router;