const { MessageEmbed } = require("discord.js");


const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const fs = require("fs");
emojis = require("./../../emotes.json"),
module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("./../../config.json")
    let question = message.content.slice(+6);
    if (!question)
      return message.channel.send(`${emojis.general.warning} Vous n'avez pas précisé votre question!`);
    else {
      let responses = [
        "oui",
        "Non",
        "Absolument",
        "peut être"
      ];
      let response =
        responses[Math.floor(Math.random() * responses.length - 1)];
      let Embed = new MessageEmbed()
        .setAuthor("🎱 8Ball", message.author.avatarURL({ dynamic: true }))
        .setDescription(`**Question:**\n ${question} \n\n**Réponse:**\n ${response}`)
        .setColor(`${db.color}`)
        .setTimestamp()  
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
        message.channel.send(Embed);
    }
  },



module.exports.help = {
    name: "8ball",


  };