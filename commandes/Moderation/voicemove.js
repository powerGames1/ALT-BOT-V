var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
emojis = require("./../../emotes.json")
module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

    var novc = new Discord.MessageEmbed()
        
    .setTitle("Oulaa !")
    .setDescription("> Tu n'es pas dans un salon vocal")
    .setColor(db.color)

            let channel = message.member.voice.channel;
            if(!channel) return message.channel.send(novc)

 if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(`${emojis.general.warning} Vous n'avez pas la permission requise \`ADMINISTRATOR\``);
 message.member.voice.channel.join().then(m => { 
message.channel.send(`${emojis.general.warning} Déplace moi dans le salon ou tu veux que je déplace les membres présents.`)
setTimeout(() => {
    message.member.voice.channel.leave()
    }, 120000);
})
    };
    module.exports.help = {
        name: "voicemove",
        aliases: [],
        category: 'moderation',
        description: "Déplace toutes les personnes d'un salon vers un autre",
      };
