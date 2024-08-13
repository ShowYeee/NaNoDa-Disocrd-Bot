const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite"); // 指定你的 SQLite 檔案路徑

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
    const today = new Date().toISOString().split("T")[0]; // 取得今天的日期
    db.get(
      `SELECT COUNT(*) as count FROM cat_record 
       WHERE user_id = ? AND DATE(draw_time) = ? AND guild_id = ?`,
      [userId, today, guildId],
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
