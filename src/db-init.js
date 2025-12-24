import db from "./database.js";

export function initializeDatabase() {
  // Users table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('ADMIN', 'USER')),
      createdAt TEXT NOT NULL
    )
  `).run();

  // Projects table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      createdBy TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY(createdBy) REFERENCES users(id)
    )
  `).run();

  // Tasks table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL CHECK (status IN ('TODO','IN_PROGRESS','DONE')),
      projectId TEXT NOT NULL,
      assignedTo TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY(projectId) REFERENCES projects(id),
      FOREIGN KEY(assignedTo) REFERENCES users(id)
    )
  `).run();
}
