// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log("Iniciando seed de prueba...");

    // Limpiar tablas
    await prisma.tasks.deleteMany();
    await prisma.users.deleteMany();

    // Lista de usuarios a crear
    const usersData = [
        {
            name: "Demo User",
            email: "demo@roble.com",
            password: "123456",
        },
        {
            name: "Juan Pérez",
            email: "juan@roble.com",
            password: "123456",
        },
        {
            name: "Ana Martínez",
            email: "ana@roble.com",
            password: "123456",
        },
        {
            name: "Carlos López",
            email: "carlos@roble.com",
            password: "123456",
        },
    ];

    for (const userData of usersData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = await prisma.users.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
            },
        });

        // Crear tareas para cada usuario
        await prisma.tasks.createMany({
            data: [
                {
                    title: `Tarea pendiente de ${user.name}`,
                    description: "Tarea generada automáticamente",
                    status: "PENDING",
                    userId: user.id,
                },
                {
                    title: `Tarea en progreso de ${user.name}`,
                    description: "Tarea generada automáticamente",
                    status: "IN_PROGRESS",
                    userId: user.id,
                },
                {
                    title: `Tarea completada de ${user.name}`,
                    description: "Tarea generada automáticamente",
                    status: "COMPLETED",
                    userId: user.id,
                },
            ],
        });

        console.log(`Usuario creado: ${user.email}`);
    }

    console.log("Seed completado con múltiples usuarios y tareas.");
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
