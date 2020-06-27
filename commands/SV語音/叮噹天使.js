module.exports = {
    name: '202',
    description: '202',
    async execute(message) {
        var play_sv =  require("../../fun/play_sv_sound.js");
        play_sv.play(message,'叮噹天使');     
    },
};