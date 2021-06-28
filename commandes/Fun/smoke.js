const Discord = require("discord.js")
fs = require("fs");


module.exports.run = async(bot, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

    var options = [

        "https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif",
        "https://media.giphy.com/media/xdgisqRDFyO9G/giphy.gif",
        "https://media.giphy.com/media/lgTpcy4dkdUc0/giphy.gif",
        "https://media.giphy.com/media/9dhgKatYHfEuA/giphy.gif",
        "https://media.giphy.com/media/NRPFpSPJbve80/giphy.gif", // 5
        "https://media.giphy.com/media/Ejw31fJJkDfQ4/giphy.gif",
        "https://media.giphy.com/media/3XUbDJ3rPBK1y/giphy.gif",
        "https://media.giphy.com/media/y7IQJbLegexig/giphy.gif",
        "https://media.giphy.com/media/zchxJKoZRSz1S/giphy.gif",
        "https://media.giphy.com/media/csWLak8DhBB95oFiWx/giphy.gif", // 10
        "https://media.giphy.com/media/MI9vTrc4TUvII/giphy.gif" // 11

    ];

    var response = options[Math.floor(Math.random() * options.length)];
    const kiss = new Discord.MessageEmbed()
        .setDescription(`🚬 **${message.author.username}** Fume tranquillement`)
        .setColor(db.color)
        .setImage(`${response}`)
        .setTimestamp()
        .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    message.channel.send(kiss);
}

module.exports.help = {
    name: 'smoke',
}