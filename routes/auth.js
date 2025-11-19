// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');

module.exports = (db) => {
  const router = express.Router();

  // REGISTER USER
  router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields required' });

    const hashed = await bcrypt.hash(password, 10);

    try {
      db.run(
        'INSERT INTO auth_users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashed]
      );
      const data = db.export();
      require('fs').writeFileSync('users.db', Buffer.from(data));
      res.json({ success: true, message: 'User registered successfully' });
    } catch (err) {
      res.status(400).json({ error: 'Email already exists' });
    }
  });

  // LOGIN USER
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email & password required' });

    const result = db.exec(
      'SELECT * FROM auth_users WHERE email = ?',
      [email]
    );

    if (!result.length) return res.status(400).json({ error: 'Invalid login' });

    const user = result[0].values[0];
    const isMatch = await bcrypt.compare(password, user[3]); // password is 4th column
    if (!isMatch) return res.status(400).json({ error: 'Invalid login' });

    res.json({ success: true, id: user[0], name: user[1], email: user[2] });
  });

  return router;
};
