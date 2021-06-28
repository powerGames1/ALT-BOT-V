const Discord = require('discord.js')
fs = require("fs");

module.exports.run = async(bot, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    

var connectedCount = 0;
        var streamingCount = 0;
        var mutedCount = 0;
        var mutedMic = 0;
        var cameraCount =0;
        const channels = message.guild.channels.cache.filter(c => c.type === 'voice');
        channels.forEach(c => {
            connectedCount += c.members.size;
            c.members.forEach(m => {
                if(m.voice.streaming) streamingCount++;
                if(m.voice.selfDeaf || m.voice.serverDeaf) mutedCount++;            
                if(m.voice.selfMute || m.voice.serverMute) mutedMic++;
                if(m.voice.selfVideo) cameraCount++;
            })
        })
        const voiceConnectedEmbed = new Discord.MessageEmbed()            
            .addField('Statistiques vocal',`<:voice:845282579048824872> **${connectedCount}** membre(s) en vocal.\n <:stream:845282622463672321> **${streamingCount}** membre(s) sont en stream.\n<:muted:845319352152490055> **${mutedMic}** membre(s) sont mute micro.\n <:deafened:845282549147893860> **${mutedCount}** membre(s) sont mute casque.\n:camera: **${cameraCount}** membre(s) sont en caméra.\n
            
            <:members:845282697441050644> Avec un total de **${message.guild.memberCount}** membre(s).`)
            .setColor(db.color)
            .setFooter(message.guild.name)
        message.channel.send(voiceConnectedEmbed);
    }

module.exports.help = {
    name: "vc"
}