const {
    Client,
    GatewayIntentBits,
    ActivityType,
    Partials,
    EmbedBuilder,
    PresenceUpdateStatus,
    Collection
} = require('discord.js');

const Utils = require('./functions/massClass');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const chalk = require('chalk');
const os = require('os');
require('dotenv').config({ path: `${__dirname}/.env` });
const baseDir = __dirname;
const {
    TOKEN: token,
    PREFIX: prefix,
    CLIENT_ID: clientID,
} = process.env;

//- Component Collections
const buttons = new Collection();
const selectMenus = new Collection();
const contextMenus = new Collection();
const modals = new Collection();

//- Base Collections
const commands = new Collection();
const events = new Collection();
const components = new Collection();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.ThreadMember
    ],
    presence: {
        activities: [
            {
                type: ActivityType.Watching,
                name: 'Brian\'s House'
            }
        ],
        status: PresenceUpdateStatus.DoNotDisturb,
    }
});

const branding = {
    footer: {
        text: 'Brians Protector V2 | Made by The FemDevs'
    },
    color: 0x2F3136,
}

const startCPU = process.cpuUsage();

client.stats = () => ({ ping: client.ws.ping, uptime: Utils.Formatter.list(Utils.Time.elapsedTime(Math.floor(process.uptime())).split(', ')), guilds: client.guilds.cache.size.toString(), cpu: (Object.values(process.cpuUsage(startCPU)).reduce((acc, cpu) => acc + cpu, 0) / os.cpus().reduce((acc, cpu) => acc + cpu.times.idle, 0)) * os.cpus().length, ram: { rawValue: (process.memoryUsage().heapTotal / (1024 ** 2)).toPrecision(2), percentage: ((process.memoryUsage().heapTotal / os.totalmem()) * 100).toPrecision(2) } })

client.baseDir = baseDir

client.Utils = Utils
client.configs = {
    prefix: prefix ?? '',
    defaults: {
        disabled: 'This command is currently disabled',
        noPerms: 'You do not have permission to use this command.',
        dmDisabled: 'This command is disabled in DMs.',
        invalidChannelType: 'This command cannot be used in this channel type.',
    },
}

client.embed = () => new EmbedBuilder(branding).setTimestamp();

fs
    .readdirSync(`${__dirname}/events`)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const event = require(`${__dirname}/events/${file}`);
        console.log(chalk`{bold Loaded event} {green ${event.name}}`);
        events.set(event.name, event);
        (event.once) ?
            client.once(event.name, (...args) => event.execute(...args, client))
            : client.on(event.name, (...args) => event.execute(...args, client))
    });

const interactions = [];

fs
    .readdirSync(`${__dirname}/commands`)
    .filter(file => file.endsWith('.js'))
    .map(file => require(`${__dirname}/commands/${file}`))
    .filter(command => command.type.slash === true)
    .forEach(command => {
        commands.set(command.name, command);
        console.log(chalk`{bold Loaded command} {blue ${command.name}}`);
        interactions.push(command.data.toJSON());
    });

fs
    .readdirSync(`${__dirname}/components/contextMenus`)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const command = require(`${__dirname}/components/contextMenus/${file}`);
        console.log(chalk`{bold Loaded context menu} {red ${command.name}}`);
        interactions.push(command.data.toJSON());
        contextMenus.set(command.name, command);
    });

fs.readdirSync(`${__dirname}/components/buttons`)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const command = require(`${__dirname}/components/buttons/${file}`);
        console.log(chalk`{bold Loaded button} {red ${command.name}}`);
        buttons.set(command.name, command);
    });

fs.readdirSync(`${__dirname}/components/selectMenus`)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const command = require(`${__dirname}/components/selectMenus/${file}`);
        console.log(chalk`{bold Loaded select menu} {red ${command.name}}`);
        selectMenus.set(command.name, command);
    });

fs.readdirSync(`${__dirname}/components/modals`)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const command = require(`${__dirname}/components/modals/${file}`);
        console.log(chalk`{bold Loaded modal} {red ${command.name}}`);
        modals.set(command.name, command);
    });

components.set('buttons', buttons);
components.set('selectMenus', selectMenus);
components.set('contextMenus', contextMenus);
components.set('modals', modals);

client.Commands = commands;
client.Events = events;
client.Components = components;

new REST({ version: '10' })
    .setToken(token)
    .put(Routes.applicationCommands(clientID), { body: interactions })
    .then(() => console.log(chalk.green`Successfully registered application commands.`))
    .catch(console.error);

client.login(token);

module.exports = client;