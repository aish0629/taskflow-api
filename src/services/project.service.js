import db from "../database.js";
import { randomUUID } from "crypto";

export const createProject = ({ name, createdBy }) => {
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO projects (id, name, createdBy, createdAt)
     VALUES (?, ?, ?, ?)`
  ).run(id, name, createdBy, now);

  return { id, name, createdBy, createdAt: now };
};

export const listProjects = () => {
  return db.prepare(`SELECT * FROM projects ORDER BY createdAt DESC`).all();
};
