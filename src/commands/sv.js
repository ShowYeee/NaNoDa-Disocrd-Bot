const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../utils/rng_image");

module.exports = {
  data: new SlashCommandBuilder().setName("sv占卜").setDescription("sv占卜"),

  async execute(interaction) {
    await rngImgMsg(interaction, "sv");
  },
};
