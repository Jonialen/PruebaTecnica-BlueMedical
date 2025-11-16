// src/services/tasks.service.ts
import api from '@api/axios';
import { Task, CreateTaskData, UpdateTaskData, TasksResponse, TaskResponse } from '@models';

export const tasksService = {
  async getTasks(status?: string): Promise<Task[]> {
    const { data } = await api.get<TasksResponse>('/tasks', {
      params: status ? { status } : {},
    });

    if (data.status === 'success') {
      return data.data?.tasks ?? [];
    }
    throw new Error(data.status || 'Error al obtener tareas');
  },

  async createTask(taskData: CreateTaskData): Promise<Task> {
    const { data } = await api.post<TaskResponse>('/tasks', taskData);

    if (data.status === 'success' && data.data?.task) {
      return data.data.task;
    }
    throw new Error(data.message || 'Error al crear tarea');
  },

  async updateTask(id: number, taskData: UpdateTaskData): Promise<Task> {
    const { data } = await api.put<TaskResponse>(`/tasks/${id}`, taskData);

    if (data.status === 'success' && data.data?.task) {
      return data.data.task;
    }
    throw new Error(data.message || 'Error al actualizar tarea');
  },

  async deleteTask(id: number): Promise<void> {
    const { data } = await api.delete(`/tasks/${id}`);

    if (data.status !== 'success') {
      throw new Error(data.message || 'Error al eliminar tarea');
    }
  },
};