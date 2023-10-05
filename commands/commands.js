const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'commands',
    triggers: ['commands', 'cmds'],
    info: {
        type: 'Development',
        name: 'commands',
        description: 'Lists all commands that can be used in the commands folder.',
        usage: 'commands',
        examples: ['commands'],
        blockDM: false,
        aliases: ['commands', 'cmds'],
    },
    blockDM: false,
    type: {
        slash: true,
        text: true
    },
    disabled: false,
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Lists all commands that can be used in the commands folder.'),
    async commandExecute(interaction, client) {
        const embed = client.embed()
            .setTitle('Commands Data')
            .setFields([
                {
                    name: 'Total Command Count',
                    value: `${client.Commands.size}`,
                },
                {
                    name: 'Commands',
                    value: Array.from(client.Commands.keys()).map(e => `- \`/${e}\``).join('\n')
                }
            ])
        await interaction.reply({ embeds: [embed] });
    },
    async messageExecute(message, client) {
        const embed = client.embed()
            .setTitle('Commands Data')
            .setFields([
                {
                    name: 'Total Command Count',
                    value: `${client.Commands.size}`,
                },
                {
                    name: 'Commands',
                    value: Array.from(client.Commands.keys()).map(e => `- \`/${e}\``).join('\n')
                }
            ])
        await message.reply({ embeds: [embed] });
    }
};