module.exports = {
    name: '扣薪水',
    description: '扣薪水',
    async execute(message) {
        var play_sv =  require("../../fun/play_sv_sound.js");
        play_sv.play(message,'扣薪水');
    },
};