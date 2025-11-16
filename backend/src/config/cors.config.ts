// cors.config.ts (src/config/cors.config.ts)

import { CorsOptions } from 'cors'

/**
 * Lista de orígenes permitidos para las solicitudes CORS.
 * Se obtiene de la variable de entorno `ALLOWED_ORIGINS` (separada por comas)
 * o se utiliza una lista de valores por defecto para desarrollo local.
 * @type {string[]}
 */
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:5173']

/**
 * Configuración de CORS para el entorno de producción.
 * Es restrictiva y solo permite solicitudes de los orígenes definidos en `allowedOrigins`.
 * @type {CorsOptions}
 */
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permite solicitudes que no tienen un 'origin' (ej. Postman, cURL, apps móviles)
    if (!origin) return callback(null, true)

    // Verifica si el origen de la solicitud está en la lista de orígenes permitidos
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, // Permite el envío de cookies y encabezados de autorización
  optionsSuccessStatus: 200, // Código de estado para solicitudes pre-flight (OPTIONS) exitosas
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos HTTP permitidos
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept'
  ], // Encabezados permitidos en la solicitud
  exposedHeaders: ['Content-Range', 'X-Content-Range'], // Encabezados expuestos al cliente
  maxAge: 600 // Cache para las respuestas pre-flight en segundos (10 minutos)
}

/**
 * Configuración de CORS para el entorno de desarrollo.
 * Es más permisiva, permitiendo cualquier origen para facilitar las pruebas locales.
 * @type {CorsOptions}
 */
export const corsDevOptions: CorsOptions = {
  origin: true, // Permite cualquier origen
  credentials: true,
  optionsSuccessStatus: 200
}
