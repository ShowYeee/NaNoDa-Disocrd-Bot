const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");
const catReport = require("../fun/cat_report.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("貓咪占卜")
    .setDescription("貓咪占卜"),

  async execute(interaction, args) {
    const user_id = interaction.author.id;
    const guild_id = interaction.guildId;
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
