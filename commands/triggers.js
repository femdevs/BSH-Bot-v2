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
        .setDescription('Lists all triggers that can be used in the triggers folder.')
        .addStringOption(option =>
            option
                .setName('trigger')
                .setDescription('The trigger to get data for')
                .setRequired(false)
                .setAutocomplete(true)
        ),
    async commandExecute(interaction, client) {
        const embed = client.embed()
            .setTitle('Triggers Data');
        if (!interaction.options.getString('trigger')) embed
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
            ]);
        else {
            const trigger = client.Triggers.get(interaction.options.getString('trigger'));
            if (!trigger) return interaction.reply({ content: 'That trigger does not exist.', ephemeral: true });
            embed
                .setTitle(`Triggers Data for ${trigger.name}`)
                .setFields([
                    {
                        name: 'Internal Name',
                        value: `\`${trigger.name}\``,
                    },
                    {
                        name: 'Disabled',
                        value: trigger.globalDisable ? '**Yes**' : '**No**',
                    },
                    {
                        name: 'Channel Based',
                        value: [
                            `Enabled: ${trigger.triggerCfgs.channel.activated ? 'Yes' : 'No'}`,
                            `Require Prefix: ${trigger.triggerCfgs.channel.requirePrefix ? 'Yes' : 'No'}`,
                            `Channel IDs: ${trigger.triggerCfgs.channel.ids.length > 0 ? trigger.triggerCfgs.channel.ids.map(e => `\`${e}\``).join(', ') : 'None'}`,
                            `Channel Types: ${trigger.triggerCfgs.channel.types.length > 0 ? trigger.triggerCfgs.channel.types.map(e => `\`${e}\``).join(', ') : 'None'}`
                        ].join('\n')
                    },
                    {
                        name: 'Role Based',
                        value: [
                            `Enabled: ${trigger.triggerCfgs.role.activated ? 'Yes' : 'No'}`,
                            `Require Prefix: ${trigger.triggerCfgs.role.requirePrefix ? 'Yes' : 'No'}`,
                            `Role IDs: ${trigger.triggerCfgs.role.ids.length > 0 ? trigger.triggerCfgs.role.ids.map(e => `\`${e}\``).join(', ') : 'None'}`
                        ].join('\n')
                    },
                    {
                        name: 'User Based',
                        value: [
                            `Enabled: ${trigger.triggerCfgs.user.activated ? 'Yes' : 'No'}`,
                            `Require Prefix: ${trigger.triggerCfgs.user.requirePrefix ? 'Yes' : 'No'}`,
                            `User IDs: ${trigger.triggerCfgs.user.ids.length > 0 ? trigger.triggerCfgs.user.ids.map(e => `\`${e}\``).join(', ') : 'None'}`
                        ].join('\n')
                    },
                    {
                        name: 'Message Based',
                        value: [
                            `Enabled: ${trigger.triggerCfgs.message.activated ? 'Yes' : 'No'}`,
                            `Require Prefix: ${trigger.triggerCfgs.message.requirePrefix ? 'Yes' : 'No'}`,
                            `Starts With: ${trigger.triggerCfgs.message.prefixes.length > 0 ? trigger.triggerCfgs.message.prefixes.map(e => `\`${e}\``).join(', ') : 'None'}`,
                            `Contains: ${trigger.triggerCfgs.message.contains.length > 0 ? trigger.triggerCfgs.message.contains.map(e => `\`${e}\``).join(', ') : 'None'}`,
                            `Ends With: ${trigger.triggerCfgs.message.suffixes.length > 0 ? trigger.triggerCfgs.message.suffixes.map(e => `\`${e}\``).join(', ') : 'None'}`,
                            `Regex: ${trigger.triggerCfgs.message.regex.length > 0 ? trigger.triggerCfgs.message.regex.map(e => `\`${e}\``).join(', ') : 'None'}`
                        ].join('\n')
                    },
                ])
        }
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
    },
    async autocomplete(interaction, client) {
        await interaction.respond(
            Array.from(client.Triggers.keys())
                .filter(e => e.startsWith(interaction.options.getFocused()))
                .map(e => ({ name: e, value: e }))
        )
    }
};