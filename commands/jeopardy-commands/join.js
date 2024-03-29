const { SlashCommandBuilder, ChannelType } = require('discord.js');
const fs = require('fs').promises; // Use promises version of fs for async/await
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Joins a voice channel')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel to join')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice)
    ),
  async execute(interaction)
  {
    const voiceChannel = interaction.options.getChannel('channel');
    const voiceConnection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
        selfDeaf: false,
    });
  },
};
