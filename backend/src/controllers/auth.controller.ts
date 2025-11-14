import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export const AuthController = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const result = await AuthService.register(name, email, password);
            return res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login(email, password);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },
};
