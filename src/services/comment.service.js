import db from "../database.js";
import { randomUUID } from "crypto";

export const addComment = ({ taskId, comment, userId }) => {
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO task_comments
    (id, taskId, comment, commentedBy, createdAt)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, taskId, comment, userId, now);

  return { id, taskId, comment, commentedBy: userId, createdAt: now };
};

export const getComments = (taskId) => {
  return db.prepare(`
    SELECT * FROM task_comments
    WHERE taskId = ?
    ORDER BY createdAt ASC
  `).all(taskId);
};
