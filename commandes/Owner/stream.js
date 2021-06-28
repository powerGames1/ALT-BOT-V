var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = (client, message, args) => {
    if(!message.guild) return;
    var config = require("../../config.json"),
    db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
var config = require("../../config.json")
const emotes = require("../../emotes.json")
let authorized = [`${config.bot.owner}`, `${config.bot.owner1}`, `${config.bot.owner2}`, `${config.bot.owner3}`, `${config.bot.owner4}`, `${config.bot.owner5}`, `${config.bot.owner6}`, `${config.bot.owner7}`, `${config.bot.owner8}`, `${config.bot.owner9}`, `${config.bot.owner10}`]
if(!authorized.includes(message.author.id)) return message.lineReply(`${emotes.general.no} Vous devez être \`OWNER\` du bot pour éxecuter cette commande.`);

       if (args.length) {
        let str_content = args.join(" ")
client.user.setPresence({ activity: { name: str_content, type: 1, url: "https://www.twitch.tv/Wez&PURGINGGG"}})
.then(p => message.channel.send(`<:yes:845285875466371073> ${message.author}, Vous avez définis le statut de votre bot en \`${str_content}\``))
.catch(e => { message.channel.send(`<:no:845285837259931697> ${message.author}, Une erreur est survenue. \n \`Plus d'informations:\` \`🔻\` \`\`\`${e}\`\`\``); });
    } else {
        message.channel.send(`<:no:845285837259931697> ${message.author}, Vous avez fournie aucune valeur.`);
    }
};

module.exports.help = {
    name: "stream",
    aliases: [],
    category: 'Administration',
    description: "Permet de changer le statut du Bot",
  };