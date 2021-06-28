
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
    if(!message.member.hasPermission("ADMINISTRATOR"))   return message.lineReply(`${emojis.general.no} Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
    let config = require("./../../config.json")
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
   filter = (reaction, user) => ['👥', '💭', '✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id };

   const msgembed = new MessageEmbed()
   .setAuthor(`💭 Modification des paramètres du Custom Status de ${message.guild.name}`, message.author.avatarURL({ dynamic: true }))
   .setColor(db.color)

   .addField(" \`👥\` **Rôle**", db.statut.role, true)
   .addField(" \`💭\` **Statut**", db.statut.state, true)
   .addField(`❌`, "Désactiver le module")
   .addField(`✅`, "Activer le module")
   .addField(`💭`, "Définir le statut a mettre")
   .addField(`👥`, "Définir le rôle à donner")
   .setTimestamp()  
   .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
   .setColor(db.color)
    message.channel.send(msgembed)
    .then(async m => { 
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async r => { 
    if(r.emoji.name === '👥') {
		message.channel.send(` 👥 Veuillez entrée l'ID du rôle.`).then(mp => {
			mp.channel.awaitMessages(dureefiltrer, { max : 1, time: 30000, errors: ['time'] })
			.then(cld => {
			var msg = cld.first();
			var role = message.guild.roles.cache.get(msg.content)
			if(!role) return  message.channel.send(`  Rôle incorrect.`)
            db.statut.role = role.id
            m.edit(({ embed: {
                author: { name: ` Modification des paramètres à propos du Custom Status de ${message.guild.name}`},
                 color: db.color,
                  fields: [ 
                      {name: "`👥` Définir le rôle à donner", value:"Rôle: "+ db.statut.role, inline: false }, 
                  { name: `\`💭\` Définir le statut a mettre` ,value: "Statut: " + db.statut.state, inline: false,
                    name: "`✅` Activer le module", inline: true,
                    name: "`❌`  Désactiver le module", inline: true}  
               ], 
               footer: {
                   icon_url: config.bot.image
                 }, } }))    
                         update(message, db)
			message.channel.send(`  Vous avez changé le rôle a donner en \`${role.name}\``)
			});
			});
	} else if(r.emoji.name === '💭') {
		message.channel.send(` Veuillez entrée le statut que les utilisateurs doivent avoir.`).then(mp => {
			mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
			.then(cld => {
			var msg = cld.first();
            db.statut.state = msg.content
            m.edit(({ embed: {
                author: { name: ` Modification des paramètres à propos du Custom Status de ${message.guild.name}`},
                 color: db.color,
                  fields: [ 
                    {name: "`👥` Définir le rôle à donner", value:"Rôle: "+ db.statut.role, inline: false }, 
                    { name: `\`💭\` Définir le statut a mettre` ,value: "Statut: " + db.statut.state, inline: false,
                      name: "`✅` Activer le module", inline: true,
                      name: "`❌`  Désactiver le module", inline: true} 
               ], 
               footer: {
                   icon_url: config.bot.image
                 }, } }))
            update(message, db)
			message.channel.send(`  Vous avez changé le statut que les utilisateurs doivent avoir en \`${msg}\``)
			});
			});
	} else if(r.emoji.name === '✅') {
        if(db.statut.module === true) { return message.channel.send(` ✅ Le module est déjà activé.`); }
        db.statut.module = true
        m.edit({ embed: {
             author: { name: ` Modification des paramètres à propos du Custom Status de ${message.guild.name}`},
              color: db.color,
               fields: [ 
                 {name: "`👥` Définir le rôle à donner", value:"Rôle: "+ db.statut.role, inline: false }, 
                { name: `\`💭\` Définir le statut a mettre` ,value: "Statut: " + db.statut.state, inline: false,
                  name: "`✅` Activer le module", inline: true,
                  name: "`❌`  Désactiver le module", inline: true} 
            ], 
            footer: {
                icon_url: config.bot.image
              }, } });         
        update(message, db)
        message.channel.send(` ✅ Vous avez activé le module d'autorole via **Custom Statut**`)
    } else if(r.emoji.name === '❌') {
            if(db.statut.module === false) return message.channel.send(` ❌ Le module est déjà désactivé.`);
            db.statut.module = false
            m.edit({ embed: { author: { name: ` Modification des paramètres à propos du Custom Status de ${message.guild.name}`}, color: db.color, description: "`👥`  Définir le rôle à donner\n`🏷️` Définir le statut a mettre \n`✅` Activer le module\n`❌` Désactiver le module\n\n> Configurations actuel:", fields: [ {name: "`👥` Rôle", value: db.statut.role, inline: true }, { name: "`🏷️` Statut", value: db.statut.state, inline: true}  ] } });         
            update(message, db)
            message.channel.send(` ❌ Vous avez désactivé le module d'autorole via **Custom Statut**`)
    }
});
await m.react("👥")
await m.react("💭")
await m.react("✅")
await m.react("❌")
    });

};


module.exports.help = {
    name: "statut",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des Custom Status.",
  };