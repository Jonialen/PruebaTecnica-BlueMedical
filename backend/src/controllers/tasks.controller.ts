import { Request, Response } from "express";
import { TaskService } from "../services/tasks.service";

export const TaskController = {
    list: async (req: Request, res: Response) => {
        const user = (req as any).user;
        const tasks = await TaskService.list(user.id);
        res.json(tasks);
    },
    create: async (req: Request, res: Response) => {
        const user = (req as any).user;
        const task = await TaskService.create(user.id, req.body);
        res.status(201).json(task);
    },
    update: async (req: Request, res: Response) => {
        const task = await TaskService.update(Number(req.params.id), req.body);
        res.json(task);
    },
    remove: async (req: Request, res: Response) => {
        await TaskService.remove(Number(req.params.id));
        res.status(204).send();
    },
};
