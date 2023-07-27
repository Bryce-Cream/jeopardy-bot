const { SlashCommandBuilder, EmbedBuilder, Client, GatewayIntentBits} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('update-champion')
    .setDescription('Updates champion data')
    .addSubcommand(subcommand =>
      subcommand
      .setName('new-champion')
      .setDescription('Crowns a new champion')
      .addUserOption(option => option.setName('user').setDescription('The new champion').setRequired(true))
      .addIntegerOption(option => option.setName('winnings').setDescription('The amount of money won by the new champion.').setRequired(true))
      .addStringOption(option => option.setName('date-won').setDescription('The date the champion won').setRequired(true))
      .addStringOption(option => option.setName('reign-number').setDescription('The amount of title reigns this champion has.').setRequired(true))
    )
    .addSubcommand(subcommand =>
      subcommand
      .setName('champion-retention')
      .setDescription('Updates the current champions stats.')
      .addStringOption(option => option.setName('winnings').setDescription('The amount of money they just won').setRequired(true))
      .addStringOption(option => option.setName('defenses').setDescription('Amount of defenses').setRequired(true))
    )
  ,
  async execute(interaction) 
  {
    const subcommand = interaction.options.getSubcommand();
    const channel = client.channels.cache.get('912246307010281512');

    if(subcommand === 'new-champion')
    {
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
              {name: '\u200B', value: '\u200B', inline: true },
              {name: 'Days as Champion', value: '374 Days', inline: true},
              {name: 'Defenses', value: '0', inline: true},
              {name: '\u200B', value: '\u200B', inline: true },
              {name: 'Reign Number', value: reign_number, inline: true},
          );
  
        // Send the message to the channel
        await interaction.channel.send({embeds: [championEmbed]});
    }
    else if(subcommand === 'champion-retention')
    {
        console.log("test");
    }
  },
};
