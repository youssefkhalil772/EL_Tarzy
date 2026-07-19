const fs = require('fs');
const db = require('better-sqlite3')('database/app.db');
try {
  const tables = db.prepare('SELECT name, sql FROM sqlite_master WHERE type="table"').all();
  fs.writeFileSync('tables.json', JSON.stringify(tables, null, 2));
  process.exit(0);
} catch (e) {
  fs.writeFileSync('tables.json', e.message);
  process.exit(1);
}
