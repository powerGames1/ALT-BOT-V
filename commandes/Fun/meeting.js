

const fs = require("fs");
const Random = require("srod-v2");
const Discord = require("discord.js");

  module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

    const Value = args.join(" ");

    if (!Value || Value.length > 150) return message.lineReply("<:Warning:845283468715491348> Veuillez donner le texte de la réunion et assurez-vous que ce n'est pas plus de **150** caractères!"); 
    
    const Embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
    .setColor(db.color)
    .setTitle("Réunion d'urgence (" + message.author.username + ")")
    .setImage(encodeURI(`https://vacefron.nl/api/emergencymeeting?text=${Value}`))
    .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    .setTimestamp()  

    
    return message.channel.send(Embed);
    
     }
 

module.exports.help = {
    name: "meeting",
    aliases: ['reunion'],

  };