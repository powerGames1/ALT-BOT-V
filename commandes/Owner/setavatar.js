var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = (client, message, args) => {
    if(!message.guild) return;
    var config = require("./../../config.json"),
    db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
var config = require("../../config.json")
const emotes = require("../../emotes.json")
let authorized = [`${config.bot.owner}`, `${config.bot.owner1}`, `${config.bot.owner2}`, `${config.bot.owner3}`, `${config.bot.owner4}`, `${config.bot.owner5}`, `${config.bot.owner6}`, `${config.bot.owner7}`, `${config.bot.owner8}`, `${config.bot.owner9}`, `${config.bot.owner10}`]
if(!authorized.includes(message.author.id)) return message.lineReply(`${emotes.general.no} Vous devez être \`OWNER\` du bot pour éxecuter cette commande.`);

    if(message.attachments.size > 0) { 
    message.attachments.forEach(attachment => {
        client.user.setAvatar(attachment.url)
        .then(u => message.channel.send(`<:yes:845285875466371073> ${message.author}, Vous avez changé la photo de profil de votre bot.`))
        .catch(e => { return message.channel.send(`<:no:845285837259931697> Une erreur est survenue. \n \` Plus d'informations:\`  \`🔻\` \`\`\`${e}\`\`\``); });
    });
    } else if (args.length) {
        let str_content = args.join(" ")
        client.user.setAvatar(str_content)
        .then(u => message.reply(`<:yes:845285875466371073> Vous avez changé la photo de profil de votre bot.`))
        .catch(e => { return message.channel.send(`<:no:845285837259931697> Une erreur est survenue. \n \`Plus d'informations:\`  \`🔻\` \`\`\`${e}\`\`\``); });
    } else {
        message.channel.send(`<:no:845285837259931697> Veuillez mettre sois une image sois un lien`);
    }
};
module.exports.help = {
    name: "setavatar",
    aliases: [],
    category: 'Administration',
    description: "Permet de changer la photo de profil du bot",
  };