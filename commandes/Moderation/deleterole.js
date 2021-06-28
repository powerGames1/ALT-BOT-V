emojis = require("./../../emotes.json")

module.exports.run = (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.lineReply( `${emojis.general.warning} Vous n'avez pas la permission requise \`MANAGE_ROLES\``);

    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!role) return message.lineReply(`${emojis.general.warning} Veuillez spécifier un rôle a supprimer.`);

    if(message.author.id != message.guild.ownerID) {
        if(role.position >= message.member.roles.highest.position) return message.lineReply(`${emojis.general.warning} Vous ne pouvez pas supprimer ce rôle.`);
    }

    if(!role.editable || role.id === message.guild.roles.everyone.id || role.deleted) return message.lineReply(`${emojis.general.warning} Je ne peux pas supprimer ce role, vérifiez que le rôle a supprimer est en dessous du mien et réessayez.`);

    role.delete().catch(err => {
        console.log(err);
        message.channel.send(`${emojis.general.warning2} Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
    })

    message.lineReply(`${emojis.general.yes} Le rôle **@${role.name}** a été supprimé.`);
}

module.exports.help = {
    name: "deleterole",
    aliases: ["delete-role", "roledelete", "role-delete"],
    category: 'Administration',
    description: "Supprimer un role",
    usage: "<role>",
    cooldown: 15,
    memberPerms: ["MANAGE_ROLES"],
    botPerms: ["MANAGES_ROLES"],
    args: true
}