const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; },
fs = require("fs");

module.exports = async (client, oldState, newState) => {
    let db = null;
    if(oldState) {  
    gld = oldState.guild.id
    } else if(newState) {
    gld = newState.guild.id
    }
fs.readFile(`./serveur/${gld}.json`, async (err, data) => {
if (err) return;

if(oldState) {  
    db = JSON.parse(fs.readFileSync(`./serveur/${oldState.guild.id}.json`, "utf8"));
    } else if(newState) {
    db = JSON.parse(fs.readFileSync(`./serveur/${newState.guild.id}.json`, "utf8"));
    }
    if(!db) return;
    if (oldState.channel !== null && newState.channel !== null) {
        if(oldState.member.id === client.user.id) {
            newState.channel.leave()
            oldState.channel.members.forEach(m => {
                m.voice.setChannel(newState.channel.id)
            })
            }
    }

    if(db.tempo.module === true) { 
    // -- Si qlq rej le salon
    if (oldState.channel === null) {
        if(newState.channel.id === db.tempo.channel) {
            // -- Obtiens la catégorie 
            var category = oldState.guild.channels.cache.get(db.tempo.category);
            if(!category) return;
            // -- Crée un salon de type vocal avec comme nom le pseudo de la personne et le définis dans la catégorie
            oldState.guild.channels.create(`${db.tempo.emoji} ${newState.member.user.username}`, {
            type: 'voice',
            parent: category,
            reason: `Salon temporaire - Création d'un nouveau salon`
            // -- Après
            }).then(c => {
            // -- Ajoute des permissions au salon pour le membre en lui attribuant toutes les permissions sur le salon
            c.createOverwrite(newState.member, {
                MANAGE_CHANNELS: true,
                MANAGE_ROLES: true
              });
              // -- Déplace l'utilisateur dans le salon
              newState.member.voice.setChannel(c)
            })
        }
        // -- leave
    } else if (newState.channel === null) {
        // -- Vérifie que le salon ce trouve dans la catégorie 
    if(oldState.channel.parentID === db.tempo.category) {
    // -- Vérifie aussi que personne est dans le salon
    if(oldState.channel.id === db.tempo.channel) return;
    if(oldState.channel.members.size === 0) {
        // -- Supprime le salon si personne est dedans
        oldState.channel.delete({reason: `Salon temporaire - Plus personne dans le salon`})
    }
    }
// -- déplacement
} else if (oldState.Channel !== null && newState.channel !== null) {
  
    // -- Vérifie si l'ancien salon appartient a la catégorie et que le nouveau salon n'est pas le salon de création
    if(oldState.channel.parentID === db.tempo.category && newState.channel.id !== db.tempo.channel) {
    
    // -- Vérifie si l'ancien salon est le salon de création (pour éviter de le supprimer)
    if(oldState.channel.id === db.tempo.channel) {
    null;
    // -- Ou alors si le salon n'est pas le salon de création:
    } else {
        // -- Vérifie que le salon est vide
        if(oldState.channel.members.size === 0) {
            // -- Supprime le salon
            if(oldState.channel.id === db.tempo.channel) return;
            oldState.channel.delete({reason: `Salon temporaire - Plus personne dans le salon`})
        }
    }
    
    // -- Ou alors vérifie que l'ancien salon appartient a la catégorie, que l'ancien salon n'est pas celui de la création de salon et que le nouveau salon est le salon de création
    } else if(oldState.channel.parentID === db.tempo.category && oldState.channel !== db.tempo.channel && newState.channel.id === db.tempo.channel) {
    // -- Vérifie que l'ancien salon est vide
    if(oldState.channel.members.size === 0) {
        // -- Supprime le salon
        oldState.channel.delete({reason: `Salon temporaire - Plus personne dans le salon`})
    }
    // -- 
            // -- Obtiens la catégorie 
            var category = oldState.guild.channels.cache.get(db.tempo.category);
            // -- Crée un salon de type vocal avec comme nom le pseudo de la personne et le définis dans la catégorie
            oldState.guild.channels.create(`${db.tempo.emoji} ${newState.member.user.username}`, {
            type: 'voice',
            parent: category,
            reason: `Salon temporaire - Création d'un nouveau salon`
            // -- Après
            }).then(c => {
            // -- Ajoute des permissions au salon pour le membre en lui attribuant toutes les permissions sur le salon
            c.createOverwrite(newState.member, {
                MANAGE_CHANNELS: true,
                MANAGE_ROLES: true
              });
              // -- Déplace l'utilisateur dans le salon
              newState.member.voice.setChannel(c)
            })
    
    } else if(newState.channel.parentID === db.tempo.category && oldState.channel !== db.tempo.channel && newState.channel.id === db.tempo.channel) {
        
            // -- Obtiens la catégorie 
            var category = oldState.guild.channels.cache.get(db.tempo.category);
            // -- Crée un salon de type vocal avec comme nom le pseudo de la personne et le définis dans la catégorie
            oldState.guild.channels.create(`${db.tempo.emoji} ${newState.member.user.username}`, {
            type: 'voice',
            parent: category,
            reason: `Salon temporaire - Création d'un nouveau salon`
            // -- Après
            }).then(c => {
            // -- Ajoute des permissions au salon pour le membre en lui attribuant toutes les permissions sur le salon
            c.createOverwrite(newState.member, {
                MANAGE_CHANNELS: true,
                MANAGE_ROLES: true
              });
              // -- Déplace l'utilisateur dans le salon
              newState.member.voice.setChannel(c)
            })
    
    }
}
    }  
if(db.logs.vocal !== false) { 

var str_chan = null;
if(oldState) {
str_chan = oldState.guild.channels.cache.find(c => c.id === db.logs.vocal)
} else if(newState) {
str_chan = newState.guild.channels.cache.find(c => c.name === db.logs.vocal)
}
if(!str_chan) return;

// -- Mute
if(oldState && newState && oldState.streaming !== newState.streaming) { 
console.log(oldState.streaming)

if(oldState.streaming === false && newState.streaming) {
    str_chan.send({embed:{ description: `**${newState.member.user.username}**#${newState.member.user.discriminator} (\`${newState.id}\`) partage son écran dans [\`${newState.channel.name}\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})`, color: 3553599, author: { name: "📽️ Un stream a commencé" }, footer: { text: `🕙 ${getNow().time}` } }}) 
} else {
    str_chan.send({embed:{ description: `**${newState.member.user.username}**#${newState.member.user.discriminator} (\`${newState.id}\`) ne partage plus son écran dans [\`${newState.channel.name}\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})`, color: 3553599, author: { name: "🎞️ Un stream est fini" }, footer: { text: `🕙 ${getNow().time}` } }}) 

}


} else if(oldState && newState && oldState.serverMute !== newState.serverMute) { 

    var fetchedLogs = await newState.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_UPDATE',
    }),
 deletionLog = fetchedLogs.entries.first();
 if (!deletionLog) return;
 var { executor, target } = deletionLog;
 if(target.id !== oldState.member.user.id) return;
 let oldstate = null,
 newstate = null;
 deletionLog.changes.forEach(s => {
    newstate = s.new
    oldstate = s.old
 });

 if(oldstate === false && newstate === true) { 
 str_chan.send({embed:{ description: `**${executor.username}**${executor.discriminator} (\`${executor.id}\`) a retiré la permissions de parler a **${oldState.member.user.username}**#${oldState.member.user.discriminator} (\`${oldState.id}\`) dans le salon [\`${newState.channel.name}\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})`, color: 3553599, author: { name: "🤫 Mute d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
 } else {
str_chan.send({embed:{ description: `**${executor.username}**${executor.discriminator} (\`${executor.id}\`) a donné la permissions de parler a **${oldState.member.user.username}**#${oldState.member.user.discriminator} (\`${oldState.id}\`) dans le salon [\`${newState.channel.name}\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})`, color: 3553599, author: { name: "🎙️ Demute d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
 }
} else if(oldState && newState && oldState.serverDeaf !== newState.serverDeaf) { 

    var fetchedLogs = await newState.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_UPDATE',
    }),
 deletionLog = fetchedLogs.entries.first();
 if (!deletionLog) return;
 var { executor, target } = deletionLog;
 if(target.id !== oldState.member.user.id) return;
 let oldstate = null,
 newstate = null;
 deletionLog.changes.forEach(s => {
    newstate = s.new
    oldstate = s.old
 });

 if(oldstate === false && newstate === true) { 
 str_chan.send({embed:{ description: `**${executor.username}**${executor.discriminator} (\`${executor.id}\`) a retiré la permissions de d'écouter a **${oldState.member.user.username}**#${oldState.member.user.discriminator} (\`${oldState.id}\`) dans le salon [\`${newState.channel.name}\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})`, color: 3553599, author: { name: "🔇 Mute d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
 } else {
str_chan.send({embed:{ description: `**${executor.username}**${executor.discriminator} (\`${executor.id}\`) a donné la permissions de d'écouter a **${oldState.member.user.username}**#${oldState.member.user.discriminator} (\`${oldState.id}\`) dans le salon [\`${newState.channel.name}\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})`, color: 3553599, author: { name: "🔊 Demute d'un membre" }, footer: { text: `🕙 ${getNow().time}` } }}) 
 }
} else if (oldState.channel === null) {
    str_chan.send({embed:{ description: `**${newState.member.user.username}**#${newState.member.user.discriminator} (\`${newState.id}\`) s'est connecté au salon [\`${newState.channel.name}\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})`, color: 3553599, author: { name: "✔️ Connexion" }, footer: { text: `🕙 ${getNow().time}` } }}) 
} else if(newState.channel === null) {
    if(!oldState.channel) return;
    str_chan.send({embed:{ description: `**${oldState.member.user.username}**#${oldState.member.user.discriminator} (\`${oldState.id}\`) a quitté le salon [\`${oldState.channel.name}\`](https://discord.com/channels/${oldState.guild.id}/${oldState.channel.id})`, color: 3553599, author: { name: "❌ Déconnexion" }, footer: { text: `🕙 ${getNow().time}` } }}) 
} else if (oldState.channel !== null && newState.channel !== null) {
if(oldState.selfMute !== newState.selfMute) return;
if(oldState.selfDeaf !== newState.selfDeaf) return;

    var fetchedLogs = await newState.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_MOVE',
    }),
 deletionLog = fetchedLogs.entries.first();

 if (!deletionLog) return str_chan.send({embed:{ description: `**${oldState.member.user.username}**#${oldState.member.user.discriminator} (\`${oldState.id}\`) s'est déplace du salon [\`${oldState.channel.name}\`](https://discord.com/channels/${oldState.guild.id}/${oldState.channel.id}) à [\`${newState.channel.name}\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})`, color: 3553599, author: { name: "➰ Déplacement" }, footer: { text: `🕙 ${getNow().time}` } }}) ;
 var { executor, extra } = deletionLog;


 if (newState.channel && newState.channel.id === extra.channel.id) {
    
 str_chan.send({embed:{ description: `**${executor.username}**${executor.discriminator} (\`${executor.id}\`) a déplacé **${oldState.member.user.username}**#${oldState.member.user.discriminator} (\`${oldState.id}\`) du salon [\`${oldState.channel.name}\`](https://discord.com/channels/${oldState.guild.id}/${oldState.channel.id}) à [\`${newState.channel.name}\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})`, color: 3553599, author: { name: "➰ Déplacement" }, footer: { text: `🕙 ${getNow().time}` } }}) 
 }
};



}
});
};