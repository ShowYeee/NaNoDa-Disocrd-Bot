const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const catReport = require("../fun/cat_report.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("貓咪占卜統計")
    .setDescription("貓咪占卜統計"),

  async execute(interaction, args) {
    const user_id = interaction.author.id;
    const report = await catReport.getReport(user_id);
    const total = await catReport.getTotalDraws(user_id);

    if (!(total > 0))return interaction.reply("您還沒有任何占卜資料");

    const c_count = report.filter((data) => data.type == 0)[0]?.count ?? 0;
    const g_count = report.filter((data) => data.type == 1)[0]?.count ?? 0;

    // 計算比例並格式化為整數百分比
    const c_percentage = Math.round((c_count / total) * 100);
    const g_percentage = Math.round((g_count / total) * 100);

    const fields = [
      { name: "總抽數", value: `${total}` },
      { name: "貓咪總量", value: `${c_count}`, inline: true },
      { name: "吉娃娃總量", value: `${g_count}`, inline: true },
      { name: "\u200B", value: " ", inline: true }, // 空白字段，保持對齊
      { name: "貓咪比例", value: `${c_percentage}%`, inline: true },
      { name: "吉娃娃比例", value: `${g_percentage}%`, inline: true },
      { name: "\u200B", value: " ", inline: true },
    ];
    console.log(interaction.author.avatarURL());

    const name = interaction.member.nickname || interaction.member.user.username;
    const avatarURL =interaction.member.avatarURL() || interaction.author.avatarURL();
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x1abc9c) // 使用較亮的顏色
      .setTitle(`貓咪占卜統計 (Beta)`)
      .setThumbnail(avatarURL)
      .setAuthor({
        name: name,
        iconURL: avatarURL,
      })
      .addFields(fields)
      .setFooter({
        text: "沒事啦大家都只會抽到吉娃娃",
      }) // 可以替換成實際的 icon URL
      .setTimestamp()
      .setDescription("``機率:`` ``貓咪 20%`` ``吉娃娃 80%``");

    await interaction.reply({
      embeds: [exampleEmbed],
    });
  },
};
