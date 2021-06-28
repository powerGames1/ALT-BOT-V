const Discord = require("discord.js");
const fs = require('fs')

module.exports.run = (client, message, args) => {
    emojis = require("./../../emotes.json"),
    db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(` ${emojis.general.no} Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);

    var str_filtrer = message.guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR"))
    var str_map = str_filtrer.map(m => `${m.user.tag}: ${m.user.id}`).join("\n")
    for(let i = 0; i < str_map.length; i += 1995) {
        const str_content = str_map.substring(i, Math.min(str_map.length, i + 1995));
        message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
            .setTitle(`Liste des admins présents (**${str_filtrer.size}**)`)
            .setDescription(`\`\`\`\n${str_content}\`\`\``)
            .setColor(db.color)
            .setTimestamp()
            .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
        )
    }
    };
        
        
        module.exports.help = {
            name: "adminlist",
            aliases: ['listeadmin',],
            category: 'utilitaires',
            description: "Liste des administrateur",
          };