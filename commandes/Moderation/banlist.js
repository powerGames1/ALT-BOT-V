
const { MessageEmbed } = require("discord.js")
const fs = require("fs");

emojis = require("./../../emotes.json")
module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("../../config.json")

    if (!message.guild.available) return this.client.logger.info(`Serveur "${message.guild.name}" (${message.guild.id}) est indisponible.`);
    if (!message.guild.me.hasPermission("ADMINISTRATOR"))     return message.lineReply(`${emojis.general.warning} Vous n'avez pas la permission requise \`ADMINISTRATOR\``);


    message.guild.fetchBans()
    .then(bans => {
      const obj = bans.map(c => ({
        user: `${c.user.id}: ${c.user.username},`
      }));
      const bList = Array.from(obj);
      if (bList.length < 1) return message.channel.send(`Il n'y a aucun utilisateur banni sur **${message.guild.name}**.`);
      let index = 0;

      const embed = new MessageEmbed()
          .setTitle(`Liste des \`membres ban\` de *${message.guild.name}* (**${++index}**) `)
          .setDescription(`${bList.map(bl => `\`\`\`\n${bl.user}\`\`\``).join("")}`)
          .setFooter(client.user.username, config.image)
          .setTimestamp()  
          .setColor(db.color)
     
          message.channel.send(embed)
    });
  }
  module.exports.help = {
    name: "banlist"
}



