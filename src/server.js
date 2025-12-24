import app from "./app.js";
import dotenv from "dotenv";
import { initializeDatabase } from "./db-init.js";
dotenv.config();
initializeDatabase();
const PORT = process.env.PORT || 3000;

console.log("Starting server...");  // <-- ADD THIS

app.listen(PORT, () => {
  console.log(`🚀 TaskFlow API running on port ${PORT}`);
});
