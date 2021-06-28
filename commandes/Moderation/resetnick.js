const { MessageEmbed } = require('discord.js');
 
emojis = require("./../../emotes.json")
module.exports.run = async (bot, message, args) => { 
        message.delete();

        if (!message.member.hasPermission(["ADMINISTRATOR"])){
            return message.lineReply( `${emojis.general.warning} Vous n'avez pas la permission requise \`ADMINISTRATOR\``);

        

        }
        let user = message.mentions.users.first();
        if (!user) return message.lineReply(`${emojis.general.warning} Merci de mentionner un utilisateur`)

        let nick = args.slice(1).join(" ");
 

        let member = message.guild.members.cache.get(user.id);
        
        await member.setNickname(user.username, []);
        return message.channel.send(`${emojis.general.yes} Le pseudo de **${user.tag}** a été reset en **${user.username}**`)



        

    }
    module.exports.help = {
        name: "resetnick",
        category: "moderation",
};