const { SlashCommandBuilder, Events } = require('discord.js');

module.exports = {
    name: 'emit',
    triggers: ['emit'],
    info: {
        type: 'Development',
        name: 'emit',
        description: 'Emit an event.',
        usage: 'emit [event] [args]',
        examples: ['emit guildMemberAdd 123456789012345678'],
        blockDM: true,
        aliases: ['emit'],
    },
    allowedRoles: ["1145330189497290832"], // Role IDs
    blockDM: true,
    type: {
        slash: true,
        text: true
    },
    disabled: false,
    data: new SlashCommandBuilder()
        .setName('emit')
        .setDescription('Emit an event')
        .addSubcommand(subcommand =>
            subcommand
                .setName('guildmemberadd')
                .setDescription('Emit the guildMemberAdd event')
                .addUserOption(option =>
                    option
                        .setName('usera')
                        .setDescription('The user to emit the event for')
                        .setRequired(true)
                )
        ),
    async commandExecute(interaction, client) {
        const event = interaction.options.getSubcommand();
        const user1 = interaction.options.getUser('usera');
        const user2 = interaction.options.getUser('userb');
        const message1 = interaction.options.getString('messagea');
        const message2 = interaction.options.getString('messageb');
        const channel1 = interaction.options.getChannel('channela');
        const channel2 = interaction.options.getChannel('channelb');
        const role1 = interaction.options.getRole('rolea');
        const role2 = interaction.options.getRole('roleb');
        switch (event) {
            case 'guildmemberadd':
                client.emit(Events.GuildMemberAdd, user1);
                interaction.reply({ content: `Emitted the \`${event}\` event for \`${user1.tag}\`.` });
                break;
            default:
                interaction.reply({ content: `That event does not exist.` });
                break;
        }
    },
    async messageExecute(message, client) {
        // Do stuff here
        const messageArgs = message.content.split(' ');
        const event = messageArgs[1];
        switch (event.toLowerCase()) {
            case 'guildmemberadd':
                const user = client.users.cache.get(messageArgs[2]) || await message.mentions.users.first()
                client.emit('guildMemberAdd', user);
                message.channel.send({ content: `Emitted the \`${event}\` event for \`${user.tag}\`.` });
                break;
            default:
                message.channel.send({ content: `That event does not exist.` });
                break;
        }
    }
};