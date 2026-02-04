const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../utils/rng_image");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("馬娘占卜")
    .setDescription("馬娘占卜"),

  async execute(interaction) {
    await rngImgMsg(interaction, "uma");
  },
};
