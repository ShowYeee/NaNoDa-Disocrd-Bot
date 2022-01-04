module.exports = {
	name: 'poke',
	description: 'poke',
	execute(message,args) {
		message.reply('https://wiki.52poke.com/wiki/' + args[0]);
	},
};