const Discord = require('discord.js')
const fs = require("fs");



module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
  const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send("Aucun message à snipe")
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author.username , msg.author.displayAvatarURL({dynamic : true }))
    .setDescription(msg.content)
    .setColor(db.color)
    .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    .setTimestamp()  
    if(msg.image)embed.setImage(msg.image)
    
    message.channel.send(embed)
}
module.exports.help = {
    name: "snipe",
    aliases: [],
};