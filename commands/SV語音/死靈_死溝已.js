module.exports = {
    name: '死溝已',
    description: '死溝已',
    async execute(message) {
        var play_sv =  require("../../fun/play_sv_sound.js");
        play_sv.play(message,'死溝已');
    },
};