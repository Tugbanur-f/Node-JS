import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  res
    .status(200)
    .json({ message: "User registered", username, hashedPassword });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const storedPassword = "$2b$10$validHashedPasswordHere";

  const isMatch = await bcrypt.compare(password, storedPassword);
  if (!isMatch) {
    res.status(200).json({ message: "Login succesful" });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
