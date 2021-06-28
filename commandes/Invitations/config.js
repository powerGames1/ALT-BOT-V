const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs")

emojis = require("../../emotes.json"),
module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.lineReply(`${emojis.general.no} Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
       let dab = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"))
   let config = require("../../config.json")
 let defaultleavemessage = "**{user}** vient de nous quitter, il avait été invité par **{inviter}**"
 let defaultjoinmessage = "**{user}** vient de nous rejoindre, il a été invité par **{Inviter}** (**{inv}** invitations)"
    let content = args[0];
    let prefix = dab.prefix
    if (prefix === null) prefix = dab.prefix
    if (!content) {

      let kk = new Discord.MessageEmbed()
      let joinmessage = db.get(`joinmessage_${message.guild.id}`);
      if (joinmessage === null) joinmessage = defaultjoinmessage;
      let leavemessage = db.get(`leavemessage_${message.guild.id}`);
      if (leavemessage === null) leavemessage = defaultleavemessage;
      let joinchannelmessage = db.get(`joinchannelmessage_${message.guild.id}`);
      let joinchannelmessage2 = db.get(
        `joinchannelmessage_${message.guild.id}`
      );
      if (joinchannelmessage === null) joinchannelmessage = "Aucun Salon";
      else joinchannelmessage = `<#${joinchannelmessage2}>`;
      let leavechannelmessage = db.get(
        `leavechannelmessage_${message.guild.id}`
      );
      let leavechannelmessage2 = db.get(
        `leavechannelmessage_${message.guild.id}`
      );
      if (leavechannelmessage === null) leavechannelmessage = "Aucun Salon";
      else leavechannelmessage = `<#${leavechannelmessage2}>`;
      let config = new Discord.MessageEmbed()
      
     .setTitle(`<:Invitation:849053752341037077> Config des invitations de ${message.guild.name}`)
     .addField(`\`Bienvenue\``, `\`Message de Bienvenue\` \n> ${joinmessage}\n\n\`Channel de Bienvenue\` \n> ${joinchannelmessage}`, true)
     .addField(`\`Aurevoir\``, `\`Message d'Aurevoir\` \n> ${leavemessage}\n\n\`Channel d'Aurevoir\` \n> ${leavechannelmessage}`, true)
     .setColor(dab.color)
      return message.channel.send(config);
    }
  
    

};

module.exports.help = {
    name: "config",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des salons temporaires.",
  };