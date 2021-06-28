const Discord = require("discord.js");
const fs = require('fs');
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
emojis = require("./../../emotes.json"),
module.exports.run = async(bot, message, args) => {

    let mentionedUser = message.mentions.users.first() || message.author;
    db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let avatarembed = new Discord.MessageEmbed()

    .setImage(mentionedUser.displayAvatarURL({dynamic: true, size: 512}))
    .setColor(db.color)
    .setAuthor("Avatar de "+mentionedUser.username)
    .setFooter("Demandé par " + message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTimestamp()  
    .setDescription("[Lien de l'avatar]("+ mentionedUser.displayAvatarURL({dynamic: true, size: 512}) +")")

    message.channel.send(avatarembed)
};
    
module.exports.help = {
    name: "avatar",
    aliases: ['pic'],
    category: 'Fun',
    description: "Affiche la photo de profile de la mention",
};