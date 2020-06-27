module.exports = {
    name: '535',
    description: '535',
    async execute(message) {
        var play_sv =  require("../../fun/play_sv_sound.js");
        play_sv.play(message,'阿爾貝爾');
    },
};