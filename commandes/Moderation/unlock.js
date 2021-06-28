const Discord = require('discord.js')
const ms = require('ms')
const config = require('../../config.json')
fs = require("fs");
emojis = require("./../../emotes.json")
module.exports.run = async(bot, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

  

    if (!message.member.hasPermission("MANAGE_CHANNELS"))
        return message.lineReply(`${emojis.general.warning} Vous n'avez pas la permission requise \`MANAGE_CHANNELS\``);
    if (!message.mentions.channels.first()) return message.channel.send(`${emojis.general.warning} Spécifiez le channel`)
    

    if (!message.guild.me.hasPermission) {
        return message.lineReply(` ${emojis.general.no} Vous n'avez pas la permsission d'unlock le salon` )
    }


    let time = args[1] || "30s"
    let Channel = message.mentions.channels.first()

    try {
        await Channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        });

        message.channel.send(`${emojis.general.channel} <#${Channel.id}> à bien était unlock !`)
    } catch (err) {
        console.log(err);
    }

    setTimeout(() => {
        Channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        }, ms(time))
    })
}

module.exports.help = {
    name: 'unlock'
}