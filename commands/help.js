const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("help"),

  async execute(interaction, args) {
    const commands = interaction.client.commands.map((cmd) => ({
      name: cmd.data.name,
      value: " ",
      inline: true,
    }));

    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`**__${interaction.author.globalName}__   指令列表**`)
      .setDescription("`若發現有指令錯誤，請向作者或管理員反映`")
      .addFields(commands)
      .setFooter({
        text: "Published by ShowYee \n[https://github.com/ShowYeee/NaNoDa]\n",
        iconURL: "https://i.ytimg.com/vi/6Le1tQ6sV-M/hqdefault.jpg",
      });

    await interaction.reply({
      embeds: [exampleEmbed],
    });
  },
};
