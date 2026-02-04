const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("那我也要睡啦")
    .setDescription("那我也要睡啦"),

  async execute(interaction) {
    const filePath = "./assets/image/sleep.jpg";
    const attachment = new AttachmentBuilder(filePath);
    await interaction.reply({ content: "很好啊，快睡", files: [attachment] });
  },
};
