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
   let leavemessage = args.slice(1).join(" ");
   let defaultleavemessage = "**{user}** vient de nous quitter, il avait été invité par **{inviter}**"

   let leavemessageconfig = new Discord.MessageEmbed()
   .setTitle(`**Configuration du Message d'Aurevoir**`)
        .setColor(`${dab.color}`)
     .setDescription(
        `Veuillez utilisez la commande \`${prefix}leavemessage <message>\` pour configurer le messages.\n\n
        \`\`Variable du Bot\`\`
      {user} = Nom du Membres
      {inviter} = Nom de l'inviteur
      {createdat} = Date de création du compte du membre
      {guild} = Nom du serveur
      `
     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   if (!leavemessage) {
     return message.channel.send(leavemessageconfig);
   }
   let oldleavemessage = db.get(`leavemessage_${message.guild.id}`);
   if (oldleavemessage === null) oldleavemessage = "None";
   let leavemsgreplace = leavemessage
     .toLowerCase()
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString())
     .replace("{user}", message.author.username)
     .replace("{guild}", message.guild.name)
     .replace("{inviter}", message.author.username)

     .replace("{createdat}", message.author.createdAt.toLocaleDateString());
   let joinmessagevalueupdate = new Discord.MessageEmbed()
   .setTitle(`**Configuration du Message d'Aurevoir**`)
   .setColor(`${dab.color}`)
     .setDescription(
       `** Nouvelle valeur **\n${leavemsgreplace}`
     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   db.delete(`leavemessage_${message.guild.id}`);
   db.set(`leavemessage_${message.guild.id}`, leavemsgreplace);
   return message.channel.send(joinmessagevalueupdate);
 }

module.exports.help = {
    name: "leavemessage",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des salons temporaires.",
  };