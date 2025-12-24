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
export const searchTasks = ({ projectId, status, search, page, limit }) => {
  let query = `SELECT * FROM tasks WHERE 1=1`;
  const params = [];

  // filter by project
  if (projectId) {
    query += ` AND projectId = ?`;
    params.push(projectId);
  }

  // filter by status
  if (status) {
    query += ` AND status = ?`;
    params.push(status);
  }

  // search on title + description
  if (search) {
    query += ` AND (title LIKE ? OR description LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`);
  }

  // pagination
  const offset = (page - 1) * limit;
  query += ` ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return db.prepare(query).all(...params);
};
export const getDashboardStats = (userId) => {
  const total = db.prepare(`SELECT COUNT(*) as count FROM tasks`).get().count;

  const completed = db.prepare(`
    SELECT COUNT(*) as count FROM tasks WHERE status = 'DONE'
  `).get().count;

  const pending = db.prepare(`
    SELECT COUNT(*) as count FROM tasks WHERE status != 'DONE'
  `).get().count;

  const assignedToUser = db.prepare(`
    SELECT COUNT(*) as count FROM tasks WHERE assignedTo = ?
  `).get(userId).count;

  const perProject = db.prepare(`
    SELECT projectId, COUNT(*) as count
    FROM tasks
    GROUP BY projectId
  `).all();

  return {
    total,
    completed,
    pending,
    assignedToUser,
    perProject
  };
};
