import { create } from "zustand";
import api from "../api/axios";
import { toast } from "sonner";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  userId: number;
  createdAt: string;
  updatedAt: string;
}

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

  // --------------------------
  // GET /api/tasks
  // --------------------------
  async fetchTasks(status) {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/tasks", { params: status ? { status } : {} });

      if (data.status === "success") {
        const tasks = data.data?.tasks ?? [];
        set({ tasks, loading: false });
      } else {
        set({ error: data.message || "Error al obtener tareas", loading: false });
        toast.error(data.message || "Error al obtener tareas");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "No se pudieron cargar las tareas";
      set({ error: msg, loading: false });
      toast.error(msg);
    }
  },

  // --------------------------
  // POST /api/tasks
  // --------------------------
  async addTask(taskData) {
    try {
      const { data } = await api.post("/tasks", taskData);

      if (data.status === "success") {
        const newTask = data.data?.task;
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
        toast.success(data.message || "Tarea creada correctamente ✅");
      } else {
        toast.error(data.message || "Error al crear la tarea");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "No se pudo crear la tarea";
      toast.error(msg);
    }
  },

  // --------------------------
  // PUT /api/tasks/:id
  // --------------------------
  async updateTask(id, taskData) {
    try {
      const { data } = await api.put(`/tasks/${id}`, taskData);

      if (data.status === "success") {
        const updatedTask = data.data?.task;
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
        }));
        toast.success(data.message || "Tarea actualizada ✏️");
      } else {
        toast.error(data.message || "Error al actualizar la tarea");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "No se pudo actualizar la tarea";
      toast.error(msg);
    }
  },

  // --------------------------
  // DELETE /api/tasks/:id
  // --------------------------
  async deleteTask(id) {
    try {
      const { data } = await api.delete(`/tasks/${id}`);

      if (data.status === "success") {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        }));
        toast.success(data.message || "Tarea eliminada 🗑️");
      } else {
        toast.error(data.message || "Error al eliminar la tarea");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "No se pudo eliminar la tarea";
      toast.error(msg);
    }
  },
}));