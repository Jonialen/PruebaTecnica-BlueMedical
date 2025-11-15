// frontend/src/hooks/useTaskStore.ts

import { create } from "zustand";
import { toast } from "sonner";
import { tasksService } from "@services/tasks.service";
import { extractErrorMessage } from "@utils/helpers";
import type { Task, CreateTaskData, UpdateTaskData } from "@models/task.types";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: (status?: string) => Promise<void>;
  addTask: (data: Partial<Task>) => Promise<void>;
  updateTask: (id: number, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  async fetchTasks(status) {
    set({ loading: true, error: null });
    try {
      const tasks = await tasksService.getTasks(status);
      set({ tasks, loading: false });
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      set({ error: msg, loading: false });
      toast.error(msg);
    }
  },

  async addTask(taskData) {
    try {
      const newTask = await tasksService.createTask(taskData as CreateTaskData);
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
      toast.success("Tarea creada correctamente");
    } catch (err: unknown) {
      toast.error(extractErrorMessage(err));
    }
  },

  async updateTask(id, taskData) {
    try {
      const updatedTask = await tasksService.updateTask(id, taskData as UpdateTaskData);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
      }));
      toast.success("Tarea actualizada");
    } catch (err: unknown) {
      toast.error(extractErrorMessage(err));
    }
  },

  async deleteTask(id) {
    try {
      await tasksService.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
      toast.success("Tarea eliminada");
    } catch (err: unknown) {
      toast.error(extractErrorMessage(err));
    }
  },
}));