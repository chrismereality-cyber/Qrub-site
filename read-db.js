const fs = require("fs");
const initSqlJs = require("sql.js");

(async () => {
  const SQL = await initSqlJs();
  const file = fs.readFileSync("users.db");
  const db = new SQL.Database(file);

  const result = db.exec("SELECT * FROM users");
  console.log(JSON.stringify(result, null, 2));
})();
