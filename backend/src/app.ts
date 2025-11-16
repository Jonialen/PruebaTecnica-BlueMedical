// app.ts (src/app.ts)

import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/tasks.routes.js'
import { corsOptions, corsDevOptions } from './config/cors.config.js'
import { errorHandler } from './middlewares/error.middleware.js'

// Carga las variables de entorno desde el archivo .env
dotenv.config()

/**
 * Instancia principal de la aplicación Express.
 * @type {Express}
 */
const app: Express = express()

// --- Middlewares ---

// Configuración de CORS, diferenciando entre entorno de desarrollo y producción
const isDevelopment = process.env.NODE_ENV !== 'production'
app.use(cors(isDevelopment ? corsDevOptions : corsOptions))

// Middlewares para el parseo del cuerpo de las solicitudes
app.use(express.json()) // Parsea solicitudes con formato JSON
app.use(express.urlencoded({ extended: true })) // Parsea solicitudes con formato urlencoded

// --- Rutas ---

/**
 * @route GET /health
 * @description Endpoint para verificar el estado de la aplicación.
 * @returns {object} 200 - Un objeto con el estado y la marca de tiempo.
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Rutas principales de la aplicación
app.use('/api', authRoutes) // Rutas de autenticación
app.use('/api/tasks', taskRoutes) // Rutas de tareas

// --- Manejo de Errores ---

/**
 * Middleware para manejar rutas no encontradas (404).
 * Se activa si ninguna de las rutas anteriores coincide.
 */
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

/**
 * Middleware global para el manejo de errores.
 * Centraliza la gestión de todos los errores lanzados en la aplicación.
 */
app.use(errorHandler)

export default app