const db = require("quick.db")
const fs = require("fs");
const Discord = require('discord.js')




emojis = require("./../../emotes.json"),
module.exports.run = async (client, message, args) => {
    let dab = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("./../../config.json")
    let authorized = [`${config.bot.owner}` , `${config.bot.owner2}` , `${config.bot.owner3}` , `${message.guild.ownerID}`]
    if(!authorized.includes(message.author.id))     return message.lineReply(`${emojis.general.no} Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
    if (!args.length) {
      return message.channel.send(`${emojis.general.warning} Attention, vous avez mal utiliser la commande, \`secur-max <on/off>\``)
    }
  if(args[0] === "on") {
    let on = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
    .setTimestamp()  
    .setColor(db.color)
    .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    .setDescription(`${emojis.general.on} Antijoin\n${emojis.general.on} AntiWebhook\n ${emojis.general.on} AntiDoubleCompte\n ${emojis.general.on} Antilink\n ${emojis.general.on} Antibot\n ${emojis.general.on} Antiping `)
             message.lineReply(on)
      db.set("autob_"+ message.guild.id , true)
      db.set("antiwb_"+ message.guild.id , true)
      db.set("antidc_"+ message.guild.id , true)
      db.set("al_"+ message.guild.id , true)
      db.set("ab_"+ message.guild.id , true)
      db.set("ap_"+ message.guild.id , true)





  }
  if(args[0] === "off") {
    let off = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
    .setTimestamp()  
    .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    .setDescription(`${emojis.general.off} Antijoin\n${emojis.general.off} AntiWebhook\n ${emojis.general.off} AntiDoubleCompte\n ${emojis.general.off} Antilink\n ${emojis.general.off} Antibot\n ${emojis.general.off} Antiping `)
             message.lineReply(off)
    db.set("autob_"+ message.guild.id , null)
    db.set("antiwb_"+ message.guild.id , null)
    db.set("antidc_"+ message.guild.id , null)
    db.set("al_"+ message.guild.id , null)
    db.set("ab_"+ message.guild.id , null)
    db.set("ap_"+ message.guild.id , null)






}

};


module.exports.help = {
    name: "secur-max",
    aliases: ['sx' ],
    category: 'Administration',
    description: "Avoir quelque info sur le bot",
  };