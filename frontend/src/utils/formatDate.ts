// formatDate.ts (src/utils/formatDate.ts)

import { format } from "date-fns";

/**
 * Formatea una fecha en el formato "dd/MM/yyyy HH:mm".
 * 
 * @param {string} date - La fecha a formatear, en formato de cadena.
 * @returns {string} La fecha formateada.
 */
export const formatDate = (date: string) =>
    format(new Date(date), "dd/MM/yyyy HH:mm");
