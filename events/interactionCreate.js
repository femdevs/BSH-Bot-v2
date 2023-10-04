const { Events } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    /**
     * 
     * @param {import('discord.js').BaseInteraction} interaction 
     * @param {*} client 
     */
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.Commands.get(interaction.commandName);
            if (!command || !command.type.slash) return;
            (command.blockDM && interaction.channel.isDMBased()) ?
                interaction.reply({ content: client.configs.defaults.dmDisabled }) :
                (command.channelLimits && !command.channelLimits.includes(interaction.channel.type)) ?
                    interaction.reply({ content: client.configs.defaults.invalidChannelType }) :
                    (command.requiredPerm && interaction.guild && !interaction.member.permissions.has(command.requiredPerm)) ?
                        interaction.reply({ content: client.configs.defaults.noPerms }) :
                        (command.allowedRoles && !interaction.member.roles.cache.some(role => command.allowedRoles.includes(role.id))) ?
                            interaction.reply({ content: client.configs.defaults.noPerms }) :
                            (command.allowedUsers && !command.allowedUsers.includes(interaction.user.id)) ?
                                interaction.reply({ content: client.configs.defaults.noPerms }) :
                                (command.disabled) ?
                                    interaction.reply({ content: client.config.defaults.disabled }) :
                                    command.commandExecute(interaction, client);
        }
        else if (interaction.isContextMenuCommand()) return client.Components.get('contextMenus').get(interaction.commandName).execute(interaction, client);
        else if (interaction.isButton()) return client.Components.get('buttons').get(interaction.customId).execute(interaction, client);
        else if (interaction.isAnySelectMenu()) return client.Components.get('selectMenus').get(interaction.customId).execute(interaction, client);
        else if (interaction.isModalSubmit()) return client.Components.get('selectMenus').get(interaction.customId).execute(interaction, client);
        else return await interaction.reply({ content: 'This interaction is not supported yet.', ephemeral: true });
        // Do stuff here
    },
};