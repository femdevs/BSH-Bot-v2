const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'status',
    triggers: ['status', 'stats', 'botstatus', 'botstats'],
    info: {
        type: 'Utility',
        name: 'status',
        description: 'Get the status of the bot',
        usage: 'status',
        examples: ['status'],
        blockDM: true,
        aliases: ['status', 'stats', 'botstatus', 'botstats'],
    },
    blockDM: false,
    type: {
        slash: true,
        text: true
    },
    disabled: false,
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Get the status of the bot'),
    async commandExecute(interaction, client) {
        const status = client.stats();
        const embed = client.embed()
            .setTitle('Bot Status')
            .setTimestamp()
            .setFields([
                {
                    name: 'Ping',
                    value: `${status.ping}ms`,
                },
                {
                    name: 'Uptime',
                    value: status.uptime,
                },
                {
                    name: 'Servers',
                    value: status.guilds,
                },
                {
                    name: 'CPU usage',
                    value: `${(status.cpu * 100).toPrecision(2)}%`,
                },
                {
                    name: 'RAM usage',
                    value: `${status.ram.rawValue}KB (${status.ram.percentage}%)`,
                }
            ])
        await interaction.reply({ embeds: [embed] });
    },
    async messageExecute(message, client) {
        const status = client.stats();
        const embed = client.embed()
            .setTitle('Bot Status')
            .setTimestamp()
            .setFields([
                {
                    name: 'Ping',
                    value: `${status.ping}ms`,
                },
                {
                    name: 'Uptime',
                    value: status.uptime,
                },
                {
                    name: 'Servers',
                    value: status.guilds,
                },
                {
                    name: 'CPU usage',
                    value: `${(status.cpu * 100).toPrecision(2)}%`,
                },
                {
                    name: 'RAM usage',
                    value: `${status.ram.rawValue}KB (${status.ram.percentage}%)`,
                }
            ])
        await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};