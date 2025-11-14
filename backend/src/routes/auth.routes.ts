import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {
    registerValidator,
    loginValidator,
} from "../validators/auth.validator";
import { validationResult } from "express-validator";

const router = Router();

const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    next();
};

router.post("/register", registerValidator, validate, AuthController.register);
router.post("/login", loginValidator, validate, AuthController.login);

export default router;
