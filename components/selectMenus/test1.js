const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    name: 'sm1',
    info: {
        name: 'sm1',
        description: 'Select Menu 1',
        type: 'String',
    },
    data: new StringSelectMenuBuilder()
        .setCustomId('sm1')
        .setPlaceholder('Placeholder')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Label')
                .setValue('Value')
                .setDescription('Description')
        ),
    async execute(interaction, client) {
        interaction.reply({ content: 'Select Menu 1 pressed!', ephemeral: true });
    }
}