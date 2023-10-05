const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'components',
    triggers: ['components'],
    info: {
        type: 'Development',
        name: 'components',
        description: 'Lists all components that can be used in the components folder.',
        usage: 'components',
        examples: ['components'],
        blockDM: false,
        aliases: ['components'],
    },
    blockDM: false,
    type: {
        slash: true,
        text: true
    },
    disabled: false,
    data: new SlashCommandBuilder()
        .setName('components')
        .setDescription('Lists all components that can be used in the components folder.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('all')
                .setDescription('Get data about all components.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('specific')
                .setDescription('Get data about a specific component.')
                .addStringOption(option =>
                    option
                        .setName('componenttype')
                        .setDescription('The type of component to get data for.')
                        .setRequired(true)
                        .setChoices(
                            { name: 'Buttons', value: 'buttons' },
                            { name: 'Select Menus', value: 'selectMenus' },
                            { name: 'Context Menus', value: 'contextMenus' },
                            { name: 'Modals', value: 'modals' }
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('component')
                        .setDescription('The component to get data for.')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        ),
    async commandExecute(interaction, client) {
        const embed = client.embed()
            .setTitle('Components Data');
        if (interaction.options.getSubcommand() === 'all') embed
            .setFields([
                {
                    name: 'Total Component Count',
                    value: `${client.Components.size}`,
                },
                {
                    name: 'Buttons',
                    value: [
                        `Count: ${client.Components.get('buttons').size}`,
                        `Components: ${Array.from(client.Components.get('buttons').keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'Select Menus',
                    value: [
                        `Count: ${client.Components.get('selectMenus').size}`,
                        `Components: ${Array.from(client.Components.get('selectMenus').keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'Context Menus',
                    value: [
                        `Count: ${client.Components.get('contextMenus').size}`,
                        `Components: ${Array.from(client.Components.get('contextMenus').keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'Modals',
                    value: [
                        `Count: ${client.Components.get('modals').size}`,
                        `Components: ${Array.from(client.Components.get('modals').keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                }
            ]);
        else if (interaction.options.getSubcommand() === 'specific') {
            const [componentType, component] = interaction.options.getString('component').split('.');
            if (!client.Components.get(componentType).has(component)) return interaction.reply({ content: 'That component does not exist.', ephemeral: true });
            const data = client.Components.get(componentType).get(component);
            embed
                .setTitle(`Components Data for ${data.name}`)
                .setFields([
                    {
                        name: 'Name',
                        value: data.name,
                    },
                    {
                        name: 'Type',
                        value: componentType,
                    },
                    {
                        name: 'Disabled',
                        value: data.disabled ? 'Yes' : 'No',
                    },
                ])
        }
        await interaction.reply({ embeds: [embed] });
    },
    async messageExecute(message, client) {
        const embed = client.embed()
            .setTitle('Components Data')
            .setFields([
                {
                    name: 'Total Component Count',
                    value: `${client.Components.get('buttons').size + client.Components.get('selectMenus').size + client.Components.get('contextMenus').size + client.Components.get('modals').size}`,
                },
                {
                    name: 'Buttons',
                    value: [
                        `Count: ${client.Components.get('buttons').size}`,
                        `Components: ${Array.from(client.Components.get('buttons').keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'Select Menus',
                    value: [
                        `Count: ${client.Components.get('selectMenus').size}`,
                        `Components: ${Array.from(client.Components.get('selectMenus').keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'Context Menus',
                    value: [
                        `Count: ${client.Components.get('contextMenus').size}`,
                        `Components: ${Array.from(client.Components.get('contextMenus').keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'Modals',
                    value: [
                        `Count: ${client.Components.get('modals').size}`,
                        `Components: ${Array.from(client.Components.get('modals').keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                }
            ])
        await message.reply({ embeds: [embed] });
    },
    async autocomplete(interaction, client) {
        const opts = []
        for (let type in Array.from(client.Components.keys())) {
            for (let component in Array.from(client.Components.get(type).keys())) {
                opts.push(`${type.toLowerCase()}.${component.toLowerCase()}`)
            }
        }
        await interaction.respond(opts.map(e => ({ name: e, value: e })));
    }
};