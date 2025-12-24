// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import prisma from "../prisma/client.js";

// const JWT_SECRET =ProcessingInstruction.env.JWT_SECRET || "devsecret"; //You can change later

// export const regsiter =async({email,password,role})=>{
//     if (!email || !password){
//         throw new Error ("email and password are required");
//     }
//  //Check if user exists
//  const exisiting =await prisma.user.findUnique({where: {email}});
//  if (exisiting){
//     throw new Error("User already exists ");
//  }
//  //Hash password
//  const hashed= await bcrypt.hash(password,10);

//  //Create User
//  const newUser=await prisma.user.create({
//     data : {
//         email,
//         pawword:hashed,
//         role: role|| "User"
//     },
// });
// return{
//     message: "User registered successfully ",
//     user: {id:newUser.id,email:newUser.email,role:newUser.role},
// };
// };
// export const login = async ({ email, password }) => {
//   if (!email || !password) {
//     throw new Error("Email and password are required");
//   }

//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) {
//     throw new Error("Invalid email or password");
//   }

//   const passwordMatch = await bcrypt.compare(password, user.password);
//   if (!passwordMatch) {
//     throw new Error("Invalid email or password");
//   }

//   //Generate JWT
//   const token=jwt.sign(
//     {userId:user.id,role:user.role},
//     JWT_SECRET,
//     {expiresIn:"7d"}
//   );
//   return{
//     message: "Login successful",
//     token,
//   };
//  };





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
  const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
  if (!user) throw new Error("Invalid email or password");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { message: "Login successful", token };
};




