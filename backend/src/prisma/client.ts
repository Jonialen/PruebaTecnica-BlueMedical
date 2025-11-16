// client.ts (src/prisma/client.ts)

import { PrismaClient } from "@prisma/client";

/**
 * Instancia única del cliente de Prisma.
 * Se utiliza para interactuar con la base de datos en toda la aplicación.
 *
 * El logging está habilitado para 'query', 'info', 'warn', y 'error',
 * lo cual es especialmente útil durante el desarrollo para depurar
 * y optimizar las consultas a la base de datos.
 */
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

/**
 * Listener para el evento 'beforeExit' del proceso de Node.js.
 * Asegura que la conexión de Prisma a la base de datos se cierre correctamente
 * antes de que la aplicación termine. Esto previene que queden conexiones abiertas.
 */
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

// Exporta la instancia de Prisma para ser utilizada en otros módulos.
export { prisma }
