const express = require("express");
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

const PORT = 3000;

// Import SQLite database connection
const db = require("./database");

// ---------------------------
// Helper: Validate berry data
// ---------------------------
function validateBerry(data) {
  const errors = [];

  // Name is required
  if (!data.name || data.name.trim() === "") {
    errors.push("Name is required");
  }

  // Sweetness validation (0–5 integer)
  if (data.sweetness !== undefined) {
    if (!Number.isInteger(data.sweetness) || data.sweetness < 0 || data.sweetness > 5) {
      errors.push("Sweetness must be an integer between 0 and 5");
    }
  }

  // Tartness validation (0–5 integer)
  if (data.tartness !== undefined) {
    if (!Number.isInteger(data.tartness) || data.tartness < 0 || data.tartness > 5) {
      errors.push("Tartness must be an integer between 0 and 5");
    }
  }

  // Trim optional string fields
  ["origin", "bio", "fun_fact", "image_url"].forEach(field => {
    if (data[field]) data[field] = data[field].trim();
  });

  return errors;
}

// ---------------------------
// GET: Retrieve all berries
// ---------------------------
app.get("/api/berries", (req, res) => {
  db.all("SELECT * FROM berries ORDER BY LOWER(TRIM(NAME)) ASC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// ---------------------------
// POST: Create a new berry
// ---------------------------
app.post("/api/berries", (req, res) => {
  const errors = validateBerry(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  const { name, sweetness, tartness, origin, bio, fun_fact, image_url } = req.body;

  // Check for duplicate berry name
  db.get("SELECT id FROM berries WHERE LOWER(name) = LOWER(?)", [name.trim()], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.status(400).json({ error: "Berry name already exists" });

    const sql = `
      INSERT INTO berries (name, sweetness, tartness, origin, bio, fun_fact, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [
        name.trim(),
        sweetness || null,
        tartness || null,
        origin || null,
        bio || null,
        fun_fact || null,
        image_url || null
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
          fun_fact,
          image_url
        });
      }
    );
  });
});

// ---------------------------
// PUT: Update an existing berry
// ---------------------------
app.put("/api/berries/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  const fields = [];
  const values = [];

  // Include image_url in the allowed fields
  ["name", "sweetness", "tartness", "origin", "bio", "fun_fact", "image_url"].forEach(field => {
    if (updates[field] !== undefined) {
      fields.push(`${field} = ?`);
      values.push(typeof updates[field] === "string" ? updates[field].trim() : updates[field]);
    }
  });

  if (fields.length === 0) return res.status(400).json({ error: "No valid fields to update" });

  const sql = `UPDATE berries SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  db.run(sql, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Berry not found" });

    res.json({ message: "Berry updated" });
  });
});

// ---------------------------
// DELETE: Remove a berry
// ---------------------------
app.delete("/api/berries/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM berries WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Berry not found" });

    res.json({ message: "Berry deleted" });
  });
});

// ---------------------------
// Serve frontend files
// ---------------------------
app.use(express.static("."));

// ---------------------------
// Start the server
// ---------------------------
app.listen(PORT, () => {
  console.log('BerryDex running at http://localhost:' + PORT);
});