// helpers.ts (src/utils/helpers.ts)

/**
 * Capitaliza la primera letra de una cadena de texto.
 * @param {string} str - La cadena a capitalizar.
 * @returns {string} La cadena capitalizada.
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formatea el estado de una tarea para su visualización.
 * Reemplaza los guiones bajos por espacios y convierte a minúsculas.
 * @param {string} status - El estado a formatear.
 * @returns {string} El estado formateado.
 */
export const formatStatus = (status: string): string => {
    return status.replace("_", " ").toLowerCase();
};

/**
 * Trunca un texto a una longitud máxima especificada.
 * @param {string} text - El texto a truncar.
 * @param {number} maxLength - La longitud máxima.
 * @returns {string} El texto truncado con "..." al final si es necesario.
 */
export const truncate = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
};

/**
 * Crea una promesa que se resuelve después de un número de milisegundos.
 * Útil para simular retrasos en pruebas o mejorar la experiencia de usuario.
 * @param {number} ms - El número de milisegundos a esperar.
 * @returns {Promise<void>} Una promesa que se resuelve después del retraso.
 */
export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Extrae un mensaje de error de diferentes formatos de error.
 * 
 * Intenta extraer el mensaje de error de objetos de error de Axios,
 * errores estándar y otros formatos comunes.
 *
 * @param {unknown} error - El error del que se extraerá el mensaje.
 * @returns {string} El mensaje de error extraído o un mensaje genérico.
 */
export const extractErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') return error;

    // Comprobación segura para errores con estructura de Axios.
    if (error && typeof error === 'object') {
        const err = error as Record<string, unknown>;

        // Verificar estructura response.data.message (común en Axios).
        if (err.response && typeof err.response === 'object') {
            const response = err.response as Record<string, unknown>;
            if (response.data && typeof response.data === 'object') {
                const data = response.data as Record<string, unknown>;
                if (typeof data.message === 'string') return data.message;
            }
        }

        // Verificar la propiedad 'message' directa del objeto de error.
        if (typeof err.message === 'string') return err.message;
    }

    return 'Ha ocurrido un error inesperado';
};
