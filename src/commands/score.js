const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../utils/rng_image");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("成績占卜")
    .setDescription("成績占卜"),

  async execute(interaction) {
    await rngImgMsg(interaction, "score");
  },
};
