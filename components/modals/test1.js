const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: 'modal1',
    info: {
        name: 'modal1',
        description: 'Testing Modal 1',
        type: 'Base Modal',
    },
    data: new ModalBuilder()
        .setCustomId('modal1')
        .setTitle('Testing Modal 1')        
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('modal1_input')
                        .setPlaceholder('Placeholder')
                        .setStyle(TextInputStyle.Short)
                        .setLabel('Label')
                )
        ),
    async execute(interaction, client) {
        interaction.reply({ content: 'Modal 1 pressed!', ephemeral: true });
    }
}
