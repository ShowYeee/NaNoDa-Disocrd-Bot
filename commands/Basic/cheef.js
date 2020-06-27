module.exports = {
	name: '中華一番占卜',
	description: '中華一番占卜',
	execute(message,Discord) {
		var rng = require("../../fun/rngimage.js");
        var attachment = new Discord.MessageAttachment(rng.rngimage('cheef'));
        message.channel.send(attachment); 
	},
};