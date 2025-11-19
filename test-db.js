const initSqlJs = require('sql.js');

(async () => {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Create a sample table
  db.run("CREATE TABLE users (id INTEGER, name TEXT)");

  // Insert sample data
  db.run("INSERT INTO users VALUES (1, 'Chrisme')");

  // Query the table
  const result = db.exec("SELECT * FROM users");

  // Display results nicely
  console.log(JSON.stringify(result, null, 2));
})();
