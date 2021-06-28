const dab = require(`quick.db`)
const emotes = require("../../emotes.json")

module.exports.run = async (client, message, args) => {
    var config = require("../../config.json")
let authorized = [`${config.bot.owner}`, `${config.bot.owner1}`, `${config.bot.owner2}`, `${config.bot.owner3}`, `${config.bot.owner4}`, `${config.bot.owner5}`, `${config.bot.owner6}`, `${config.bot.owner7}`, `${config.bot.owner8}`, `${config.bot.owner9}`, `${config.bot.owner10}`]
if(!authorized.includes(message.author.id)) return message.lineReply(`${emotes.general.no} Vous devez être \`OWNER\` du bot pour éxecuter cette commande.`);

    message.channel.send("🕙 Reboot en cours ...").then(async msg => {
        msg.edit("🕙 Reboot en cours ...")
        client.destroy();
        await client.login(config.login.token);
        await msg.edit("🕙 Reboot en cours ...")
        msg.edit("<:yes:845285875466371073> Reboot bien effectué")
    })
 }
 module.exports.help = {
    name: "restart"
}