const pubg = require('pubg.js');
const client = new pubg.Client('PUBG Key',
'pc-na');
const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'pubg',
            memberName: 'stats',
            description: 'Gives stats of most current season',
            examples: ['!stats CharlesNeira => '],
            args: [
                {
                    key: 'gamerName',
                    prompt: 'what is your PUBG name?',
                    type: 'string'
                }
            ]
        });
    }

    async totalKills({gamerName}) {
        const player = await client.getPlayer({name: gamerName})
        const seasons = await client.getSeasons()
        var totKills = 0;
        for(const item of seasons) {
            var playerSeason = await player.getPlayerSeason(item);
            totKills = await totKills + playerSeason.attributes.gameModeStats.kills;
        }
        return await totKills;
    }

    async run(msg,  { gamerName }) {
        const player = await client.getPlayer({name: gamerName})
        const seasons = await client.getSeasons()
        const lastSeason = await seasons[seasons.length-1]
        var totKills  = await this.totalKills({gamerName});
        const playerSeason = await player.getPlayerSeason(lastSeason)



        return msg.say(gamerName + "'s stats for the current PUBG Season: " + 
        '\n\nKills: ' + await totKills +
        '\n\nAssists: ' + playerSeason.attributes.gameModeStats.squadFPP.assists +
        '\n\nSuicide: ' + playerSeason.attributes.gameModeStats.squadFPP.suicides +
        '\n\nTeam kills: ' + playerSeason.attributes.gameModeStats.squadFPP.teamKills +
        '\n\nHeals: ' + playerSeason.attributes.gameModeStats.squadFPP.heals +
        '\n\nLongest Game: ' + playerSeason.attributes.gameModeStats.squadFPP.mostSurvivalTime + ' Seconds' +
        '\n\nRevives: ' + playerSeason.attributes.gameModeStats.squadFPP.revives +
        '\n\nGames: ' + playerSeason.attributes.gameModeStats.squadFPP.roundsPlayed +
        '\n\nWins: ' + playerSeason.attributes.gameModeStats.squadFPP.wins +
        '\n\nLosses: ' + playerSeason.attributes.gameModeStats.squadFPP.losses +
        '\n\nTop 10s: ' + playerSeason.attributes.gameModeStats.squadFPP.top10s +
        '\n\nTop Kill Streak: ' + playerSeason.attributes.gameModeStats.squadFPP.roundMostKills + 
        '\n\nTotal Head Shots: ' + playerSeason.attributes.gameModeStats.squadFPP.headshotKills + 
        '\n\nRide Distance: ' + playerSeason.attributes.gameModeStats.squadFPP.rideDistance + ' Meters' +
        '\n\nWalking Distance: ' + playerSeason.attributes.gameModeStats.squadFPP.walkDistance +  ' Meters' +
        '\n\nRoad Kills: ' + playerSeason.attributes.gameModeStats.squadFPP.roadKills)
    } 
};



