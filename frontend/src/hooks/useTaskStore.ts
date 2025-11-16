// useTaskStore.ts (src/hooks/useTaskStore.ts)

import { create } from "zustand";
import { toast } from "sonner";
import { tasksService } from "@services/tasks.service";
import { extractErrorMessage } from "@utils/helpers";
import type { Task, CreateTaskData, UpdateTaskData } from "@models/task.types";

/**
 * Interfaz que define el estado y las acciones del store de tareas.
 */
interface TaskState {
    /** La lista de tareas. */
    tasks: Task[];
    /** Indica si hay una operación de tareas en curso. */
    loading: boolean;
    /** El último mensaje de error. */
    error: string | null;
    /**
     * Obtiene las tareas desde el backend.
     * @param {string} [status] - Un estado opcional para filtrar las tareas.
     */
    fetchTasks: (status?: string) => Promise<void>;
    /**
     * Añade una nueva tarea.
     * @param {Partial<Task>} data - Los datos de la nueva tarea.
     */
    addTask: (data: Partial<Task>) => Promise<void>;
    /**
     * Actualiza una tarea existente.
     * @param {number} id - El ID de la tarea a actualizar.
     * @param {Partial<Task>} data - Los datos a actualizar.
     */
    updateTask: (id: number, data: Partial<Task>) => Promise<void>;
    /**
     * Elimina una tarea.
     * @param {number} id - El ID de la tarea a eliminar.
     */
    deleteTask: (id: number) => Promise<void>;
}

/**
 * Hook de Zustand para gestionar el estado de las tareas.
 * 
 * Proporciona el estado de las tareas, el estado de carga y los errores,
 * así como las acciones para obtener, añadir, actualizar y eliminar tareas.
 */
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
