// seed.ts (prisma/seed.ts)

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log("Iniciando seed de prueba...");

    // Elimina datos previos (opcional)
    await prisma.tasks.deleteMany();
    await prisma.users.deleteMany();

    // Crear usuario demo
    const hashedPassword = await bcrypt.hash("123456", 10);
    const user = await prisma.users.create({
        data: {
            name: "Demo User",
            email: "demo@roble.com",
            password: hashedPassword,
        },
    });

    // Crear tareas de ejemplo
    await prisma.tasks.createMany({
        data: [
            {
                title: "Primera tarea",
                description: "Esta es una tarea pendiente",
                status: "PENDING",
                userId: user.id,
            },
            {
                title: "Tarea en progreso",
                description: "Esta tarea está en curso",
                status: "IN_PROGRESS",
                userId: user.id,
            },
            {
                title: "Tarea completada",
                description: "Esta está finalizada correctamente",
                status: "COMPLETED",
                userId: user.id,
            },
        ],
    });

    console.log(`Seed completado: usuario ${user.email} con 3 tareas`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
