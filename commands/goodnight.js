const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("晚安noda")
    .setDescription("晚安noda"),

  async execute(interaction) {
    await rngImgMsg(interaction, "goodnight");
  },
};
