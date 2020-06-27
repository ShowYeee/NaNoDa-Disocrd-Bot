module.exports = {
	name: '可憐哪',
	description: '可憐哪',
	execute(message,Discord) {
		var rng = require("../fun/rngimage.js");
        var attachment = new Discord.MessageAttachment(rng.rngimage('kolen'));
        message.channel.send(attachment); 
	},
};