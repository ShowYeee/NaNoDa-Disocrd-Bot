const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState, VoiceConnectionStatus, AudioPlayerStatus } = require('@discordjs/voice');
const fs = require('fs');
const path = require('path');

module.exports = {
    play: async function (message, file_name) {
        // 檢查用戶是否在語音頻道中
        if (!message.member.voice.channel) {
            return message.reply('您需要先加入一個語音頻道。');
        }

        // 獲取用戶的語音頻道
        const channel = message.member.voice.channel;

        // 檢查機器人是否有權限加入和說話在該語音頻道
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.reply('我沒有加入或在這個語音頻道中說話的權限。');
        }

        // 建立語音連接
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        // 等待連接就緒
        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
        } catch (error) {
            console.error(error);
            connection.destroy();
            return message.reply('無法加入語音頻道。');
        }

        // 建立音頻播放器
        const player = createAudioPlayer();
        connection.subscribe(player);

        // 建立音頻資源
        const filePath = path.join(__dirname, '../../assets/sound/', `${file_name}.mp3`);
        const resource = createAudioResource(filePath);
        player.play(resource);

        player.on(AudioPlayerStatus.Playing, () => {
            console.log(file_name + ' is now playing!');
        });

        player.on(AudioPlayerStatus.Idle, () => {
            console.log(file_name + ' has finished playing!');
            connection.destroy();
        });

        player.on('error', error => {
            console.error('Error:', error.message);
            connection.destroy();
        });

        // 當連接斷開時清理資源
        connection.on(VoiceConnectionStatus.Disconnected, async () => {
            try {
                await Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
                // 似乎是暫時的斷開，可以再次連接
            } catch (error) {
                // 斷開是永久的
                connection.destroy();
            }
        });
    }
};
