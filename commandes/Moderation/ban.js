const Discord = require('discord.js')
fs = require("fs");
emojis = require("./../../emotes.json")
module.exports.run = async(bot, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
   

        if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.lineReply( `${emojis.general.warning} Vous n'avez pas la permission requise \`BAN_MEMBERS\``);
        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); 
        if (!reason) reason = "Aucune raison donnée";

        const embed = new Discord.MessageEmbed()
        
        .setTitle(`Vous avez été banni de **${message.guild.name}**`)
        .setDescription(`Raison: ${reason}`)
        .setColor(db.color)
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL({dynamic: true}))

        if (!args[0]) return message.lineReply(`${emojis.general.warning} Vous devez spécifier un utilisateur à bannir.`).then(m => m.delete({ timeout: 6000 }));

        if(!mentionMember) return message.lineReply(`${emojis.general.warning} Cet utilisateur n'est pas un utilisateur valide / n'est plus sur le serveur!`);

        if(!mentionMember.bannable) return message.channel.send(`${emojis.general.no} Désolé, je ne peux pas bannir cet utilisateur!`);

        await mentionMember.send(embed);
        await mentionMember.ban({
            reason: reason
        }).then(() => message.channel.send(`${emojis.general.yes} Bannis avec succès:  ` + mentionMember.user.tag));
    }


module.exports.help = {
    name: "ban",
    description: " pr ban d fdp",
};