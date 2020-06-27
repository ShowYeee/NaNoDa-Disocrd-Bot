module.exports = {
    name: 'help',
    description: 'help',
    execute(message, Discord, args, cmds , client) {

        const exampleEmbed = {
            color: 0x0099ff,
            title: `**__${client.user.username}__   指令列表**`,
            description: '`若發現有指令錯誤，請向作者或管理員反映`',
            // thumbnail: {
            //     url: client.defaultAvatarURL ,
            // },
            fields:cmds,
            //timestamp: new Date(),
            footer: {
                text: 'Published by ShowYee \n[https://github.com/ShowYeee/NaNoDa]\n',
                icon_url: `https://i.ytimg.com/vi/6Le1tQ6sV-M/hqdefault.jpg`,
            },
        };

        message.channel.send({embed: exampleEmbed})
    },
};