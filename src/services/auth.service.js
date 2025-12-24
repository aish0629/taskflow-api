import db from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

export const register = async ({ email, password, role }) => {
  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const existing = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO users (id, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?)`
  ).run(id, email, hashed, role || "USER", now);

  return { message: "User registered", user: { id, email, role: role || "USER" } };
};

export const login = async ({ email, password }) => {
    console.log(`${email} - ${password}`)
  const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
  if (!user) throw new Error("Invalid email or password");
    console.table(user)
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  console.log(token)
  return { message: "Login successful", token };
};


export const getUserById = (id) => {
  return db.prepare(`SELECT id, email, role, createdAt FROM users WHERE id = ?`).get(id);
};

