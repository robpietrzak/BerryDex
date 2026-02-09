const express = require("express")
const app = express();
app.use(express.json());
const PORT = 3000;

// Temporary in-memory data
const db = require("./database");

app.get("/api/berries", (req, res) => {
  db.all("SELECT * FROM berries ORDER BY LOWER(TRIM(NAME)) ASC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/berries", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description required" });
  }

  const sql = `
    INSERT INTO berries (name, description)
    VALUES (?, ?)
  `;

  db.run(sql, [name.trim(), description.trim()], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      id: this.lastID,
      name,
      description
    });
  });
  console.log("POST /api/berries hit");
});

// Serve frontend files
app.use(express.static("."));

app.listen(PORT, () => {
    console.log('BerryDex running at http://localhost:' + PORT);
});