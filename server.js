const express = require("express")
const app = express();
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

// Serve frontend files
app.use(express.static("."));

// API route
app.get("/api/berries", (req, res) => {
    res.json(berries);
});

app.listen(PORT, () => {
    console.log('BerryDex running at http://localhost:' + PORT);
});