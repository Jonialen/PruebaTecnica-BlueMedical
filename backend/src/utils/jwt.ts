import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateToken = (payload: object): string =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

export const verifyToken = (token: string): any =>
    jwt.verify(token, JWT_SECRET);
