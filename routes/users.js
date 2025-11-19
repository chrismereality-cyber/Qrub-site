const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const router = express.Router();

module.exports = (db) => {
  let newUsers = [];

  // Add user endpoint
  router.post("/add", (req, res) => {
    const name = req.body.name?.trim();
    if (!name) return res.status(400).send("Name required");

    const id = Math.floor(Math.random() * 10000);
    db.run("INSERT INTO users VALUES (?, ?)", [id, name]);

    // Save database
    const data = db.export();
    fs.writeFileSync("users.db", Buffer.from(data));

    // Track new users (last 30s)
    const timestamp = Date.now();
    newUsers.push({ id, name, timestamp });
    newUsers = newUsers.filter(u => Date.now() - u.timestamp <= 30000);

    res.json({ id, name });
  });

  // Get all users
  router.get("/users", (req, res) => {
    const result = db.exec("SELECT * FROM users");
    const rows = result.length
      ? result[0].values.map(([id, name]) => ({ id, name }))
      : [];
    res.json(rows);
  });

  // Get new users (last 30s)
  router.get("/new-users", (req, res) => {
    newUsers = newUsers.filter(u => Date.now() - u.timestamp <= 30000);
    res.json(newUsers);
  });

  // Download database
  router.get("/download", (req, res) => {
    const filePath = "users.db";
    if (!fs.existsSync(filePath)) return res.status(404).send("DB not found");
    res.download(filePath, "users.db");
  });

  // REGISTER USER
  router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields required" });

    try {
      const hashed = await bcrypt.hash(password, 10);

      db.run(
        "INSERT INTO auth_users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashed]
      );

      const data = db.export();
      fs.writeFileSync("users.db", Buffer.from(data));

      res.json({ success: true, message: "User registered successfully" });
    } catch (err) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

  return router;
};
