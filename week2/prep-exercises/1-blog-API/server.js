import express from "express";
import fs from "fs";

const app = express();
const PORT = 4000;

app.use(express.json());
//create a new blog post
app.post("/blogs", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }

  fs.writeFileSync(`./${title}.txt`, content);
  res.send("Blog post created successfully");
});
//update a blog post
app.put("/blogs/:title", (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).send("Content is required");
  }
  const filePath = `./${title}.txt`;

  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    res.send("Blog post updated successfully");
  } else {
    res.status(404).send("Blog post not found");
  }
});
//delete a blog post
app.delete("/blogs/:title", (req, res) => {
  const { title } = req.params;
  const trimmedTitle = title.trim();

  const filePath = `./${trimmedTitle}.txt`;

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.send("Blog post deleted successfully");
  } else {
    res.status(404).send("Blog post not found");
  }
});

//read a blog post
app.get("/blogs/:title", (req, res) => {
  const { title } = req.params;
  const filePath = `./${title.trim()}.txt`;

  if (fs.existsSync(filePath)) {
    const postContent = fs.readFileSync(filePath, "utf-8");
    res.status(200).send(postContent);
  } else {
    res.status(404).send("Blog post not found");
  }
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

//start the server on port 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
