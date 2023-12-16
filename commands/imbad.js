const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("我就爛")
    .setDescription("我就爛"),

  async execute(interaction) {
    await rngImgMsg(interaction, "imbad");
  },
};
