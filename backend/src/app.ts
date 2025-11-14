// app.ts (src/app.ts)

import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import { corsOptions, corsDevOptions } from "./config/cors.config.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app: Express = express();

// CORS - usar configuración según el entorno
const isDevelopment = process.env.NODE_ENV !== "production";
app.use(cors(isDevelopment ? corsDevOptions : corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Error handler global
app.use(errorHandler);

export default app;