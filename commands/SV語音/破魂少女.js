module.exports = {
    name: '222',
    description: '222',
    async execute(message) {
        var play_sv = require("../../fun/play_sv_sound.js");
        play_sv.play(message, '破魂少女');
    },
};