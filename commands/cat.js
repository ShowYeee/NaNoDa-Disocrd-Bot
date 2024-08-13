const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");
const catReport = require("../fun/cat_report.js");

module.exports = {
  cooldown: 130,
  data: new SlashCommandBuilder()
    .setName("貓咪占卜")
    .setDescription("貓咪占卜"),

  async execute(interaction, args) {
    const user_id = interaction.author.id;
    const type = Math.random() <= 0.2 ? 0 : 1;

    await catReport.addRecord(user_id, type).then(async () => {
      switch (type) {
        case 0:
          return await rngImgMsg(interaction, "cat/cat");
        case 1:
          return await rngImgMsg(interaction, "cat/chihuahua");
        default:
          break;
      }
    });
  },
};
