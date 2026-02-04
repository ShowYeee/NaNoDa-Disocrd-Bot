const fs = require("fs");
const path = require("path");
require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  Events,
} = require("discord.js");
const logger = require("./utils/logger");

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
const message_cd_default = process.env.MESSAGE_CD_DEFAULT;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.commands = new Collection();

const cooldowns = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    logger.warn(`指令 ${filePath} 缺少必要的 "data" 或 "execute" 屬性`);
  }
}

client.once(Events.ClientReady, (readyClient) => {
  logger.success(`機器人已啟動 | ${readyClient.user.tag}`);
  logger.info(`已載入 ${client.commands.size} 個指令`);
});

// Adding support for prefix-based commands
client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  // #region 冷卻處理

  if (!cooldowns.has(commandName)) {
    cooldowns.set(commandName, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(commandName);
  const cooldownAmount = (command.cooldown || message_cd_default) * 60000; // 預設冷卻時間為 5 分鐘

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `請稍候 ${timeLeft.toFixed(1)} 秒再次使用 \`${commandName}\` 指令。`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // #endregion

  try {
    await command.execute(message, args);
  } catch (error) {
    logger.error(`執行前綴指令 ${commandName} 時發生錯誤:`, error.message);
    console.error(error);
    message.reply({
      content: "此指令發生未知的錯誤!",
    });
  }
});

// 處理斜線指令
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        logger.error(`找不到斜線指令: ${interaction.commandName}`);
        return;
    }

    // 冷卻處理
    if (!cooldowns.has(interaction.commandName)) {
        cooldowns.set(interaction.commandName, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(interaction.commandName);
    const cooldownAmount = (command.cooldown || message_cd_default) * 60000;

    if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return interaction.reply({
                content: `請稍候 ${timeLeft.toFixed(1)} 秒再次使用 \`${interaction.commandName}\` 指令。`,
                ephemeral: true
            });
        }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
        await command.execute(interaction);
    } catch (error) {
        logger.error(`執行斜線指令 ${interaction.commandName} 時發生錯誤:`, error.message);
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ 
                content: '執行此指令時發生錯誤！', 
                ephemeral: true 
            });
        } else {
            await interaction.reply({ 
                content: '執行此指令時發生錯誤！', 
                ephemeral: true 
            });
        }
    }
});

client.login(token);
