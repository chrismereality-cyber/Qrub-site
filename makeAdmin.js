const fs = require("fs");
const initSqlJs = require("sql.js");

// Replace with the email you want to make admin
const adminEmail = "chrismereality@gmail.com";

(async () => {
  const SQL = await initSqlJs();

  if (!fs.existsSync("users.db")) {
    console.log("❌ users.db not found");
    return;
  }

  const filebuffer = fs.readFileSync("users.db");
  const db = new SQL.Database(filebuffer);

  // Add is_admin column if missing
  try {
    db.run(`ALTER TABLE auth_users ADD COLUMN IF NOT EXISTS is_admin INTEGER DEFAULT 0`);
  } catch {
    // ignore if column exists
  }

  const stmt = db.prepare("SELECT * FROM auth_users WHERE email = ?");
  const user = stmt.getAsObject([adminEmail]);
  stmt.free();

  if (!user || !user.id) {
    console.log(`⚠ No user found with email: ${adminEmail}`);
    return;
  }

  db.run("UPDATE auth_users SET is_admin = 1 WHERE email = ?", [adminEmail]);

  const data = db.export();
  fs.writeFileSync("users.db", Buffer.from(data));

  console.log(`✅ User '${adminEmail}' is now an admin`);
})();
