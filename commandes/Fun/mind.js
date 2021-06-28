
const fs = require("fs");
const Random = require("srod-v2");
const Discord = require("discord.js");

  module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

    const Value = args.join(" ");
    if (!Value || Value.length > 25) return message.lineReply("<:Warning:845283468715491348> Veuillez donner du texte et assurez-vous qu'il ne contient pas plus de **25** caractères!"); 

    const Data = await Random.ChangeMyMind({ Message: Value, Color: db.color });

    return message.channel.send(Data);
    
     }
 

module.exports.help = {
    name: "mind",

  };