const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../utils/rng_image");
const catReport = require("../utils/cat_report.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("貓咪占卜")
    .setDescription("貓咪占卜"),

  async execute(interaction, args) {
    // 支援 prefix 和 slash 指令
    const user = interaction.user || interaction.author;
    const user_id = user.id;
    const guild_id = interaction.guildId || interaction.guild?.id;
    const hasRecord = await catReport.hasRecordToday(user_id, guild_id);

    if (!hasRecord) {
      const type = Math.random() <= 0.2 ? 0 : 1;

      await catReport.addRecord(user_id, guild_id, type).then(async () => {
        switch (type) {
          case 0:
            return await rngImgMsg(interaction, "cat/cat");
          case 1:
            return await rngImgMsg(interaction, "cat/chihuahua");
          default:
            break;
        }
      });
    } else {
      return interaction.reply({
        content: "今天的占卜次數已用盡",
      });
    }
  },
};
