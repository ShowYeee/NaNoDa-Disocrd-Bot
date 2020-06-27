module.exports = {
    name: '內內',
    description: '內內',
    async execute(message) {
        var play_sv =  require("../../fun/play_sv_sound.js");
        play_sv.play(message,'內內');
    },
};