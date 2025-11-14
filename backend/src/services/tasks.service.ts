import { TaskRepository } from "../repositories/task.repository";

export const TaskService = {
    list: async (userId: number) => TaskRepository.findAllByUser(userId),

    create: async (userId: number, data: any) =>
        TaskRepository.create({ ...data, userId }),

    update: async (id: number, data: any) => TaskRepository.update(id, data),

    remove: async (id: number) => TaskRepository.remove(id),
};
