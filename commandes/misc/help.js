const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
ms = require("ms"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

   let config = require("../../config.json")

function update(message, db) {
    fs.writeFile(`./serveur/${message.guild.id}.json`, JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
};

module.exports.run = async (client, message, args) => {
    emojis = require("./../../emotes.json")

    if(!message.guild) return;

       let dab = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"))
   let config = require("../../config.json")

    let prefix = dab.prefix
    if (prefix === null) prefix = dab.prefix

   filter = (reaction, user) => ['1️⃣','❌'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id }; 

   const msgembed = new MessageEmbed()
   .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic: true}))
       .setTitle(`**Page d’aide**`)
   .setDescription(`<:Parametres:845266635958648843> Mon prefix sur ce serveur est: \`${prefix}\`\n\n<:folder:845284293159944262> Veuillez réagir a la réaction \`1️⃣\` pour obtenir toute les commandes du bot\n\n**<a:etoile:845266640467656735> Liens:**\n\n<:server:845283397920489542> [Support Serveur](https://discord.gg/mEBr6tzNuz)\n<:Ligne:845266630460440647> [Invite Moi](https://discord.com/api/oauth2/authorize?client_id=815382719080955924&permissions=8&redirect_uri=https%3A%2F%2Fgithub.com%2Fbigopenworld%2FLinus&response_type=code&scope=bot%20connections)`)
   .setColor(dab.color)
   .setTimestamp()  



    message.channel.send(msgembed)
    .then(async m => { 
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async r => { m.delete()  
if(r.emoji.name === "1️⃣") {

    const msgembedee = new MessageEmbed()
    .setTitle("Mes commandes")
    .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
    //.setAuthor(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    .setDescription(`> Voici mon prefix :\`${prefix}\`
    > J'ai un total de \`${client.commands.size}\` commandes !\n`)
    .addField(`<:administration:859039596147245056>・Administration (6)`, ` \`autorole\`, \`membercount\`, \`statut\`, \`tempchannel\`, \`setlogs\`, \`embed\``)
    .addField(`<:Invitation:859039674931609615>・Invitations (8)`, `\`config\`, \`add-invites\`, \`invites\`, \`remove-invites\`, \`joinchannel\`, \`joinmessage\`, \`leavechannel\`, \`leavemessage\``)
    .addField(`<:moderation:859039734487318558>・Modération (19)`, `\`create\`, \`nick\`, \`resetnick\`, \`slowmode\`, \`massiverole\`, \`role\`, \`deleterole\`, \`clear\`, \`dm\`, \`lock\`, \`nuke\`, \`slowmode\`, \`ban\`, \`unban\`, \`banlist\`, \`botlist\`, \`mute\`, \`unmute\`,\`voicemove\``)
    .addField(`🛡️・Anti-Raid (8)`, `\`antiping\`, \`antibot\`, \`antijoin\`, \`antilink\`, \`antitoken\`, \`antiwebhook\`, \`secur-max\`, \`secur-opti\`, \`webhook\``)
    .addField(`🎁・Giveaway (2)`, `\`gstart/gcreate\`, \`greroll\``)
    //.addField(`<:server:845283397920489542>・Backup (4)`, `\`backup create\`, \`backup remove\`, \`backup load\`, \`backup list\``)
    .addField(`🔞・Nsfw (7)`, `||\`4k\`||, ||\`anal\`||, ||\`ass\`||, ||\`boobs\`||, ||\`hentai\`||, ||\`porngif\`||, ||\`pussy\`||`)
    .addField(`${emojis.fun.coin}・Fun (19)`, `\`betrayal\`, \`fishing\`, \`yt\`, \`poker\`, \`tweet\`, \`ph\`, \`reunion\`, \`gaypic\`, \`pic\`, \`8ball\`, \`calcule\`, \`gay\`, \`fight\`, \`smoke\`, \`dance\`, \`hug\`, \`kiss\`, \`meteo\`, \`mind\`, \`wasted\``)
    .addField(`<:home:845283367183843438>・Utilitaire (12)`, `\`dev\`, \`invite\`, \`adminlist\`, \`help\`, \`vc\`, \`snipe\`, \`emojis\`, \`serverpic\`, \`serverinfo\`, \`userinfo\`, \`channelinfo\`, \`speed\``)
    .addField(`<:Couronne:845266613413871667>・Owner (8)`, `\`setcolor\`, \`setprefix\`, \`restart\`, \`leave\`,\`setactivity\`, \`setavatar\`, \`setname\`, \`serverlist\``)
    .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    .setColor(dab.color)
    .setThumbnail(client.user.displayAvatarURL({dynamic : true}))
    .setTimestamp()  

          message.lineReply(msgembedee)
} else if(r.emoji.name === '❌') {
      m.delete()
    }
});
await m.react("1️⃣") 


await m.react("❌")
    });
};


module.exports.help = {
    name: "help",
    aliases: [],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration de l'autorole.",
  };