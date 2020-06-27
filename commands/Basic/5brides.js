module.exports = {
	name: '五等分占卜',
	description: '五等分占卜',
	 execute(message,Discord) {
        var num = Math.floor(Math.random()*100)+1;
    
        if(num <= 40){
            var file_path = './assests/image/5brides/5GIF/'+ (Math.floor(Math.random()*5)+1) + '.gif'
            var attachment =  new Discord.MessageAttachment(file_path);
            message.channel.send(attachment);
        }else{
            var rng = require("../../fun/rngimage.js");
            var attachment = new Discord.MessageAttachment(rng.rngimage('5brides'));
            message.channel.send(attachment);
        }
	},
};