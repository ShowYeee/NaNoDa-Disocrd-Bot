# NaNoDa Disocrd Bot

* NaNoda is a Discord bot program by Node.js.
* Dynamic add commands that you create command files.

## Requirement

You need install [Node.js](https://nodejs.org/en/)

## Installation

```bash
npm install
```

## Usage

### Use local config

Open bot.js and remove these code

```node.js
prefix = process.env.PREFIX;
token = process.env.TOKEN;
```

Open config.js, set prefix and your bot token

```json
{
	"prefix": "?",
	"token": "<Your bot token>"
}
```

Then you can run NaNoDa
```bash
node bot.js
```

### Deploy on Heroku
Add heroku-buildpack-ffmpeg-latest buildpack https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
You need add these env
* TOKEN
* PREFIX


## How to create commands
* Create a folder in the "/commands/" path
* Make a js command file

### Example
```node.js
module.exports = {
	name: 'beep',
	description: 'Beep!',
	execute(message) {
		message.channel.send('Boop.');
	},
};
```

## Refrence
* [Discord.js](https://discord.js.org/#/)
* [FFmpeg](https://ffmpeg.org/)
