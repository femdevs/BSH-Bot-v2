const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'events',
    triggers: ['events'],
    info: {
        type: 'Development',
        name: 'events',
        description: 'Lists all events that can be used in the events folder.',
        usage: 'events',
        examples: ['events'],
        blockDM: false,
        aliases: ['events'],
    },
    blockDM: false,
    type: {
        slash: true,
        text: true
    },
    disabled: false,
    data: new SlashCommandBuilder()
        .setName('events')
        .setDescription('Lists all events that can be used in the events folder.'),
    async commandExecute(interaction, client) {
        const embed = client.embed()
            .setTitle('Events Data')
            .setFields([
                {
                    name: 'Total Event Count',
                    value: `${client.Events.size}`,
                },
                {
                    name: 'Events',
                    value: Array.from(client.Events.keys()).map(e => `\`${e}\``).join(', ')
                }
            ])
        await interaction.reply({ embeds: [embed] });
    },
    async messageExecute(message, client) {
        const embed = client.embed()
            .setTitle('Events Data')
            .setFields([
                {
                    name: 'Total Event Count',
                    value: `${client.Events.size}`,
                },
                {
                    name: 'Events',
                    value: Array.from(client.Events.keys()).map(e => `\`${e}\``).join(', ')
                }
            ])
        await message.reply({ embeds: [embed] });
    }
};