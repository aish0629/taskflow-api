import db from "../database.js";
import { randomUUID } from "crypto";

export const createTask = ({ title, description, projectId, assignedTo, createdBy }) => {
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO tasks (id, title, description, status, projectId, assignedTo, createdAt, updatedAt)
    VALUES (?, ?, ?, 'TODO', ?, ?, ?, ?)
  `).run(id, title, description, projectId, assignedTo, now, now);

  return {
    id,
    title,
    description,
    status: "TODO",
    projectId,
    assignedTo,
    createdAt: now,
    updatedAt: now
  };
};

export const listTasksByProject = (projectId) => {
  return db.prepare(`
    SELECT * FROM tasks WHERE projectId = ? ORDER BY createdAt DESC
  `).all(projectId);
};

export const updateTaskStatus = (taskId, status) => {
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE tasks SET status = ?, updatedAt = ? WHERE id = ?
  `).run(status, now, taskId);

  return db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(taskId);
};

export const getTaskById = (taskId) => {
  return db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(taskId);
};
