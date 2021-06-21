module.exports = {
	name: '我就爛',
	description: '我就爛',
	execute(message,Discord) {
		var rng = require("../fun/rngimage.js");
        var attachment = new Discord.MessageAttachment(rng.rngimage('imbad','jpg'));
        message.channel.send(attachment); 
	},
};