import newDatabase from "./database.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

const isPersistent = true;
const database = newDatabase({ isPersistent });

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(404)
      .json({ message: "Username and password are required" });
  }

  const existingUser = database.getById(username);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { username, password: hashedPassword };
  const savedUser = database.create(user);

  return res
    .status(201)
    .json({ id: savedUser.id, username: savedUser.username });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user = database.getById(username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET, {
    expiresIn: "10m",
  });
  return res.status(200).json({ token });
});

router.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = database.getById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ id: user.id, username: user.username });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

router.post("/logout", (req, res) => {
  return res.status(200).json({ message: "Logout successful" });
});

export default router;
