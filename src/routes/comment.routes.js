import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addCommentController,
  getCommentsController
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/:taskId", authMiddleware, addCommentController);
router.get("/:taskId", authMiddleware, getCommentsController);

export default router;
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Task comments APIs
 */

/**
 * @swagger
 * /comments/{taskId}:
 *   post:
 *     summary: Add comment to task
 *     tags: [Comments]
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
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added
 */

/**
 * @swagger
 * /comments/{taskId}:
 *   get:
 *     summary: Get task comments
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of comments
 */
