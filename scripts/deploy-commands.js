const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const logger = require('../src/utils/logger');

// 載入 .env 檔案（如果存在）
// 在 Docker 環境中，環境變數通常已通過 env_file 注入，無需讀取 .env 檔案
const envPath = path.join(__dirname, '.env');
const envResult = dotenv.config({ path: envPath });

if (envResult.error && !process.env.TOKEN) {
  // 只有在本地環境且沒有環境變數時才顯示警告
  logger.warn(`無法載入 .env 檔案: ${envResult.error.message}`);
  logger.warn('請確認 .env 檔案存在於專案根目錄，或確保環境變數已正確設定。');
}

// 讀取環境變數，並移除可能的引號
let token = process.env.TOKEN;
let clientId = process.env.CLIENT_ID;

if (token) {
  // 移除前後引號（如果有的話）
  token = token.replace(/^["']|["']$/g, '');
}

if (clientId) {
  // 移除前後引號（如果有的話）
  clientId = clientId.replace(/^["']|["']$/g, '');
}

// 檢查必要的環境變數
if (!token || token.trim() === '') {
  logger.error('找不到 TOKEN 環境變數。請確認 .env 檔案中有設定 TOKEN。');
  logger.info('格式範例: TOKEN=your_token_here');
  process.exit(1);
}

if (!clientId || clientId.trim() === '') {
  logger.error('找不到 CLIENT_ID 環境變數。請確認 .env 檔案中有設定 CLIENT_ID。');
  logger.info('您可以在 Discord Developer Portal (https://discord.com/developers/applications) 找到您的應用程式 ID。');
  logger.info('格式範例: CLIENT_ID=your_client_id_here');
  process.exit(1);
}

// 載入所有指令
const commands = [];
const commandsPath = path.join(__dirname, '../src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    logger.warn(`指令 ${filePath} 缺少必要的 "data" 或 "execute" 屬性`);
  }
}

// 構建並準備 REST 實例
const rest = new REST().setToken(token);

// 部署指令
(async () => {
  try {
    logger.info(`開始註冊 ${commands.length} 個斜線指令...`);

    // 註冊全局指令（適用於所有伺服器）
    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    logger.success(`成功註冊 ${data.length} 個斜線指令`);
    logger.debug(`指令列表: ${data.map(cmd => cmd.name).join(', ')}`);
  } catch (error) {
    logger.error(`註冊指令時發生錯誤: ${error.message}`);
    console.error(error);
  }
})();
