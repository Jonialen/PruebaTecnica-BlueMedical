import { UserRepository } from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

export const AuthService = {
    register: async (name: string, email: string, password: string) => {
        const existing = await UserRepository.findByEmail(email);
        if (existing) throw new Error("User already exists");

        const hashed = await hashPassword(password);
        const user = await UserRepository.create({ name, email, password: hashed });
        const token = generateToken({ id: user.id, email: user.email });

        return { user, token };
    },

    login: async (email: string, password: string) => {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new Error("Invalid credentials");

        const valid = await comparePassword(password, user.password);
        if (!valid) throw new Error("Invalid credentials");

        const token = generateToken({ id: user.id, email: user.email });
        return { user, token };
    },
};
