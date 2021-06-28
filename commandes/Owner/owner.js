const emotes = require("../../emotes.json")
const dab = require("quick.db")
const discord = require("discord.js")
var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = (client, message, args) => {
const db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
var config = require("../../config.json")

let authorized = [`${config.bot.owner}`]
if(!authorized.includes(message.author.id)) return message.lineReply(`${emotes.general.no} Vous devez être \`OWNER\` du bot pour éxecuter cette commande contacter powergames#0001.`);

message.channel.send(`cette commande marche bg`)

}
module.exports.help = {
    name: "owners",
    aliases: [],
    category: 'Administration',
    description: "Permet de changer le prefixe du serveur",
  };