const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite"); // 指定你的 SQLite 檔案路徑

// 初始化數據庫
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS cat_record (id INTEGER PRIMARY KEY, user_id TEXT, type INTEGER, draw_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );
});

// 抽卡函數
function addRecord(userId, type) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO cat_record (user_id, type) VALUES (?, ?)",
      [userId, type],
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
function getReport(userId) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT user_id, type, COUNT(*) as count FROM cat_record WHERE user_id = ? GROUP BY type",
      [userId],
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
function getTotalDraws() {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) as total_draws FROM cat_record", [], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row.total_draws);
    });
  });
}

module.exports = {
  addRecord,
  getReport,
  getTotalDraws,
};
