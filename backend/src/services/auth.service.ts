// auth.service.ts (src/services/auth.service.ts)

import { UserRepository } from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../middlewares/error.middleware.js";

export const AuthService = {
    register: async (name: string, email: string, password: string) => {
        const existing = await UserRepository.findByEmail(email);
        if (existing) {
            throw new AppError(409, "User already exists");
        }

        const hashed = await hashPassword(password);

        const user = await UserRepository.create({
            name,
            email,
            password: hashed,
        });

        const token = generateToken({ id: user.id, email: user.email });

        return { user, token };
    },

    login: async (email: string, password: string) => {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new AppError(401, "Invalid credentials");

        const valid = await comparePassword(password, user.password);
        if (!valid) throw new AppError(401, "Invalid credentials");

        const token = generateToken({ id: user.id, email: user.email });

        return { user, token };
    },
};
