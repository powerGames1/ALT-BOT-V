const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
ms = require("ms"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

function update(message, db) {
    fs.writeFile(`./serveur/${message.guild.id}.json`, JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
};


module.exports.run = async (client, message, args) => {
if(!message.guild) return;
var config = require("../../config.json")
const emotes = require("../../emotes.json")
let authorized = [`${config.bot.owner}`, `${config.bot.owner1}`, `${config.bot.owner2}`, `${config.bot.owner3}`, `${config.bot.owner4}`, `${config.bot.owner5}`, `${config.bot.owner6}`, `${config.bot.owner7}`, `${config.bot.owner8}`, `${config.bot.owner9}`, `${config.bot.owner10}`]
if(!authorized.includes(message.author.id)) return message.lineReply(`${emotes.general.no} Vous devez être \`OWNER\` du bot pour éxecuter cette commande.`);

 

   filter = (reaction, user) => ['🇦', '🇧', '❌'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id };

   const msgembed = new MessageEmbed()
   .setAuthor(`Modifier le profile du bot` , client.user.displayAvatarURL({ dynamic : true }))
   .setColor(db.color)
   .setDescription(`\`🇦\` **Pseudo**\n${client.user.username}\n\n\`🇧\` **Avatar**\n[Photo de profile](${ client.user.displayAvatarURL({ dynamic : true })})\n\n\`❌\` **Annuler**`)
   .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))


    message.channel.send(msgembed)
    .then(async m => {
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async r => { 
    if (r.emoji.name === '🇦') {
   message.channel.send(` 🇦 Veuillez entrée le pseudonyme que vous voulez definir pour votre bot.`).then(mp => {
            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000 , errors: ['time'] })
            .then(cld => {
            var msg = cld.first();
            client.user.setUsername(msg.content)
            .then(u => message.channel.send(` <:oui:842461025235632158> ${message.author}, Vous avez changé le pseudonyme de votre bot.`))
            .catch(e => { return message.channel.send(`<:non:842881049138298982> ${message.author}, Une erreur a été rencontré. \n **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``); });
            
                const msgembede = new MessageEmbed()
                .setAuthor(`Modifier le profile du bot` , client.user.displayAvatarURL({ dynamic : true }))
                .setColor(db.color)
                .setDescription(`\`🇦\` **Pseudo**\n${msg.content}\n\n\`🇧\` **Avatar**\n[Avatar url](${ client.user.displayAvatarURL({ dynamic : true })})\n\n\`❌\` **Annuler**`)
                .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))

            
            m.edit(msgembede);         
        });
        })
    // --
    } else if(r.emoji.name === '🇧') {
        message.channel.send(` 🇧 Veuillez entrée la photo de profile que vous voulez mettre pour le bot.`).then(mp => {
            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 6000, errors: ['time'] })
            .then(cld => {
            var str = cld.first();
           message.delete()
            client.user.setAvatar(str.content)
            .then(u => message.channel.send(` <:oui:842461025235632158>  ${message.author}, Vous avez changé la photo de profil de votre bot.`))
            .catch(e => { return message.channel.send(`<:non:842881049138298982> ${message.author}, Une erreur a été rencontré. \n **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``); });
            
                const msgembede = new MessageEmbed()
                .setAuthor(`Modifier le profile du bot` , client.user.displayAvatarURL({ dynamic : true }))
                .setColor(db.color)
                .setDescription(`\`🇦\` **Pseudo**\n${client.user.username}\n\n\`🇧\` **Avatar**\n[Avatar url](${str.content})\n\n\`❌\` **Annuler**`)
                .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))

           
            m.edit(msgembede); 
        });
        });
    } else if(r.emoji.name === '❌') {
     m.delete()
   
   
        } 
 

});
    await m.react("🇦")
    await m.react("🇧")
    await m.react("❌")


})

};

module.exports.help = {
    name: "setprofile",
    aliases: ['setbot'],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des giveaways.",
  };