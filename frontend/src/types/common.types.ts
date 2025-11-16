// common.types.ts (src/types/common.types.ts)

/**
 * Define los posibles estados de una operación de carga de datos.
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Define los posibles estados de una tarea.
 */
export type TaskStatus = 'pending' | 'completed' | 'in_progress' | 'cancelled';

/**
 * Interfaz para los parámetros de paginación.
 */
export interface PaginationParams {
    /** El número de página. */
    page?: number;
    /** El número de elementos por página. */
    limit?: number;
}

/**
 * Interfaz para los parámetros de filtrado.
 */
export interface FilterParams {
    /** El estado de la tarea para filtrar. */
    status?: TaskStatus;
    /** El término de búsqueda para filtrar. */
    search?: string;
}