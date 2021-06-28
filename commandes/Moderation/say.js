
module.exports.run = async (bot, message, args) => {
    emojis = require("./../../emotes.json")

    if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.lineReply(`${emojis.general.no} Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
    message.delete()
    let tosay =  args.slice(0).join(" ");
    
    if(!tosay) return message.reply("Tu veux me faire dire quoi ...")
    message.delete(); if(tosay.includes("discord.gg/")|| tosay.includes("https://discord.gg/")) return message.channel.send(`${emojis.fun.crache} Vous n'avez pas la permissions d'envoyer des liens.`)
    message.delete(); if(tosay.includes("@everyone")&& !message.member.hasPermission("MENTION_EVERYONE")|| tosay.includes("@here")&& !message.member.hasPermission("MENTION_EVERYONE")) return message.lineReply(`${emojis.general.no}  Désolé, vous devez avoir la permisssion \`MENTION_EVERYONE\` pour mentionner tout le monde!`)
    message.channel.send(tosay)

}



module.exports.help = {
    name: "say",


  };
