
    const Discord = require("discord.js")
    const botConfig = require("../../config.json")
    const fetch = require("node-fetch")
    const { MessageButton, MessageActionRow } = require('discord-buttons');
    

        module.exports.run = async (bot, message, args) => {
            let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
            
        var novc = new Discord.MessageEmbed()
        
        .setTitle("Oulaa !")
        .setDescription("> Tu n'es pas dans un salon vocal")
        .setColor(db.color)
        var poker = new Discord.MessageEmbed()
        
        .setTitle("Youtube")
        .setDescription("> Appuie sur le boutton pour regarder **Youtube** !")
        .setColor(db.color)


            let channel = message.member.voice.channel;
            if(!channel) return message.channel.send(novc)

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${botConfig.login.token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(invite => {
    console.log("sh https://discord.com/invite/" + invite.code)
    if(!invite.code) return message.channel.send("Je peux pas commencer une partie de **Youtube** !")
        
let wtf = new MessageButton()
.setStyle('url')
.setLabel('▶️ Watch') 
.setURL(`https://discord.com/invite/${invite.code}`)


message.channel.send("", { buttons: [wtf], embed: poker})
})
}

module.exports.help = {
    name: "yt",
}