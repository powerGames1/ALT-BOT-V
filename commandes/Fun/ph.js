const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

        let user = message.mentions.members.first() || message.author;
        let text = args.join(" ");



        if (!text) {
            return message.lineReply(` <:Warning:845283468715491348> Veuillez indiquer un texte`)
        }
        message.delete()
        try {
            const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${user.username}&image=${user.displayAvatarURL({ format: "png", size: 512 })}&text=${text}`));
            const json = await res.json();
            const attachment = new Discord.MessageAttachment(json.message, "phcomment.png");
            message.channel.send(attachment);
        } catch (e) {
            console.log(e);

        }
    }
    module.exports.help = {
        name: 'ph',
        description: 'fait un commentaire pornhub',
        args: true,
        usage: '<autheur> <Texte>',
        cat: 'fun',
};