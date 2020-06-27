module.exports = {
    name: '434',
    description: '434',
    async execute(message) {
        var play_sv = require("../../fun/play_sv_sound.js");
        play_sv.play(message, '持矛鎚的僧侶');
    },
};