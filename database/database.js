const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./berries.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS berries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      sweetness INTEGER,
      tartness INTEGER,
      origin TEXT,
      bio TEXT,
      fun_fact TEXT
    )
  `);

  // Check if table is empty before inserting
  db.get("SELECT COUNT(*) AS count FROM berries", (err, row) => {
    if (err) return console.error(err.message);
    if (row.count === 0) {
      db.run(`
        INSERT INTO berries (name, sweetness, tartness, origin, bio, fun_fact)
        VALUES
        ('Strawberry', 4, 2, 'France', 'A popular red berry.', 'Not a true berry'),
        ('Blueberry', 3, 2, 'North America', 'Rich in antioxidants.', 'Called star berries')
      `);
    }
  });
});

module.exports = db;