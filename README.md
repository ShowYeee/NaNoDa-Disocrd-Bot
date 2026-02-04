# NaNoDa Discord Bot

NaNoDa 是一個使用 Node.js 開發的 Discord 機器人，支援動態載入指令檔案。

## 功能特色

- ✅ 支援斜線指令 (Slash Commands)
- ✅ 支援傳統前綴指令 (Prefix Commands)
- ✅ 動態載入指令檔案
- ✅ 統一的日誌系統
- ✅ Docker 支援
- ✅ 指令冷卻時間管理

## 需求

- [Node.js](https://nodejs.org/en/) (建議 v18 或更高版本)
- Discord Bot Token
- Discord Application ID (用於斜線指令)

## 安裝

```bash
npm install
```

## 設定

### 1. 建立 `.env` 檔案

在專案根目錄建立 `.env` 檔案，並設定以下環境變數：

```env
# Discord Bot Token
TOKEN=your_bot_token_here

# Application ID (Client ID)
CLIENT_ID=your_client_id_here

# 前綴指令符號
PREFIX=!

# 預設訊息冷卻時間 (分鐘)
MESSAGE_CD_DEFAULT=1
```

### 2. 取得 Discord Bot Token 和 Client ID

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications)
2. 建立新應用程式或選擇現有應用程式
3. 在 **Bot** 頁面取得 Token
4. 在 **General Information** 頁面取得 Application ID (Client ID)

## 使用方式

### 本地執行

#### 1. 註冊斜線指令

在啟動機器人之前，需要先註冊斜線指令到 Discord：

```bash
npm run deploy
```

或

```bash
node deploy-commands.js
```

**注意**：註冊後，Discord 可能需要幾分鐘到一小時才會顯示指令。您可以嘗試重新啟動 Discord 應用程式。

#### 2. 啟動機器人

```bash
npm start
```

或

```bash
node bot.js
```

### Docker 部署

#### 使用 Docker Compose

```bash
docker-compose up -d
```

#### 使用 Docker

```bash
# 建立映像檔
docker build -t nanoda-bot .

# 執行容器
docker run -d --name nanoda-bot --env-file .env nanoda-bot
```

**注意**：Docker 容器啟動時會自動執行 `deploy-commands.js` 註冊斜線指令，然後啟動機器人。

## 環境變數說明

| 變數名稱 | 說明 | 必填 |
|---------|------|------|
| `TOKEN` | Discord Bot Token | ✅ |
| `CLIENT_ID` | Discord Application ID (用於註冊斜線指令) | ✅ |
| `PREFIX` | 前綴指令符號 (例如: `!`, `?`) | ✅ |
| `MESSAGE_CD_DEFAULT` | 預設訊息冷卻時間 (分鐘) | ❌ |

## 如何建立指令

### 斜線指令範例

在 `commands/` 資料夾中建立 `.js` 檔案：

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('說你好'),
  
  async execute(interaction) {
    await interaction.reply('你好！');
  },
};
```

### 前綴指令範例

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('說你好'),
  
  async execute(message, args) {
    await message.reply('你好！');
  },
};
```

### 同時支援斜線和前綴指令

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('說你好'),
  
  async execute(interaction, args) {
    // 支援 prefix 和 slash 指令
    const user = interaction.user || interaction.author;
    const reply = interaction.reply || ((msg) => interaction.channel.send(msg));
    
    await reply(`你好，${user.username}！`);
  },
};
```

### 指令屬性

- `data`: 使用 `SlashCommandBuilder` 定義斜線指令
- `execute`: 指令執行函數
  - 斜線指令: `execute(interaction)`
  - 前綴指令: `execute(message, args)`
  - 同時支援: `execute(interaction, args)`
- `cooldown`: 指令冷卻時間 (分鐘，選填)

## 專案結構

```
NaNoDa-Disocrd-Bot/
├── src/                    # 源代碼目錄
│   ├── commands/           # 指令檔案
│   ├── utils/              # 工具函數和模組
│   │   ├── logger.js       # 日誌系統
│   │   ├── rng_image.js    # 隨機圖片工具
│   │   ├── cat_report.js   # 貓咪占卜資料庫
│   │   └── play_sv_sound.js # 語音播放工具
│   └── index.js            # 主程式入口
├── scripts/                # 腳本檔案
│   ├── deploy-commands.js  # 註冊斜線指令
│   └── start.sh            # Docker 啟動腳本
├── assets/                  # 資源檔案
│   └── image/              # 圖片資源
├── data/                    # 資料檔案
│   └── database.sqlite     # SQLite 資料庫
├── Dockerfile              # Docker 設定
├── docker-compose.yml      # Docker Compose 設定
├── package.json            # 專案配置
└── .env                    # 環境變數設定
```

## 日誌系統

專案使用統一的日誌系統，包含以下級別：

- `[INFO]` - 一般資訊
- `[SUCCESS]` - 成功訊息
- `[WARN]` - 警告訊息
- `[ERROR]` - 錯誤訊息
- `[DEBUG]` - 調試訊息

所有日誌都包含時間戳記，格式：`YYYY-MM-DD HH:MM:SS [LEVEL] 訊息內容`

## 參考資料

- [Discord.js 官方文件](https://discord.js.org/#/)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Discord.js Slash Commands 指南](https://discordjs.guide/interactions/slash-commands.html)

## 授權

ISC

## 作者

ShowYeee

## 相關連結

- [GitHub Repository](https://github.com/ShowYeee/NaNoDa)
