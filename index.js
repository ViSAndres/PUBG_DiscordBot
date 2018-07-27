const Commando = require('discord.js-commando');
const client = new Commando.Client({
    owner: '380898001977081858'
});
const path = require('path');
const sqlite = require('sqlite');


client.registry
    // Registers your custom command groups
    .registerGroups([
        ['PUBG', 'PUBG Commands'],
        ['other', 'Other misc commands']
    ])
    // Registers all built-in groups, commands, and argument types
    .registerDefaults()
    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

    client.setProvider(
        sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
    ).catch(console.error);
    

    client.login('NDYxNzQxMjAxMTk3MTA1MTU0.Djqvug._6GX-XC4YCsDxNbe4MTPD96R7Tw');