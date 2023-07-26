const { SlashCommandBuilder} = require('discord.js');
const fs = require('fs');

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
    // Read the content of the test.txt file
    fs.readFile('champion.txt', 'utf8', (err, fileContent) => {
      if (err) {
        console.error('Error reading file:', err);
        interaction.reply('Failed to read the file.');
        return;
      }

      const user = interaction.options.getUser('user');

      // Construct the message content with the file content and user's avatar URL
      const messageContent = `**File Content:**\n${fileContent}\n\n`;

      // Send the message to the channel
      interaction.channel.send(messageContent, {files: [user.displayAvatarURL()]});

    });
  },
};
