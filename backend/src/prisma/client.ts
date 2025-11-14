// src/prisma/client.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"], // útil en development
});

// Evita fugas de conexión en entorno de desarrollo
process.on("beforeExit", async () => {
    await prisma.$disconnect();
});

export { prisma };
