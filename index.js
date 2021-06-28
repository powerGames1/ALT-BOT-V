// --  Formule pour déclarer les variables
const discord = require('discord.js');
require('discord-reply'); 
const
      reply = require('discord-reply'),
      config = require("./config.json"),
      prefix = "+",
      { readdirSync } = require("fs"),
      { Client, Collection} = require("discord.js"),
      client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
      Discord = require("discord.js")
      figlet = require('figlet'),
      colors = require('colors'),
      readline = require('readline'),
       db = require("quick.db"),
       { ReactionCollector, MessageEmbed } = require('discord.js'),
      talkedRecently = new Set(),
       disbut = require('discord-buttons')(client),
        fs = require("fs"),
        yaml = require("js-yaml"),
        { join } = require("path"),
        client.commands = new Discord.Collection(),
        ms = require("ms"),
        emojis = require("./emotes.json");


       client.commands = new Collection()
       console.clear()
       console.log(`                                                                                                                     
       
        `.blue + `Version 0.1`.green + `${config.bot.version}`.yellow + ` de ` + `BigOPenWorld Bot`.blue + `                       `.blue)
       
       const loadEvents = (dir = "./modules/") => {
         readdirSync(dir).forEach(dirs => {
         const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
                                         
         for (const event of events) {
         const evt = require(`${dir}/${dirs}/${event}`);
         const evtName = event.split(".")[0];
         client.on(evtName, evt.bind(null, client));
         console.log(`[EVENTS]`.blue + ` 
                                         | Chargement de l'évènement | 
                                         ----------------------------- > `.white + ` ${evtName}.js`.blue);
         };
       });
       };
       loadEvents()
       
       const loadCommands = (dir = "./commandes/") => {
         readdirSync(dir).forEach(dirs => {
         const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
             
         for (const file of commands) {
         const getFileName = require(`${dir}/${dirs}/${file}`);
         client.commands.set(getFileName.help.name, getFileName);
         console.log(`[COMMANDS]`.blue + ` 
                                          | Chargement de la commande | 
                                          ----------------------------- >`.white + ` ${getFileName.help.name}.js`.blue);
         };
       });
       };
       loadCommands()
        
           //==============================         PING BOT    ==========================================
       client.options.restTimeOffset = 0;
       client.on("message", async (message , args) => {
         const fs = require('fs')
        let dab = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
         const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
       if (message.content.match(prefixMention)) {
        return message.lineReply(`<:etoilee:845281717463679008> Mon prefix sur ce serveur est: \`${dab.prefix}\` `) }});

    //==============================         CLEAR    ==========================================

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content
    .toLowerCase()
    .slice(prefix.length)
    .trim()
    .split(/\s+/);
  const [command, input] = args;

  
});

    //==============================         Invitations    ==========================================
client.on("guildCreate", guild => {


const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/849094734633762847/2AWpceNW-lihKtBYvzYm7G0AYfd5TQM0JpljAuvWS-hKTjmxWsWYN3QUwS4udpnh2Ezn");
 
const embed = new MessageBuilder()
.setTitle('Nouveau Serveur - Hyphus Bot')
.setDescription(`Voici le nom du serveur » **${guild.name} ( ${guild.memberCount} membres )**`)
 
hook.send(embed);

})
client.on("guildDelete", guild => {

const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/849094734633762847/2AWpceNW-lihKtBYvzYm7G0AYfd5TQM0JpljAuvWS-hKTjmxWsWYN3QUwS4udpnh2Ezn");
 
const embed = new MessageBuilder()
.setTitle("J'ai quitter un serveur - Hyphus Bot")
.setDescription(`Voici le nom du serveur » **${guild.name} ( ${guild.memberCount} membres )**`)
 
hook.send(embed);

})


    //==============================         ANTIWEBHOOK    ==========================================

    client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})

  
client.on('webhookUpdate', async (channel ,message) => {
  const db = require("quick.db")
  const Discord = require("discord.js");
  const fs = require('fs')
  let dab = JSON.parse(fs.readFileSync(`./serveur/${channel.guild.id}.json`, "utf8"));
 

                          
  getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

  channel.guild.fetchAuditLogs({limit: 1, type: "WEBHOOK_CREATE"}).then(data => {
let link = db.fetch(`antiwb_${channel.guild.id}`)
 
 if(link === null) {
   return           

 }
 if(link === true){

  const chanPosition = channel.position;
  channel.delete().then(() => {
      channel.clone().then(value => {
          value.setPosition(chanPosition).then(() => {
            
            const value = data.entries.first();
            if (value && value.executor) {
                const member = channel.guild.members.cache.get(value.executor.id);
                if (member)
                    member.kick().catch(reason => console.error(reason.message)).then(() => 
                    console.log(`Tout les webhooks ont été supprimés`),
                    channel.guild.channels.cache.get(dab.mods.logs).send(`J'ai kick **${member.user.tag}** pour avoir essayer de crée un webhook! Le salon a également été refait : \`${channel.name}\``)               
          )} }).catch(err => console.error(err.message))

                  }).catch(err => console.error(err))
          }).catch(err => console.error(err))
 }})
})

    //==============================         antijoin    ==========================================

client.on("guildMemberAdd", (member , channel , guild) => {
  const db = require("quick.db")
  const Discord = require("discord.js");
  const fs = require('fs')
  let dab = JSON.parse(fs.readFileSync(`./serveur/${member.guild.id}.json`, "utf8"));
  let link = db.fetch(`autob_${member.guild.id}`)
  const channels = member.guild.channels.cache.get(dab.mods.logs)
  if(link === null) {
return;  }
      if(link === true){
           

  if(member) member.kick().catch(e=>console.log(e))  
  member.send(`Tu as été kick du serveur **${member.guild.name}** car le \`Raid-Mode\` est activé`)  


      }
})



    //==============================         antitoken    ==========================================
client.on("guildMemberAdd", (member , channel , guild) => {
  const db = require("quick.db")
  const discord = require("discord.js");
  const ms = require("ms");  
  const duration = ms('3 days');
  const fs = require("fs");
  let dab = JSON.parse(fs.readFileSync(`./serveur/${member.guild.id}.json`, "utf8"));
  let link = db.fetch(`antidc_${member.guild.id}`)
  const channels = member.guild.channels.cache.get(dab.mods.logs)
  let created = member.user.createdTimestamp;
  let sum = created + duration;
  let diff = Date.now() - sum;
  if(link === null) {
return;  }
      if(link === true){


    
        if(diff < 0) {

          member.send("Tu as été kick du serveur **${member.guild.name}** car l' \`Anti-Token\` est activé, ton compte est trop jeune (3 jours)").then(() => {
              member.kick();
          });
      }

      }
})






     //==============================         ANTILINK    ==========================================


     client.on("message", async (message , args) => {
      const db = require("quick.db")
     const Discord = require("discord.js");


     const pub = [
      "discord.me",
      "discord.com",
      "discord.io",
      "discord.gg",
      "invite.me",
      "discord.gg/",
      "discord.",
      "discordapp.com/invite",
      ".gg",
      "https",
      "http",
      "https:"

  ];
                             
   
     if (pub.some(word => message.content.includes(word))) {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        return;
    } 
 let link = db.fetch(`al_${message.guild.id}`)
    if(link === null) {
return;
    }
    if(link === true){

      message.delete()
      message.lineReply(`${emojis.general.warning2} Nous n'acceptons pas la pub ici`).then((mm) => mm.delete({
        timeout: 5000
}));  
                 

    }
   
  }
    
  })


  
     //==============================         ANTIPING    ==========================================


  client.on("message", async (message , args) => {
    const db = require("quick.db")
   const Discord = require("discord.js");
   const fs = require('fs')
   let dab = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
   let authorized = [`${config.bot.owner}` , `${config.bot.owner2}` , `${config.bot.owner3}` , `${message.guild.ownerID}`]

   const pub = [
    "@everyone",
    "@",
    "@here",

];
                           
 
   if (pub.some(word => message.content.includes(word))) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        return;
    } 
let link = db.fetch(`ap_${message.guild.id}`)
  
  if(link === null) {   
return;  }
  if(link === true){

    //message.channel.guild.channels.cache.get(dab.mods.logs).send(`**${message.author.tag}** ce fils de chien a essayer de ping je l'ai bloquer dans : ${message.channel} \`Anti-Ping Activé\``)   
    message.delete()
    message.lineReply(`${emojis.general.warning2} Désolé mais vous n'avez pas le droit de ping \`@membre ,@here, @everyone\` sur le serveur`).then((mm) => mm.delete({
      timeout: 5000
  }));  
  }}})

      //==============================         antibot    ==========================================

  client.on("guildMemberAdd", (member , message , guild) => {
    const db = require("quick.db")
    const Discord = require("discord.js");
    const fs = require('fs')
    let dab = JSON.parse(fs.readFileSync(`./serveur/${member.guild.id}.json`, "utf8"));
    let link = db.fetch(`ab_${member.guild.id}`)
    if(link === null) {
      return;  }
        if(link === true){
    if(member.user.bot) member.kick().catch(e=>console.log(e))    

        }
})
     //==============================         INVITATIONS    ==========================================
     const guildInvites = new Map();

client.on("inviteCreate", async invite =>
  guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
);
client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild
      .fetchInvites()
      .then(invites => guildInvites.set(guild.id, invites))
      .catch(err => console.log(err));
  });
});
const { defaultjoinmessage, defaultleavemessage } = yaml.load(
  fs.readFileSync("./config.yml")
);
client.on("guildMemberAdd", async member => {
  let joinchannelmessage = db.get(`joinchannelmessage_${member.guild.id}`);
  if (!joinchannelmessage === null) {
    return console.log(`Aucun JoinChannelMessage`);
  }
  let joinmessage = db.get(`joinchannelmessage_${member.guild.id}`);
  if (joinmessage === null) joinmessage = defaultjoinmessage;

  const catchedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  try {
    const usedInvite = newInvites.find(
      inv => catchedInvites.get(inv.code).uses < inv.uses
    );
    db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}`, 1);
    db.set(`inviter_${member.id}`, usedInvite.inviter.id);
    let inv = db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}`);
    //let jointimes = db.get(`jointimes_${member.guild.id}_${member.author.id}`)
    //if(jointimes === null) jointimes = "First Time";
    let joinmessage2 = defaultjoinmessage
      .toLowerCase()
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv);

    //  .replace("{jointimes}", jointimes)
    //  .replace("{jointimes}", jointimes)
    // .replace("{jointimes}", jointimes)
    //  .replace("{jointimes}", jointimes)

    db.add(`jointimes_${member.guild.id}_${member.id}`, 1);
    db.add(`Regular_${member.guild.id}_${usedInvite.inviter.id}`, 1);
    client.channels.cache.get(joinchannelmessage).send(joinmessage2);
  } catch (err) {
    console.log(err);
  }
})

client.on("guildMemberRemove", member => {
  let leavechannel = db.get(`leavechannelmessage_${member.guild.id}`);
  if (leavechannel === null) {
    return console.log(`nope!`);
  }
  let leavemssage = db.get(`leavemessage_${member.guild.id}`);
  if (leavemssage === null) leavemssage = defaultleavemessage;

  let inviter2 = db.fetch(`inviter_${member.id}`);
  const iv2 = client.users.cache.get(inviter2);
  const mi = member.guild.members.cache.get(inviter2);
  db.subtract(`invites_${member.guild.id}_${inviter2}`, 1);
  if (!inviter2) {
    client.channels.cache
      .get(leavechannel)
      .send(`**${member}** L'utilisateur est parti mais je n'ai pas pu **trouver** qui l'a invité!`);
    
    return;
  }
  let leavemssage2 = leavemssage
    .toLowerCase()
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`);

  db.add(`leaves_${member.guild.id}_${inviter2}`, 1);
  client.channels.cache.get(leavechannel).send(leavemssage2)
});


     //==============================         SSNIPE    ==========================================
client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})
     //==============================         SSNIPE    ==========================================


client.login(config.login.token).catch(e => { console.log(`[CRITICAL ERROR]`.blue + ` Erreur rencontrée: ${e}`) });