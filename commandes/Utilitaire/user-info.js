const { MessageEmbed } = require("discord.js")
const fs = require("fs");
const moment = require('moment');
const { utc } = require('moment');
const os = require('os')
const ms = require('ms')
const Discord = require('discord.js')

module.exports.help = {
    name: "userinfo",

  };
module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    const filterLevels = {
      DISABLED: 'Off',
      MEMBERS_WITHOUT_ROLES: 'No Role',
      ALL_MEMBERS: 'Everyone'
  };

  const verificationLevels = {
      NONE: 'Aucun',
      LOW: 'Bas',
      MEDIUM: 'Moyen',
      HIGH: '(╯°□°）╯︵ ┻━┻',
      VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
  };

  const regions = {
      brazil: 'Brazil',
      europe: 'Europe',
      hongkong: 'Hong Kong',
      india: 'India',
      japan: 'Japan',
      russia: 'Russia',
      singapore: 'Singapore',
      southafrica: 'South Africa',
      sydeny: 'Sydeny',
      'us-central': 'US Central',
      'us-east': 'US East',
      'us-west': 'US West',
      'us-south': 'US South'
  };

  const flags = {
      DISCORD_EMPLOYEE: 'Discord Employee',
      DISCORD_PARTNER: 'Discord Partner',
      BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
      BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
      HYPESQUAD_EVENTS: 'HypeSquad Events',
      HOUSE_BRAVERY: 'House of Bravery',
      HOUSE_BRILLIANCE: 'House of Brilliance',
      HOUSE_BALANCE: 'House of Balance',
      EARLY_SUPPORTER: 'Early Supporter',
      TEAM_USER: 'Team User',
      SYSTEM: 'System',
      VERIFIED_BOT: 'Verified Bot',
      VERIFIED_DEVELOPER: 'Verified Bot Developer'
  };
  const rolesGuild = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
  const membersGuild = message.guild.members.cache;
  const channelsGuild = message.guild.channels.cache;
  const emojisGuild = message.guild.emojis.cache;
  const argument = args[0];
  const member = message.mentions.members.first() || message.guild.members.cache.get() || message.member;
  if(member.user.presence.status == "offline"){
      var online = "online"
  }else{
      online = "offline"
  }
  const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, -1);
  const userFlags = member.user.flags.toArray();
  const embedUser = new Discord.MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .addField('Personne', [
          `<:members:845282697441050644> **Nom:** ${member.user.username}`,
          `<:channel:845282562216558642> **Discriminatoir:** ${member.user.discriminator}`,
          `<:ID:845266612638187570> **UID:** ${member.id}`,
          `🏳️ **Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Aucun'}`,
          `<a:IconClientFriends:849217386098720768> **Avatar:** [Lien de l'avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
          `<:doc:845281719694262292> **Création du compte:** ${moment(member.user.createdTimestamp).format('[Le] DD/MM/YYYY [à] HH:MM:SS')} ${moment(member.user.createdTimestamp).fromNow()}`,
          `<a:allbadges:845266619404124161> **Status:** ${member.user.presence.status}`,
          `🎮 **Activité :** ${member.user.presence.activities}`,

          `\u200b`
      ])
      //=========================
      .addField('Membre', [
          `<a:IconAppOAuth2:849218398683660318> **Role le plus haut:** ${member.roles.highest.id === message.guild.id ? 'Aucun' : member.roles.highest.name}`,
          `:calendar: **Rejoint le serveur:** ${moment(member.joinedAt).format('[Le] DD/MM/YYYY [à] HH:MM:SS')}`,
          `<a:IconServerModeration:849217706963894303> **Plus haut rôle:** ${member.roles.hoist ? member.roles.hoist.name : 'Aucun'}`,
          `<:role:845266662977962005> **Rôles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'Aucun'}`,
          `\u200b`
      ])
      .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
      .setTimestamp()
      .setColor(db.color)
  
  return message.channel.send(embedUser);

}
