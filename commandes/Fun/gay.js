const Discord = require('discord.js')
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
        let member = message.mentions.users.first() || message.author
        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setAuthor(`🌈 Détecteur de gay`, message.author.avatarURL({dynamic: true}))
        .setDescription(`${member} est ` + rng + "% Gay 🏳️‍🌈")
        .setColor(db.color)
        .setTimestamp()
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))

        message.channel.send(howgayembed);
    }
    module.exports.help = {
        name: "gay",
        description: "calclculateur ",
    };    