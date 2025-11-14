// app.ts (src/app.ts)

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/tasks.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
