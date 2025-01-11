const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, guildId, myID } = require('./config.json');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { connect } = require('node:http2');
let voiceConnection;
const { VoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

//Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates] });
var soundNumber = 0;
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) 
{
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) 
	{
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) 
			client.commands.set(command.data.name, command);
		else 
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	//Editing code task
	const filePath = './champion.json';
	const championData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	const messageId = championData.message_ID;
	const date_won = championData.date_won;
	//auto days as champ calculator
	const dateWon = new Date(date_won);
	const currentDate = new Date();
	const timeDifferenceMs = currentDate.getTime() - dateWon.getTime();
	const daysAsChampion = Math.floor(timeDifferenceMs/(1000*60*60*24));

    // Retrieve the channel object for the target channel
    const targetChannelId = '854441460404715550'; // Current-champion channel
    const targetChannel = client.channels.cache.get(targetChannelId);
    targetChannel.messages.fetch(messageId)
		.then(currentChampionMessage => {
			for (const field of currentChampionMessage.embeds[0].fields) 
			{
			     if (field.name.toLowerCase() === 'days as champion') 
			     {
			     	field.value = `${daysAsChampion} Days`;
			     } 
			}

			currentChampionMessage.edit({ embeds: [currentChampionMessage.embeds[0]] });
		});

	const guild = client.guilds.cache.get(guildId);
	guild.members.fetch(myID)
		.then(member => {
			voiceConnection = joinVoiceChannel({
				channelId: member.voice.channel.id,
				guildId: guildId,
				adapterCreator: guild.voiceAdapterCreator,
				selfDeaf: false,
			});
	});

	console.log("Days as Champion updated!");

});

// Log in to Discord with your client's token
client.login(token);


// Route to receive data from Chrome Extension
app.post('/data', (req, res) => {
    const data = req.body;

	// Emit an event to Discord bot
    client.emit('dailyDouble', data);

    res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
    console.log(`Intermediary service listening at http://localhost:${port}`);
});


client.on('dailyDouble', data =>
{
	const soundPath = path.join(__dirname, 'sounds');

	fs.readdir(soundPath, (err, files) => {
		if(err)
		{
			console.error('Error reading directory:', err);
			return;
		}

			const firstFile = files[soundNumber];
			if(soundNumber == 3)
				soundNumber = 0;
			else
				soundNumber++;
				
			const filePath = path.join(soundPath, firstFile);


			const guild = client.guilds.cache.get(guildId);
			const member = guild.members.fetch(myID)
			.then(member => {

			const player = createAudioPlayer();
			const resource = createAudioResource(filePath, {inlineVolume: true});
			resource.volume.setVolume(0.75);

			player.play(resource);
			
			voiceConnection.subscribe(player);
		});
	});
});

client.on(Events.InteractionCreate, async interaction => 
{
	//Not from chatInput
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) 
	{
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	
});