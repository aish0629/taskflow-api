import express from "express"
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { apiLimiter } from "./middlewares/rate-limit.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import healthRoutes from "./routes/health.routes.js";




const app =express();
app.use(express.json());
app.use(apiLimiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/health", healthRoutes);

// Routes
app.use("/auth",authRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/comments", commentRoutes);
app.use(errorHandler);

app.get("/health", (req,res)=>{
    res.json({status: "OK"})
});

export default app;