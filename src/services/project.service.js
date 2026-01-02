import db from "../database.js";
import { randomUUID } from "crypto";
import { logAudit } from "./audit.service.js";

export const createProject = ({ name, createdBy }) => {
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO projects (id, name, createdBy, createdAt)
     VALUES (?, ?, ?, ?)`
  ).run(id, name, createdBy, now);
    logAudit({
    action: "PROJECT_CREATED",
    entityType: "PROJECT",
    entityId: id,
    performedBy: createdBy
    });

  return { id, name, createdBy, createdAt: now };
};

export const listProjects = () => {
  return db.prepare(`SELECT * FROM projects ORDER BY createdAt DESC`).all();
};
