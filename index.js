const Commando = require('discord.js-commando');
const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const client = new Commando.Client({
    commandPrefix: '!',
    unknownCommandResponse: false,
    owner: '380898001977081858',
    disableEveryone: true
});
const path = require('path');
const sqlite = require('sqlite');


client.registry
    // Registers your custom command groups
    .registerGroups([
        ['PUBG', 'PUBG Commands'],
        ['Other', 'Other misc commands']
    ])
    // Registers all built-in groups, commands, and argument types
    .registerDefaults()
    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

    client.setProvider(
        sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
    ).catch(console.error);


client.on('ready', () => {
    console.log('PUBG Bot is live');
    client.user.setActivity('Making Chicken Dinner');
    

    client.login('key');
