import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role.middleware.js";

import {
  createTaskController,
  listTasksController,
  updateStatusController,
  searchTasksController, // <-- ADD THIS
  dashboardController     // (if added)
} from "../controllers/task.controller.js";


const router = Router();

// ADMIN creates tasks
router.post("/", authMiddleware, requireAdmin, createTaskController);

// Any authenticated user can list tasks under a project
router.get("/:projectId", authMiddleware, listTasksController);

// ADMIN updates task status
router.put("/:taskId/status", authMiddleware, requireAdmin, updateStatusController);
router.get("/", authMiddleware, searchTasksController);
router.get("/", authMiddleware, searchTasksController);
router.get("/dashboard/stats", authMiddleware, dashboardController);

export default router;
