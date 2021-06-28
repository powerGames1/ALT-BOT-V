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
        db.color = str_content
        message.channel.send(`<:yes:845285875466371073> Vous avez définis la couleur des embeds de ce serveur en \`${str_content}\`.`);
    } else {
        message.channel.send(` <:no:845285837259931697>  Veuillez saisir une couleur \`<hex/couleur>\`  `);
    }


    
fs.writeFile(`./serveur/${message.guild.id}.json`, JSON.stringify(db), (x) => {
    if (x) console.error(x)
  });
};
module.exports.help = {
    name: "setcolor",
    aliases: ["theme"],
    category: 'Administration',
    description: "Permet de changer la couleur des embeds du serveur",
  };