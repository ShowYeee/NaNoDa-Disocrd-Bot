const fs = require("fs");
const path = require("path");
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  Events,
} = require("discord.js");
const { prefix, token, message_cd_default } = require("./config.json");

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
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
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
    console.error(error);
    message.reply({
      content: "此指令發生未知的錯誤!",
    });
  }
});

// client.on(Events.InteractionCreate, async interaction => {
//     if (!interaction.isChatInputCommand()) return;

//     const command = interaction.client.commands.get(interaction.commandName);

//     if (!command) {
//         console.error(`No command matching ${interaction.commandName} was found.`);
//         return;
//     }

//     try {
//         await command.execute(interaction);
//     } catch (error) {
//         console.error(error);
//         if (interaction.replied || interaction.deferred) {
//             await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
//         } else {
//             await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//         }
//     }
// });

client.login(token);
