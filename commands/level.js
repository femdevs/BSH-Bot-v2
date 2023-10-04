const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const { join } = require('path');

Canvas.GlobalFonts.registerFromPath(join(__dirname, '..', 'assets', 'fonts', 'font.ttf'), 'Proxima Nova Medium')
Canvas.GlobalFonts.registerFromPath(join(__dirname, "..", "assets", "fonts", "bold.ttf"), "Proxima Nova Bold");

module.exports = {
    name: 'level',
    triggers: ['level', 'rank'],
    info: {
        type: 'Leveling',
        name: 'level',
        description: 'Shows your current level and experience.',
        usage: 'level',
        examples: ['level'],
        blockDM: false,
        aliases: ['level', 'rank'],
    },
    blockDM: false,
    type: {
        slash: true,
        text: true
    },
    disabled: false,
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Shows your current level and experience.'),
    async commandExecute(interaction, client) {
        const target = interaction.options.getUser('member') || interaction.user;
        const { rows: results } = client.Database.MySQL.query(`SELECT * FROM levels WHERE discordId = '${target.id}'`)
        if (results.length < 1) return await interaction.reply({ content: `Sorry, I can not find any xp for this user`, ephemeral: true })

        await interaction.deferReply()

        const canvas = Canvas.createCanvas(860, 300);
        const context = canvas.getContext('2d');
        context.fillStyle = "#21212f"
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
        context.font = '54px Proxima Nova Bold';
        context.fillStyle = '#ffffff';
        context.fillText(
            target.username.replace(/[^ \!"#$%&'\(\)\*\+,\-\.\/0-9\:\;<\=>\?@A-Z\[\\\]\^\_a-z\{\|\}~]/gmi, ''),
            Math.round(canvas.width / (860 / 302)),
            canvas.height / 3.5
        );
        context.font = '34px Proxima Nova Medium'
        context.fillStyle = '#ffffff';
        context.fillText(
            `Level: ${results[0].level}    XP: ${results[0].xp}`,
            Math.round(canvas.width / (860 / 312)),
            canvas.height / 1.8
        );
        context.font = '34px Proxima Nova Medium'
        context.fillStyle = '#ffffff';
        context.fillText(
            `Next level in ${(100 * results[0].level + 75) - results[0].xp} XP`,
            Math.round(canvas.width / (860 / 312)),
            canvas.height / 1.3
        );
        context.beginPath();
        context.arc(150, 150, 128, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        const avatar = await Canvas.loadImage(target.displayAvatarURL({ extension: 'jpg', size: 256, dynamic: true }));
        context.drawImage(avatar, 22, 22, 256, 256);

        const attachment = new AttachmentBuilder(await canvas.encode('jpeg'), { name: 'level.jpg' });

        await interaction.editReply({ files: [attachment] })
    },
    async messageExecute(message, client) {
        const args = message.content.split(' ');
        const target = message.mentions.users.first() || client.users.cache.get(args.at(1)) || message.author;
        const { rows: results } = await client.Database.MySQL.query(`SELECT * FROM levels WHERE discordId = ?`, [target.id])
        if (results.length < 1) return await message.reply(`Sorry, I can not find any xp for this user`)

        const canvas = Canvas.createCanvas(860, 300);
        const context = canvas.getContext('2d');
        context.fillStyle = "#21212f"
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
        context.font = '54px Proxima Nova Bold';
        context.fillStyle = '#ffffff';
        context.fillText(
            target.username.replace(/[^ \!"#$%&'\(\)\*\+,\-\.\/0-9\:\;<\=>\?@A-Z\[\\\]\^\_a-z\{\|\}~]/gmi, ''),
            Math.round(canvas.width / (860 / 302)),
            canvas.height / 3.5
        );
        context.font = '34px Proxima Nova Medium'
        context.fillStyle = '#ffffff';
        context.fillText(
            `Level: ${results[0].level}    XP: ${results[0].xp}`,
            Math.round(canvas.width / (860 / 312)),
            canvas.height / 1.8
        );
        context.font = '34px Proxima Nova Medium'
        context.fillStyle = '#ffffff';
        context.fillText(
            `Next level in ${(100 * results[0].level + 75) - results[0].xp} XP`,
            Math.round(canvas.width / (860 / 312)),
            canvas.height / 1.3
        );
        context.beginPath();
        context.arc(150, 150, 128, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        const avatar = await Canvas.loadImage(target.displayAvatarURL({ extension: 'jpg', size: 256, dynamic: true }));
        context.drawImage(avatar, 22, 22, 256, 256);
        const attachment = new AttachmentBuilder(await canvas.encode('jpeg'), { name: 'level.jpg' });
        await message.reply({ files: [attachment], allowedMentions: { repliedUser: false } })
    }
};