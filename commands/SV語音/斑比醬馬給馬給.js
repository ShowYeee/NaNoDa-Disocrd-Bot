module.exports = {
    name: '斑比醬馬給馬給',
    description: '斑比醬馬給馬給',
    async execute(message) {
        var play_sv = require("../../fun/play_sv_sound.js");
        play_sv.play(message, '馬給馬給');
    },
};