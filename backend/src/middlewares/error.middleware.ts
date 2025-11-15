// src/middlewares/error.middleware.ts

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
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isDevelopment = process.env.NODE_ENV !== "production";

    // -----------------------
    // 1. Custom AppError
    // -----------------------
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            ...(isDevelopment && { stack: err.stack }),
        });
    }

    // -----------------------
    // 2. JWT Errors
    // -----------------------
    if (err.name === "TokenExpiredError") {
        return res.status(403).json({ status: "error", message: "Token has expired" });
    }

    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ status: "error", message: "Invalid token" });
    }

    if (err.name === "NotBeforeError") {
        return res.status(400).json({ status: "error", message: "Token is not active yet" });
    }

    // -----------------------
    // 3. MySQL Errors
    // -----------------------

    // Duplicate entry
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
        return res.status(409).json({
            status: "error",
            message: "Duplicate entry",
            detail: err.sqlMessage,
        });
    }

    // Foreign key constraint (cannot delete/update)
    if (err.errno === 1451) {
        return res.status(409).json({
            status: "error",
            message: "Operation not allowed due to foreign key constraint",
            detail: err.sqlMessage,
        });
    }

    // Foreign key constraint (cannot add/update)
    if (err.errno === 1452) {
        return res.status(400).json({
            status: "error",
            message: "Invalid reference: foreign key constraint failed",
            detail: err.sqlMessage,
        });
    }

    // Field doesn't have a default value
    if (err.errno === 1364) {
        return res.status(400).json({
            status: "error",
            message: "A required field is missing a value",
            detail: err.sqlMessage,
        });
    }

    // Column cannot be null
    if (err.errno === 1048) {
        return res.status(400).json({
            status: "error",
            message: "A required column cannot be null",
            detail: err.sqlMessage,
        });
    }

    // Table not found
    if (err.errno === 1146) {
        return res.status(500).json({
            status: "error",
            message: "Database table not found",
            detail: err.sqlMessage,
        });
    }

    // -----------------------
    // 4. CORS error
    // -----------------------
    if (err.message === "Not allowed by CORS") {
        return res.status(403).json({
            status: "error",
            message: "CORS policy: Origin not allowed",
        });
    }

    // -----------------------
    // 5. Unknown server error
    // -----------------------
    console.error("INTERNAL ERROR:", err);

    return res.status(500).json({
        status: "error",
        message: "Internal server error",
        ...(isDevelopment && { error: err.message, stack: err.stack }),
    });
};
