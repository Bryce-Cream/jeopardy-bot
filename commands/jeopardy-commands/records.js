const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('records')
        .setDescription('View Jeopardy records.')
        .addStringOption(option =>
            option
                .setName('Record Type')
                .setDescription('Single game or All-time')
                .setRequired(true)
                .addChoices(
                    {name: 'Single Game', value: 'singleGame'},
                    {name: 'All-time', value: 'alltime'}
                )      
        ),
    async execute(interaction) {
        const recordType = interaction.options.getString('Record Type');
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        if(recordType === 'singleGame')
        {
            const embed = new EmbedBuilder()
                .setTitle('Singe Game Records')
                .setColor(`#${randomColor}`)
                .addFields(
                    {name: 'Highest Score', value: '1. Noah 28,796 (E8)\n2. Nich 21,600 (E8)'},
                )
            await interaction.channel.send({embeds: [embed]});
        }
        else if(recordType === 'alltime')
        {
            const embed = new EmbedBuilder()
            .setTitle('Alltime Records')
            .setColor(`#${randomColor}`)
            .addFields(
                {name: 'Highest Score', value: '1. Noah 28,796 (E8)\n2. Nich 21,600 (E8)'},
            )
            await interaction.channel.send({embeds: [embed]});
        }
    }
}