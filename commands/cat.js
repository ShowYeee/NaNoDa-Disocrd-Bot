const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("貓咪占卜")
    .setDescription("貓咪占卜"),

  async execute(interaction) {
    if (Math.random() <= 0.2) {
      await rngImgMsg(interaction, "cat/cat");
    } else {
      await rngImgMsg(interaction, "cat/chihuahua");
    }
  },
};
