import db from "../database.js";
import { randomUUID } from "crypto";

export const logAudit = ({ action, entityType, entityId, performedBy }) => {
  db.prepare(`
    INSERT INTO audit_logs
    (id, action, entityType, entityId, performedBy, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    randomUUID(),
    action,
    entityType,
    entityId,
    performedBy,
    new Date().toISOString()
  );
};

export const getAuditLogs = () => {
  return db.prepare(`
    SELECT * FROM audit_logs
    ORDER BY createdAt DESC
  `).all();
};
