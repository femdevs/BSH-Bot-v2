const { ApplicationCommandType, ContextMenuCommandBuilder } = require('discord.js');

module.exports = {
    name: 'menu1',
    info: {
        name: 'menu1',
        description: 'Menu 1',
        type: 'User',
    },
    data: new ContextMenuCommandBuilder()
        .setName('menu1')
        .setType(ApplicationCommandType.User),
    /**
     * 
     * @param {import('discord.js').ContextMenuCommandInteraction} interaction 
     * @param {import('discord.js').Client} client 
     */
    async execute(interaction, client) {
        const { targetUser: user, targetMember: member} = interaction
        interaction.reply({ content: 'Menu 1 pressed!', ephemeral: true });
    }
}