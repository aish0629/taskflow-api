import express from "express"
import authRoutes from "./routes/auth.routes.js";

const app =express();
app.use(express.json());

// Routes
app.use("/auth",authRoutes);

app.get("/health", (req,res)=>{
    res.json({status: "OK"})
});

export default app;