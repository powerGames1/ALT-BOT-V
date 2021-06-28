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
   let joinchannelmessagedata = db.get(
    `joinchannelmessage_${message.guild.id}`
  );
  if (joinchannelmessagedata === null) joinchannelmessagedata = "none";
  let joinchannel = message.mentions.channels.first();
  let joinchannelmessage = new Discord.MessageEmbed()
  .setTitle(`**Configuration du Serveur **`)
  .setColor(`${dab.color}`)
    .setDescription(
        `Veuillez utilisez la commande \`${prefix}joinchannel <message>\` pour configurer le salon.`
    )
    .setFooter(client.user.username, client.user.displayAvatarURL());
  if (!joinchannel) {
    return message.channel.send(joinchannelmessage);
  }
  const joinmessageupdated = new Discord.MessageEmbed()
  .setTitle(`**Configuration du Salon de Bienvenue**`)
  .setColor(`${dab.color}`)
    .setDescription(
      `Nouveau Salon de Bienvenue définis : <#${joinchannel.id}>`
    )
    .setFooter(client.user.username, client.user.displayAvatarURL());
  db.delete(`joinchannelmessage_${message.guild.id}`);
  db.set(`joinchannelmessage_${message.guild.id}`, joinchannel.id);
  return message.channel.send(joinmessageupdated);
}
module.exports.help = {
    name: "joinchannel",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des salons temporaires.",
  };