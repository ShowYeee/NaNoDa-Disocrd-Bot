module.exports = {
    name: '111',
    description: '111',
    async execute(message) {
        var play_sv =  require("../../fun/play_sv_sound.js");
        play_sv.play(message,'迅捷的劍士');
    },
};