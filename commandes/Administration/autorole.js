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
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(` ${emojis.general.no} Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
   let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
   filter = (reaction, user) => ['👥', '✅','❌'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id };

   const msgembed = new MessageEmbed()
   .setAuthor(`📚 Modification des paramètres de l'autorole de ${message.guild.name}`, message.author.avatarURL({ dynamic: true }))
   .addField("`👥` Rôle", db.autorole.role)
   .addField(`👥`,  "Changer le rôle", true)
   .addField(`✅`, "Activer le module", true)
   .addField(`❌`, "Désactiver le module", true)
   .setTimestamp()  
   .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
   .setColor(db.color)

    message.channel.send(msgembed)
    .then(async m => { 
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async r => { 
if(r.emoji.name === "👥") {
    message.channel.send(` 👥 Veuillez entrée l'ID du rôle.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        var role = message.guild.roles.cache.get(msg.content)
        if(!role) return  message.channel.send(`👥 Salon incorrect.`);
        db.autorole.role = role.id 
        message.channel.send(` 👥 Vous avez changé le rôle en \`${role.name}\``)
        update(message, db)
        m.edit({ embed: { author: { name: `📚 Modification des paramètres de l'autorole de ${message.guild.name}`}, color: db.color, description: "`👥` Changer le rôle\n`✅` Activer le module\n`❌` Désactiver le module", fields: [ { name: "`👥` Rôle", value: db.autorole.role, inline:true } ]} });               
    });
        });
    } else if(r.emoji.name === '✅') {
        if(db.autorole.module === true) { return message.lineReply(` ✅ Le module est déjà activé.`); }
        db.autorole.module = true
        update(message, db)
        message.lineReply(` ✅ Vous avez activé le module d'autorole via **Custom Statut**`)
    } else if(r.emoji.name === '❌') {
            if(db.autorole.module === false) return message.lineReply(` ❌ Le module est déjà désactivé.`);
            db.autorole.module = false
            update(message, db)
            message.lineReply(` ❌ Vous avez désactivé le module d'autorole via **Custom Statut**`)
    }
});
await m.react("👥")
await m.react("✅")
await m.react("❌")
    });
};


module.exports.help = {
    name: "autorole",
    aliases: ['apanel','autorolepanel'],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration de l'autorole.",
  };