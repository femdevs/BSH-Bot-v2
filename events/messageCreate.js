const { Events, MessageType, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Canvas = require("@napi-rs/canvas");
const { join } = require("path");
const fs = require('fs');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    /**
     * @param {import('discord.js').Message} message 
     * @param {import('discord.js').Client} client 
     * @returns 
     */
    async execute(message, client) {
        if (message.author.bot || message.partial) return;

        const { rows } = await client.Database.MySQL.query(`SELECT * FROM levels WHERE discordId = '${message.author.id}'`);
        if (rows.length < 1)
            return client.Database.MySQL.query(
                `INSERT INTO levels (discordId, username, level, xp) VALUES ('${message.author.id}', '${message.author.username}', 1, 0)`
            );

        let xp = parseInt(rows[0].xp);
        let level = parseInt(rows[0].level);
        let xpNeeded = 100 * level + 75;

        function calculateMultiplier() {
            let multi = 1;
            multi *= Math.min(
                Math.max(
                    message.content.replace(
                        /[^ \!"#$%&'\(\)\*\+,\-\.\/0-9\:\;<\=>\?@A-Z\[\\\]\^\_a-z\{\|\}~]/gim,
                        ""
                    ).length / 40,
                    1
                ),
                4
            );
            if (message.member.premiumSince) multi *= 1.5;
            if (new Date().getDay() === 0 || new Date().getDay() === 6)
                multi *= 1.25;
            return multi;
        }

        xp += Math.round(Math.random() * calculateMultiplier() * 15);

        const oldLevel = parseInt(rows[0].level);

        while (xpNeeded <= xp) {
            level++;
            xp -= xpNeeded;
            xpNeeded = 100 * level + 75;
        }
        if (level !== oldLevel) {
            Canvas.GlobalFonts.registerFromPath(join(__dirname, "..", "assets", "fonts", "font.ttf"), "Proxima Nova Medium");
            Canvas.GlobalFonts.registerFromPath(join(__dirname, "..", "assets", "fonts", "bold.ttf"), "Proxima Nova Bold");

            const levelChannel = message.guild.channels.cache.get(
                "1006372974015807589"
            );

            // async function provideRoles(member, level) {
            //     await member.roles.remove("999314344158449664");
            //     await member.roles.remove("999314775408390316");
            //     await member.roles.remove("999315163205341274");
            //     await member.roles.remove("999315561970405427");
            //     await member.roles.remove("999315871786864701");
            //     await member.roles.remove("999316308728500305");
            //     await member.roles.remove("999316697574031410");
            //     await member.roles.remove("999317061740265492");
            //     await member.roles.remove("999317207014195251");
            //     if (level >= 5 && level < 10)
            //         await member.roles.add("999314344158449664");
            //     if (level >= 10 && level < 20)
            //         await member.roles.add("999314775408390316");
            //     if (level >= 20 && level < 30)
            //         await member.roles.add("999315163205341274");
            //     if (level >= 30 && level < 40)
            //         await member.roles.add("999315561970405427");
            //     if (level >= 40 && level < 50)
            //         await member.roles.add("999315871786864701");
            //     if (level >= 50 && level < 60)
            //         await member.roles.add("999316308728500305");
            //     if (level >= 60 && level < 75)
            //         await member.roles.add("999316697574031410");
            //     if (level >= 75 && level < 100)
            //         await member.roles.add("999317061740265492");
            //     if (level >= 100) await member.roles.add("999317207014195251");
            // }

            // provideRoles(message.member, level);

            const canvas = Canvas.createCanvas(860, 300);
            const context = canvas.getContext("2d");
            context.fillStyle = "#21212f";
            context.rect(0, 0, canvas.width, canvas.height);
            context.fill();
            context.font = "54px Proxima Nova Bold";
            context.fillStyle = "#ffffff";
            context.fillText(
                message.author.username.replace(/[^ \!"#$%&'\(\)\*\+,\-\.\/0-9\:\;<\=>\?@A-Z\[\\\]\^\_a-z\{\|\}~]/gmi, "").toUpperCase(),
                canvas.width / 2.5 - 30,
                canvas.height / 3.5
            );
            context.font = "34px Proxima Nova Medium";
            context.fillStyle = "#ffffff";
            context.fillText(
                `LEVEL UP`,
                canvas.width / 2.5 - 30,
                canvas.height / 1.8
            );
            context.font = "34px Proxima Nova Medium";
            context.fillStyle = "#ffffff";
            context.fillText(
                `LEVEL ${oldLevel} - ${level}`, // next person to touch the dash dies because I’d like to remind you, the font doesn’t have a “>” sign
                canvas.width / 2.5 - 30,
                canvas.height / 1.3
            );
            context.beginPath();
            context.arc(150, 150, 128, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
            // add border
            context.strokeStyle = "#E8581A";
            context.lineWidth = 10;
            context.stroke();
            const avatar = await Canvas.loadImage(
                message.author.displayAvatarURL({
                    extension: "jpg",
                    size: 256,
                    dynamic: true,
                })
            );
            context.drawImage(avatar, 22, 22, 256, 256);

            const attachment = new AttachmentBuilder(
                await canvas.encode("jpeg"),
                { name: "profile-image.jpg" }
            );

            levelChannel.send({
                content: `<@${message.author.id}>`,
                files: [attachment],
            });
        }

        client.Database.MySQL.query(
            `UPDATE levels SET xp = ${xp}, level = ${level}, username = '${message.author.username}' WHERE discordId = '${message.author.id}'`
        )

        fs
            .readdirSync(`${client.baseDir}/triggers`)
            .filter(file => file.endsWith('.js'))
            .map(file => require(`${client.baseDir}/triggers/${file}`))
            .forEach(trigger => {
                if (trigger.triggerCfgs.channel.activated) {
                    if (trigger.triggerCfgs.channel.ids.length < 0 && trigger.triggerCfgs.channel.ids.includes(message.channel.id)) {
                        if (!trigger.triggerCfgs.channel.requirePrefix || (trigger.triggerCfgs.channel.requirePrefix && message.content.startsWith(client.configs.prefix))) return trigger.execute(message, client)
                    }
                    if (trigger.triggerCfgs.channel.types.length < 0 && trigger.triggerCfgs.channel.types.includes(message.channel.type)) {
                        if (!trigger.triggerCfgs.channel.requirePrefix || (trigger.triggerCfgs.channel.requirePrefix && message.content.startsWith(client.configs.prefix))) return trigger.execute(message, client)
                    }
                }
                if (trigger.triggerCfgs.role.activated) {
                    if (trigger.triggerCfgs.role.ids.length < 0 && message.member.roles.cache.some(role => trigger.triggerCfgs.role.ids.includes(role.id))) {
                        if (!trigger.triggerCfgs.role.requirePrefix || (trigger.triggerCfgs.role.requirePrefix && message.content.startsWith(client.configs.prefix))) return trigger.execute(message, client)
                    }
                }
                if (trigger.triggerCfgs.member.activated) {
                    if (trigger.triggerCfgs.member.ids.length < 0 && trigger.triggerCfgs.member.ids.includes(message.author.id)) {
                        if (!trigger.triggerCfgs.member.requirePrefix || (trigger.triggerCfgs.member.requirePrefix && message.content.startsWith(client.configs.prefix))) return trigger.execute(message, client)
                    }
                }
                if (trigger.triggerCfgs.message.activated) {
                    if (trigger.triggerCfgs.message.prefixes.length < 0 && trigger.triggerCfgs.message.prefixes.some(prefix => message.content.startsWith(prefix))) {
                        if (!trigger.triggerCfgs.message.requirePrefix || (trigger.triggerCfgs.message.requirePrefix && message.content.startsWith(client.configs.prefix))) return trigger.execute(message, client)
                    }
                    if (trigger.triggerCfgs.message.contains.length < 0 && trigger.triggerCfgs.message.contains.some(contains => message.content.includes(contains))) {
                        if (!trigger.triggerCfgs.message.requirePrefix || (trigger.triggerCfgs.message.requirePrefix && message.content.startsWith(client.configs.prefix))) return trigger.execute(message, client)
                    }
                    if (trigger.triggerCfgs.message.suffixes.length < 0 && trigger.triggerCfgs.message.suffixes.some(suffix => message.content.endsWith(suffix))) {
                        if (!trigger.triggerCfgs.message.requirePrefix || (trigger.triggerCfgs.message.requirePrefix && message.content.startsWith(client.configs.prefix))) return trigger.execute(message, client)
                    }
                    if (trigger.triggerCfgs.message.regex.length < 0 && trigger.triggerCfgs.message.regex.some(regex => regex.test(message.content))) {
                        if (!trigger.triggerCfgs.message.requirePrefix || (trigger.triggerCfgs.message.requirePrefix && message.content.startsWith(client.configs.prefix))) return trigger.execute(message, client)
                    }
                }
            })

        if (message.content.startsWith(client.configs.prefix)) {
            const commandBase = message.content.split(' ')[0].slice(client.configs.prefix.length).toLowerCase();
            for (let data of fs
                .readdirSync(`${client.baseDir}/commands`)
                .filter(file => file.endsWith('.js'))
                .map(file => require(`${client.baseDir}/commands/${file}`))
                .filter(command => command.triggers.includes(commandBase) && command.type.text === true)
            ) {
                if (data.blockDM && message.channel.isDMBased()) return message.reply({ content: client.configs.defaults.dmDisabled });
                else if (data.channelLimits && !data.channelLimits.includes(message.channel.type)) return message.reply({ content: client.configs.defaults.invalidChannelType });
                else if (data.requiredPerm && message.guild && !message.member.permissions.has(data.requiredPerm)) return message.reply({ content: client.configs.defaults.noPerms });
                else if (data.allowedRoles && !message.member.roles.cache.some(role => data.allowedRoles.includes(role.id))) return message.reply({ content: client.configs.defaults.noPerms });
                else if (data.allowedUsers && !data.allowedUsers.includes(message.author.id)) return message.reply({ content: client.configs.defaults.noPerms });
                else if (data.disabled) return message.reply({ content: client.config.defaults.disabled });
                else return data.messageExecute(message, client);
            }
        }
    }
};