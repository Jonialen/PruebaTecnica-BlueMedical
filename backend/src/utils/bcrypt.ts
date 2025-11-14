import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10);
};

export const comparePassword = async (
    password: string,
    hash: string,
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};
