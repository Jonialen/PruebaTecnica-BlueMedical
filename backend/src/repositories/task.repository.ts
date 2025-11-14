import { prisma } from "../prisma/client.js";
import { tasks_status } from "@prisma/client";

export const TaskRepository = {
    findAllByUser: (userId: number, status?: string) => {
        const whereClause: any = { userId };
        
        if (status) {
            whereClause.status = status as tasks_status;
        }
        
        return prisma.tasks.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
        });
    },

    findById: (id: number) => prisma.tasks.findUnique({ where: { id } }),

    create: (data: any) => prisma.tasks.create({ data }),

    update: (id: number, data: any) =>
        prisma.tasks.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date(),
            },
        }),

    remove: (id: number) => prisma.tasks.delete({ where: { id } }),
};