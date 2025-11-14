import { TaskRepository } from "../repositories/task.repository.js";
import { AppError } from "../middlewares/error.middleware.js";
import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto.js";

export const TaskService = {
    list: async (userId: number, status?: string) => {
        const validStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED"];
        
        if (status && !validStatuses.includes(status)) {
            throw new AppError(400, "Invalid status filter");
        }
        
        return TaskRepository.findAllByUser(userId, status);
    },

    create: async (userId: number, data: CreateTaskDto) => {
        return TaskRepository.create({
            ...data,
            userId,
            status: data.status || "PENDING",
        });
    },

    update: async (id: number, userId: number, data: UpdateTaskDto) => {
        const task = await TaskRepository.findById(id);
        
        if (!task) {
            throw new AppError(404, "Task not found");
        }
        
        if (task.userId !== userId) {
            throw new AppError(403, "You don't have permission to update this task");
        }
        
        return TaskRepository.update(id, data);
    },

    remove: async (id: number, userId: number) => {
        const task = await TaskRepository.findById(id);
        
        if (!task) {
            throw new AppError(404, "Task not found");
        }
        
        if (task.userId !== userId) {
            throw new AppError(403, "You don't have permission to delete this task");
        }
        
        return TaskRepository.remove(id);
    },

    getById: async (id: number, userId: number) => {
        const task = await TaskRepository.findById(id);
        
        if (!task) {
            throw new AppError(404, "Task not found");
        }
        
        if (task.userId !== userId) {
            throw new AppError(403, "You don't have permission to view this task");
        }
        
        return task;
    },
};