const { MessageEmbed } = require('discord.js');
 
emojis = require("./../../emotes.json")
module.exports.run = async (bot, message, args) => { 
        message.delete();

        if (!message.member.hasPermission(["ADMINISTRATOR"]))
            return message.lineReply( `${emojis.general.warning} Vous n'avez pas la permission requise \`ADMINISTRATOR\``);

        let user = message.mentions.users.first();
        if (!user) return message.lineReply(`${emojis.general.warning} Merci de mentionner un utilisateur`)

        let nick = args.slice(1).join(" ");
        if (!nick) return message.lineReply(`${emojis.general.warning} Merci de mettre le nouveau pseudo`)

        let member = message.guild.members.cache.get(user.id);
        
        await member.setNickname(nick, []);
        return message.channel.send(`${emojis.general.warning} Le pseudo de **${user.tag}** a été changé en **${nick}**`)



        

    }
    module.exports.help = {
        name: "nick",
        category: "modération",
};