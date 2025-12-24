import express from "express"
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app =express();
app.use(express.json());

// Routes
app.use("/auth",authRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);


app.get("/health", (req,res)=>{
    res.json({status: "OK"})
});

export default app;