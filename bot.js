const fs = require('fs');
const Discord = require('discord.js');
var {
	prefix,
	token
} = require('./config.json');


//remove this code if you don't want deploy on Heroku
prefix = process.env.PREFIX;
token = process.env.TOKEN;


const client = new Discord.Client();
client.commands = new Discord.Collection();

var cmds = [];

fs.readdirSync('./commands/').forEach(dir_name => {
	var cmd = {
		name: `**--- ${dir_name} ---**`,
		value: [],
		inline: true
	}
	const commandFiles = fs.readdirSync(`./commands/${dir_name}/`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${dir_name}/${file}`);
		client.commands.set(command.name, command);
		cmd.value.push(command.name);
	}
	cmds.push(cmd);
});


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, Discord, args, cmds, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}


});


client.login(process.env.TOKEN);