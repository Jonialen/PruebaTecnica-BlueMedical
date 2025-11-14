// task.dto.ts (src/dtos/task.dto.ts)

export interface CreateTaskDto {
    title: string;
    description?: string;
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface UpdateTaskDto {
    title?: string;
    description?: string;
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface TaskResponseDto {
    id: number;
    title: string;
    description: string | null;
    status: string;
    userId: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export const toTaskResponse = (task: any): TaskResponseDto => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    userId: task.userId,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
});

export const toTaskListResponse = (tasks: any[]): TaskResponseDto[] =>
    tasks.map(toTaskResponse);