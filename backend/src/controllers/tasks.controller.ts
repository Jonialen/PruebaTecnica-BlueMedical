import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/tasks.service.js";
import { toTaskResponse, toTaskListResponse } from "../dtos/task.dto.js";
import { asyncHandler } from "../middlewares/error.middleware.js";

export const TaskController = {
    list: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        const { status } = req.query;
        
        const tasks = await TaskService.list(user.id, status as string);
        
        res.json({
            status: "success",
            data: {
                tasks: toTaskListResponse(tasks),
                count: tasks.length,
            },
        });
    }),

    create: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        const task = await TaskService.create(user.id, req.body);
        
        res.status(201).json({
            status: "success",
            message: "Task created successfully",
            data: {
                task: toTaskResponse(task),
            },
        });
    }),

    update: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        const taskId = Number(req.params.id);
        
        const task = await TaskService.update(taskId, user.id, req.body);
        
        res.json({
            status: "success",
            message: "Task updated successfully",
            data: {
                task: toTaskResponse(task),
            },
        });
    }),

    remove: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        const taskId = Number(req.params.id);
        
        await TaskService.remove(taskId, user.id);
        
        res.status(200).json({
            status: "success",
            message: "Task deleted successfully",
        });
    }),

    getById: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        const taskId = Number(req.params.id);
        
        const task = await TaskService.getById(taskId, user.id);
        
        res.json({
            status: "success",
            data: {
                task: toTaskResponse(task),
            },
        });
    }),
};