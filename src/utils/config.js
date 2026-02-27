const fs = require("fs");
const path = require("path");
const logger = require("./logger");

const DEFAULT_CONFIG_PATH = path.join(process.cwd(), "config", "config.json");

function loadConfig(configPath = DEFAULT_CONFIG_PATH) {
  let rawConfig;

  try {
    rawConfig = fs.readFileSync(configPath, "utf8");
  } catch (error) {
    logger.error(`無法讀取設定檔: ${configPath}`);
    logger.error(`請建立 JSON 設定檔，錯誤訊息: ${error.message}`);
    process.exit(1);
  }

  try {
    const config = JSON.parse(rawConfig);
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      throw new Error("設定檔根節點必須是 JSON object");
    }

    return config;
  } catch (error) {
    logger.error(`設定檔 JSON 格式錯誤: ${configPath}`);
    logger.error(`請確認 JSON 格式正確，錯誤訊息: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  DEFAULT_CONFIG_PATH,
  loadConfig,
};
