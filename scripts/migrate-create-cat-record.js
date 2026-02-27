const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const { loadConfig } = require("../src/utils/config");

const config = loadConfig();

function getValue(name, fallback) {
  return process.env[name] ?? config[name] ?? fallback;
}

function required(name) {
  const value = getValue(name);
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new Error(`Missing required config: ${name}`);
  }
  return value;
}

async function main() {
  const sqlPath = path.join(process.cwd(), "migrations", "001_create_cat_record.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");

  const connection = await mysql.createConnection({
    host: getValue("DB_HOST", "127.0.0.1"),
    port: Number(getValue("DB_PORT", 3306)),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    database: required("DB_NAME"),
    charset: "utf8mb4",
  });

  try {
    await connection.query(sql);
    console.log("Migration success: cat_record table is ready.");
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
