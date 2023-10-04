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
                    value: [
                        `Bot Only: ${status.cpu.botOnly}%`,
                        `Global: ${status.cpu.global}%`
                    ].join('\n'),
                },
                {
                    name: 'RAM usage',
                    value: [
                        `Bot Only: ${client.Utils.Formatter.formatNumber(status.ram.botOnly.rawValue)} ${status.ram.botOnly.unit} (${status.ram.botOnly.percentage}%)`,
                        `Global: ${client.Utils.Formatter.formatNumber(status.ram.global.rawValue)} ${status.ram.global.unit} (${status.ram.global.percentage}%)`
                    ].join('\n'),
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
                    value: [
                        `Bot Only: ${status.cpu.botOnly}%`,
                        `Global: ${status.cpu.global}%`
                    ].join('\n'),
                },
                {
                    name: 'RAM usage',
                    value: [
                        `Bot Only: ${client.Utils.Formatter.formatNumber(status.ram.botOnly.rawValue)} ${status.ram.botOnly.unit} (${status.ram.botOnly.percentage}%)`,
                        `Global: ${client.Utils.Formatter.formatNumber(status.ram.global.rawValue)} ${status.ram.global.unit} (${status.ram.global.percentage}%)`
                    ].join('\n'),
                }
            ])
        await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};