const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('quick.db')
const     config = require("./../../config.json")
module.exports.run = async (client, message, args) => {
    let authorized = [`${config.bot.owner}`, `${config.bot.owner1}`, `${config.bot.owner2}`, `${config.bot.owner3}`, `${config.bot.owner4}`, `${config.bot.owner5}`, `${config.bot.owner6}`, `${config.bot.owner7}`, `${config.bot.owner8}`, `${config.bot.owner9}`, `${config.bot.owner10}`]
    if(!authorized.includes(message.author.id)) {
        let channel = message.mentions.channels.first()
    
        if(!channel) {
          return message.lineReply("Merci de mentionner un salon")
        }
     
          
            db.set(`pp_${message.guild.id}`, channel.id)
        
        message.lineReply("Vous avez défini avec succès le canal de pp sur <#" + channel.id + ">")
    } else {
        return message.delete()
    }
},
client.on("guildMemberAdd", (member) => {
    let setpp = db.fetch(`pp_${member.guild.id}`)
    if(setpp == null) return;
    let channel = member.guild.channels.cache.get(setpp)
    if(!channel) return;
    if(channel) {
        channel.send(new Discord.MessageEmbed()
        .setDescription(member.avatarURL({dynamic:true}))
        .setColor('2f3136')
        )
    }

})
module.exports.help = {
    name: "setpp",
    aliases: [],
};