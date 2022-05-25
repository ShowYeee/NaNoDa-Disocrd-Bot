module.exports = {
	name: '確診占卜',
	description: '確診占卜',
	execute(message,Discord) {
        var num = Math.floor(Math.random()*2)+1;
        var path = "./assests/image/covid19/" + num + ".jpg"
        var attachment = new Discord.MessageAttachment(path);
        message.channel.send(attachment); 
	},
};