// src/store/tasksStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { tasksService } from '@services/tasks.service';
import type {
  Task,
  TaskStatus,
  CreateTaskData,
  UpdateTaskData,
  TasksState,
} from '@models/task.types';

interface TasksStore extends TasksState {
  // Actions
  fetchTasks: () => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (id: number, data: UpdateTaskData) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setFilter: (filter: TaskStatus | 'ALL') => void;
  setSelectedTask: (task: Task | null) => void;
  clearError: () => void;
}

export const useTasksStore = create<TasksStore>()(
  devtools(
    (set) => ({
      // Initial state
      tasks: [],
      selectedTask: null,
      filter: 'ALL',
      isLoading: false,
      error: null,

      // Fetch all tasks
      fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
          const tasks = await tasksService.getTasks();
          set({ tasks, isLoading: false });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Error al cargar las tareas',
          });
        }
      },

      // Create task
      createTask: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const newTask = await tasksService.createTask(data);
          set((state) => ({
            tasks: [newTask, ...state.tasks],
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Error al crear la tarea',
          });
          throw error;
        }
      },

      // Update task
      updateTask: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
          const updatedTask = await tasksService.updateTask(id, data);
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? updatedTask : task
            ),
            selectedTask: null,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Error al actualizar la tarea',
          });
          throw error;
        }
      },

      // Delete task
      deleteTask: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await tasksService.deleteTask(id);
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Error al eliminar la tarea',
          });
          throw error;
        }
      },

      // Set filter
      setFilter: (filter) => set({ filter }),

      // Set selected task
      setSelectedTask: (task) => set({ selectedTask: task }),

      // Clear error
      clearError: () => set({ error: null }),
    }),
    { name: 'TasksStore' }
  )
);