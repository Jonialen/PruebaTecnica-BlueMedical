// index.ts (src/index.ts)

import app from './app.js'
import { prisma } from './prisma/client.js'
import dotenv from 'dotenv'

// Carga las variables de entorno desde el archivo .env
dotenv.config()

/**
 * Puerto en el que se ejecutará el servidor.
 * Se obtiene de las variables de entorno o se usa 3001 por defecto.
 * @type {string | number}
 */
const PORT = process.env.PORT || 3001

/**
 * Función principal para inicializar la aplicación.
 * Conecta a la base de datos y levanta el servidor Express.
 */
async function main() {
  try {
    // Intenta conectar a la base de datos a través de Prisma
    await prisma.$connect()
    console.log('Database connected')

    // Inicia el servidor Express para escuchar en el puerto especificado
    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`)
    })
  } catch (err) {
    // Si hay un error en la conexión a la base de datos, lo muestra y termina el proceso
    console.error('Error connecting to database:', err)
    process.exit(1)
  }
}

// Ejecuta la función principal para iniciar la aplicación
main()
