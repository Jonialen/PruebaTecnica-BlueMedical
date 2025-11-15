// src/types/task.types.ts
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface UpdateTaskData {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
}

export interface TasksResponse {
  status: string;
  data: {
    tasks: Task[];
    count: number;
  };
}

export interface TaskResponse {
  status: string;
  message?: string;
  data: {
    task: Task;
  };
}

export interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
  filter: TaskStatus | 'ALL';
  isLoading: boolean;
  error: string | null;
}