// frontend/src/utils/helpers.ts

/**
 * Capitaliza la primera letra de un string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formatea el status para mostrar
 */
export const formatStatus = (status: string): string => {
  return status.replace("_", " ").toLowerCase();
};

/**
 * Trunca texto a cierta longitud
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

/**
 * Delay helper para testing o UX
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Extrae mensaje de error de diferentes formatos
 */
export const extractErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  
  // Tipo seguro para error con estructura de axios
  if (error && typeof error === 'object') {
    const err = error as Record<string, unknown>;
    
    // Verificar estructura response.data.message (axios)
    if (err.response && typeof err.response === 'object') {
      const response = err.response as Record<string, unknown>;
      if (response.data && typeof response.data === 'object') {
        const data = response.data as Record<string, unknown>;
        if (typeof data.message === 'string') return data.message;
      }
    }
    
    // Verificar propiedad message directa
    if (typeof err.message === 'string') return err.message;
  }
  
  return 'Ha ocurrido un error inesperado';
};