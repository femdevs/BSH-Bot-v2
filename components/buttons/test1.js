const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'customButton1',
    info: {
        name: 'customButton1',
        description: 'Button Description',
        type: 'Primary',
    },
    data: new ButtonBuilder()
        .setCustomId('customButton1')
        .setLabel('Testing Button 1')
        .setStyle(ButtonStyle.Primary),
    async execute(interaction, client) {
        interaction.reply({ content: 'Button 1 pressed!', ephemeral: true });
    }
};