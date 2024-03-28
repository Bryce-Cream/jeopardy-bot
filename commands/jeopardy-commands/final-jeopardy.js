const { SlashCommandBuilder, Client, GatewayIntentBits, PermissionsBitField, ChannelType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('final-jeopardy')
        .setDescription('Lists all the people inside a specific voice channel'),

    async execute(interaction) {
        // Get the target voice channel ID (replace 'CHANNEL_ID' with the actual ID)
        const targetChannelId = '863541152929022003';
        
        // Retrieve the voice channel from the interaction guild
        const voiceChannel = interaction.guild.channels.cache.get(targetChannelId);

        
        // Retrieve the members in the voice channel
        const members = voiceChannel.members;

        const finalJeopardyCategoryId = '916109350387462224';
        const finalJeopardyCategory = interaction.guild.channels.cache.get(finalJeopardyCategoryId);

        const myBalls = 296847416702009353;

        // Build the list of members
        const memberList = members.map((member) => 
        { 
            const channelName = `${member.displayName.toLowerCase()}-fj`;

            const createdChannel =  interaction.guild.channels.create({
                name: channelName,
                type: ChannelType.GuildText,
                parent: finalJeopardyCategory,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            });

            // Display member's username and discriminator
            return `${member.displayName}`;
        });

        // Send the list of members as a reply
        interaction.reply("This totally worked!");
    },
};
