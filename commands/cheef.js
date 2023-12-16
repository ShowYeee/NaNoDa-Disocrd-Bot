const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("中華一番占卜")
    .setDescription("中華一番占卜"),

  async execute(interaction) {
    await rngImgMsg(interaction, "chef");
  },
};
