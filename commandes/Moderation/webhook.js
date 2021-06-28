const Discord = require('discord.js')
const guildEmbedColor = new Map();


const fs = require("fs");
module.exports.run = async (client, message, args) => {
    emojis = require("./../../emotes.json")
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("./../../config.json")
        if(!message.member.hasPermission('MANAGE_WEBHOOKS')) return message.lineReply(`${emojis.general.warning} Vous n'avez pas la permission requise \`MANAGE_WEBHOOKS\``);
        if (!args.length) {
            return message.lineReply(`${emojis.general.warning} Attention, vous avez mal utiliser la commande, \`webhook <size/delete>\``)
            }
        const del = args[0] == 'delete';
        const size = args[0] == "size";
        if (size) {
            message.channel.fetchWebhooks().then((webhooks) => {
                const error_permissions = new Discord.MessageEmbed()
            .setDescription('🔌 Le serveur **' + message.guild.name + '** contient **' + webhooks.size + '** webhook.')
            .setColor(`${db.color}`)
            .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
            .setTimestamp()  

            message.channel.send(error_permissions)
            })
        } else if (del) {
            message.lineReply(`${emojis.general.yes} Tout les webhook on été supprimé.`)
            message.channel.fetchWebhooks().then((webhooks) => {
                webhooks.forEach((wh) => wh.delete());
            })
        }
    }
    module.exports.help = {
        name: "webhook",
    
      }