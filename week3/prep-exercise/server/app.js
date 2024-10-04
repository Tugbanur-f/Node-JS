import express from "express";
import usersRouter from "./users.js";
import newDatabase from "./database.js";

let app = express();
const isPersistent = true;
const database = newDatabase({ isPersistent });

app.use(express.json());

app.use("/auth", usersRouter);

app.use(express.static("client"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
