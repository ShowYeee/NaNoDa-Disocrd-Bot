const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("確診占卜")
    .setDescription("確診占卜"),

  async execute(interaction) {
    await rngImgMsg(interaction, "covid19", "這是你的快篩結果");
  },
};
