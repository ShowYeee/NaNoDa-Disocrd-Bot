const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("人事部").setDescription("人事部"),

  async execute(interaction) {
    const filePath = "./assets/image/pd.gif";
    const attachment = new AttachmentBuilder(filePath);
    await interaction.reply({ files: [attachment] });
  },
};
