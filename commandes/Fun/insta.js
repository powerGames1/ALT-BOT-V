const Discord = require ("discord.js");
const axios = require('axios');
const fs = require('fs');
module.exports.run = async(client, message, args) => {
    db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    if (!args[0]) {
        return message.lineReply(`<:Warning:845283468715491348>  Merci de bien vouloir entré un pseudo instagram`)
    }
    let url, response, account, details;
    try {
        url = `https://instagram.com/${args[0]}/?__a=1`;
        response = await axios.get(url)
        account = response.data
        details = account.graphql.user
    } catch (error) {
        return message.channel.send(`<:no:845285837259931697> Compte introuvable`)
    }

    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
        .setTitle(`Voici l'instagram de :${details.is_verified ? `${details.username} ✅` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
        .setDescription(`Voici sa description : **${details.biography}**`)
        .setThumbnail(details.profile_pic_url)
        .setColor(db.color)
        .addFields(
            {
                name: "Total de poste:",
                value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                inline: true
            },
            {
                name: "Total d'abonnés :",
                value: details.edge_followed_by.count.toLocaleString(),
                inline: true
            },
            {
                name: "Total d'abonnements:",
                value: details.edge_follow.count.toLocaleString(),
                inline: true
            }
        )
        .setTimestamp()  
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
     message.channel.send(embed)


}

module.exports.help = {
    name: "insta"
}