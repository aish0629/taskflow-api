import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role.middleware.js";
import { createProjectController, listProjectsController } from "../controllers/project.controller.js";

const router = Router();

// ADMIN ONLY
router.post("/", authMiddleware, requireAdmin, createProjectController);

// ALL AUTHENTICATED USERS
router.get("/", authMiddleware, listProjectsController);

export default router;
