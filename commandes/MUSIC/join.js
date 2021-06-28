const Discord = require("discord.js"); 
module.exports = { 
name: "join", 
category: "musique",
 description: "faire rejoindre le bot en vocal", 
run: async (bot, message, args) => {
 if (!message.member.voice.channel) return message.channel.lineReply("<:no:845285837259931697> Vous n'ètes pas connectez à un Vocal !"); 
message.member.voice.channel.join(); 
message.channel.send("<:yes:845285875466371073> Connecté au Vocal !") 
}
}
module.exports.help = { 
name: "join",
 description: "Faire rejoindre le bot en vocal.",
}