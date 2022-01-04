module.exports = {
	name: 'poke',
	description: 'poke',
	execute(message,Discord,args) {
		message.reply('https://wiki.52poke.com/wiki/' + args);
	},
};