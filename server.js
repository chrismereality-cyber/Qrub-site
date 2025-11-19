const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const initSqlJs = require("sql.js");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let db;

// Initialize database
(async () => {
  const SQL = await initSqlJs();
  if (fs.existsSync("users.db")) {
    const filebuffer = fs.readFileSync("users.db");
    db = new SQL.Database(filebuffer);
    console.log("✅ Loaded existing users.db");
  } else {
    db = new SQL.Database();
    db.run(`CREATE TABLE auth_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT,
      is_admin INTEGER DEFAULT 0
    )`);
    saveDB();
    console.log("✅ Created new users.db");
  }
})();

// Helper to save database
function saveDB() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync("users.db", buffer);
}

// Register endpoint
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).send("Missing fields");

  const hash = bcrypt.hashSync(password, 10);

  try {
    const stmt = db.prepare("INSERT INTO auth_users (name, email, password) VALUES (?, ?, ?)");
    stmt.run([name, email, hash]);
    stmt.free();
    saveDB();
    res.send("✅ User registered");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send("Missing fields");

  try {
    const stmt = db.prepare("SELECT * FROM auth_users WHERE email = ?");
    const user = stmt.getAsObject([email]);
    stmt.free();

    if (!user || !user.id) return res.status(404).send("❌ User not found");
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).send("❌ Wrong password");

    res.send(`✅ Logged in as ${user.name} (admin: ${user.is_admin})`);
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
