module.exports = {
	name: '早安noda',
	description: '早安noda',
	execute(message,Discord) {
		var rng = require("../../fun/rngimage.js");
        var attachment = new Discord.MessageAttachment(rng.rngimage('morning','jpg'));
        message.channel.send(attachment); 
	},
};