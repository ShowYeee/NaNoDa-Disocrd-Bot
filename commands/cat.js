const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { rngImgMsg } = require("../fun/rng_image");
const catReport = require("../fun/cat_report.js");

const getReport = async (interaction) => {
  const user_id = interaction.author.id;
  const report = await catReport.getReport(user_id);
  const total = await catReport.getTotalDraws(user_id);

  const c_count = report.filter((data) => data.type == 0)[0].count;
  const g_count = report.filter((data) => data.type == 1)[0].count;

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

  const exampleEmbed = new EmbedBuilder()
    .setColor(0x1abc9c) // 使用較亮的顏色
    .setTitle(`貓咪占卜統計 <:facebookangry>`)
    .setThumbnail(interaction.member.avatarURL())
    .setAuthor({
      name: interaction.member.nickname || interaction.member.user.username,
      iconURL: interaction.member.avatarURL(),
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
};

const draw = async (interaction) => {
  const user_id = interaction.author.id;
  const type = Math.random() <= 0.2 ? 0 : 1;

  const msg = await catReport.addRecord(user_id, type).then(async () => {
    switch (type) {
      case 0:
        return await rngImgMsg(interaction, "cat/cat");
      case 1:
        return await rngImgMsg(interaction, "cat/chihuahua");
      default:
        break;
    }
  });
};

module.exports = {
  cooldown: 1,
  data: new SlashCommandBuilder()
    .setName("貓咪占卜")
    .setDescription("貓咪占卜"),

  async execute(interaction, args) {
    if (args[0] === "統計") {
      await getReport(interaction);
    } else {
      await draw(interaction);
    }
  },
};
