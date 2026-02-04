const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../../data/database.sqlite")); // 指定你的 SQLite 檔案路徑

// 初始化數據庫
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS cat_record (id INTEGER PRIMARY KEY, guild_id TEXT, user_id TEXT, type INTEGER, draw_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );
});

// 抽卡函數
function addRecord(userId, guildId, type) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO cat_record (user_id, guild_id, type) VALUES (?, ?, ?)",
      [userId, guildId, type],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve(userId);
      }
    );
  });
}

// 獲取統計數據函數
function getReport(userId, guildId) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT user_id, type, COUNT(*) as count FROM cat_record WHERE user_id = ? AND guild_id = ? GROUP BY type",
      [userId, guildId],
      (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      }
    );
  });
}

// 獲取總抽卡次數函數
function getTotalDraws(userId, guildId) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT COUNT(*) as total_draws FROM cat_record WHERE user_id = ? AND guild_id = ?",
      [userId, guildId],
      (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row.total_draws);
      }
    );
  });
}

// 檢查今天是否已經有指定 userId 的資料
function hasRecordToday(userId, guildId) {
  return new Promise((resolve, reject) => {
    // 取得當前 UTC+8 的日期
    const now = new Date();
    const utc8Time = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const today = utc8Time.toISOString().split("T")[0]; // 格式化為 'YYYY-MM-DD'

    db.get(
      `SELECT COUNT(*) as count FROM cat_record 
       WHERE user_id = ? AND guild_id = ? AND DATE(draw_time, 'localtime') = ?`,
      [userId, guildId, today],
      (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row.count > 0);
      }
    );
  });
}

module.exports = {
  addRecord,
  getReport,
  getTotalDraws,
  hasRecordToday,
};
