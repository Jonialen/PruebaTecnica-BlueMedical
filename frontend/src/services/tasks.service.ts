// src/services/tasks.service.ts
import api from '@api/axios.config';
import type {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TasksResponse,
  TaskResponse,
} from '@models/task.types';

const ENDPOINTS = {
  TASKS: '/api/tasks',
  TASK: (id: number) => `/api/tasks/${id}`,
};

export const tasksService = {
  /**
   * Obtener todas las tareas del usuario
   */
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get<TasksResponse>(ENDPOINTS.TASKS);
    return response.data.data.tasks;
  },

  /**
   * Obtener una tarea específica
   */
  getTask: async (id: number): Promise<Task> => {
    const response = await api.get<TaskResponse>(ENDPOINTS.TASK(id));
    return response.data.data.task;
  },

  /**
   * Crear nueva tarea
   */
  createTask: async (data: CreateTaskData): Promise<Task> => {
    const response = await api.post<TaskResponse>(ENDPOINTS.TASKS, data);
    return response.data.data.task;
  },

  /**
   * Actualizar tarea
   */
  updateTask: async (id: number, data: UpdateTaskData): Promise<Task> => {
    const response = await api.put<TaskResponse>(ENDPOINTS.TASK(id), data);
    return response.data.data.task;
  },

  /**
   * Eliminar tarea
   */
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(ENDPOINTS.TASK(id));
  },
};