const { MessageEmbed } = require("discord.js");
const { default_prefix } = require("../../config.json")
const fs = require("fs")

module.exports.run = async (client, message, args) => {
  let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

const Embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setTitle("**<a:Loading:850928872757002251> Temps de réponse**")
.addField('> **Temps de réponse du bot**' , `${client.ws.ping}ms`)
.setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
.setTimestamp()  
.setColor(db.color)
message.channel.send(Embed)

  }
module.exports.help = {
  name: "speed",
};

