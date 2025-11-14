// src/types/api.types.ts
export interface ApiError {
  status: string;
  message: string;
  errors?: Array<{
    field?: string;
    message: string;
    value?: any;
  }>;
}

export interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
}
