const db = require("./database");

// List of berries to add
const berries = [
  {
    name: "Strawberry",
    sweetness: 4,
    tartness: 2,
    origin: "Europe",
    bio: "Strawberries are bright red, juicy, and sweet.",
    fun_fact: "Strawberries are the only fruit with seeds on the outside."
  },
  {
    name: "Blueberry",
    sweetness: 3,
    tartness: 3,
    origin: "North America",
    bio: "Blueberries are small, round, and blue-purple in color.",
    fun_fact: "Blueberries are native to North America and were used by Native Americans for food and dye."
  },
  {
    name: "Banana",
    sweetness: 4,
    tartness: 1,
    origin: "Southeast Asia",
    bio: "Bananas are giant herbs botanically described as berries.",
    fun_fact: "Banana trees are the largest plants without a 'woody' stem!"
  }
  // Endpoint for recent berries
];

berries.forEach(b => {
  // Check if berry already exists
  db.get("SELECT * FROM berries WHERE name = ?", [b.name], (err, row) => {
    if (err) {
      console.error(err);
      return;
    }

    if (!row) {
      // Insert only if it doesn't exist
      db.run(
        `INSERT INTO berries (name, sweetness, tartness, origin, bio, fun_fact)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [b.name, b.sweetness, b.tartness, b.origin, b.bio, b.fun_fact],
        err => {
          if (err) console.error(err);
          else console.log(`Added: ${b.name}`);
        }
      );
    } else {
      console.log(`Skipped (already exists): ${b.name}`);
    }
  });
});