module.exports = {
	name: 'sv占卜',
	description: 'sv占卜',
	execute(message,Discord) {
		var rng = require("../../fun/rngimage.js");
        var attachment = new Discord.MessageAttachment(rng.rngimage('sv','jpg'));
        message.channel.send(attachment); 
	},
};