import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { toUserResponse } from "../dtos/user.dto.js";
import { asyncHandler } from "../middlewares/error.middleware.js";

export const AuthController = {
    register: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password } = req.body;
        const result = await AuthService.register(name, email, password);
        
        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: {
                user: toUserResponse(result.user),
                token: result.token,
            },
        });
    }),

    login: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        
        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                user: toUserResponse(result.user),
                token: result.token,
            },
        });
    }),
};