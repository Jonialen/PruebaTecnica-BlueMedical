import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public isOperational = true
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isDevelopment = process.env.NODE_ENV !== "production";

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            ...(isDevelopment && { stack: err.stack }),
        });
    }

    // Error de CORS
    if (err.message === "Not allowed by CORS") {
        return res.status(403).json({
            status: "error",
            message: "CORS policy: Origin not allowed",
        });
    }

    // Error genérico
    console.error("Error:", err);
    res.status(500).json({
        status: "error",
        message: isDevelopment ? err.message : "Internal server error",
        ...(isDevelopment && { stack: err.stack }),
    });
};