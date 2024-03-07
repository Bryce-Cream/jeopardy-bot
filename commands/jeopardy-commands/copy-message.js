const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

// Define the message ID you want to copy
const messageIDToCopy = '1215095446112960583';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('copy-message')
    .setDescription('Copies the content of a Discord message to a text file'),

  async execute(interaction) {
    try {
      // Fetch the message using the predefined message ID
      const message = await interaction.channel.messages.fetch(messageIDToCopy);

      // Extract the content of the message
      const messageContent = message.content;

      // Write the message content to a text file
      fs.writeFile('copied_message.txt', messageContent, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          interaction.reply('Failed to copy message to file.');
        } else {
          console.log('Message copied to file successfully.');
          interaction.reply('Message copied to file successfully.');
        }
      });
    } catch (error) {
      console.error('Error executing command:', error);
      interaction.reply('An error occurred while executing the command.');
    }
  },
};
