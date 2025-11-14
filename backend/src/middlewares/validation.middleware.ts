import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware para validar los resultados de express-validator
 * Retorna errores en formato consistente
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: errors.array().map((error) => ({
                field: error.type === 'field' ? error.path : undefined,
                message: error.msg,
                value: error.type === 'field' ? error.value : undefined,
            })),
        });
    }
    
    next();
};