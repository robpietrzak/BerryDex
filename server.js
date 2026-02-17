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
  const { name, sweetness, tartness, origin, bio, fun_fact } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const sql = `
    INSERT INTO berries (name, sweetness, tartness, origin, bio, fun_fact)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  

  db.run(
    sql,
    [
      name.trim(),
      sweetness || null,
      tartness || null,
      origin || null,
      bio || null,
      fun_fact || null
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        id: this.lastID,
        name,
        sweetness,
        tartness,
        origin,
        bio,
        fun_fact
      });
    }
  );
});

app.delete("/api/berries/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM berries WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ error: "Berry not found" });
    }

    res.json({ message: "Berry deleted" });
  });
});

// Serve frontend files
app.use(express.static("."));

app.listen(PORT, () => {
    console.log('BerryDex running at http://localhost:' + PORT);
});