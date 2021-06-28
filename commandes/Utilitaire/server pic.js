
const { MessageEmbed } = require("discord.js")
const fs = require("fs");
module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("./../../config.json")

const embed = new MessageEmbed()
.setTitle(`${message.guild.name}`)
.setImage(message.guild.iconURL({dynamic : true ,     size: 1024,}))
.setColor(`${db.color}`)
message.channel.send(embed)

};


module.exports.help = {
    name: "serverpic",
    category: 'Fun',
    description: ".",
    aliases: ['sp', "server-pic", "serveurpic", "serveur-pic"],

  };
