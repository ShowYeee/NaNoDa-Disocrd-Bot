const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");

module.exports = {
  data: new SlashCommandBuilder().setName("可憐哪").setDescription("可憐哪"),

  async execute(interaction) {
    await rngImgMsg(interaction, "kolen");
  },
};
