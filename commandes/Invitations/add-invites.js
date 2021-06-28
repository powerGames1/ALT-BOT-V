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

      let amount = args[1];

      if (!amount)
        return message.lineReply(`<:Warning:845283468715491348> Veuillez spécifier un **nombres** d'invitation à ajouter`);

      let user = message.mentions.users.first();

      if (!user)
      return message.lineReply('<:Warning:845283468715491348> Merci de **mentionner** un **utilisateur**');

        

      db.add(`invites_${message.guild.id}_${user.id}`, amount);

message.channel.send(`Je viens d’ajouter **${amount}** invitations a **${user}**`)
      db.add(`bouns_${message.guild.id}_${user.id}`, amount);
      message.channel.send(suc);
    

};


module.exports.help = {
    name: "addinvites",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des salons temporaires.",
  };