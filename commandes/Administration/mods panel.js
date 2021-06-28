const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
ms = require("ms"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

function update(message, db) {
    fs.writeFile(`./serveur/${message.guild.id}.json`, JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
};
emojis = require("./../../emotes.json"),
module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(`${emojis.general.no} Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
   let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
   filter = (reaction, user) => ['📃','🤫', '⚒️','🔇'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id };
   const msgembed = new MessageEmbed()
   .setAuthor(`🛡️ Menu de configuration de la modération de ${message.guild.name}`, message.author.avatarURL({ dynamic: true }))
   .setDescription("📃 Définir le salon des logs de modération\n 🤫 Définir le rôle ayant les permissions de mute des membres\n ⚒️ Définir le rôle ayant les permissions de bannir des membres\n 🔇 Définir le rôle muted")
   .addField("`📃` Logs:", db.mods.logs, true)
   .addField("`🤫` Rôle pouvant mute:", db.mods.mute, true)
   .addField("`⚒️` Rôle pouvant ban:", db.mods.ban, true)
   .addField("`🔇` Muted", db.mods.muted, true)
   .setTimestamp()  
   .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
   .setColor(db.color)
   
    message.channel.send(msgembed)
    .then(async m => { 
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async r => { 
if(r.emoji.name === "📃") {
    message.channel.send(` 📃 Veuillez entrée l'ID du salon.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        var channel = message.guild.channels.cache.get(msg.content)
        if(!channel) return  message.channel.send(` 📃 Salon incorrect.`);
        db.mods.logs = channel.id 
        message.channel.send(` 📃 Vous avez changé le salon en \`${channel.name}\``)
        m.edit({ embed: { author: { name: `🛡️ Menu de configuration de la modération de ${message.guild.name}`}, color: db.color, description: "`📃` Définir le salon des logs de modération\n`🤫` Définir le rôle ayant les permissions de mute des membres\n`⚒️` Définir le rôle ayant les permissions de bannir des membres\n`🔇` Définir le rôle muted", fields: [ { name: "`📃` Logs:", value: db.mods.logs, inline:true }, { name: "`🤫` Rôle pouvant mute:", value: db.mods.mute, inline: true}, { name: "`⚒️` Rôle pouvant ban:", value: db.mods.ban, inline: true}, { name: "`🔇` Muted", value: db.mods.muted, inline: true} ]} });               
        update(message, db)
    });
        });
} else if(r.emoji.name === '🤫') {
    message.channel.send(` 🤫 Veuillez entrée l'ID du rôle.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        var role = message.guild.roles.cache.get(msg.content)
        if(!role) return  message.channel.send(` 🤫 Rôle incorrect.`);
        db.mods.mute = role.id 
        message.channel.send(` 🤫 Vous avez changé le rôle en \`${role.name}\``)
        update(message, db)
        m.edit({ embed: { author: { name: `🛡️ Menu de configuration de la modération de ${message.guild.name}`}, color: db.color, description: "`📃` Définir le salon des logs de modération\n`🤫` Définir le rôle ayant les permissions de mute des membres\n`⚒️` Définir le rôle ayant les permissions de bannir des membres\n`🔇` Définir le rôle muted", fields: [ { name: "`📃` Logs:", value: db.mods.logs, inline:true }, { name: "`🤫` Rôle pouvant mute:", value: db.mods.mute, inline: true}, { name: "`⚒️` Rôle pouvant ban:", value: db.mods.ban, inline: true}, { name: "`🔇` Muted", value: db.mods.muted, inline: true} ]} });               
        });
    });
} else if(r.emoji.name === '⚒️') {
    message.channel.send(` ⚒️ Veuillez entrée l'ID du rôle.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        var role = message.guild.roles.cache.get(msg.content)
        if(!role) return  message.channel.send(` ⚒️ Rôle incorrect.`);
        db.mods.ban = role.id 
        message.channel.send(` ⚒️ Vous avez changé le rôle en \`${role.name}\``)
        update(message, db)
        m.edit({ embed: { author: { name: `🛡️ Menu de configuration de la modération de ${message.guild.name}`}, color: db.color, description: "`📃` Définir le salon des logs de modération\n`🤫` Définir le rôle ayant les permissions de mute des membres\n`⚒️` Définir le rôle ayant les permissions de bannir des membres\n`🔇` Définir le rôle muted", fields: [ { name: "`📃` Logs:", value: db.mods.logs, inline:true }, { name: "`🤫` Rôle pouvant mute:", value: db.mods.mute, inline: true}, { name: "`⚒️` Rôle pouvant ban:", value: db.mods.ban, inline: true}, { name: "`🔇` Muted", value: db.mods.muted, inline: true} ]} });               
        });
    });
} else if(r.emoji.name === '🔇') {
    message.channel.send(` 🔇 Veuillez entrée l'ID du rôle.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        var role = message.guild.roles.cache.get(msg.content)
        if(!role) return  message.channel.send(` 🔇 Rôle incorrect.`);
        db.mods.muted = role.id 
        message.channel.send(` 🔇 Vous avez changé le rôle en \`${role.name}\``)
        update(message, db)
        m.edit({ embed: { author: { name: `🛡️ Menu de configuration de la modération de ${message.guild.name}`}, color: db.color, description: "`📃` Définir le salon des logs de modération\n`🤫` Définir le rôle ayant les permissions de mute des membres\n`⚒️` Définir le rôle ayant les permissions de bannir des membres\n`🔇` Définir le rôle muted", fields: [ { name: "`📃` Logs:", value: db.mods.logs, inline:true }, { name: "`🤫` Rôle pouvant mute:", value: db.mods.mute, inline: true}, { name: "`⚒️` Rôle pouvant ban:", value: db.mods.ban, inline: true}, { name: "`🔇` Muted", value: db.mods.muted, inline: true} ]} });               
        });
    });
}
});
await m.react("📃")
await m.react("🤫")
await m.react("⚒️")
await m.react("🔇")
    });
};


module.exports.help = {
    name: "setup",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration de la modération du serveur.",
  };