const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

emojis = require("./../../emotes.json")
module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(`${emojis.general.warning} Vous n'avez pas la permission requise \`ADMINISTRATOR\``);
    message.channel.clone({reason: ` 💥 ${message.author} (${message.author.id}) Salon Recréé`}).then(c => c.setPosition(message.channel.position) && c.send(`:boom: ${message.author} Salon Recréé`))
    message.channel.delete() 

    };
    
module.exports.help = {
    name: "nuke",
    aliases: ['renew'],
    category: 'Gestion de serveur',
    description: "- Duplique le salon et supprime l'ancien",
  };