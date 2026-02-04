/**
 * 制式化日誌工具
 */

// ANSI 顏色代碼
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

/**
 * 獲取格式化的時間戳記
 */
function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 格式化日誌訊息
 */
function formatLog(level, message, color = colors.reset) {
  const timestamp = getTimestamp();
  const levelTag = `[${level}]`.padEnd(7);
  return `${colors.dim}${timestamp}${colors.reset} ${color}${levelTag}${colors.reset} ${message}`;
}

const logger = {
  /**
   * 資訊日誌
   */
  info: (...args) => {
    console.log(formatLog('INFO', args.join(' '), colors.cyan));
  },

  /**
   * 成功日誌
   */
  success: (...args) => {
    console.log(formatLog('SUCCESS', args.join(' '), colors.green));
  },

  /**
   * 警告日誌
   */
  warn: (...args) => {
    console.warn(formatLog('WARN', args.join(' '), colors.yellow));
  },

  /**
   * 錯誤日誌
   */
  error: (...args) => {
    console.error(formatLog('ERROR', args.join(' '), colors.red));
  },

  /**
   * 調試日誌
   */
  debug: (...args) => {
    console.log(formatLog('DEBUG', args.join(' '), colors.magenta));
  },

  /**
   * 原始日誌（不格式化）
   */
  raw: (...args) => {
    console.log(...args);
  },
};

module.exports = logger;
