// task.types.ts (src/types/task.types.ts)

/**
 * Define los posibles estados de una tarea.
 */
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

/**
 * Interfaz que define la estructura de un objeto de tarea.
 */
export interface Task {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

/**
 * Interfaz para los datos necesarios al crear una nueva tarea.
 */
export interface CreateTaskData {
    title: string;
    description?: string;
    status?: TaskStatus;
}

/**
 * Interfaz para los datos necesarios al actualizar una tarea existente.
 */
export interface UpdateTaskData {
    title?: string;
    description?: string | null;
    status?: TaskStatus;
}

/**
 * Interfaz para la respuesta de la API al obtener múltiples tareas.
 */
export interface TasksResponse {
    status: string;
    data: {
        tasks: Task[];
        count: number;
    };
}

/**
 * Interfaz para la respuesta de la API al obtener o manipular una sola tarea.
 */
export interface TaskResponse {
    status: string;
    message?: string;
    data: {
        task: Task;
    };
}

/**
 * Interfaz que define el estado de las tareas en el store.
 */
export interface TasksState {
    tasks: Task[];
    selectedTask: Task | null;
    filter: TaskStatus | 'ALL';
    isLoading: boolean;
    error: string | null;
}
