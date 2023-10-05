const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'triggers',
    triggers: ['triggers'],
    info: {
        type: 'Development',
        name: 'triggers',
        description: 'Lists all triggers that can be used in the triggers folder.',
        usage: 'triggers',
        examples: ['triggers'],
        blockDM: false,
        aliases: ['triggers'],
    },
    blockDM: false,
    type: {
        slash: true,
        text: true
    },
    disabled: false,
    data: new SlashCommandBuilder()
        .setName('triggers')
        .setDescription('Lists all triggers that can be used in the triggers folder.'),
    async commandExecute(interaction, client) {
        const embed = client.embed()
            .setTitle('Triggers Data')
            .setFields([
                {
                    name: 'Total Trigger Count',
                    value: `${client.Triggers.size}`,
                },
                {
                    name: 'Channel Based Triggers',
                    value: [
                        `Count: ${client.Triggers.filter(e => e.triggerCfgs.channel.activated).size}`,
                        `Triggers: ${Array.from(client.Triggers.filter(e => e.triggerCfgs.channel.activated).keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'Role Based Triggers',
                    value: [
                        `Count: ${client.Triggers.filter(e => e.triggerCfgs.role.activated).size}`,
                        `Triggers: ${Array.from(client.Triggers.filter(e => e.triggerCfgs.role.activated).keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'User Based Triggers',
                    value: [
                        `Count: ${client.Triggers.filter(e => e.triggerCfgs.user.activated).size}`,
                        `Triggers: ${Array.from(client.Triggers.filter(e => e.triggerCfgs.user.activated).keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'Message Based Triggers',
                    value: [
                        `Count: ${client.Triggers.filter(e => e.triggerCfgs.message.activated).size}`,
                        `Triggers: ${Array.from(client.Triggers.filter(e => e.triggerCfgs.message.activated).keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                }
            ])
        await interaction.reply({ embeds: [embed] });
    },
    async messageExecute(message, client) {
        const embed = client.embed()
            .setTitle('Triggers Data')
            .setFields([
                {
                    name: 'Total Trigger Count',
                    value: `${client.Triggers.size}`,
                },
                {
                    name: 'Channel Based Triggers',
                    value: [
                        `Count: ${client.Triggers.filter(e => e.triggerCfgs.channel.activated).size}`,
                        `Triggers: ${Array.from(client.Triggers.filter(e => e.triggerCfgs.channel.activated).keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'Role Based Triggers',
                    value: [
                        `Count: ${client.Triggers.filter(e => e.triggerCfgs.role.activated).size}`,
                        `Triggers: ${Array.from(client.Triggers.filter(e => e.triggerCfgs.role.activated).keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'User Based Triggers',
                    value: [
                        `Count: ${client.Triggers.filter(e => e.triggerCfgs.user.activated).size}`,
                        `Triggers: ${Array.from(client.Triggers.filter(e => e.triggerCfgs.user.activated).keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                },
                {
                    name: 'Message Based Triggers',
                    value: [
                        `Count: ${client.Triggers.filter(e => e.triggerCfgs.message.activated).size}`,
                        `Triggers: ${Array.from(client.Triggers.filter(e => e.triggerCfgs.message.activated).keys()).map(e => `\`${e}\``).join(', ')}`
                    ].join('\n')
                }
            ])
        await message.reply({ embeds: [embed] });
    }
};