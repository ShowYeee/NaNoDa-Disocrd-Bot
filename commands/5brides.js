const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("五等分占卜")
    .setDescription("五等分占卜"),

  async execute(interaction) {
    if (Math.random() <= 0.7) {
        await rngImgMsg(interaction, "5brides/static");
    } else {
        await rngImgMsg(interaction, "5brides/5GIF");
    }
  },
};