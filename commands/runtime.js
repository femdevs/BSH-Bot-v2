const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'runtime',
    triggers: ['runtime', 'rt'],
    info: {
        type: 'Development',
        name: 'runtime',
        description: 'Displays the current runtime of the bot',
        usage: 'runtime',
        examples: ['runtime'],
        blockDM: false,
        aliases: ['runtime', 'rt'],
    },
    blockDM: false,
    type: {
        slash: true,
        text: true
    },
    disabled: false,
    data: new SlashCommandBuilder()
        .setName('runtime')
        .setDescription('Displays the current runtime of the bot'),
    async commandExecute(interaction, client) {
        const embed = client.embed()
            .setTitle('Runtime Statistics')
            .setFields([
                {
                    name: 'Commands',
                    value: [
                        `Registered: ${client.runtimeStats.commands.registered}`,
                        `Slash Commands Executed: ${client.runtimeStats.commands.slashExecuted}`,
                        `Message Commands Executed: ${client.runtimeStats.commands.textExecuted}`
                    ].join('\n')
                },
                {
                    name: 'Triggers',
                    values: [
                        `Registered: ${client.runtimeStats.triggers.registered}`,
                        `Channel-based Executed: ${client.runtimeStats.triggers.channelExecuted}`,
                        `Role-based Executed: ${client.runtimeStats.triggers.roleExecuted}`,
                        `User-based Executed: ${client.runtimeStats.triggers.userExecuted}`,
                        `Text-based Executed: ${client.runtimeStats.triggers.messageExecuted}`
                    ].join('\n')
                },
                {
                    name: 'Events',
                    value: [
                        `Registered: ${client.runtimeStats.events.registered}`,
                        `Executed: ${client.runtimeStats.events.executed}`
                    ].join('\n')
                },
                {
                    name: 'Buttons',
                    value: [
                        `Registered: ${client.runtimeStats.components.buttons.registered}`,
                        `Executed: ${client.runtimeStats.components.buttons.executed}`
                    ].join('\n')
                },
                {
                    name: 'Context Menus',
                    value: [
                        `Registered: ${client.runtimeStats.components.contextMenus.registered}`,
                        `Executed: ${client.runtimeStats.components.contextMenus.executed}`
                    ].join('\n')
                },
                {
                    name: 'Select Menus',
                    value: [
                        `Registered: ${client.runtimeStats.components.selectMenus.registered}`,
                        `Executed: ${client.runtimeStats.components.selectMenus.executed}`
                    ].join('\n')
                },
                {
                    name: 'Modals',
                    value: [
                        `Registered: ${client.runtimeStats.components.modals.registered}`,
                        `Executed: ${client.runtimeStats.components.modals.executed}`
                    ].join('\n')
                }
            ])
        interaction.reply({ embeds: [embed] })
    },
    async messageExecute(message, client) {
        const embed = client.embed()
            .setTitle('Runtime Statistics')
            .setFields([
                {
                    name: 'Commands',
                    value: [
                        `Registered: ${client.runtimeStats.commands.registered}`,
                        `Slash Commands Executed: ${client.runtimeStats.commands.slashExecuted}`,
                        `Message Commands Executed: ${client.runtimeStats.commands.textExecuted}`
                    ].join('\n')
                },
                {
                    name: 'Triggers',
                    value: [
                        `Registered: ${client.runtimeStats.triggers.registered}`,
                        `Channel-based Executed: ${client.runtimeStats.triggers.channelExecuted}`,
                        `Role-based Executed: ${client.runtimeStats.triggers.roleExecuted}`,
                        `User-based Executed: ${client.runtimeStats.triggers.userExecuted}`,
                        `Text-Based Executed: ${client.runtimeStats.triggers.messageExecuted}`
                    ].join('\n')
                },
                {
                    name: 'Events',
                    value: [
                        `Registered: ${client.runtimeStats.events.registered}`,
                        `Executed: ${client.runtimeStats.events.executed}`,
                        `Singular Event Executions:\n    ${Object.entries(client.runtimeStats.events.singularEventExecutions).map(([k,v]) => `__${k}__: ${v}`).join('\n    ')}`
                    ].join('\n')
                },
                {
                    name: 'Buttons',
                    value: [
                        `Registered: ${client.runtimeStats.components.buttons.registered}`,
                        `Executed: ${client.runtimeStats.components.buttons.executed}`
                    ].join('\n')
                },
                {
                    name: 'Context Menus',
                    value: [
                        `Registered: ${client.runtimeStats.components.contextMenus.registered}`,
                        `Executed: ${client.runtimeStats.components.contextMenus.executed}`
                    ].join('\n')
                },
                {
                    name: 'Select Menus',
                    value: [
                        `Registered: ${client.runtimeStats.components.selectMenus.registered}`,
                        `Executed: ${client.runtimeStats.components.selectMenus.executed}`
                    ].join('\n')
                },
                {
                    name: 'Modals',
                    value: [
                        `Registered: ${client.runtimeStats.components.modals.registered}`,
                        `Executed: ${client.runtimeStats.components.modals.executed}`
                    ].join('\n')
                }
            ])
        message.reply({ embeds: [embed] })
    }
};