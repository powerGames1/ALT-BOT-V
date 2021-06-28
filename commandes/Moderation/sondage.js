const Discord = require('discord.js')
const config = require('../../config.json');
fs = require("fs");
emojis = require("./../../emotes.json")
module.exports.run = async(bot, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));


    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        return;
    }

    message.delete()
    if (!args.join(" ")) return message.lineReply("Rentrez votre question !");
    let firstPollEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    let secondPollEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .setColor(db.color)
        .setDescription(`**🗳 Sondage :** \n \`\`\`\n${args.join(" ")}\n\`\`\``)
    message.channel.send(firstPollEmbed).then((message) => {
        setTimeout(function() {
            message.edit(secondPollEmbed).then(sentMessage => {
                sentMessage.react(`${emojis.general.yes}` )
                sentMessage.react(`${emojis.general.no}`)
            }).catch(error => {
                message.channel.send(`${emojis.general.warning2} Une erreur s'est produite lors de l'exécution de votre commande:**\n\`${error}\``)
            })
        }, 2000)
    }).catch(error => {
        message.channel.send(`${emojis.general.warning2} Une erreur s'est produite lors de l'exécution de votre commande:**\n\`${error}\``)
    })
}

module.exports.help = {
    name: 'sondage'
}