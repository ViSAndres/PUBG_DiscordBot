const Commando = require('discord.js-commando');
const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const client = new Commando.Client({
    commandPrefix: '!',
    unknownCommandResponse: false,
    owner: '380898001977081858',
    disableEveryone: true
});
const path = require('path');

client.registry
    // Registers your custom command groups
    .registerGroups([
        ['pubg', 'PUBG Commands'],
        ['other', 'Other misc commands']
    ])
    // Registers all built-in groups, commands, and argument types
    .registerDefaults()
    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('PUBG Bot is live!');
    client.user.setActivity("PLAYERUNKNOWN'S BATTLEGROUNDS");
});

client.login('key');
