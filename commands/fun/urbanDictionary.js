const {SlashCommandBuilder, MessageEmbed} = require("discord.js");
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("urban")
        .setDescription("Returns the defintion of a term on Urban Dictionary"),

    async execute(message, args)
    {
        let query = args.join(" ");
        if(!query)
            return message.reply('Please specificy a word to search for!');

        query = encodeURIComponent(query);

        const {data: {list}} = await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`);

        const [answer] = list;

        message.channel.send(
            new MessageEmbed()
                .setTitle(answer.word)
                .setURL(answer.permalink)
                .setColor('RANDOM')
                .addField("Definition:", trim(answer.definition))
                .addField("Example:", trim(answer.example))
        )
    }
}

function trim(input)
{
    return input.length > 1024 ? `${input.slice(0,1020)}... ` : input;
}