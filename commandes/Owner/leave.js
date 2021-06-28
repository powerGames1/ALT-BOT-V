const emotes = require(`../../emotes.json`)
const fs = require("fs")
const dab = require(`quick.db`)
module.exports.run = (client, message, args) => {
const db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
var config = require("../../config.json")
var check = dab.fetch(`owner_${message.author.id}`)
let authorized = [`${config.bot.owner}`, `${config.bot.owner1}`, `${config.bot.owner2}`, `${config.bot.owner3}`, `${config.bot.owner4}`, `${config.bot.owner5}`, `${config.bot.owner6}`, `${config.bot.owner7}`, `${config.bot.owner8}`, `${config.bot.owner9}`, `${config.bot.owner10}`]
if(!authorized.includes(message.author.id)) return message.lineReply(`${emotes.general.no} Vous devez être \`OWNER\` du bot pour éxecuter cette commande.`);

  const guildID = args[0];
    if(isNaN(guildID) || !guildID || guildID.length != 18) {
        return message.channel.send(`Vous devez indiquer l'id d'une serveur à quitter.`);
    } else {
        const guild = client.guilds.cache.get(guildID);
        if(guild === undefined) return message.channel.send('Ce serveur n\'existe pas.');
        if(!guild.available) return message.channel.send('Serveur non disponible, réessayez plus tard.');

        client.guilds.cache.get(guildID).leave()
        .then(x => {
            console.log(`J'ai quitté le serveur ${x.name} avec la commande ${db.prefix}leave`);
            message.channel.send(`J'ai bien quitté le serveur ${x.name}`).catch(() => {});
        })
        .catch(err => {
            console.log(`[ERROR] Une erreur est survenue lors du processus: \n${err}`);
            message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
        })
    }
}
module.exports.help = {
    name: "leave",
    aliases: ["leave"],
    description: "Quitter un serveur",
    usage: "<guild_id>",

}