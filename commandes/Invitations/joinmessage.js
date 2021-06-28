const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs")
emojis = require("./../../emotes.json")

module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
   
   let dab = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"))
   let config = require("../../config.json")
   let embed = db.fetch(`embed_${message.guild.id}`);
   let defaultjoinmessage = "**{user}** vient de nous rejoindre, il a été invité par **{Inviter}** (**{inv}** invitations)"

    
   if (!message.member.permissions.has("ADMINISTRATOR"))
   return message.lineReply(`<:no:845285837259931697> Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
   let prefix = dab.prefix
   if (prefix === null) prefix = dab.prefix 
   let joinmessage = args.slice(1).join(" ");
   let joinmessageconfig = new Discord.MessageEmbed()
     .setTitle(`**Configuration du Message de Bienvenue**`)
            .setColor(`${dab.color}`)
     .setDescription(
       `Veuillez utilisez la commande \`${prefix}joinmessage <message>\` pour configurer le messages.\n\n
       \`\`Variable du Bot\`\`
       {user} = Nom du Membres
       {inviter} = Nom de l'inviteur
       {createdat} = Date de création du compte du membre
       {guild} = Nom du serveur
     `
     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   if (!joinmessage) {
     return message.channel.send(joinmessageconfig);
   }
   let oldjoinmessage = db.get(`joinmessage_${message.guild.id}`);
   if (oldjoinmessage === null) oldjoinmessage = "None";
   let jointimesdata = db.get(
     `jointimes_${message.guild.id}_${message.author.id}`
   );
   if (jointimesdata === null) jointimesdata = "1";
   let joinmsgreplace = joinmessage
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
   .setTitle(`**Configuration du Message de Bienvenue**`)
   .setColor(`${dab.color}`)
     .setDescription(
       `**Nouvelle valeur**\n${joinmsgreplace}`
     )
     .setFooter(client.user.username, client.user.displayAvatarURL());
   db.delete(`joinmessage_${message.guild.id}`);
   db.set(`joinmessage_${message.guild.id}`, joinmsgreplace);
   return message.channel.send(joinmessagevalueupdate);
 }


module.exports.help = {
    name: "joinmessage",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des salons temporaires.",
  };