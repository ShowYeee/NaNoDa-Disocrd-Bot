module.exports = {
    name: '112',
    description: '112',
    async execute(message) {
        var play_sv =  require("../../fun/play_sv_sound.js");
        play_sv.play(message,'哥布林');
    },
};