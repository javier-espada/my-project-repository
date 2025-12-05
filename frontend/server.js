
import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());         // <-- ADD THIS
app.use(express.json());

// Create JSON File
app.post("/api/create-json", (req, res) => {
  const { filename, content, action } = req.body;

  if (!filename || !content || !action) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const data = [
    {
      Action: action,
      Filename: filename,
      Content: content,
    },
  ];

  const folderPath = path.join(
    process.cwd(),
    "src/Resources"
  );

  const filePath = path.join(
    folderPath,
    `${filename.replace(/\s+/g, "_")}.json`
  );

  fs.mkdirSync(folderPath, { recursive: true });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

  res.json({ message: "File created", path: filePath });
});

// Start API
app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});