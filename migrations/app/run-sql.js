import "dotenv/config"
import fs from "fs";
import Database from "better-sqlite3";

console.log(process.env.DATABASE_URL)

const DB_PATH = process.env.DATABASE_URL;
const SQL_FILE = "./migrations/app/001_init.sql";

function run() {
  const sql = fs.readFileSync(SQL_FILE, "utf-8");

  const db = new Database(DB_PATH);

  db.exec(sql);

  db.close();

  console.log("Migration executed successfully");
}

run();
