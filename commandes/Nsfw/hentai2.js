const Discord = require ('discord.js')
const superagent = require('superagent')

const fs = require('fs');

module.exports.run = async(bot, message, args) => {
    db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
        if (!message.channel.nsfw) return message.channel.send("Ce salon n'est pas `NSFW` :underage: !") 

        const { body } = await superagent
        .get("https://nekos.life/api/v2/img/Random_hentai_gif");
        message.channel.send(new Discord.MessageEmbed()
            .setColor(db.color)
            .setImage(body.url)
 )
    },
    module.exports.help = {
    name: 'hentai2',
    guildOnly: true
}