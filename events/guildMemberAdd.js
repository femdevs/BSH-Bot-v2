const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member, client) {
        client.runtimeStats.events.executed++;
        const generalChannel = client.channels.cache.get('999266213697945652');
        generalChannel.send(`Welcome to the server, ${member}!`);
    }
};