const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    name: 'role',
    triggers: [],
    info: {
        type: 'Role Management',
        name: 'role',
        description: 'Manage the roles users have',
        usage: 'role [add|remove|list] [user] [role]',
        examples: ['role add @user @role', 'role remove @user @role', 'role list @user'],
        blockDM: true,
        aliases: ["roles"],
    },
    allowedRoles: ["1145330189497290832"], // Role IDs
    blockDM: true,
    type: {
        slash: true,
        text: true
    },
    disabled: false,
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Manage the roles users have')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a role to a user')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user to add the role to')
                        .setRequired(true)
                )
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role to add to the user')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a role from a user')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user to remove the role from')
                        .setRequired(true)
                )
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role to remove')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('toggle')
                .setDescription('Toggle a role for a user')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user to toggle the role on')
                        .setRequired(true)
                )
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role to toggle')
                        .setRequired(true)
                )
        ),
    async commandExecute(interaction, client) {
        const command = interaction.options.getSubcommand();
        const user = interaction.options.getMember('user');
        if (!user) return interaction.reply({ content: `You must specify a user.` });
        const role = interaction.options.getRole('role');
        switch (command) {
            case 'add':
                user.roles.add(role);
                interaction.reply({ content: `Added the \`${role.name}\` role to \`${user.user.tag}\`.` });
                break;
            case 'remove':
                user.roles.remove(role);
                interaction.reply({ content: `Removed the \`${role.name}\` role from \`${user.user.tag}\`.` });
                break;
            case 'toggle':
                if (user.roles.cache.has(role.id)) {
                    user.roles.remove(role);
                    interaction.reply({ content: `Removed the \`${role.name}\` role from \`${user.user.tag}\`.` });
                } else {
                    user.roles.add(role);
                    interaction.reply({ content: `Added the \`${role.name}\` role to \`${user.user.tag}\`.` });
                }
                break;
            default:
                interaction.reply({ content: `That command does not exist.` });
                break;
        }
    },
    async messageExecute(message, client) {
        const args = message.content.split(' ');
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[2]);
        if (!user) return message.channel.send({ content: `You must specify a user.` });
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[3]);
        if (!role) return message.channel.send({ content: `You must specify a role.` });
        switch (args[1]) {
            case 'add':
                user.roles.add(role);
                message.channel.send({ content: `Added the \`${role.name}\` role to \`${user.user.tag}\`.` });
                break;
            case 'remove':
                user.roles.remove(role);
                message.channel.send({ content: `Removed the \`${role.name}\` role from \`${user.user.tag}\`.` });
                break;
            case 'toggle':
                if (user.roles.cache.has(role.id)) {
                    user.roles.remove(role);
                    message.channel.send({ content: `Removed the \`${role.name}\` role from \`${user.user.tag}\`.` });
                } else {
                    user.roles.add(role);
                    message.channel.send({ content: `Added the \`${role.name}\` role to \`${user.user.tag}\`.` });
                }
                break;
            default:
                message.channel.send({ content: `That command does not exist.` });
                break;
        }
    }
};