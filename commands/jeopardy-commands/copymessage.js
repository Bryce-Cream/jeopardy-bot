const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('copymessage')
    .setDescription('Copy the content of a message to a .txt file')
    .addStringOption(option =>
      option
        .setName('message_id')
        .setDescription('The ID of the message to copy')
        .setRequired(true)
    ),
  async execute(interaction) {
    const messageID = interaction.options.getString('message_id');

    try 
    {
      // Fetch the message from Discord using the provided messageID
      const message = await interaction.channel.messages.fetch(messageID);

      // Get the content of the message
      const messageContent = message.content;

      // Write the message content to a .txt file
      fs.writeFile('test.txt', messageContent, (err) => {
        if (err) 
        {
          console.error('Error writing file:', err);
          interaction.reply('Failed to copy the message to a .txt file.');
          return;
        }
        interaction.reply('Message content copied to copied_message.txt');
      });
    } catch (error) {
      console.error('Error fetching message:', error);
      interaction.reply('Failed to fetch the specified message. Make sure the message ID is correct and accessible in this channel.');
    }
  },
};
