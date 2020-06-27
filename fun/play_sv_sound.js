module.exports  = {
     play: async function(message,file_name){
        
        if (message.member.voice.channel) {

            const connection = await message.member.voice.channel.join();
            const fs = require('fs');

            var dispatcher = connection.play(fs.createReadStream('./assests/sound/'+file_name+'.mp3'));

            dispatcher.on('start', () => {
                console.log(file_name + ' is now playing!');
            });

            dispatcher.on('finish', () => {
                console.log(file_name + ' has finished playing!');
                connection.disconnect();

            });

            // Always remember to handle errors appropriately!
            dispatcher.on('error', console.error);
        }
    }   
};