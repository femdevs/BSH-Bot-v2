const { ChannelType } = require("discord.js");

module.exports = {
    name: 'hello',
    triggerCfgs: {
        channel: {
            activated: false,
            requirePrefix: true,
            ids: [],
            types: []
        },
        role: {
            activated: false,
            requirePrefix: true,
            ids: [],
        },
        user: {
            activated: false,
            requirePrefix: true,
            ids: [],
        },
        message: {
            activated: true,
            requirePrefix: false,
            prefixes: [],
            contains: [],
            suffixes: [],
            regex: [/\b(hello|hi|howdy|hey)\b/gmi]
        }
    },
    async execute(message, client) {
        message.channel.send('Hello!');
    }
}