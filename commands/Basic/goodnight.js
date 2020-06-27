module.exports = {
	name: '晚安noda',
	description: '晚安noda',
	execute(message,Discord) {
		var rng = require("../../fun/rngimage.js");
        var attachment = new Discord.MessageAttachment(rng.rngimage('goodnight'));
        message.channel.send(attachment); 
	},
};