const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises; // Use promises version of fs for async/await

module.exports = {
  data: new SlashCommandBuilder()
    .setName('showfile')
    .setDescription('Show the contents of the test.txt file along with user avatar')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('Select a user')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      // Read the content of the champion.txt file
      const fileContent = await fs.readFile('champion.txt', 'utf8');
      
      // Construct the message content with the file content and user's avatar URL
      const messageContent = `**File Content:**\n${fileContent}\n\n`;

      // Send the message to the channel
      await interaction.reply(messageContent);
    } catch (error) {
      console.error('Error reading file:', error);
      await interaction.reply('Failed to read the file.');
    }
  },
};
