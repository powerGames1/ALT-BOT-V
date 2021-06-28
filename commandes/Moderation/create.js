const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const config = require('../../config.json')
const fs = require('fs');
emojis = require("./../../emotes.json")
module.exports.run = async(bot, message, args) => {

        if (!message.member.hasPermission("MANAGE_EMOJIS")) {
            return message.lineReply( `${emojis.general.warning} Vous n'avez pas la permission requise \`MANAGE_EMOJIS\``); }

        const emoji = args[0];
        if (!emoji) return message.lineReply(`<:Warning:845283468715491348> Veuillez me donner un emoji !`);

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
      customemoji.animated ? "gif" : "png"
    }`;
            const name = args.slice(1).join(" ");
            message.guild.emojis
                .create(`${Link}`, `${name || `${customemoji.name}`}`)
      .catch((error) => {
        console.log(error);
      });

      db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));

    const Added = new MessageEmbed()
      .setColor(db.color)
      .setDescription(
        `${emojis.general.yes} L'emoji a été ajouté!・ Nom : \`${name || `${customemoji.name}`}\`・ Image : [Click ici](${Link})`);
    return message.channel.send(Added).catch((e) => {
      console.log(e);
    });
  } else {
    let CheckEmoji = parse(emoji, {
      assetType: "png",
    });
    if (!CheckEmoji[0])
      return message.channel.send(`${emojis.general.warning} Veuillez me donner un emoji valide !`);
    message.channel.send(
      `Met un emoji qui vient pas de discord tdc !`
    );
  }
};
module.exports.help = {
  name: "create",
};