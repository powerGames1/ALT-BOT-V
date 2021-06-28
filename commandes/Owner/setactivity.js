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
const emotes = require("../../emotes.json")
var config = require("../../config.json")
let authorized = [`${config.bot.owner}`, `${config.bot.owner1}`, `${config.bot.owner2}`, `${config.bot.owner3}`, `${config.bot.owner4}`, `${config.bot.owner5}`, `${config.bot.owner6}`, `${config.bot.owner7}`, `${config.bot.owner8}`, `${config.bot.owner9}`, `${config.bot.owner10}`]
if(!authorized.includes(message.author.id)) return message.lineReply(`${emotes.general.no} Vous devez être \`OWNER\` du bot pour éxecuter cette commande.`);

db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
   filter = (reaction, user) => ['🎞️', '👁‍🗨','🔊','🕹️' , '❌'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id };

   const msgembed = new MessageEmbed()
   .setAuthor(`Modifier l'activité du bot` , client.user.displayAvatarURL({ dynamic : true }))
   .setColor(db.color)
   .setDescription(`\`🎞️\` **Streaming**\n\n\`👁‍🗨\` **Watching**\n\n\`🔊\` **Listening**\n\n\`🕹️\` **Playing**\n\n\`❌\` **Supprimer l'activité du bot**`)
   .setTimestamp()
   .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))

    message.channel.send(msgembed)
    .then(async m => {
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async (r , reaction) => { 
    if (r.emoji.name === '🎞️') {
        message.channel.send(`Veuillez entrer l'activité que vous voulez définir pour votre bot.`).then(mp => {
            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 60000, errors: ['time'] })
        
            .then((cld) => {
            var msg = cld.first();


        client.user.setPresence({ activity: { name: msg.content, type: 1, url: "https://www.twitch.tv/Wezah&PURGINGGG"}})
        .then(p => message.channel.send(`Vous avez définis le statut de votre bot en \`${msg.content}\` (**STREAMING**).`))
        .catch(e => { return message.channel.send(`Une erreur a été rencontré.  **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``) });
            
                const msgembede = new MessageEmbed()
                .setAuthor(`Modifier l'activité du bot` , message.author.avatarURL({dynamic: true}))
                .setColor(db.color)
                .setDescription(`\`🎞️\` **Streaming**\n\n\`👁‍🗨\` **Watching**\n\n\`🔊\` **Listening**\n\n\`🕹️\` **Playing**\n\n\`❌\` **Supprimer l'activité du bot**`)
                .setTimestamp()
      
                .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))

            m.edit(msgembede);         
        });
        })
    } else if(r.emoji.name === '👁‍🗨') {
        message.channel.send(`Veuillez entrer l'activité que vous voulez définir pour votre bot.`).then(mp => {
            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
            .then(cld => {
            var str = cld.first();
           
            client.user.setPresence({ activity: { name: str.content, type: "WATCHING" }, status: 'idle' })
            .then(p => message.channel.send(`Vous avez définis le statut de votre bot en \`${str.content}\` (**WATCHING**).`))
        .catch(e => { return message.channel.send(`Une erreur a été rencontré.  **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``); });
            
                const msgembede = new MessageEmbed()
                .setAuthor(`Modifier l'activité du bot` , message.author.avatarURL({dynamic: true}))
                .setColor(db.color)
                .setDescription(`\`🎞️\` **Streaming**\n\n\`👁‍🗨\` **Watching**\n\n\`🔊\` **Listening**\n\n\`🕹️\` **Playing**\n\n\`❌\` **Supprimer l'activité du bot**`)
                .setTimestamp()
        
                .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))

            m.edit(msgembede); 
        });
        });
    } else if(r.emoji.name === '🔊') {
        message.channel.send(`Veuillez entrée l'activitter que vous voulez definir pour votre bot`).then(mp => {

            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
            .then(cld => {
            var stre = cld.first();
           
            client.user.setPresence({ activity: { name: stre.content, type: "LISTENING" }, status: 'idle' })
            .then(p => message.channel.send(`Vous avez définis le statut de votre bot en \`${stre.content}\` (**LISTENING**).`))
        .catch(e => { return message.channel.send(`Une erreur a été rencontré.  **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``); });
            
                const msgembede = new MessageEmbed()
                .setAuthor(`Modifier l'activité du bot` , message.author.avatarURL({dynamic: true}))
                .setColor(db.color)
                .setDescription(`\`🎞️\` **Streaming**\n\n\`👁‍🗨\` **Watching**\n\n\`🔊\` **Listening**\n\n\`🕹️\` **Playing**\n\n\`❌\` **Supprimer l'activité du bot**`)
                .setTimestamp()
              
                .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))

            m.edit(msgembede); 
                
            });
        });
    } else if(r.emoji.name === '🕹️') {
        message.channel.send(`Veuillez entrée l'activitter que vous voulez definir pour votre bot`).then(mp => {

            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
            .then(cld => {
            var stree = cld.first();
           
            client.user.setPresence({ activity: { name: stree.content }, status: 'idle' })
            .then(p => message.channel.send(`Vous avez définis le statut de votre bot en \`${stree.content}\` (**GAMING**).`))
        .catch(e => { return message.channel.send(`Une erreur a été rencontré.  **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``); });
            
                const msgembede = new MessageEmbed()
                .setAuthor(`Modifier l'activité du bot` , message.author.avatarURL({dynamic: true}))
                .setColor(db.color)
                .setDescription(`\`🎞️\` **Streaming**\n\n\`👁‍🗨\` **Watching**\n\n\`🔊\` **Listening**\n\n\`🕹️\` **Playing**\n\n\`❌\` **Supprimer l'activité du bot**`)
                .setTimestamp()
                .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))

            m.edit(msgembede); 
                
            });
        });    } else if(r.emoji.name === '❌') {
            message.channel.send(`Vous avez supprimer l'activité de votre bot.`)

               
                client.user.setPresence({ activity: { name: "",  } })

                
                m.delete(); 
          
         
        } 
 

});
    await m.react("🎞️")
    await m.react("👁‍🗨")
    await m.react("🔊")
    await m.react("🕹️")
    await m.react("❌")


})

};

module.exports.help = {
    name: "setpresence",
    aliases: ['setactivity'],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des giveaways.",
  };