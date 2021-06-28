const Discord = require('discord.js');
const fs = require('fs')
emojis = require("./../../emotes.json")
module.exports.run = (client, message, ) => {
       if(!message.member.hasPermission("ADMINISTRATOR")){   return message.lineReply(`${emojis.general.warning} Vous n'avez pas la permission requise \`ADMINISTRATOR\``);
    }
       let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

        let bots = message.guild.members.cache.filter(m => m.user.bot).size;
        let noms = message.guild.members.cache.filter(m => m.user.bot).map(m => `\`\`\`\n${m.user.tag}: ${m.user.id}\`\`\``).join("");
        
        var embed = new Discord.MessageEmbed()
        .setColor(db.color)
        .setTitle(`Liste des Bots (${bots})`)
        .setDescription(noms)
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
        message.channel.send(embed)
    }


module.exports.help = {
    name: "botlist"
}