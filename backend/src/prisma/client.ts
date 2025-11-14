// client.ts (src/prisma/client.ts)

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"], // útil en development
});

process.on("beforeExit", async () => {
    await prisma.$disconnect();
});

export { prisma };