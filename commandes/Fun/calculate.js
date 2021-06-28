const math = require('mathjs');
const { MessageEmbed } = require("discord.js")
const fs = require("fs");
emojis = require("./../../emotes.json"),
module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("../../config.json")

    if(!args[0]) return message.channel.send(`${emojis.general.warning} Veuillez fournir une question` );

    let resp;

    try {
        resp = math.evaluate(args.join(" "))
    } catch (e) {
        return message.channel.send(`${emojis.general.warning} Veuillez fournir une question **Valide**`)
    }

    const embed = new MessageEmbed()
        .setAuthor('💡 Calculateur', message.author.avatarURL({ dynamic: true }))
        .addField('Question', `\n${args.join(' ')}`)
        .addField('Réponse', `\n${resp}`)
        .setColor(`${db.color}`)
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
        .setTimestamp()  
     message.channel.send(embed);




};


module.exports.help = {
    name: "calculate",
    category: 'Fun',
    aliases: ['calcule' , 'math'],
    description: ".",
  };