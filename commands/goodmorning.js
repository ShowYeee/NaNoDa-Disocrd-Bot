const { SlashCommandBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("早安noda")
    .setDescription("早安noda"),

  async execute(interaction) {
    await rngImgMsg(interaction, "morning");
  },
};
