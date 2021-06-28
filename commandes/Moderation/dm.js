const Discord = module.require('discord.js');
fs = require("fs");
emojis = require("./../../emotes.json")
module.exports.run = async(bot, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

    message.delete()

    let desti = message.mentions.users.first()

    const guild = message.guild.name;

    if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.lineReply( `${emojis.general.warning} Vous n'avez pas la permission requise \`MANAGE_MESSAGES\``);

    if (!desti)
        return message.lineReply(`${emojis.general.warning} Veuillez mentionner la personne a dm`)

    let texte = args.join(" ").slice(22);
    if (!texte)
        return message.lineReply(`${emojis.general.warning} Veuillez indiquer un texte à envoyer`)

    const embed = new Discord.MessageEmbed()
        .setColor(db.color)
        .setDescription(`**Le serveur ${guild} vous a contacté.**`)
        .addField('\u200B', ` **${texte}**`)
        .setFooter(message.author.username, message.author.avatarURL({ dynamic: true }))

    desti.send(embed)
}
module.exports.help = {
    name: "dm"
}