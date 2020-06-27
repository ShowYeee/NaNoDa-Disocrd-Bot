module.exports = {
    name: '333',
    description: '333',
    async execute(message) {
        var play_sv = require("../../fun/play_sv_sound.js");
        play_sv.play(message, '機巧魔護士');
    },
};