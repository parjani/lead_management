import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const admin = await User.create({
  name: "Admin",
  email: "admin@gmail.com",
  phone: "9876543210",
  password: "admin123",
  role: "admin",
});

console.log("Admin created successfully.");

await mongoose.disconnect();