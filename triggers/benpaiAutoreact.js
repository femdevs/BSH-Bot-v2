const { ChannelType } = require("discord.js");

module.exports = {
    name: 'autoreact',
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
            activated: true,
            requirePrefix: false,
            ids: ['505458216474378271'],
        },
        message: {
            activated: false,
            requirePrefix: true,
            prefixes: [],
            contains: [],
            suffixes: [],
            regex: []
        }
    },
    async execute(message, client) {
        message.react('🗿');
    }
}