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
    try
    {
      const subcommand = interaction.options.getSubcommand();

      if(subcommand === 'new-champion')
      {
        //parameters from command
        const user = interaction.options.getUser('user');
        const winnings = interaction.options.getInteger('winnings');
        const date_won = interaction.options.getString('date-won');
        const reign_number = interaction.options.getString('reign-number');
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        
        /**************************************
         *                                    *
         *                                    *
         *      UPDATING OLD CHAMPION POST    *
         *                                    *
         *                                    *
         **************************************/

        const filePath = './champion.json';
        const championData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const messageId = championData.message_ID;

        // Retrieve the channel object for the target channel
        const targetChannelId = '912246307010281512'; // bot command channel for testing
        const targetChannel = interaction.client.channels.cache.get(targetChannelId);
        const oldChampionMessage = await targetChannel.messages.fetch(messageId);
        const oldChampionEmbed = oldChampionMessage.embeds[0];

        //Not needed I don't think anymore
        // for (const field of receivedEmbed.fields) 
        // {
        //   if (field.name.toLowerCase() === 'Days as Champion') 
        //   {
        //     field.value += ' - ';
        //   } 
        // }

        //"update" the old embed
        const updatedOldChampionEmbd = EmbedBuilder.from(oldChampionEmbed).setTitle("FORMER JEOPARDY CHAMPION");
        await oldChampionMessage.edit({ embeds: [updatedOldChampionEmbd] });
        console.log("Former Champion Updated...");
  
        /**************************************
         *                                    *
         *                                    *
         *      SENDING NEW CHAMP INFO        *
         *                                    *
         *                                    *
         **************************************/
        //Auto converter for days as champion
        const dateWon = new Date(date_won);
        const currentDate = new Date();
        const timeDifferenceMs = currentDate.getTime() - dateWon.getTime();
        const daysAsChampion = Math.floor(timeDifferenceMs/(1000*60*60*24));

        //Reply to command (in secret)
        console.log("Creating new champion post...");

        const championEmbed = new EmbedBuilder()
            .setTitle('CURRENT JEOPARDY CHAMPION')
            .setColor(`#${randomColor}`)
            .setDescription(`<@${user.id}>`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                {name: 'Total Winnings', value: `${winnings.toLocaleString()}$`},
                {name: 'Date Won', value: date_won, inline:true},
                {name: '\u200B', value: '\u200B', inline: true },
                {name: 'Days as Champion', value: `${daysAsChampion} Days` , inline: true},
                {name: 'Defenses', value: '0', inline: true},
                {name: '\u200B', value: '\u200B', inline: true },
                {name: 'Reign Number', value: reign_number, inline: true},
            );

          const newChampionMessage = await targetChannel.send({ embeds: [championEmbed] });


        /**************************************
         *                                    *
         *                                    *
         *      SEND NEW INFORMATION TO JSON  *
         *                                    *
         *                                    *
         **************************************/
        championData.message_ID = newChampionMessage.id;
        championData.champion = user.id;
        championData.total_winnings =  winnings;
        championData.date_won = date_won;
        championData.defenses = 0;
        championData.num_of_reigns = reign_number;

        //Write it to the file
        const updatedChampionContent = JSON.stringify(championData, null, 2);
        fs.writeFileSync(filePath, updatedChampionContent, 'utf-8');

        console.log("Command has executed succesfully!");
        await interaction.reply({ content: 'New Champion has been created', ephemeral: true });
      }//End of New-Champ Command
      
      else if(subcommand === 'champion-retention')
      {
          console.log("test");
      }
      
    }
    catch (error)
    {
      console.error('Error executing command:', error);
      await interaction.reply('An error occurred while executing the command.');
    }
  },
};
