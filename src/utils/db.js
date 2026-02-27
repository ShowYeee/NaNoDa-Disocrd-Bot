const mysql = require("mysql2/promise");
const { loadConfig } = require("./config");

const config = loadConfig();

function getRequiredValue(name, fallback) {
  const value = process.env[name] ?? config[name] ?? fallback;
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new Error(`Missing database config: ${name}`);
  }
  return value;
}

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? config.DB_HOST ?? "mysql",
  port: Number(process.env.DB_PORT ?? config.DB_PORT ?? 3306),
  user: getRequiredValue("DB_USER"),
  password: getRequiredValue("DB_PASSWORD"),
  database: getRequiredValue("DB_NAME"),
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? config.DB_CONNECTION_LIMIT ?? 10),
  queueLimit: 0,
  charset: "utf8mb4",
});

module.exports = {
  pool,
};
