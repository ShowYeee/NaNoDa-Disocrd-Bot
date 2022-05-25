module.exports = {
	name: '呵',
	description: '呵',
	execute(message,Discord) {
        var attachment = new Discord.MessageAttachment('./assests/image/anya.jpg');
        message.channel.send(attachment); 
	},
};