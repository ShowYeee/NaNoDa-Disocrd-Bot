module.exports = {
	name: '馬娘占卜',
	description: '馬娘占卜',
	execute(message,Discord) {
		var rng = require("../../fun/rngimage.js");
        var attachment = new Discord.MessageAttachment(rng.rngimage('uma','png'));
        message.channel.send(attachment); 
	},
};