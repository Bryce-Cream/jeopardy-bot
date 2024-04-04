const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Import Discord.js
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const discordBot = new Client({ intents: [GatewayIntentBits.Guilds] });
discordBot.login(token);

//Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Route to receive data from Chrome Extension
app.post('/data', (req, res) => {
    const data = req.body;

    //Send event to Bot
    // Log before emitting the event
    console.log('Emitting chromeDataReceived event:', data);

    // Emit an event to Discord bot
    discordBot.emit('chromeDataReceived', data);

    // Log after emitting the event
    console.log('chromeDataReceived event emitted successfully');

    res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
    console.log(`Intermediary service listening at http://localhost:${port}`);
});
