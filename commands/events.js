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
        .setDescription('Lists all events that can be used in the events folder.')
        .addStringOption(option =>
            option
                .setName('event')
                .setDescription('The event to get data for')
                .setRequired(false)
                .setAutocomplete(true)
        ),
    async commandExecute(interaction, client) {
        const embed = client.embed()
            .setTitle('Events Data');
        if (interaction.options.getString('event')) {
            const event = client.Events.get(interaction.options.getString('event'));
            if (!event) return interaction.reply({ content: 'That event does not exist.', ephemeral: true });
            embed
                .setTitle(`Events Data for ${event.name}`)
                .setFields([
                    {
                        name: 'Name',
                        value: event.name,
                    },
                    {
                        name: 'Once',
                        value: event.once ? 'Yes' : 'No',
                    },
                    {
                        name: 'Disabled',
                        value: event.disabled ? 'Yes' : 'No',
                    },
                ])
        } else embed
            .setFields([
                {
                    name: 'Total Event Count',
                    value: `${client.Events.size}`,
                },
                {
                    name: 'Events',
                    value: Array.from(client.Events.keys()).map(e => `\`${e}\``).join(', ')
                },
                
            ])
        await interaction.reply({ embeds: [embed] });
    },
    async messageExecute(message, client) {
        const args = message.content.split(' ');
        const embed = client.embed()
            .setTitle('Events Data');
        if (args[1]) {
            const event = client.Events.get(args[1]);
            if (!event) return message.reply({ content: 'That event does not exist.', ephemeral: true });
            embed
                .setTitle(`Events Data for ${event.name}`)
                .setFields([
                    {
                        name: 'Name',
                        value: event.name,
                    },
                    {
                        name: 'Once',
                        value: event.once ? 'Yes' : 'No',
                    },
                    {
                        name: 'Disabled',
                        value: event.disabled ? 'Yes' : 'No',
                    },
                ])
        } else embed
            .setFields([
                {
                    name: 'Total Event Count',
                    value: `${client.Events.size}`,
                },
                {
                    name: 'Events',
                    value: Array.from(client.Events.keys()).map(e => `\`${e}\``).join(', ')
                },
            ])
        await message.reply({ embeds: [embed] });
    },
    async autocomplete(interaction, client) {
        await interaction.respond(
            Array.from(client.Events.keys())
                .filter(e => e.startsWith(interaction.options.getFocused()))
                .map(e => ({ name: e, value: e }))
        );
    }
};