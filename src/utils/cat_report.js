const { pool } = require("./db");

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS cat_record (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  guild_id VARCHAR(64) NOT NULL,
  user_id VARCHAR(64) NOT NULL,
  type TINYINT NOT NULL,
  draw_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_cat_record_user_guild (user_id, guild_id),
  INDEX idx_cat_record_user_guild_draw_time (user_id, guild_id, draw_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

let initPromise;
function ensureTable() {
  if (!initPromise) {
    initPromise = pool.query(CREATE_TABLE_SQL);
  }
  return initPromise;
}

function getUtc8DayRangeUtc() {
  const offsetMs = 8 * 60 * 60 * 1000;
  const utc8Now = new Date(Date.now() + offsetMs);
  const year = utc8Now.getUTCFullYear();
  const month = utc8Now.getUTCMonth();
  const day = utc8Now.getUTCDate();

  const startUtcMs = Date.UTC(year, month, day, 0, 0, 0) - offsetMs;
  const endUtcMs = startUtcMs + 24 * 60 * 60 * 1000;

  return {
    start: new Date(startUtcMs),
    end: new Date(endUtcMs),
  };
}

async function addRecord(userId, guildId, type) {
  await ensureTable();
  await pool.execute(
    "INSERT INTO cat_record (user_id, guild_id, type) VALUES (?, ?, ?)",
    [userId, guildId, type]
  );
  return userId;
}

async function getReport(userId, guildId) {
  await ensureTable();
  const [rows] = await pool.execute(
    "SELECT user_id, type, COUNT(*) AS count FROM cat_record WHERE user_id = ? AND guild_id = ? GROUP BY user_id, type",
    [userId, guildId]
  );
  return rows;
}

async function getTotalDraws(userId, guildId) {
  await ensureTable();
  const [rows] = await pool.execute(
    "SELECT COUNT(*) AS total_draws FROM cat_record WHERE user_id = ? AND guild_id = ?",
    [userId, guildId]
  );
  return Number(rows[0]?.total_draws ?? 0);
}

async function hasRecordToday(userId, guildId) {
  await ensureTable();
  const { start, end } = getUtc8DayRangeUtc();
  const [rows] = await pool.execute(
    "SELECT COUNT(*) AS count FROM cat_record WHERE user_id = ? AND guild_id = ? AND draw_time >= ? AND draw_time < ?",
    [userId, guildId, start, end]
  );
  return Number(rows[0]?.count ?? 0) > 0;
}

module.exports = {
  addRecord,
  getReport,
  getTotalDraws,
  hasRecordToday,
  ensureTable,
};
