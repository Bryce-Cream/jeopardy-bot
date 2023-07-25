const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('records')
        .setDescription('View Jeopardy records.')
        .addStringOption(option =>
            option
                .setName('record_type')
                .setDescription('Single game or All-time')
                .setRequired(true)
                .addChoices(
                    {name: 'Single Game', value: 'singleGame'},
                    {name: 'All-time', value: 'alltime'}
                )      
        ),
    async execute(interaction) {
        const recordType = interaction.options.getString('record_type');
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        if(recordType === 'singleGame')
        {
            const embed = new EmbedBuilder()
                .setTitle('Singe Game Records')
                .setColor(`#${randomColor}`)
                .addFields(
                    {name: 'Highest Score', value: '1. Noah 28,796 (E8)\n2. Nich 21,600 (E8)\n3. Daniel 19,599 (E7)\n4. Jansy 18,800 (E6)\n5. Noah 18,400 (E6)'},
                    {name: 'Lowest Score', value: '1. Jansy -5800 (E9)\n2. Daniel -5000 (E1)\n3. Josh -4800 (E2)\n4. Noah -4000 (E7)\n5. Jnasy -3606 (E3)'},
                    {name: 'Most Correct', value: '1. Nich 21 (E8)\n2. Noah 20 (E9)\n3. Noah 18 (E8)\n4. Noah 17 (E6)\n5. Mythikk/Avery 14 (E6/E7)'},
                    {name: 'Most Incorrect', value: '1. Daniel 15 (E1)\n2. Noah/Jansy 11 (E7/E9)\n3. Noah/Jansy 9 (E1/E1)\n4. Niall 7 (E2)\n5. Avery 6 (E7)'},
                    {name: 'Highest Correct Percentage (10 Buzz-ins Min)', value: '1. Daniel 100% (E7)\n2. Noah 94.7% (E8)\n3. Noah 94.4% (E6)\n4. Mythikk 93.3% (E6)\n5. Jansy 90% (E5)'},
                    {name: 'First-On-Buzz%', value: '1. Nich 44.4% (E8)\n2. Noah 43.8% (E9)\n3. Noah 37.3% (E7)\n4. Melody 35.9% (E4)\n5. Noah 35.8% (E1)'},
                )
            await interaction.channel.send({embeds: [embed]});
        }
        else if(recordType === 'alltime')
        {
            const embed = new EmbedBuilder()
            .setTitle('All-Time Records')
            .setColor(`#${randomColor}`)
            .addFields(
                {name: 'All-Time Winnings', value: '1. Noah 91,597$\n2. Mythikk 22,200$\n3. Nich 21,600$\n4. Daniel 20,200$\n5. Avery 15,800$'},
                {name: 'Games Won', value: '1. Noah 6\n2. Daniel, Jansy, Josh, Mythikk 1'},
                {name: 'Correct Answers', value: '1. Noah 126\n2. Daniel 68\n3. Jansy 62\n4. Josh 38\n5. Avery 30'},
                {name: 'Incorrect Answers', value: '1. Noah 41\n2. Jansy 38\n3. Daniel 28\n4. Josh 16\n5. Avery 11'},
                {name: 'Correct Percentage (2 Games Min)', value: '1. Mythikk 89.66%\n2. Wade 86.67%\n3. Noah 75.45%\n4. Avery 73.17%\n5. Daniel 70.83%'},
                {name: 'First-On-Buzz% (2 Games Win)', value: '1. Noah 31.16%\n2. Avery 28.24%\n3. Mythikk 28.00%\n4. Daniel 18.27%\n5. Jansy 16.63%'},
            )
            await interaction.channel.send({embeds: [embed]});
        }
    }
}