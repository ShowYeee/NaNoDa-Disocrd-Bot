module.exports = {
	name: '貓咪占卜',
	description: '貓咪占卜',
	execute(message,Discord) {
		var rng = require("../../fun/rngimage.js");
        var attachment = new Discord.MessageAttachment(rng.rngimage('cat','jpg'));
        message.channel.send(attachment); 
	},
};