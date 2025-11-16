// tasks.service.ts (src/services/tasks.service.ts)

import api from "@api/axios";
import type { Task, CreateTaskData, UpdateTaskData, TasksResponse, TaskResponse } from "@models/task.types";

/**
 * Servicio para gestionar las tareas.
 * 
 * Proporciona métodos para obtener, crear, actualizar y eliminar tareas.
 */
export const tasksService = {
    /**
     * Obtiene las tareas desde el backend.
     * @param {string} [status] - Un estado opcional para filtrar las tareas.
     * @returns {Promise<Task[]>} Una lista de tareas.
     */
    async getTasks(status?: string): Promise<Task[]> {
        const { data } = await api.get<TasksResponse>("/tasks", {
            params: status ? { status } : {}
        });

        if (data.status === "success") {
            return data.data?.tasks ?? [];
        }
        throw new Error(data.status || "Error al obtener tareas");
    },

    /**
     * Crea una nueva tarea.
     * @param {CreateTaskData} taskData - Los datos de la nueva tarea.
     * @returns {Promise<Task>} La tarea creada.
     */
    async createTask(taskData: CreateTaskData): Promise<Task> {
        const { data } = await api.post<TaskResponse>("/tasks", taskData);

        if (data.status === "success" && data.data?.task) {
            return data.data.task;
        }
        throw new Error(data.message || "Error al crear tarea");
    },

    /**
     * Actualiza una tarea existente.
     * @param {number} id - El ID de la tarea a actualizar.
     * @param {UpdateTaskData} taskData - Los datos a actualizar.
     * @returns {Promise<Task>} La tarea actualizada.
     */
    async updateTask(id: number, taskData: UpdateTaskData): Promise<Task> {
        const { data } = await api.put<TaskResponse>(`/tasks/${id}`, taskData);

        if (data.status === "success" && data.data?.task) {
            return data.data.task;
        }
        throw new Error(data.message || "Error al actualizar tarea");
    },

    /**
     * Elimina una tarea.
     * @param {number} id - El ID de la tarea a eliminar.
     */
    async deleteTask(id: number): Promise<void> {
        const { data } = await api.delete(`/tasks/${id}`);

        if (data.status !== "success") {
            throw new Error(data.message || "Error al eliminar tarea");
        }
    }
};
