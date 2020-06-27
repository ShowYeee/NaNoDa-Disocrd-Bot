module.exports = {
	name: '那我也要睡啦',
	description: '那我也要睡啦',
	execute(message,Discord) {
		message.reply('很好啊，快睡');
        var attachment = new Discord.MessageAttachment('./assests/image/sleep.jpg');
        message.channel.send(attachment); 
	},
};