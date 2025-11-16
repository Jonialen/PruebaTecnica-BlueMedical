// src/store/useTaskStore.ts
import { create } from 'zustand';
import { tasksService } from '@services/tasks.service';
import { Task, CreateTaskData, UpdateTaskData } from '@models';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  
  fetchTasks: (status?: string) => Promise<void>;
  addTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (id: number, data: UpdateTaskData) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const extractErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  
  if (error && typeof error === 'object') {
    const err = error as Record<string, unknown>;
    
    if (err.response && typeof err.response === 'object') {
      const response = err.response as Record<string, unknown>;
      if (response.data && typeof response.data === 'object') {
        const data = response.data as Record<string, unknown>;
        if (typeof data.message === 'string') return data.message;
      }
    }
    
    if (typeof err.message === 'string') return err.message;
  }
  
  return 'Ha ocurrido un error inesperado';
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async (status) => {
    set({ loading: true, error: null });
    try {
      const tasks = await tasksService.getTasks(status);
      set({ tasks, loading: false });
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      set({ error: msg, loading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      const newTask = await tasksService.createTask(taskData);
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      set({ error: msg });
      throw new Error(msg);
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const updatedTask = await tasksService.updateTask(id, taskData);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
      }));
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      set({ error: msg });
      throw new Error(msg);
    }
  },

  deleteTask: async (id) => {
    try {
      await tasksService.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      set({ error: msg });
      throw new Error(msg);
    }
  },
}));