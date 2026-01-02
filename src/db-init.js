import db from "./database.js";
console.log("Initializing SQLite database...");
console.log("Initializing SQLite database...");

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
  // Task activity logs
db.prepare(`
  CREATE TABLE IF NOT EXISTS task_logs (
    id TEXT PRIMARY KEY,
    taskId TEXT NOT NULL,
    action TEXT NOT NULL,
    oldValue TEXT,
    newValue TEXT,
    performedBy TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    FOREIGN KEY(taskId) REFERENCES tasks(id),
    FOREIGN KEY(performedBy) REFERENCES users(id)
  )
`).run();

// Task comments
db.prepare(`
  CREATE TABLE IF NOT EXISTS task_comments (
    id TEXT PRIMARY KEY,
    taskId TEXT NOT NULL,
    comment TEXT NOT NULL,
    commentedBy TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    FOREIGN KEY(taskId) REFERENCES tasks(id),
    FOREIGN KEY(commentedBy) REFERENCES users(id)
  )
`).run();

// Admin audit logs
db.prepare(`
  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    entityType TEXT NOT NULL,
    entityId TEXT,
    performedBy TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    FOREIGN KEY(performedBy) REFERENCES users(id)
  )
`).run();
db.prepare(`CREATE INDEX IF NOT EXISTS idx_tasks_projectId ON tasks(projectId)`).run();
db.prepare(`CREATE INDEX IF NOT EXISTS idx_tasks_assignedTo ON tasks(assignedTo)`).run();
db.prepare(`CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)`).run();
db.prepare(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`).run();

}
