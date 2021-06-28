const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

emojis = require("../../emotes.json")
module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("../../config.json")
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.lineReply(`${emojis.general.warning} Vous n'avez pas la permission requise \`MANAGE_ROLES\``);
    if (!args.length) {
        return message.channel.send(`${emojis.general.warning} Attention, vous avez mal utiliser la commande, \`role <add/remove> <@user>\``)
        }
    const add = args[0] == 'add';
    const remove = args[0] == 'remove';
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
    if(role == undefined) return message.lineReply(`${emojis.general.warning} Le rôle spécifié n'existe pas.`)
    if(add && !member) return message.lineReply(`${emojis.general.warning} Vous devez specifier un membre à ajouter le rôle`)
    if(add && member && !role) return message.lineReply(`${emojis.general.warning} Vous devez specifier un rôle à ajouter à ${membre}` )
    if(member.user.id == message.author.id) return message.lineReply(`${emojis.general.no} Vous ne pouvez pas vous ajoutez vous même le rôle tdc(${role})`)
    if(!args[0]){
        const hEmbed = new Discord.MessageEmbed()
            .setTitle(`PURGINGGG#6666 to design`)
            .setDescription(`Example ect`)
            .setFooter(`PURGINGGG#6666`)
            .setColor(db.color)
            .setTimestamp()
            .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
            .setTimestamp()  
            
        return message.channel.send(hEmbed)
    }else if(add){
        if(member.roles.cache.has(role.id)) return message.channel.send(`${member} possède déjà le rôle ${role}.`)
        member.roles.add(role).then(() =>{
            message.lineReply(`${emojis.general.yes} J'ai ajouté le rôle (${role}) à ${member}`)
        }).catch((err) =>{
            console.log(err)
            message.channel.send(`${emojis.general.warning2} Il y a eu une erreur je n'ai pas pu enlever le rôle à ${member}`)
        })
    }else if(remove){
        if(!member.roles.cache.has(role.id)) return message.channel.send(`${member} ne possède pas le rôle ${role}.`)
        member.roles.remove(role).then(() =>{
            message.lineReply(`${emojis.general.yes} J'ai enlevé le rôle (${role}) à ${member}`)
        }).catch((err) =>{
            console.log(err)
            message.channel.send(`${emojis.general.warning2} Il y a eu une erreur je n'ai pas pu enlever le rôle à ${member}`)
        })
    }
    }
module.exports.help = {
    name: "role",
  };