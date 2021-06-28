const Meme = require("memer-api")
const memer = new Meme();
const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const config = require('../../config.json');


module.exports.run = async (client, message, args) => {

        const user1 = message.member;

        const avatar = user1.user.displayAvatarURL({ dynamic: true })

        const text = args.join(' ');

        if (!text) return message.lineReply(`<:no:845285837259931697> Veuillez fournir un texte.`);

        const username = user1.user.username;
        message.delete()


        memer.tweet(avatar, username, text).then(image => {
            const attachment = new MessageAttachment(image, "tweet.png")
            message.channel.send(attachment)
        })
    }

    module.exports.help = {
        name: 'tweet',
    };