import db from "../database.js";
import { randomUUID } from "crypto";

export const logTaskActivity = ({
  taskId,
  action,
  oldValue,
  newValue,
  performedBy
}) => {
  db.prepare(`
    INSERT INTO task_logs
    (id, taskId, action, oldValue, newValue, performedBy, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    randomUUID(),
    taskId,
    action,
    oldValue,
    newValue,
    performedBy,
    new Date().toISOString()
  );
};

export const getTaskLogs = (taskId) => {
  return db.prepare(`
    SELECT * FROM task_logs
    WHERE taskId = ?
    ORDER BY createdAt DESC
  `).all(taskId);
};
