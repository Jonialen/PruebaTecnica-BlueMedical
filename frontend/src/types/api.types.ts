// api.types.ts (src/types/api.types.ts)

/**
 * Interfaz que define la estructura de un error de la API.
 */
export interface ApiError {
    /** El estado de la respuesta (ej. "error"). */
    status: string;
    /** El mensaje principal del error. */
    message: string;
    /** Una lista opcional de errores de validación más específicos. */
    errors?: Array<{
        /** El campo que causó el error. */
        field?: string;
        /** El mensaje de error específico para el campo. */
        message: string;
        /** El valor que causó el error. */
        value?: unknown;
    }>;
}

/**
 * Interfaz genérica para las respuestas de la API.
 * @template T - El tipo de los datos contenidos en la respuesta.
 */
export interface ApiResponse<T> {
    /** El estado de la respuesta (ej. "success", "error"). */
    status: string;
    /** Un mensaje opcional que acompaña a la respuesta. */
    message?: string;
    /** Los datos de la respuesta. */
    data?: T;
}