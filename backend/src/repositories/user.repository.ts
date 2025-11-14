import { prisma } from "../prisma/client.js";

export const UserRepository = {
    findByEmail: async (email: string) =>
        prisma.users.findUnique({ where: { email } }),

    create: async (data: any) => prisma.users.create({ data }),
};
