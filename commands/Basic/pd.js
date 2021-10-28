module.exports = {
	name: '人事部',
	description: '人事部',
	execute(message,Discord) {
        var attachment = new Discord.MessageAttachment('./assests/image/pd.gif');
        message.channel.send(attachment); 
	},
};