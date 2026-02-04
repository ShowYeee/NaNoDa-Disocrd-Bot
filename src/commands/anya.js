const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("呵").setDescription("呵"),

  async execute(interaction) {
    const filePath = "./assets/image/anya.jpg";
    const attachment = new AttachmentBuilder(filePath);
    await interaction.reply({ files: [attachment] });
  },
};
