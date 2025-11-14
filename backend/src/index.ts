// index.ts (src/index.ts)

import app from "./app";
import { prisma } from "./prisma/client";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

async function main() {
    try {
        await prisma.$connect();
        console.log("✅ Database connected");

        app.listen(PORT, () => {
            console.log(`🚀 API running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Error connecting to database:", err);
        process.exit(1);
    }
}

main();
