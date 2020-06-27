module.exports = {
    name: '透',
    description: '透',
    async execute(message) {
        var play_sv = require("../../fun/play_sv_sound.js");
        play_sv.play(message, '神偉的巨人');
    },
};