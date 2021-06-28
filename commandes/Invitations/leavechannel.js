const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs")
emojis = require("./../../emotes.json")

module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
   
   let dab = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"))
   let config = require("../../config.json")
   let embed = db.fetch(`embed_${message.guild.id}`);

    
   if (!message.member.permissions.has("ADMINISTRATOR"))
   return message.lineReply(`<:no:845285837259931697> Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
   let prefix = dab.prefix
   if (prefix === null) prefix = dab.prefix 
   let leavechanneldata = db.get(`leavechannelmessage_${message.guild.id}`);
   if (leavechanneldata === null) leavechanneldata = "none";

   let leavechannel = message.mentions.channels.first();
   let leavemessageembed = new Discord.MessageEmbed()
   .setTitle(`**Configuration du Message d'Aurevoir**`)
     .setColor(`${dab.color}`)
     .setDescription(
        `Veuillez utilisez la commande \`${prefix}leavechannel <message>\` pour configurer le salon.`

     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   if (!leavechannel) {
     return message.channel.send(leavemessageembed);
   }
   const leavemessageupdated = new Discord.MessageEmbed()
   .setTitle(`**Configuration du Salon d'Aurevoir**`)
   .setColor(`${dab.color}`)
     .setDescription(
      `Nouveau Salon de Bienvenue définis : <#${leavechannel.id}>`
     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   db.delete(`leavechannelmessage_${message.guild.id}`);
   db.set(`leavechannelmessage_${message.guild.id}`, leavechannel.id);
   return message.channel.send(leavemessageupdated);
 }
module.exports.help = {
    name: "leavechannel",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des salons temporaires.",
  };