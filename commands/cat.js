const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("貓咪占卜")
    .setDescription("貓咪占卜"),

  async execute(interaction) {
    await rngImgMsg(interaction, "cat");
  },
};
