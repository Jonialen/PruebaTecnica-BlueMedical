
// src/types/common.types.ts
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type TaskStatus = 'pending' | 'completed' | 'in_progress' | 'cancelled';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface FilterParams {
  status?: TaskStatus;
  search?: string;
}