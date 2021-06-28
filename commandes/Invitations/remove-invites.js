const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs")
emojis = require("./../../emotes.json")

module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
   let dab = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"))
   let config = require("../../config.json")
   if (!message.member.permissions.has("ADMINISTRATOR"))
   return message.lineReply(`<:no:845285837259931697> Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);   


   let amount = args[1] 
   
   if(!amount) return message.channel.send(`**Veuillez préciser un nombre d'invitations a enlever**`)
   
   let user = message.mentions.users.first()
   
   if(!user)      return message.channel.send('**Merci de mentionner un utilisateur**');

   
  db.subtract(`invites_${message.guild.id}_${user.id}`, amount) 
   
  message.channel.send(`Je viens d'enlever **${amount}** invitations a **${user}**`)

  
};


module.exports.help = {
    name: "removeinvites",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des salons temporaires.",
  };