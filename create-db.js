const fs = require("fs");
const initSqlJs = require("sql.js");

(async () => {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  db.run("CREATE TABLE users (id INTEGER, name TEXT)");
  db.run("INSERT INTO users VALUES (1, 'Chrisme')");

  const data = db.export();
  fs.writeFileSync("users.db", Buffer.from(data));

  console.log("✅ Database saved to users.db");
})();
