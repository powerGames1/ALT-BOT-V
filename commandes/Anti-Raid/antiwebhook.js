const db = require('quick.db')
let config = require("./../../config.json")

emojis = require("./../../emotes.json"),
module.exports.run = async(bot, message, args) => {
    let authorized = [`${config.bot.owner}` , `${config.bot.owner2}` , `${config.bot.owner3}` , `${message.guild.ownerID}`]
    if(!authorized.includes(message.author.id))     return message.lineReply(`${emojis.general.no} Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
  if (!args.length) {
      return message.channel.send(`${emojis.general.warning} Attention, vous avez mal utiliser la commande, \`antiwebhook <on/off>\``)
  }

  if(args[0] === "on") {
message.lineReply(`${emojis.general.on} Je viens d'activé l'anti-webhook`)
            db.set("antiwb_"+ message.guild.id , true)
        }
        if(args[0] === "off") {
message.lineReply(`${emojis.general.off} Je viens de désactiver l''anti-webhook`)
          db.set("antiwb_"+ message.guild.id , null)
      
      }}
      module.exports.help = {
        name: "antiwebhook on",
        aliases: ["antiwebhook"],
        category: "moderation",
        description: "muet",
      };