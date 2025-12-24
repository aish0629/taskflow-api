import Database from "better-sqlite3";

// Create SQLite DB (file will be generated automatically)
const db = new Database("dev.db");

// Enable foreign keys
db.pragma("foreign_keys = ON");

export default db;
