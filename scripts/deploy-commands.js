const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const logger = require("../src/utils/logger");
const { loadConfig } = require("../src/utils/config");

const config = loadConfig();

let token = config.TOKEN;
let clientId = config.CLIENT_ID;

if (token) {
  token = token.replace(/^["']|["']$/g, "");
}

if (clientId) {
  clientId = clientId.replace(/^["']|["']$/g, "");
}

if (!token || token.trim() === "") {
  logger.error("找不到 TOKEN。請確認 config/config.json 中有設定 TOKEN。");
  logger.info('設定範例: "TOKEN": "your_token_here"');
  process.exit(1);
}

if (!clientId || clientId.trim() === "") {
  logger.error("找不到 CLIENT_ID。請確認 config/config.json 中有設定 CLIENT_ID。");
  logger.info(
    "可到 Discord Developer Portal (https://discord.com/developers/applications) 取得 Application ID。"
  );
  logger.info('設定範例: "CLIENT_ID": "your_client_id_here"');
  process.exit(1);
}

const commands = [];
const commandsPath = path.join(__dirname, "../src/commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    logger.warn(`命令檔 ${filePath} 缺少必要的 "data" 或 "execute" 屬性`);
  }
}

const rest = new REST().setToken(token);

(async () => {
  try {
    logger.info(`開始重新整理 ${commands.length} 個斜線命令...`);

    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    logger.success(`成功部署 ${data.length} 個斜線命令`);
    logger.debug(`命令列表: ${data.map((cmd) => cmd.name).join(", ")}`);
  } catch (error) {
    logger.error(`部署命令失敗: ${error.message}`);
    console.error(error);
  }
})();
