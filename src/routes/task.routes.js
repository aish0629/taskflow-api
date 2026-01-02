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
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a task (ADMIN only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - projectId
 *               - assignedTo
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               projectId:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Search and filter tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Task list
 */

/**
 * @swagger
 * /tasks/{taskId}/status:
 *   put:
 *     summary: Update task status
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               status:
 *                 type: string
 *                 example: DONE
 *     responses:
 *       200:
 *         description: Task updated
 */
