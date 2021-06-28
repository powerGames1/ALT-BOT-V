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
    if(!message.member.hasPermission("ADMINISTRATOR")) return  message.lineReply(`${emojis.general.no} Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
   let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
   dureefiltrer = response => { return response.author.id === message.author.id };

   


    message.lineReply(`${emojis.general.warning} Veuillez entrée l'ID du salon que vous voulez definir comme **raidlogs**.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        var channel = message.guild.channels.cache.get(msg.content)
        if(!channel) return  message.lineReply(`Salon incorrect.`);
        db.mods.logs = channel.id 
        message.lineReply(` ${emojis.general.yes} Vous avez changé le salon de **raidlogs** en \`${channel.name}\``)
        update(message, db)
    });
        });


    

}


module.exports.help = {
    name: "raidlogs",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration de la modération du serveur.",
  };