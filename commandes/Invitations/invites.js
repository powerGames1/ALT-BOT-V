const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs")

emojis = require("./../../emotes.json")
module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
   let dab = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"))
   let config = require("../../config.json")
const user = message.mentions.users.first() || message.author;

   if (!user)
     return message.lineReply('<:Warning:845283468715491348> Merci de **mentionner** un **utilisateur**');
   let embed = db.fetch(`embed_${message.guild.id}`);
   let inv = db.fetch(`invites_${message.guild.id}_${user.id}`);
   let leaves = db.fetch(`leaves_${message.guild.id}_${user.id}`);
   let Regular = db.fetch(`Regular_${message.guild.id}_${user.id}`);
   let bonus = db.fetch(`bouns_${message.guild.id}_${user.id}`);
   
   const embeds = new Discord.MessageEmbed()
.setAuthor(`${user.username}` , `${user.displayAvatarURL({dynamic: true})}`)
   .setDescription(`**${user.username}** tu as **${inv || 0}** Invites (**${Regular || 0}** ordinaires **${bonus || 0}** bonus **${leaves || 0} **parties )`)
   .setFooter(client.user.username, client.user.displayAvatarURL())
   .setColor(dab.color)
     message.channel.send(embeds);
    

};


module.exports.help = {
    name: "invites",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des salons temporaires.",
  };