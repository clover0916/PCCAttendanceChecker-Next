const Database = require("better-sqlite3");

const users = ["a", "b", "c"];
const db = new Database("attend.sqlite", { verbose: console.log });
// const sql = fs.readFileSync("schema.sql", "utf8");

// db.exec(sql);
//db.prepare("DROP TABLE IF EXISTS attend").run();
//db.prepare("CREATE TABLE IF NOT EXISTS attend(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, ip TEXT, status TEXT, reg_type TEXT, created_at TIMESTAMP DEFAULT(datetime(CURRENT_TIMESTAMP,'localtime')))").run();
db.prepare("CREATE TABLE attend(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, ip TEXT, seat_num INTEGER, status TEXT, reg_type TEXT, created_at TIMESTAMP DEFAULT(datetime('now', 'utc', '+9 hours')))").run();


//for (const row of db.prepare("SELECT * FROM attend").iterate()) console.log(row);
//for (const counta of db.prepare("SELECT COUNT(*) FROM attend WHERE name = ?").iterate("a")) console.log(counta);

db.close();