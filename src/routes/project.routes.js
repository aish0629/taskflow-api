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

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management APIs
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a project (ADMIN only)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: List all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */
