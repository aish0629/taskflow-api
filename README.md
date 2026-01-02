# TaskFlow API

TaskFlow is a backend API for managing projects and tasks with
authentication, role-based access control, analytics, and audit logs.

---

## Tech Stack
- Node.js (ES Modules)
- Express.js
- SQLite (better-sqlite3)
- JWT Authentication
- Swagger (OpenAPI)
- Postman (API testing)

---

## Features
- User registration & login
- JWT-based authentication
- Role-based access control (ADMIN / USER)
- Project & task management
- Task search, filters & pagination
- Dashboard analytics
- Task comments & activity logs
- Rate limiting & centralized error handling

---

## Setup

```bash
git clone https://github.com/<your-username>/taskflow-api.git
cd taskflow-api
npm install
npm run dev
