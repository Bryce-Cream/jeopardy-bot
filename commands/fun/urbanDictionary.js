const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Returns the definition of a term on Urban Dictionary')
        .addStringOption(option =>
            option
                .setName('term')
                .setDescription('The term you want to look up.')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();

        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const term = interaction.options.getString('term');

        if (!term) {
            return interaction.editReply('Please provide a term to look up.');
        }

        const query = new URLSearchParams({ term });

        const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
        const { list } = await dictResult.body.json();

        if (!list.length) {
            return interaction.editReply(`No results found for **${term}**.`);
        }

        const [answer] = list;

        const embed = new EmbedBuilder()
            .setColor(`#${randomColor}`)
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
            );

        interaction.editReply({ embeds: [embed] });
    }
};

const trim = (str, max) => {
    return str.length > max ? `${str.slice(0, max - 3)}...` : str;
};