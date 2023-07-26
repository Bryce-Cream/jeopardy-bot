const { SlashCommandBuilder, EmbedBuilder, Client, GatewayIntentBits} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('new-champion')
    .setDescription('Crown a new champion')
    .addUserOption(option => option.setName('user').setDescription('The new champion').setRequired(true))
    .addIntegerOption(option => option.setName('winnings').setDescription('The amount of money won by the new champion.').setRequired(true))
    .addStringOption(option => option.setName('date-won').setDescription('The date the champion won').setRequired(true))
    .addStringOption(option => option.setName('reign-number').setDescription('The amount of title reigns this champion has.').setRequired(true))
  ,
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const winnings = interaction.options.getInteger('winnings');
    const date_won = interaction.options.getString('date-won');
    const reign_number = interaction.options.getString('reign-number');
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    const championEmbed = new EmbedBuilder()
        .setTitle('CURRENT JEOPARDY CHAMPION')
        .setColor(`#${randomColor}`)
        .setDescription(`<@${user.id}>`)
        .setThumbnail(user.displayAvatarURL())
        .addFields(
            {name: 'Total Winnings', value: `${winnings}$`},
            {name: 'Date Won', value: date_won, inline:true},
            { name: '\u200B', value: '\u200B', inline: true },
            {name: 'Days as Champion', value: '374 Days', inline: true},
            {name: 'Successful Defenses', value: '0', inline: true},
            { name: '\u200B', value: '\u200B', inline: true },
            {name: 'Reign Number', value: reign_number, inline: true},
        )
        .setImage(user.displayAvatarURL());

      // Send the message to the channel
      interaction.channel.send({embeds: [championEmbed]});
  },
};
