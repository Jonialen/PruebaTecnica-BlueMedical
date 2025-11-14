import { prisma } from "../prisma/client.js";

export const TaskRepository = {
    findAllByUser: (userId: number) =>
        prisma.tasks.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        }),

    findById: (id: number) => prisma.tasks.findUnique({ where: { id } }),

    create: (data: any) => prisma.tasks.create({ data }),

    update: (id: number, data: any) =>
        prisma.tasks.update({ where: { id }, data }),

    remove: (id: number) => prisma.tasks.delete({ where: { id } }),
};
