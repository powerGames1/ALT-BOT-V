
const Color = "RANDOM", Random = require("srod-v2");
const Discord = require("discord.js");
const fs = require("fs");
module.exports.help = {
  name: "wasted",
  aliases: [],
  category: "Image",
  description: "!",
  usage: "Wasted | + membre",
};
module.exports.run = async(bot, message, args) => {
  let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const Data = await Random.Wasted({ Image: Member.user.displayAvatarURL({ format: "png" }), Color: `${db.color}` });

    return message.channel.send(Data);
  }
