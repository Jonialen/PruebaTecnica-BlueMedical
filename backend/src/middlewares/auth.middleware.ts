// auth.middleware.ts (src/middlewares/auth.middleware.ts)

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware.js";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError(401, "Authentication token was not provided");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new AppError(401, "Missing or malformed token");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        (req as any).user = decoded;
        next();
    } catch (err) {
        next(err); // handled by errorHandler
    }
};