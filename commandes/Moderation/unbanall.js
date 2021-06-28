const Discord = require("discord.js")
emojis = require("./../../emotes.json")
module.exports.run = async(bot, message, args) => {
if (message.member.hasPermission("BAN_MEMBERS")) {
    message.guild.fetchBans().then(bans => {
        if (bans.size == 0) {message.lineReply(`${emojis.general.warning} Il n'y a aucun membre banni sur le serveur.`); throw "No members to unban."};
        bans.forEach(ban => {
            message.guild.members.unban(ban.user.id);                     
        })
    }).then(() => message.lineReply(`${emojis.general.yes} Tous les utilisateurs bannis ont été débanni.`)).catch(e => console.log(e))
} else {message.lineReply( `${emojis.general.warning} Vous n'avez pas la permission requise \`BAN_MEMBERS\``)}
}

module.exports.help = {
    name:"unbanall"
}