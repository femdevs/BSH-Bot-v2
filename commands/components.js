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
        .setDescription('Lists all components that can be used in the components folder.'),
    async commandExecute(interaction, client) {
        const embed = client.embed()
            .setTitle('Components Data')
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
            ])
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
    }
};