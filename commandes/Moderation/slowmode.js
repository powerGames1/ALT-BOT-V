const { MessageEmbed } = require('discord.js');
const ms = require('ms');
fs = require('fs');
emojis = require("./../../emotes.json")
module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return;

        if (!args[0]) return message.reply(`${emojis.general.warning} Vous n\'avez pas spécifié de temps!`)

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'Aucune raison';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.reply('<:no:845285837259931697> Le Slowmode est déja désactivé')

            embed.setTitle('<:yes:845285875466371073> Slowmode Désactivé')
                .setColor(db.color)
            return message.channel.setRateLimitPerUser(0, reason).then(m => m.send(embed))

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('<:Warning:845283468715491348> Pas une heure valide, veuillez réessayer!')

        if (time >= 21600) return message.channel.send('<:Warning:845283468715491348> Ce temps est trop élevée, veuillez saisir une valeur inférieure à 6 heures.')

        if (currentCooldown === time) return message.lineReply(`<:yes:845285875466371073> Le Slowmode est déja configuré sur ${args[0]}`);

        embed.setTitle('Slowmode Activé')
            .addField('Slowmode: ', args[0])
            .addField('Raison: ', reason)
            .setColor(db.color);

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    }
    module.exports.help = {
        name: 'slowmode',
};