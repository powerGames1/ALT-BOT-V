const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
const ror = require("@spyte-corp/discord.js-remove-on-reaction");
const fs = require("fs");
module.exports.run = async (client, message, args) => {
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("./../../config.json")
    const embed = new MessageEmbed().setColor(0x00FFFF);
    if (!message.channel.nsfw)
    return message.channel.send(
        "Ce salon n'est pas `NSFW` :underage: !"
    );
    message.channel.startTyping();
    fetch(`https://nekobot.xyz/api/image?type=hentai`)
        .then(res => res.json())
        .then(data => {
            embed.setImage(data.message)
            embed.setTitle(message.author.username+' Hentai')
            embed.setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
            embed.setTimestamp()
            embed.setColor(db.color);
    
           

            message.channel.send({embed}).then(msg => { 
                ror(message, msg, true);
                msg.react("🗑");
            });
        })
        .catch(err => {
            this.client.logger.error(err.stack);
            message.channel.stopTyping(true);
            return this.client.embed("APIError", message);
        });
    message.channel.stopTyping(true);


  

};


module.exports.help = {
    name: "hentai",


  };