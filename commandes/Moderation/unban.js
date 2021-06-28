const { MessageEmbed } = require('discord.js');
fs = require('ms');
emojis = require("./../../emotes.json")
module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

    if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.lineReply( `${emojis.general.warning} Vous n'avez pas la permission requise \`BAN_MEMBERS\``);

        if (!args[0]) return message.lineReply(`${emojis.general.warning} Veuillez entrer un identifiant d'utilisateur pour l'unban!`)

        let member;

        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.channel.send(`${emojis.general.no} Utilisateur valide!`)
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'Aucune Raison';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        message.guild.fetchBans().then( bans => {

            const user = bans.find(ban => ban.user.id === member.id );

            if (user) {
                embed.setTitle(`Unbannissement réussie ${user.user.tag}`)
                    .setColor(db.color)
                    .addField('ID de l\'utilisateur', user.user.id, true)
                    .addField('Tag de l\'utilisateur', user.user.tag, true)
                    .addField('Raison du Bannissement', user.reason != null ? user.reason : 'Aucune raison')
                    .addField('Raison de l\'Unbanissement, raison')
                message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed))
            } else {
                embed.setTitle(`${emojis.general.no} ${member.tag} n'est pas ban !`)
                    .setColor(db.color)
                message.lineReply(embed)
            }

        }).catch(e => {
            console.log(e)
            message.channel.send(`${emojis.general.warning2} Une erreur s\'est produite!`)
        });

    }

module.exports.help = {
    name: 'unban',
};